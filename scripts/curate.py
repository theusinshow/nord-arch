"""Pre-select images per project from the Divisare reference folders.

Writes scripts/images.config.json with opening / card / gallery / drift picks.
Heuristics only — the result is reviewed by eye (contact sheets) and edited by hand.
Usage: python scripts/curate.py
"""
from __future__ import annotations
import glob, json, os
from PIL import Image, ImageStat, ImageFilter

SRC = r"C:/Dev/webdesign/referencias/Projetos de arquitetura"
OUT = os.path.join(os.path.dirname(__file__), "images.config.json")

ROSTER = [
    ("marram-house", "DUNE HOUSE"),
    ("casa-pedra-furada", "Ledge House"),
    ("pleat-house", "Roxbury House"),
    ("casa-campo-dos-padres", "STANFORDVILLE HOUSE"),
    ("five-gables", "Octothorpe House"),
    ("firn-house", "HOF THANN"),
    ("casa-treze-tilias", "EFH Keiler"),
    ("casas-ferrugem", "Little House on the Ferry"),
    ("steppe-house", "House on the Edge of the Plain"),
    ("celeiro-testo-alto", "BARNARD BARN"),
    ("mound-pavilion", "Flower House"),
    ("atelie-saco-dos-limoes", "Casa Jardim Paulista"),
]
RESERVE = ["Frame House", "House of Horns", "OSPREY HOUSE", "Pine Lane House", "Poplar Grove",
           "Steeplechase", "Dirnbergergut", "Dorf Rieden", "Forest Retreat CT", "Descanso Drive", "CASA BÜRGEL"]


def folder(key: str) -> str:
    hits = [d for d in os.listdir(SRC) if key.lower() in d.lower()]
    assert hits, key
    return hits[0]


def stats(path: str):
    im = Image.open(path)
    w, h = im.size
    im.draft("L", (256, 256))
    g = im.convert("L").resize((96, 64))
    white = sum(1 for p in g.getdata() if p > 225) / (96 * 64)
    edges = ImageStat.Stat(g.filter(ImageFilter.FIND_EDGES)).mean[0]
    top = ImageStat.Stat(g.crop((0, 0, 96, 22))).stddev[0]  # low = clean sky band
    thumb = g.resize((16, 12))
    return dict(w=w, h=h, white=white, edges=edges, top=top, thumb=list(thumb.getdata()))


def dup(a, b) -> bool:
    return sum(abs(x - y) for x, y in zip(a, b)) / len(a) < 6


def pick(dirname: str, owner_hint: str | None = None):
    files = sorted(glob.glob(os.path.join(SRC, dirname, "*.jpg")))
    if owner_hint:  # OPAL folder contains ~9 CoPa files
        files = [f for f in files if owner_hint in os.path.basename(f).lower()]
    cands = []
    for f in files:
        try:
            s = stats(f)
        except Exception:
            continue
        if s["white"] > 0.5 or max(s["w"], s["h"]) < 700:
            continue  # drawings / tiny
        if any(dup(s["thumb"], c[1]["thumb"]) for c in cands):
            continue
        cands.append((f, s))
    land = [c for c in cands if c[1]["w"] >= 1.25 * c[1]["h"]]
    port = [c for c in cands if c[1]["h"] > c[1]["w"]]
    # opening: large landscape with a calm top band (sky) and structure below
    opening = max(land, key=lambda c: (c[1]["w"] >= 1400, -c[1]["top"] + c[1]["edges"] * 0.3, c[1]["w"]))
    rest = [c for c in cands if c[0] != opening[0]]
    card = max([c for c in rest if c in land] or rest, key=lambda c: (c[1]["w"], c[1]["edges"]))
    gallery = [c for c in rest if c[0] != card[0]]
    # keep order of the original publication, cap at 10, ensure >= 1 portrait if any
    gallery = gallery[:10]
    if port and not any(c in port for c in gallery):
        gallery[-1:] = [port[0]]
    rel = lambda c: os.path.relpath(c[0], SRC).replace("\\", "/")
    return dict(folder=dirname, opening=rel(opening), card=rel(card), gallery=[rel(c) for c in gallery])


def main():
    cfg = {"source": SRC, "projects": {}, "drift": []}
    for slug, key in ROSTER:
        hint = "opal" if key.startswith("Little House") else None
        cfg["projects"][slug] = pick(folder(key), hint)
    for key in RESERVE:
        try:
            p = pick(folder(key))
            cfg["drift"].append(p["opening"])
        except Exception as e:  # noqa
            print("skip reserve", key, e)
    # Drift Wall also borrows one gallery frame from each roster project
    for slug in cfg["projects"]:
        g = cfg["projects"][slug]["gallery"]
        if g:
            cfg["drift"].append(g[len(g) // 2])
    cfg["drift"] = cfg["drift"][:18]
    json.dump(cfg, open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    print("wrote", OUT, len(cfg["drift"]), "drift tiles")


if __name__ == "__main__":
    main()
