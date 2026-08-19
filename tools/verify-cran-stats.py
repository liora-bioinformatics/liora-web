#!/usr/bin/env python3
"""
Check assets/data/cran-stats.json against the cranlogs API.

Deliberately independent of tools/update-cran-stats.py: that script builds the
figures by summing the /daily/ endpoint, this one asks the /total/ endpoint for
the same date ranges. Different endpoint, different code path, no shared
helpers — so a bug in the aggregation cannot hide itself here.

It checks the snapshot against the date it was taken (the "generated" field),
NOT against today. Downloads keep accruing, so comparing a two-week-old
snapshot to today's numbers would always look wrong when nothing is.

Usage:
    python3 tools/verify-cran-stats.py

Exit code 0 = everything matches, 1 = at least one mismatch.
"""

import datetime
import json
import os
import sys
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "assets", "data", "cran-stats.json")
BASE = "https://cranlogs.r-pkg.org/downloads/total"


def total(pkg, start, end):
    url = "%s/%s:%s/%s" % (BASE, start, end, pkg)
    req = urllib.request.Request(url, headers={"User-Agent": "liora-web-verify/1.0"})
    with urllib.request.urlopen(req, timeout=30) as r:
        rows = json.loads(r.read().decode("utf-8"))
    return rows[0]["downloads"] if rows else 0


def main():
    with open(DATA, encoding="utf-8") as f:
        data = json.load(f)

    snap = datetime.date.fromisoformat(data["generated"])
    age = (datetime.date.today() - snap).days

    d30 = (snap - datetime.timedelta(days=29)).isoformat()
    d7 = (snap - datetime.timedelta(days=6)).isoformat()

    # First day of the month 12 months before the snapshot month.
    y, m = snap.year, snap.month - 12
    while m <= 0:
        y, m = y - 1, m + 12
    m_start = "%04d-%02d-01" % (y, m)
    m_end = (snap.replace(day=1) - datetime.timedelta(days=1)).isoformat()

    print("\n  snapshot taken : %s  (%d day%s ago)" % (snap, age, "" if age == 1 else "s"))
    print("  all-time       : 2013-01-01 .. %s" % snap)
    print("  last 30 days   : %s .. %s" % (d30, snap))
    print("  last 7 days    : %s .. %s" % (d7, snap))
    print("  12 months      : %s .. %s\n" % (m_start, m_end))

    print("  %-9s %-22s %-20s %-18s %s" % ("package", "all-time", "last 30d", "last 7d", "12m sum"))
    print("  " + "-" * 88)

    bad = 0
    for pkg in sorted(data["packages"]):
        s = data["packages"][pkg]
        checks = [
            ("total", s["total"], total(pkg, "2013-01-01", snap.isoformat())),
            ("last30", s["last30"], total(pkg, d30, snap.isoformat())),
            ("last7", s["last7"], total(pkg, d7, snap.isoformat())),
            ("months", sum(s["months"]), total(pkg, m_start, m_end)),
        ]
        cells = []
        for _, ours, api in checks:
            ok = ours == api
            if not ok:
                bad += 1
            cells.append("%d/%d %s" % (ours, api, "ok" if ok else "MISMATCH"))
        print("  %-9s %-22s %-20s %-18s %s" % (pkg, cells[0], cells[1], cells[2], cells[3]))

    print()
    if bad:
        print("  %d mismatch(es). Re-run tools/update-cran-stats.py.\n" % bad)
        return 1
    print("  All figures match the API. (shown = ours/API)\n")
    if age > 30:
        print("  Note: this snapshot is %d days old. It is accurate for the date it\n"
              "  was taken, but you may want fresher numbers.\n" % age)
    return 0


if __name__ == "__main__":
    sys.exit(main())
