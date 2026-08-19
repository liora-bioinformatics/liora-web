#!/usr/bin/env python3
"""
Refresh assets/data/cran-stats.json from the cranlogs service.

Why this exists: cranlogs.r-pkg.org sends no Access-Control-Allow-Origin
header, so a browser cannot read its responses cross-origin. Fetching the
figures here instead of in the visitor's browser fixes that, and has three
side benefits: the page makes one same-origin request instead of two remote
ones, the visitor's browser never contacts cranlogs at all (so the site owes
no third-party disclosure for it), and the site no longer depends on a
service with no uptime guarantee at page-load time.

Two things about the cranlogs daily endpoint are easy to get wrong, and both
are handled below:

  * It omits days with zero downloads. Slicing "the last 30 entries" therefore
    spans more than 30 calendar days for a quiet package and overstates the
    figure. Windows here are computed from real dates instead.

  * A 365-day span touches 13 calendar months, so naive month bucketing yields
    13 buckets whose first and last are partial. The sparkline then dips at
    both ends for no real reason. Only the 12 complete months before the
    current one are kept.

Usage:
    python3 tools/update-cran-stats.py
"""

import datetime
import json
import os
import sys
import urllib.request

PACKAGES = ["MKinfer", "MKdescr", "MKomics", "MKpower", "LFApp"]

BASE = "https://cranlogs.r-pkg.org/downloads"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "assets", "data", "cran-stats.json")

# CRAN's logs begin in 2012; comfortably before any of these packages.
FIRST_DAY = "2013-01-01"
# Long enough to always contain 12 complete months plus the current partial one.
DAILY_WINDOW_DAYS = 430


def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": "liora-web-stats/1.0"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode("utf-8"))


def month_key(d):
    return "%04d-%02d" % (d.year, d.month)


def previous_months(today, count):
    """The `count` complete calendar months ending just before today's month."""
    keys, y, m = [], today.year, today.month
    for _ in range(count):
        m -= 1
        if m == 0:
            y, m = y - 1, 12
        keys.append("%04d-%02d" % (y, m))
    return list(reversed(keys))


def collect(pkg, today):
    start = today - datetime.timedelta(days=DAILY_WINDOW_DAYS)

    total = get("%s/total/%s:%s/%s" % (BASE, FIRST_DAY, today.isoformat(), pkg))
    daily = get("%s/daily/%s:%s/%s" % (BASE, start.isoformat(), today.isoformat(), pkg))

    rows = (daily[0].get("downloads") or []) if daily else []

    # Keep only rows we can date, since zero-download days are simply absent.
    by_day = {}
    for row in rows:
        day = row.get("day")
        if not day:
            continue
        try:
            by_day[datetime.date.fromisoformat(day)] = row.get("downloads") or 0
        except ValueError:
            continue

    def window(days):
        first = today - datetime.timedelta(days=days - 1)
        return sum(n for d, n in by_day.items() if first <= d <= today)

    buckets = {}
    for d, n in by_day.items():
        buckets[month_key(d)] = buckets.get(month_key(d), 0) + n
    months = [buckets.get(k, 0) for k in previous_months(today, 12)]

    return {
        "total": (total[0].get("downloads") or 0) if total else 0,
        "last30": window(30),
        "last7": window(7),
        "months": months,
        "days_reported": len(by_day),
    }


def main():
    today = datetime.date.today()

    data = {
        "generated": today.isoformat(),
        "source": "cranlogs.r-pkg.org (RStudio/Posit CRAN mirror)",
        "packages": {},
    }

    failed = []
    for pkg in PACKAGES:
        try:
            s = collect(pkg, today)
            if s["total"] == 0:
                # cranlogs answers 0 for names it does not know, so this is
                # almost always a typo or a renamed/archived package.
                print("  %-10s WARNING: zero all-time downloads — check the name"
                      % pkg, file=sys.stderr)
            data["packages"][pkg] = s
            print("  %-10s total=%-8d 30d=%-6d 7d=%-5d months=%d"
                  % (pkg, s["total"], s["last30"], s["last7"], len(s["months"])))
        except Exception as exc:
            failed.append(pkg)
            print("  %-10s FAILED: %s" % (pkg, exc), file=sys.stderr)

    if failed:
        # Never publish a half-empty file over a good one.
        print("\naborting: %s failed" % ", ".join(failed), file=sys.stderr)
        return 1

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, sort_keys=True)
        f.write("\n")
    print("\nwrote %s" % os.path.relpath(OUT, ROOT))
    return 0


if __name__ == "__main__":
    sys.exit(main())
