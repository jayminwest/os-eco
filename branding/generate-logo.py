#!/usr/bin/env python3
"""Generate the os-eco stacked-bars logo as PNG."""

from PIL import Image, ImageDraw, ImageFont

# --- Config ---
SCALE = 3  # render at 3x then downsample for crisp edges
BG = (22, 27, 34)  # dark background (GitHub dark theme)

LAYERS = [
    # bottom to top (rendered top-to-bottom: overstory on top)
    {"name": "overstory", "color": (27, 94, 32)},
    {"name": "canopy",    "color": (56, 142, 60)},
    {"name": "seeds",     "color": (124, 179, 66)},
    {"name": "mulch",     "color": (139, 90, 43)},
]

# Dimensions (at 1x, will be scaled up then down)
BAR_W = 220
BAR_H = 28
BAR_GAP = 14
BAR_RADIUS = 4
MARGIN_LEFT = 40
MARGIN_TOP = 36
MARGIN_RIGHT = 40
MARGIN_BOTTOM = 36
TEXT_GAP = 24  # gap between bar right edge and text
FONT_SIZE = 22

# --- Derived ---
content_h = len(LAYERS) * BAR_H + (len(LAYERS) - 1) * BAR_GAP
IMG_W = MARGIN_LEFT + BAR_W + TEXT_GAP + 120 + MARGIN_RIGHT  # 120 for text
IMG_H = MARGIN_TOP + content_h + MARGIN_BOTTOM

# Scale up
sw, sh = IMG_W * SCALE, IMG_H * SCALE
sml, smt = MARGIN_LEFT * SCALE, MARGIN_TOP * SCALE
sbw, sbh = BAR_W * SCALE, BAR_H * SCALE
sbg = BAR_GAP * SCALE
stg = TEXT_GAP * SCALE
sr = BAR_RADIUS * SCALE
sfs = FONT_SIZE * SCALE

img = Image.new("RGB", (sw, sh), BG)
draw = ImageDraw.Draw(img)

# Load font
try:
    font = ImageFont.truetype("/System/Library/Fonts/SFNSMono.ttf", sfs)
except Exception:
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Menlo.ttc", sfs)
    except Exception:
        font = ImageFont.load_default()

for i, layer in enumerate(LAYERS):
    y = smt + i * (sbh + sbg)
    x0 = sml
    x1 = sml + sbw
    y0 = y
    y1 = y + sbh

    # Draw rounded rectangle bar
    draw.rounded_rectangle([x0, y0, x1, y1], radius=sr, fill=layer["color"])

    # Draw label to the right, vertically centered with bar
    text_x = x1 + stg
    bbox = draw.textbbox((0, 0), layer["name"], font=font)
    text_h = bbox[3] - bbox[1]
    text_y = y0 + (sbh - text_h) // 2 - bbox[1]
    draw.text((text_x, text_y), layer["name"], fill=(200, 210, 220), font=font)

# Downsample with LANCZOS for crisp result
img = img.resize((IMG_W, IMG_H), Image.LANCZOS)

# Save multiple sizes
img.save("/Users/jayminwest/Projects/os-eco/branding/logo.png")
print(f"Saved logo.png ({IMG_W}x{IMG_H})")

# Also save a 2x version for retina / larger displays
img_2x = Image.new("RGB", (sw, sh), BG)
draw_2x = ImageDraw.Draw(img_2x)
for i, layer in enumerate(LAYERS):
    y = smt + i * (sbh + sbg)
    draw_2x.rounded_rectangle([sml, y, sml + sbw, y + sbh], radius=sr, fill=layer["color"])
    bbox = draw_2x.textbbox((0, 0), layer["name"], font=font)
    text_h = bbox[3] - bbox[1]
    text_y = y + (sbh - text_h) // 2 - bbox[1]
    draw_2x.text((sml + sbw + stg, text_y), layer["name"], fill=(200, 210, 220), font=font)

img_2x.save("/Users/jayminwest/Projects/os-eco/branding/logo@2x.png")
print(f"Saved logo@2x.png ({sw}x{sh})")
