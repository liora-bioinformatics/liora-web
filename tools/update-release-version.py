#!/usr/bin/env python3
"""
Refresh assets/data/phylotrace-release.json from the GitHub releases API.

Why this exists: the PhyloTrace page shows the latest release tag. Fetching
it in the visitor's browser would send every visitor's IP address to GitHub,
Inc. (USA) on page load — an avoidable third-party transfer of the kind the
Google Fonts rulings (LG München I, 3 O 17493/20) treat as unlawful without
consent. Fetching it here instead keeps the page request same-origin, and
also sidesteps the 60 requests/hour unauthenticated rate limit that made the
browser-side lookup fail on shared networks.

Usage:
    python3 tools/update-release-version.py
"""

import datetime
import json
import os
import sys
import urllib.request

REPO = "liora-bioinformatics/PhyloTrace"
URL = "https://api.github.com/repos/%s/releases/latest" % REPO
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "assets", "data", "phylotrace-release.json")


def main():
    headers = {
        "Accept": "application/vnd.github+json",
        "User-Agent": "liora-web-release/1.0",
    }
    # In GitHub Actions a token lifts the rate limit; locally it is optional.
    token = os.environ.get("GITHUB_TOKEN")
    if token:
        headers["Authorization"] = "Bearer " + token

    try:
        req = urllib.request.Request(URL, headers=headers)
        with urllib.request.urlopen(req, timeout=30) as r:
            release = json.loads(r.read().decode("utf-8"))
    except Exception as exc:
        # Never overwrite a good file with an empty one.
        print("FAILED: %s" % exc, file=sys.stderr)
        return 1

    tag = release.get("tag_name")
    if not tag:
        print("FAILED: response has no tag_name", file=sys.stderr)
        return 1

    data = {
        "generated": datetime.date.today().isoformat(),
        "source": "github.com/%s/releases" % REPO,
        "tag_name": tag,
        "published_at": release.get("published_at"),
    }

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, sort_keys=True)
        f.write("\n")
    print("%s -> %s" % (tag, os.path.relpath(OUT, ROOT)))
    return 0


if __name__ == "__main__":
    sys.exit(main())
