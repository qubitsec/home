#!/usr/bin/env python3
"""Optional local preview server. Python 3, standard library only.
Binds only to 127.0.0.1 and never modifies website files.
"""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import argparse
import threading
import webbrowser


def main() -> None:
    parser = argparse.ArgumentParser(description="Preview the PLURA v7.1 website locally.")
    parser.add_argument("--port", type=int, default=0, help="Local port; 0 selects an available port.")
    parser.add_argument("--no-browser", action="store_true", help="Do not open a browser automatically.")
    args = parser.parse_args()
    if not 0 <= args.port <= 65535:
        parser.error("port must be between 0 and 65535")
    root = Path(__file__).resolve().parents[1]
    if not (root / "ko" / "index.html").is_file():
        parser.error("ko/index.html is missing. Extract the complete ZIP first.")
    handler = partial(SimpleHTTPRequestHandler, directory=str(root))
    try:
        server = ThreadingHTTPServer(("127.0.0.1", args.port), handler)
    except OSError as exc:
        parser.exit(1, f"Cannot start preview server: {exc}\n")
    with server:
        url = f"http://127.0.0.1:{server.server_port}/ko/index.html"
        print(f"PLURA v7.1: {url}", flush=True)
        print("Stop with Ctrl+C. This server is available only on this computer.", flush=True)
        if not args.no_browser:
            threading.Timer(0.4, lambda: webbrowser.open(url)).start()
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            print("\nPreview server stopped.")


if __name__ == "__main__":
    main()
