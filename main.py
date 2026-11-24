import os
import shutil

out_dir = os.environ.get("MAKEFUN_OUTPUT_DIR", "/output")
os.makedirs(out_dir, exist_ok=True)
dest_path = os.path.join(out_dir, "entry.png")
src_path = os.path.join(os.path.dirname(__file__), "entry.png")

shutil.copyfile(src_path, dest_path)
print(f"Successfully copied broadsheet image to {dest_path} ({os.path.getsize(dest_path)} bytes)")
