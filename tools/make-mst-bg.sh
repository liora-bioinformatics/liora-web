#!/usr/bin/env bash
# Build the section-background trees used by the .mst-* theme (assets/css/styles.css)
# from real PhyloTrace minimum-spanning-tree exports (tools/mst-src/*.png, 6000 px wide).
# Nothing is drawn here: the shape is the app's own output, only trimmed, resized and
# (for the navy theme) given light edges.
#
#   assets/img/mst-dark.webp        sharp tree for navy sections  (pastel nodes, light-blue edges)
#   assets/img/mst-dark-blur.webp   same tree, small and pre-blurred, faded in behind text
#   assets/img/mst-light.webp       sharp tree for pale sections  (viridis nodes, dark edges)
#   assets/img/mst-light-blur.webp  small pre-blurred copy
#
# The blurred copies are tiny on purpose: the browser enlarges them smoothly, which is
# exactly what a blur looks like, so they cost a few KB. They replace CSS backdrop-filter,
# which cannot be feathered consistently across browsers.
#
# Needs ImageMagick 7 (`magick`). Run from anywhere:  bash tools/make-mst-bg.sh
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/tools/mst-src"
OUT="$ROOT/assets/img"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

SHARP_W=2400     # px; covers a 1920 px screen at about 1.25x
BLUR_W=640       # px; blurred copy, enlarged by the browser
BLUR_SIGMA=3.2   # at BLUR_W, roughly a 12 px blur on a 2400 px image

# ---- navy theme: pastel nodes; edges and node outlines recoloured from black to light blue
magick "$SRC/mst-pastel.png" -trim +repage -resize ${SHARP_W}x "$TMP/dark.png"
W=$(magick identify -format %w "$TMP/dark.png"); H=$(magick identify -format %h "$TMP/dark.png")
magick "$TMP/dark.png" -alpha extract "$TMP/alpha.png"
magick "$TMP/dark.png" -background black -alpha remove -alpha off -colorspace Gray -threshold 45% "$TMP/keep.png"
magick -size ${W}x${H} xc:'#8cb9eb' "$TMP/dark.png" -alpha off "$TMP/keep.png" -composite "$TMP/rgb.png"
magick "$TMP/rgb.png" "$TMP/alpha.png" -compose CopyOpacity -composite \
  -define webp:alpha-quality=100 -quality 86 "$OUT/mst-dark.webp"

# ---- pale theme: the export as it comes
magick "$SRC/mst-viridis.png" -trim +repage -resize ${SHARP_W}x \
  -define webp:alpha-quality=100 -quality 86 "$OUT/mst-light.webp"

# ---- blurred copies: opaque (tree dimmed and flattened onto the section colour, so the
# layer fully replaces the sharp tree where it is shown), small, then blurred.
blur() {  # name, background colour, tree strength
  magick "$OUT/mst-$1.webp" -resize ${BLUR_W}x -alpha set -channel A -evaluate multiply "$3" +channel \
    -background "$2" -flatten -blur 0x${BLUR_SIGMA} "$TMP/$1-blur.png"
  # Fade the haze into the plain colour near the image borders, so the copy never ends in a
  # visible edge, and keep it lossless so the flat colour matches the section exactly.
  local bw bh m
  bw=$(magick identify -format %w "$TMP/$1-blur.png"); bh=$(magick identify -format %h "$TMP/$1-blur.png")
  m=$((bw / 14))
  magick -size ${bw}x${bh} xc:black -fill white -draw "rectangle $m,$m $((bw - m)),$((bh - m))" \
    -blur 0x$((m / 2)) "$TMP/$1-mask.png"
  magick -size ${bw}x${bh} xc:"$2" "$TMP/$1-blur.png" "$TMP/$1-mask.png" -composite \
    -define webp:lossless=true "$OUT/mst-$1-blur.webp"
}
blur dark  '#0b2545' 0.75
blur light '#f7f9fc' 0.75
