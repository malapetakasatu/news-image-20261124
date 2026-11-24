import os
import shutil

# Make.fun daily news-image bot delivery entrypoint
# Outputs entry.png to /output/entry.png per contest specification
out_dir = os.environ.get("MAKEFUN_OUTPUT_DIR", "/output")
os.makedirs(out_dir, exist_ok=True)
dest_path = os.path.join(out_dir, "entry.png")
src_path = os.path.join(os.path.dirname(__file__), "entry.png")

shutil.copyfile(src_path, dest_path)
size = os.path.getsize(dest_path)
print(f"Successfully copied broadsheet image to {dest_path} ({size} bytes)")

