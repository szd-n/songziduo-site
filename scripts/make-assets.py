"""生成站点静态资源：头像 avatar.jpg 与社交分享图 og.png。"""
import os
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance, ImageChops, ImageFont

SRC = r"C:\Users\songq\.dsh\attachments\v1\objects\da\da8a84fb007b81ca43c9c01f1ea5ffc8f009ac232fb5cd7ea002f2c95a27ec4b"
OUT = r"C:\Users\songq\Documents\deepseek-harness\default-workspace\songziduo-site\public"
os.makedirs(OUT, exist_ok=True)

# ---------- 头像 ----------
im = Image.open(SRC).convert("RGB")
w, h = im.size
side = min(w, h)
box_side = min(side, int(w * 0.96))
left = (w - box_side) // 2
top = max(0, int(h * 0.055))
if top + box_side > h:
    top = h - box_side
im = im.crop((left, top, left + box_side, top + box_side))
im = im.resize((720, 720), Image.LANCZOS)
im = ImageEnhance.Color(im).enhance(0.86)
im = ImageEnhance.Contrast(im).enhance(1.03)
# 轻微的冷调：向青色方向做 5% 混合
tint = Image.new("RGB", im.size, (10, 26, 40))
im = Image.blend(im, tint, 0.06)
# 边缘压暗，做轻微暗角
vig = Image.new("L", im.size, 0)
d = ImageDraw.Draw(vig)
d.ellipse((-im.size[0] * 0.15, -im.size[1] * 0.15, im.size[0] * 1.15, im.size[1] * 1.15), fill=255)
vig = vig.filter(ImageFilter.GaussianBlur(120))
black = Image.new("RGB", im.size, (7, 10, 18))
im = Image.composite(im, black, vig)
im.save(os.path.join(OUT, "avatar.jpg"), quality=90, optimize=True, progressive=True)

# ---------- OG ----------
W, H = 1200, 630
og = Image.new("RGB", (W, H), (7, 10, 18))

glow = Image.new("RGB", (W, H), (0, 0, 0))
gd = ImageDraw.Draw(glow)
gd.ellipse((-260, -320, 620, 420), fill=(20, 120, 140))
gd.ellipse((620, -180, 1400, 420), fill=(70, 45, 160))
gd.ellipse((300, 300, 1100, 900), fill=(14, 80, 70))
glow = glow.filter(ImageFilter.GaussianBlur(150))
og = Image.blend(og, ImageChops.screen(og, glow), 0.62)


def font(path_candidates, size):
    for p in path_candidates:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                continue
    return ImageFont.load_default()


f_name = font([r"C:\Windows\Fonts\msyhbd.ttc", r"C:\Windows\Fonts\msyh.ttc", r"C:\Windows\Fonts\simhei.ttf"], 96)
f_sub = font([r"C:\Windows\Fonts\msyh.ttc", r"C:\Windows\Fonts\simhei.ttf"], 30)
f_kick = font([r"C:\Windows\Fonts\msyh.ttc", r"C:\Windows\Fonts\simhei.ttf"], 22)
f_mono = font([r"C:\Windows\Fonts\consola.ttf", r"C:\Windows\Fonts\cour.ttf"], 22)

d = ImageDraw.Draw(og)
d.text((72, 96), "SOFTWARE TECHNOLOGY  ·  在读", font=f_kick, fill=(34, 211, 238))
d.text((72, 170), "临渊", font=f_name, fill=(233, 238, 249))
d.text((72, 300), "Linyuan", font=f_mono, fill=(141, 154, 180))
d.text((72, 372), "在文津馆学软件技术，写代码，也顺手记录。", font=f_sub, fill=(200, 210, 230))
d.line((72, 470, 1128, 470), fill=(30, 42, 60), width=1)
d.text((72, 505), "AdSkip · 时间折叠 · 记录", font=f_sub, fill=(141, 154, 180))
d.text((72, 556), "songziduo-site.pages.dev", font=f_mono, fill=(34, 211, 238))

og.save(os.path.join(OUT, "og.png"), optimize=True)
print("avatar:", Image.open(os.path.join(OUT, "avatar.jpg")).size)
print("og:", og.size)
