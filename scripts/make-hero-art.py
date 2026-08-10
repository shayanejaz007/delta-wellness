"""
Generates the hero artwork for Delta Awareness.

Deliberately abstract: a light field with signal traces and an amber regulation
band. No anatomy, no equipment, no depiction of any device or procedure.
Palette is taken straight from the site's CSS variables so the image and the
DOM background blend seamlessly.

Outputs:
  public/hero-poster.jpg   1920x1080  desktop
  public/hero-mobile.jpg    900x1400  portrait crop
"""

from PIL import Image, ImageDraw, ImageFilter
import math

# Dark plate: the hero is a cinematic band that resolves into the light page,
# so the poster must match the video's tonality, not the page background.
PAPER = (9, 16, 28)
TEAL = (79, 209, 232)
BAND = (232, 199, 102)
INK = (150, 180, 210)


def lerp(a, b, t):
    return tuple(round(x + (y - x) * t) for x, y in zip(a, b))


def base_field(w, h):
    """Vertical wash plus two soft radial blooms."""
    img = Image.new("RGB", (w, h), PAPER)
    px = img.load()

    top = (12, 22, 38)
    bottom = (6, 11, 20)
    for y in range(h):
        row = lerp(top, bottom, y / max(h - 1, 1))
        for x in range(w):
            px[x, y] = row

    bloom = Image.new("RGB", (w, h), (0, 0, 0))
    bd = ImageDraw.Draw(bloom)
    # Teal bloom, upper left
    bd.ellipse(
        [-w * 0.28, -h * 0.55, w * 0.66, h * 0.72],
        fill=(int(TEAL[0] * 0.55), int(TEAL[1] * 0.55), int(TEAL[2] * 0.55)),
    )
    # Amber bloom, upper right
    bd.ellipse(
        [w * 0.58, -h * 0.42, w * 1.24, h * 0.55],
        fill=(int(BAND[0] * 0.42), int(BAND[1] * 0.42), int(BAND[2] * 0.42)),
    )
    bloom = bloom.filter(ImageFilter.GaussianBlur(radius=max(w, h) // 9))
    return Image.blend(img, Image.blend(img, bloom, 0.85), 0.42)


def draw_grid(img, spacing, alpha):
    """Faint perspective-free grid, fading toward the lower half."""
    w, h = img.size
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    col = (*INK, alpha)
    for x in range(0, w, spacing):
        d.line([(x, 0), (x, h)], fill=col, width=1)
    for y in range(0, h, spacing):
        d.line([(0, y), (w, y)], fill=col, width=1)

    # Fade the grid out toward the bottom so text stays legible.
    mask = Image.new("L", (w, h))
    m = mask.load()
    for y in range(h):
        v = max(0, 1 - (y / h) * 1.5)
        val = int(255 * v)
        for x in range(w):
            m[x, y] = val
    layer.putalpha(
        Image.composite(layer.getchannel("A"), Image.new("L", (w, h), 0), mask)
    )
    return Image.alpha_composite(img.convert("RGBA"), layer).convert("RGB")


def draw_traces(img, count, amp_scale, y_centre):
    """Layered sine traces — the 'signal' motif."""
    w, h = img.size
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)

    for i in range(count):
        phase = i * 0.7
        amp = (h * amp_scale) * (1 - i / (count * 1.6))
        freq = 1.4 + i * 0.22
        base_y = y_centre + (i - count / 2) * (h * 0.012)
        alpha = int(90 - i * (60 / count))
        pts = []
        for x in range(0, w + 6, 6):
            t = x / w
            y = (
                base_y
                + math.sin(t * math.pi * freq + phase) * amp
                + math.sin(t * math.pi * freq * 2.3 + phase * 1.7) * amp * 0.28
            )
            pts.append((x, y))
        d.line(pts, fill=(*TEAL, max(alpha, 26)), width=2, joint="curve")

    layer = layer.filter(ImageFilter.GaussianBlur(radius=0.6))
    return Image.alpha_composite(img.convert("RGBA"), layer).convert("RGB")


def draw_band(img, y_frac, height_frac):
    """The signature amber regulation band."""
    w, h = img.size
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    y0 = h * y_frac
    y1 = y0 + h * height_frac
    d.rectangle([0, y0, w, y1], fill=(*BAND, 20))
    d.line([(0, y0), (w, y0)], fill=(*BAND, 110), width=2)
    d.line([(0, y1), (w, y1)], fill=(*BAND, 110), width=2)
    return Image.alpha_composite(img.convert("RGBA"), layer).convert("RGB")


def particles(img, n, seed=7):
    """Sparse suspended motes for depth."""
    w, h = img.size
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    state = seed
    for _ in range(n):
        state = (state * 1103515245 + 12345) % (2**31)
        x = (state / (2**31)) * w
        state = (state * 1103515245 + 12345) % (2**31)
        y = (state / (2**31)) * h
        state = (state * 1103515245 + 12345) % (2**31)
        r = 1 + (state / (2**31)) * 2.4
        col = BAND if (state % 3 == 0) else TEAL
        d.ellipse([x - r, y - r, x + r, y + r], fill=(*col, 95))
    layer = layer.filter(ImageFilter.GaussianBlur(radius=0.8))
    return Image.alpha_composite(img.convert("RGBA"), layer).convert("RGB")


def build(w, h, trace_count, band_y, path, quality=86):
    img = base_field(w, h)
    img = draw_grid(img, spacing=max(w, h) // 26, alpha=16)
    img = draw_band(img, band_y, 0.075)
    img = draw_traces(img, trace_count, 0.055, h * (band_y + 0.038))
    img = particles(img, n=int((w * h) / 26000))
    img = img.filter(ImageFilter.SMOOTH)
    img.save(path, "JPEG", quality=quality, optimize=True, progressive=True)
    print(f"{path}  {w}x{h}")


if __name__ == "__main__":
    build(1920, 1080, 7, 0.44, "public/hero-poster.jpg")
    build(900, 1400, 5, 0.40, "public/hero-mobile.jpg", quality=84)
