#!/usr/bin/env bash
# Derive the section-background trees used by the .mst-* theme (assets/css/styles.css)
# from a real PhyloTrace minimum-spanning-tree export, assets/img/mst_transparent.png.
# Nothing is drawn here: the shape is the app's own output, only trimmed and recoloured.
#
#   assets/img/mst-dark.webp   one-colour silhouette (#8cb9eb), for navy sections
#   assets/img/mst-light.webp  the export in its original colours, for pale sections
#
# Needs ImageMagick 7 (`magick`). Run from anywhere:  bash tools/make-mst-bg.sh
set -euo pipefail
cd "$(dirname "$0")/../assets/img"

SRC=mst_transparent.png
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

magick "$SRC" -trim +repage "$TMP/trim.png"
W=$(magick identify -format %w "$TMP/trim.png")
H=$(magick identify -format %h "$TMP/trim.png")

# Silhouette: keep only the alpha channel, grown by 1 px so thin edges survive downscaling.
magick "$TMP/trim.png" -alpha extract -morphology Dilate Disk:1 "$TMP/alpha.png"
magick -size "${W}x${H}" xc:'#8cb9eb' "$TMP/alpha.png" -compose CopyOpacity -composite \
  -define webp:alpha-quality=100 -quality 88 mst-dark.webp

magick "$TMP/trim.png" -define webp:alpha-quality=100 -quality 88 mst-light.webp
