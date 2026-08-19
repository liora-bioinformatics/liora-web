#!/usr/bin/env python3
"""
Local preview server for the Liora Bioinformatics site.

Plain `python3 -m http.server` is NOT good enough for this site: it does not
resolve extensionless URLs, so every internal link (/phylotrace, /contact, ...)
would 404 locally even though it works in production. This server mimics the
two GitHub Pages behaviours the site actually depends on:

  1. an extensionless request falls back to <path>.html
  2. a directory request falls back to index.html

It also sends no-cache headers, so a browser reload always shows your latest
edit instead of a stale stylesheet.

Usage:
    python3 serve.py            # http://127.0.0.1:8000
    python3 serve.py 8080       # pick another port

Stop with Ctrl+C.
"""

import http.server
import os
import socketserver
import sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
ROOT = os.path.dirname(os.path.abspath(__file__))


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def translate_path(self, path):
        """Resolve /phylotrace to phylotrace.html, the way GitHub Pages does."""
        local = super().translate_path(path)
        if os.path.isdir(local):
            index = os.path.join(local, "index.html")
            if os.path.isfile(index):
                return index
        if not os.path.exists(local) and not os.path.splitext(local)[1]:
            candidate = local + ".html"
            if os.path.isfile(candidate):
                return candidate
        return local

    def end_headers(self):
        # Always revalidate, so edits show up on a plain reload.
        self.send_header("Cache-Control", "no-store, must-revalidate")
        self.send_header("Expires", "0")
        super().end_headers()

    def log_message(self, fmt, *args):
        status = str(args[1]) if len(args) > 1 else ""
        marker = "  " if status.startswith("2") else "! "
        sys.stderr.write("%s%s\n" % (marker, fmt % args))


Handler.extensions_map.update({
    ".woff2": "font/woff2",
    ".woff": "font/woff",
    ".svg": "image/svg+xml",
    ".webmanifest": "application/manifest+json",
})


class Server(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    daemon_threads = True


if __name__ == "__main__":
    with Server(("127.0.0.1", PORT), Handler) as httpd:
        print("\n  Liora site preview")
        print("  http://127.0.0.1:%d\n" % PORT)
        print("  Pages: /  /phylotrace  /contact  /privacy  /impressum")
        print("  Ctrl+C to stop.\n")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n  stopped\n")
