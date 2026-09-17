from pathlib import Path
from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright
from urllib.parse import urlsplit,unquote
import base64,mimetypes,json,re,time

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'previews/zerotrust-20260915'; OUT.mkdir(parents=True,exist_ok=True)
DATA=ROOT/'qa'; DATA.mkdir(exist_ok=True)

CACHE={}
def datauri(path):
 path=path.resolve()
 if path not in CACHE:
  mime=mimetypes.guess_type(path.name)[0] or 'application/octet-stream'
  CACHE[path]=f'data:{mime};base64,'+base64.b64encode(path.read_bytes()).decode()
 return CACHE[path]

def html_for_render(path):
 s=BeautifulSoup(path.read_text(encoding='utf-8'),'html.parser')
 scripts=[]
 for el in list(s.find_all('script',src=True)):
  href=el['src']; u=urlsplit(href)
  if not u.scheme and not u.netloc:
   scripts.append((path.parent/unquote(u.path)).read_text())
  el.decompose()
 for el in list(s.find_all('link',href=True)):
  href=el['href']; u=urlsplit(href)
  if u.scheme or u.netloc: el.decompose(); continue
  target=path.parent/unquote(u.path)
  if 'stylesheet' in el.get('rel',[]):
   st=s.new_tag('style'); st.string=target.read_text(encoding='utf-8'); el.replace_with(st)
  elif target.is_file(): el['href']=datauri(target)
 for img in s.find_all('img',src=True):
  u=urlsplit(img['src'])
  if not u.scheme and not u.netloc:
   target=path.parent/unquote(u.path)
   if target.is_file():img['src']=datauri(target)
  img['loading']='eager'
 for script in scripts:
  st=s.new_tag('script');st.string=script;s.body.append(st)
 return str(s).replace('viewbox=','viewBox=')

CHECK=r'''() => {
const shown=e=>e.getClientRects().length && getComputedStyle(e).visibility!=='hidden' && !e.closest('[hidden]');
const overflow=Array.from(document.querySelectorAll('main h1,main h2,main h3,.a-proof-strip b,.a-proof-strip p,.a-value-card,.zt-support-card,.zt-detail-card,.zt-model-item,main .text-link')).filter(shown).filter(e=>e.scrollWidth>e.clientWidth+2 || (e.scrollHeight>e.clientHeight+2 && ['hidden','clip'].includes(getComputedStyle(e).overflowY))).map(e=>({tag:e.tagName,cls:e.className,text:e.innerText?.slice(0,100),scroll:e.scrollWidth,client:e.clientWidth,sh:e.scrollHeight,ch:e.clientHeight}));
const proof=Array.from(document.querySelectorAll('.a-proof-strip>div')).map(e=>{let b=e.querySelector('b'),p=e.querySelector('p'),i=e.querySelector('.icon');return {title:b?.innerText,b:getComputedStyle(b).fontSize,p:getComputedStyle(p).fontSize,svg:getComputedStyle(i).width,color:getComputedStyle(p).color,bounds:{x:e.getBoundingClientRect().x,w:e.getBoundingClientRect().width}}});
const missing=Array.from(document.images).filter(i=>i.hasAttribute('src') && shown(i)).filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.alt);
return {vw:innerWidth,doc:document.documentElement.scrollWidth,body:document.body.scrollWidth,overflow,proof,missing,ztNavbar:!!document.querySelector('.main-nav a[href="zta.html"]'),ztFooter:!!document.querySelector('.footer-col a[href="zta.html"]'),title:document.title,font:getComputedStyle(document.body).fontFamily};
}'''

def run():
 changed=['index.html','zta.html','platform_xdr.html','platform_siem.html','platform_soar.html','trust.html']
 pages=[p['file'] for p in json.loads((ROOT/'page-manifest.json').read_text())['pages']]
 widths=[320,375,390,600,768,1024,1100,1190,1280,1440,1920]
 converted={name:html_for_render(ROOT/'ko'/name) for name in pages}
 results=[]; errors=[]
 with sync_playwright() as p:
  browser=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
  context=browser.new_context(device_scale_factor=1,reduced_motion='reduce')
  context.route('**/*',lambda route:route.abort())
  page=context.new_page();page.on('pageerror',lambda exc:errors.append(str(exc)))
  for name in pages:
   for width in (widths if name in changed else [320,390,768,1024,1440]):
    page.set_viewport_size({'width':width,'height':1000})
    page.set_content(converted[name],wait_until='load')
    page.evaluate('document.fonts.ready');page.evaluate("window.scrollTo({top:0,left:0,behavior:'instant'})");page.wait_for_timeout(80)
    r=page.evaluate(CHECK);r.update({'file':name});results.append(r)
    if width==1440 and name in ['index.html','zta.html','platform_xdr.html']:
     page.screenshot(path=str(OUT/f'desktop-{name[:-5]}.png'),full_page=True)
     if name=='index.html':
      page.screenshot(path=str(OUT/'desktop-home-first-screen.png'))
      for sel,label in [('.a-proof-strip','proof-strip'),('#platform','core-four'),('#zero-trust','zero-trust')]:
       page.locator(sel).screenshot(path=str(OUT/f'desktop-{label}.png'))
     if name=='zta.html':
      page.locator('#zta-model').screenshot(path=str(OUT/'desktop-seven-pillars.png'))
    if width==390 and name in ['index.html','zta.html']:
     page.screenshot(path=str(OUT/f'mobile-{name[:-5]}.png'),full_page=True)
     if name=='index.html':
      for sel,label in [('.a-proof-strip','proof-strip'),('#zero-trust','zero-trust')]:page.locator(sel).screenshot(path=str(OUT/f'mobile-{label}.png'))
  browser.close()
 (DATA/'zerotrust-layout.json').write_text(json.dumps({'mode':'Offline Chromium set_content; original local CSS/JS/images inlined into temporary render document only; external webfont excluded; deployment files not inlined.','results':results,'page_errors':errors},ensure_ascii=False,indent=2))
 bad=[r for r in results if r['doc']>r['vw'] or r['body']>r['vw'] or r['overflow'] or r['missing']]
 print('RENDERS',len(results),'ISSUES',len(bad),'PAGE_ERRORS',errors)
 for r in bad:print(json.dumps(r,ensure_ascii=False))
 print('PROOF1440',[r['proof'] for r in results if r['file']=='index.html' and r['vw']==1440])

if __name__=='__main__':run()
