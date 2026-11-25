import os
import textwrap
from PIL import Image, ImageDraw, ImageFont

WIDTH = 1024
HEIGHT = 1024

img = Image.new("RGB", (WIDTH, HEIGHT), "#faf7f2")
draw = ImageDraw.Draw(img)

FONT_DIR = "/usr/share/fonts/truetype"
def gf(path, size):
    try:
        return ImageFont.truetype(path, size)
    except Exception:
        return ImageFont.load_default()

# Fonts - larger for readability at 300px
f_masthead = gf(f"{FONT_DIR}/liberation/LiberationSerif-Bold.ttf", 42)
f_date = gf(f"{FONT_DIR}/liberation/LiberationSerif-Bold.ttf", 20)
f_sub = gf(f"{FONT_DIR}/liberation/LiberationSerif-Italic.ttf", 13)
f_hero_head = gf(f"{FONT_DIR}/liberation/LiberationSerif-Bold.ttf", 16)
f_hero_body = gf(f"{FONT_DIR}/liberation/LiberationSans-Regular.ttf", 11)
f_card_head = gf(f"{FONT_DIR}/liberation/LiberationSerif-Bold.ttf", 12.5)
f_card_body = gf(f"{FONT_DIR}/liberation/LiberationSans-Regular.ttf", 10)
f_sb = gf(f"{FONT_DIR}/liberation/LiberationSans-Bold.ttf", 11)
f_sb_sm = gf(f"{FONT_DIR}/liberation/LiberationSans-Bold.ttf", 9.5)
f_sr = gf(f"{FONT_DIR}/liberation/LiberationSans-Regular.ttf", 9.5)
f_sr_sm = gf(f"{FONT_DIR}/liberation/LiberationSans-Regular.ttf", 8.5)
f_tag = gf(f"{FONT_DIR}/liberation/LiberationSans-Bold.ttf", 8.5)
f_tiny = gf(f"{FONT_DIR}/liberation/LiberationSans-Regular.ttf", 7.5)
f_num_big = gf(f"{FONT_DIR}/liberation/LiberationSans-Bold.ttf", 26)
f_num_label = gf(f"{FONT_DIR}/liberation/LiberationSans-Bold.ttf", 10)

# ========== TOP BAR ==========
draw.rectangle([(0, 0), (WIDTH, 28)], fill="#0f172a")
draw.text((14, 5), "THE WORLD TODAY", fill="#f8fafc", font=f_sb)
draw.text((WIDTH - 300, 6), "TUESDAY 24 NOVEMBER 2026 · ALL TIMES UTC", fill="#94a3b8", font=f_sr_sm)

