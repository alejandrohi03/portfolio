#!/usr/bin/env python3
"""Download latin + latin-ext woff2 subsets from Google Fonts and build assets/fonts.css.

Run from assets/fonts/:  python fetch_fonts.py
Keeps the portfolio free of external runtime dependencies (fonts served locally).
"""
import re
import urllib.request
from pathlib import Path

UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120.0 Safari/537.36")

FAMILIES = [
    ("Space Grotesk", "Space+Grotesk:wght@400..700", "spacegrotesk"),
    ("IBM Plex Sans", "IBM+Plex+Sans:wght@400..700", "ibmplexsans"),
    ("IBM Plex Mono", "IBM+Plex+Mono:wght@400;500", "ibmplexmono"),
]
KEEP = ("latin", "latin-ext")
HERE = Path(__file__).parent


def fetch(url: str, binary: bool = False):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=60) as r:
        data = r.read()
    return data if binary else data.decode("utf-8")


def main() -> None:
    out_css = []
    for name, query, slug in FAMILIES:
        css = fetch(f"https://fonts.googleapis.com/css2?family={query}&display=swap")
        blocks = re.findall(r"/\*\s*([\w-]+)\s*\*/\s*(@font-face\s*\{.*?\})", css, re.S)
        for subset, block in blocks:
            if subset not in KEEP:
                continue
            weight = re.search(r"font-weight:\s*([\d ]+);", block).group(1).strip()
            url = re.search(r"url\((https://[^)]+\.woff2)\)", block).group(1)
            fname = f"{slug}-{weight.replace(' ', '_')}-{subset}.woff2"
            (HERE / fname).write_bytes(fetch(url, binary=True))
            block = block.replace(url, f"fonts/{fname}").rstrip()
            out_css.append(f"/* {name} - {weight} - {subset} */\n{block}\n")
            print(fname)

    (HERE.parent / "fonts.css").write_text("".join(out_css), encoding="utf-8")
    print("wrote assets/fonts.css")


if __name__ == "__main__":
    main()
