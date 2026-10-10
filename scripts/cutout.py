"""Hero art direction for NA—01 Marram House.

1. Extends the sky upward (the source frames the roof too high for the NORD row).
2. Cuts the house out of the foreground with rembg (isnet-general-use) on the same canvas.
3. Measures roofLine (0..1 of image height) and the mean relative luminance of the
   letter band (sky above the roof), so the white letters can be validated (≤ 0.30).

Writes assets-src/hero/{photo.jpg, fg.png, hero.json}. Usage: python scripts/cutout.py
"""
from __future__ import annotations
import json, os
from PIL import Image, ImageFilter
from rembg import remove, new_session

SRC = r"C:/Dev/webdesign/referencias/Projetos de arquitetura"
FILE = "KLG Architects, Paris Brummer · DUNE HOUSE · Divisare/imgi_36_klg-architects-paris-brummer-dune-house.jpg"
OUT = os.path.join(os.path.dirname(__file__), "..", "assets-src", "hero")
EXTEND = 0.44  # extra sky, as a fraction of the source height
BAND = 250     # source rows sampled to build the extended sky


def srgb_to_lin(c: float) -> float:
    c /= 255
    return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4


def main() -> None:
    os.makedirs(OUT, exist_ok=True)
    src = Image.open(os.path.join(SRC, FILE)).convert("RGB")
    W, H = src.size
    ext = int(H * EXTEND)

    # sky extension: stretch the top band, blur, then feather the seam into the original
    band = src.crop((0, 0, W, BAND)).resize((W, ext + BAND), Image.BICUBIC).filter(ImageFilter.GaussianBlur(8))
    photo = Image.new("RGB", (W, H + ext))
    photo.paste(band, (0, 0))
    photo.paste(src, (0, ext))
    seam = Image.linear_gradient("L").resize((W, BAND))
    photo.paste(Image.composite(src.crop((0, 0, W, BAND)), band.crop((0, ext, W, ext + BAND)), seam), (0, ext))

    # cutout on the original, placed on the extended canvas
    cut = remove(src, session=new_session("isnet-general-use"))
    fg = Image.new("RGBA", photo.size, (0, 0, 0, 0))
    fg.paste(cut, (0, ext))

    # roof line: first row (right half, where the tall volume is) with a solid run of alpha
    a = fg.getchannel("A")
    roof_y = next(y for y in range(fg.height) if sum(1 for x in range(W // 2, W, 8) if a.getpixel((x, y)) > 200) > 20)
    roof_line = roof_y / fg.height

    # luminance of the sky band where the letters sit (from 4% of the image to the roof)
    zone = photo.crop((0, int(fg.height * 0.04), W, roof_y)).resize((120, 60))
    lum = [0.2126 * srgb_to_lin(r) + 0.7152 * srgb_to_lin(g) + 0.0722 * srgb_to_lin(b) for r, g, b in zone.getdata()]
    luma = sum(lum) / len(lum)

    photo.save(os.path.join(OUT, "photo.jpg"), quality=92)
    fg.save(os.path.join(OUT, "fg.png"))
    meta = {"w": photo.width, "h": photo.height, "roofLine": round(roof_line, 4), "luma": round(luma, 4)}
    json.dump(meta, open(os.path.join(OUT, "hero.json"), "w"), indent=2)
    print(meta, "letters OK" if luma <= 0.30 else "LUMA TOO HIGH for white letters")


if __name__ == "__main__":
    main()