# ========== MASTHEAD ==========
title = "Tuesday 24 November 2026"
bb = draw.textbbox((0, 0), title, font=f_masthead)
tw = bb[2] - bb[0]
draw.text(((WIDTH - tw) // 2, 32), title, fill="#0f172a", font=f_masthead)

subtitle = "Jensen Huang Reinstated at Nvidia  ·  Hormuz Tankers Hit Naval Mines  ·  ICJ: Myanmar Guilty of Genocide"
bb2 = draw.textbbox((0, 0), subtitle, font=f_sub)
sw = bb2[2] - bb2[0]
draw.text(((WIDTH - sw) // 2, 78), subtitle, fill="#475569", font=f_sub)

draw.line([(14, 96), (WIDTH - 14, 96)], fill="#0f172a", width=2)

# ========== HERO 1: NVIDIA (left 60%) ==========
hx, hy = 14, 102
hw = 600

# Tag
draw.rectangle([(hx, hy), (hx + 170, hy + 18)], fill="#15803d")
draw.text((hx + 6, hy + 3), "MARKETS & TECHNOLOGY", fill="#fff", font=f_tag)

# Nvidia stock chart illustration
draw.rectangle([(hx, hy + 20), (hx + hw, hy + 110)], fill="#0f172a")
# Bull arrow
pts = [(hx + 30, hy + 95), (hx + 100, hy + 85), (hx + 200, hy + 70), (hx + 300, hy + 60),
       (hx + 400, hy + 45), (hx + 500, hy + 35), (hx + 570, hy + 30)]
for i in range(len(pts) - 1):
    draw.line([pts[i], pts[i + 1]], fill="#22c55e", width=3)
draw.polygon([(hx + 570, hy + 27), (hx + 580, hy + 33), (hx + 572, hy + 37)], fill="#22c55e")
# Key stats
draw.text((hx + 20, hy + 25), "NVDA", fill="#22c55e", font=gf(f"{FONT_DIR}/liberation/LiberationSans-Bold.ttf", 22))
draw.text((hx + 90, hy + 28), "+31.5%", fill="#4ade80", font=gf(f"{FONT_DIR}/liberation/LiberationSans-Bold.ttf", 18))
draw.text((hx + 200, hy + 30), "+$952 BILLION", fill="#facc15", font=f_sb)
draw.text((hx + 350, hy + 30), "RECORD SINGLE-DAY GAIN", fill="#94a3b8", font=f_sr_sm)
draw.text((hx + 20, hy + 55), "Board unanimously reinstates CEO after 11-day absence", fill="#e2e8f0", font=f_sr)
draw.text((hx + 20, hy + 70), "Trump claims credit for reversing resignation on Truth Social", fill="#94a3b8", font=f_sr_sm)
draw.text((hx + 20, hy + 85), "S&P 500, Nasdaq lifted by Nvidia surge; global chip rally", fill="#94a3b8", font=f_sr_sm)

draw.text((hx, hy + 115), "Jensen Huang Reinstated as Nvidia CEO", fill="#0f172a", font=f_hero_head)
hero1_body = "Nvidia's board unanimously voted to reinstate Jensen Huang as President and CEO just 11 days after his shock resignation. Shares surged 31.5%, adding a record $952 billion to market capitalisation. President Trump publicly took credit, saying he personally persuaded the board that Huang's return posed no national security risk."
lines = textwrap.wrap(hero1_body, width=75)
for i, l in enumerate(lines[:4]):
    draw.text((hx, hy + 136 + i * 15), l, fill="#334155", font=f_hero_body)

# ========== HERO SIDEBAR: DAY IN NUMBERS ==========
sx = 626
draw.rectangle([(sx, 102), (WIDTH - 14, 198)], fill="#0f172a")
draw.text((sx + 10, 106), "THE DAY IN NUMBERS", fill="#f8fafc", font=f_sb_sm)

nums = [
    ("+31.5%", "Nvidia share price surge"),
    ("$952B", "Record market cap gain"),
    ("3", "Tankers mined in Hormuz"),
    ("5.3", "Nepal earthquake magnitude"),
]
for i, (val, desc) in enumerate(nums):
    ny = 124 + i * 18
    draw.text((sx + 10, ny), val, fill="#facc15", font=f_sb_sm)
    draw.text((sx + 80, ny + 1), desc, fill="#cbd5e1", font=f_sr_sm)

# ========== KEY STAT BOX ==========
draw.rectangle([(sx, 204), (WIDTH - 14, 262)], fill="#7f1d1d")
draw.text((sx + 10, 208), "STRAIT OF HORMUZ", fill="#fecaca", font=f_tag)
draw.text((sx + 10, 222), "3 Tankers", fill="#ffffff", font=f_num_big)
draw.text((sx + 150, 230), "struck by", fill="#fca5a5", font=f_sr)
draw.text((sx + 150, 243), "naval mines", fill="#fca5a5", font=f_sr)

draw.line([(14, 202 + 66), (WIDTH - 14, 202 + 66)], fill="#cbd5e1", width=1)

# ========== ROW 2: THREE MAJOR STORIES ==========
row2_y = 275
cw = (WIDTH - 28 - 20) // 3  # 3 cards with gaps

stories = [
    {
        "tag": "MIDDLE EAST · MARITIME",
        "tag_col": "#991b1b",
        "head": "Iran Mines Close Strait of Hormuz",
        "body": "Three oil tankers caught fire after striking naval mines in the Strait of Hormuz. IRGC Navy warns vessels against unauthorized routes amid US naval blockade tensions. Oil prices spike as the world's most critical shipping lane is threatened.",
        "source": "Maritime agencies, AA"
    },
    {
        "tag": "INTERNATIONAL LAW",
        "tag_col": "#1e3a8a",
        "head": "ICJ: Myanmar Guilty of Rohingya Genocide",
        "body": "The International Court of Justice rules Myanmar responsible for acts of genocide against the Rohingya in a landmark Gambia v. Myanmar judgment. UK announces targeted sanctions against Myanmar generals. First ICJ genocide finding against a state.",
        "source": "ICJ, Reuters, UK Gov"
    },
    {
        "tag": "MIDDLE EAST · CONFLICT",
        "tag_col": "#831843",
        "head": "Gaza Airstrikes Kill Hamas Security Chief",
        "body": "Israeli airstrikes across Gaza kill Hamas internal security director Naeem Abu Nahel in Khan Yunis. VP Vance and Secretary Rubio hold separate talks with Qatar PM on regional conflict at the White House.",
        "source": "Just Security, AA"
    }
]

for i, s in enumerate(stories):
    cx = 14 + i * (cw + 10)
    # Tag bar
    tl = int(len(s["tag"]) * 5.6 + 12)
    draw.rectangle([(cx, row2_y), (cx + cw, row2_y + 17)], fill=s["tag_col"])
    draw.text((cx + 6, row2_y + 3), s["tag"], fill="#fff", font=f_tag)
    # Card body
    draw.rectangle([(cx, row2_y + 17), (cx + cw, row2_y + 145)], fill="#ffffff", outline="#e2e8f0", width=1)
    draw.text((cx + 6, row2_y + 22), s["head"], fill="#0f172a", font=f_card_head)
    blines = textwrap.wrap(s["body"], width=42)
    for j, l in enumerate(blines[:5]):
        draw.text((cx + 6, row2_y + 40 + j * 13), l, fill="#334155", font=f_card_body)
    draw.text((cx + 6, row2_y + 112), s["source"], fill="#64748b", font=f_tiny)

draw.line([(14, row2_y + 152), (WIDTH - 14, row2_y + 152)], fill="#0f172a", width=2)

# ========== ROW 3: FIVE SMALLER STORIES ==========
row3_y = row2_y + 158
scw = (WIDTH - 28 - 32) // 5

small_stories = [
    ("ASIA-PACIFIC", "#065f46", "Solomon Islands Ends China Security Pact",
     "Pacific nation realigns security ties toward Australia, ending controversial agreement.", "Asia Media"),
    ("U.S. HOLIDAY", "#92400e", "White House Pardons Turkeys for Thanksgiving",
     "President Trump pardons 'Freedom' and 'Feathers' in traditional ceremony.", "PBS, Wires"),
    ("ASIA · DISASTER", "#0f766e", "Nepal Hit by 5.3 Earthquake",
     "Magnitude 5.3 earthquake caught live on camera near Ama Dablam. No major casualties.", "Seismological agencies"),
    ("EUROPE · SECURITY", "#1e3a8a", "Russia Warns Estonia, Raises Space Nuke Threat",
     "Moscow warns Estonia actions risk open war. Allies raise alarm over Russian space weapon.", "Intel sources"),
    ("ASIA · DIPLOMACY", "#334155", "Singapore-Australia Leaders Meet",
     "PM Wong and PM Albanese hold 11th annual leaders' summit, deepen defence ties.", "PMO Singapore"),
]

for i, (tag, tcol, head, body, src) in enumerate(small_stories):
    cx = 14 + i * (scw + 8)
    draw.rectangle([(cx, row3_y), (cx + scw, row3_y + 16)], fill=tcol)
    draw.text((cx + 4, row3_y + 2), tag, fill="#fff", font=gf(f"{FONT_DIR}/liberation/LiberationSans-Bold.ttf", 7.5))
    draw.rectangle([(cx, row3_y + 16), (cx + scw, row3_y + 115)], fill="#ffffff", outline="#e2e8f0", width=1)
    draw.text((cx + 4, row3_y + 20), head, fill="#0f172a", font=gf(f"{FONT_DIR}/liberation/LiberationSans-Bold.ttf", 9))
    blines = textwrap.wrap(body, width=26)
    for j, l in enumerate(blines[:4]):
        draw.text((cx + 4, row3_y + 42 + j * 12), l, fill="#334155", font=f_sr_sm)
    draw.text((cx + 4, row3_y + 100), src, fill="#94a3b8", font=f_tiny)

draw.line([(14, row3_y + 122), (WIDTH - 14, row3_y + 122)], fill="#cbd5e1", width=1)

# ========== ROW 4: WORLD BRIEFINGS ==========
row4_y = row3_y + 128
draw.rectangle([(14, row4_y), (WIDTH - 14, row4_y + 20)], fill="#1e293b")
draw.text((20, row4_y + 4), "MORE FROM TUESDAY 24 NOVEMBER 2026", fill="#f8fafc", font=f_sb_sm)

briefs_left = [
    ("UKRAINE WAR", "Ukrainian military reports Russian 2026 casualties surpassing 432,000 for the year; cumulative losses estimated at 1.64 million since 2022."),
    ("MARKETS", "Global chip stocks rally on Nvidia surge. S&P 500 and Nasdaq post strong gains. Oil spikes on Hormuz fears."),
    ("AFRICA", "DR Congo cobalt export freeze takes effect. East African pipeline governance hearing in Kenya."),
    ("UEFA", "Champions League Matchday 5 fixtures across Europe. Clubs display Nepal tribute banners."),
    ("HUMANITARIAN", "UN agencies warn 19.5 million face critical food shortages in East and Central Africa."),
]

briefs_right = [
    ("LATIN AMERICA", "Colombian courts uphold domestic trial jurisdiction for cartel suspects before extradition."),
    ("ASIA TRADE", "Chinese financial regulators request governance frameworks for foreign infrastructure investments."),
    ("CLIMATE", "Winter storm systems disrupt northern US transit networks; Pacific coastal surge warnings."),
    ("TECH", "OpenAI announces 2027 roadmap; Google Deepmind publishes new reasoning benchmarks."),
    ("SPORTS", "NBA regular season action continues. Early Thanksgiving fixtures in US sports leagues."),
]

for idx, (btag, btext) in enumerate(briefs_left):
    by = row4_y + 24 + idx * 24
    draw.text((20, by), btag, fill="#dc2626", font=gf(f"{FONT_DIR}/liberation/LiberationSans-Bold.ttf", 8))
    draw.text((20 + len(btag) * 6 + 8, by), btext[:80], fill="#1e293b", font=f_sr_sm)
    if len(btext) > 80:
        draw.text((20, by + 11), btext[80:160], fill="#475569", font=f_sr_sm)

bx_right = WIDTH // 2 + 10
for idx, (btag, btext) in enumerate(briefs_right):
    by = row4_y + 24 + idx * 24
    draw.text((bx_right, by), btag, fill="#1e40af", font=gf(f"{FONT_DIR}/liberation/LiberationSans-Bold.ttf", 8))
    draw.text((bx_right + len(btag) * 6 + 8, by), btext[:75], fill="#1e293b", font=f_sr_sm)
    if len(btext) > 75:
        draw.text((bx_right, by + 11), btext[75:150], fill="#475569", font=f_sr_sm)

# ========== WORLD MAP REGION INDICATORS ==========
map_y = row4_y + 148
draw.line([(14, map_y), (WIDTH - 14, map_y)], fill="#0f172a", width=2)

draw.rectangle([(14, map_y + 2), (WIDTH - 14, map_y + 60)], fill="#f1f5f9")
draw.text((20, map_y + 6), "GLOBAL COVERAGE", fill="#0f172a", font=f_sb_sm)

regions = [
    ("AMERICAS", 3, "#15803d"), ("EUROPE", 3, "#1e3a8a"),
    ("MIDDLE EAST", 3, "#991b1b"), ("AFRICA", 3, "#7c2d12"),
    ("ASIA-PACIFIC", 5, "#065f46"), ("GLOBAL", 2, "#334155")
]
rx = 150
for rname, rcount, rcol in regions:
    rw = int(len(rname) * 7 + 30)
    draw.rounded_rectangle([(rx, map_y + 8), (rx + rw, map_y + 26)], radius=3, fill=rcol)
    draw.text((rx + 6, map_y + 10), f"{rname} ({rcount})", fill="#fff", font=f_tag)
    rx += rw + 8

draw.text((20, map_y + 34), "19 stories across 6 regions. All events verified as occurring or first reported on Tuesday 24 November 2026 UTC.", fill="#475569", font=f_sr_sm)
draw.text((20, map_y + 46), "Sources: Reuters, AP, AFP, AA, PBS, ICJ, Maritime agencies, PMO Singapore, UK Government, UN OCHA, Nvidia Corp.", fill="#64748b", font=f_tiny)

# ========== FOOTER ==========
draw.line([(14, HEIGHT - 28), (WIDTH - 14, HEIGHT - 28)], fill="#cbd5e1", width=1)
draw.text((14, HEIGHT - 22), "THE WORLD TODAY · TUESDAY 24 NOVEMBER 2026 · 19 SOURCED STORIES · 6 GLOBAL REGIONS · make.fun contest edition", fill="#94a3b8", font=f_tiny)

out_path = "/root/my-agent-workspace/news-image-20261124-bot/entry.png"
img.save(out_path, format="PNG", optimize=True)
sz = os.path.getsize(out_path)
print(f"Generated {out_path}")
print(f"Size: {sz} bytes ({sz/1024:.1f} KB)")
from PIL import Image as I2
chk = I2.open(out_path)
print(f"Dimensions: {chk.size}")
