from PIL import Image
import os

def process_icon(input_path, output_dir):
    try:
        img = Image.open(input_path)
        # Convert to RGB to ensure no issues with alpha channels if not needed, 
        # but since user asked to "remove white background" before, 
        # and this image looks like a filled square, we will just resize it.
        # If the user wants rounded corners transparent, that's different, 
        # but standard PWA icons are usually square and the OS masks them.
        # We will keep RGBA just in case.
        img = img.convert("RGBA")
        
        # Resize and save
        sizes = [192, 512]
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)
            
        for size in sizes:
            # High quality resize
            resized_img = img.resize((size, size), Image.Resampling.LANCZOS)
            output_path = os.path.join(output_dir, f'icon-{size}x{size}.png')
            resized_img.save(output_path, "PNG")
            print(f"Created {output_path}")
            
    except Exception as e:
        print(f"Error processing image: {e}")

if __name__ == "__main__":
    # New image path
    input_image = r"C:/Users/안기정/.gemini/antigravity/brain/370a82c7-4add-47d1-a828-af5a6edea014/uploaded_image_1768914707893.jpg"
    output_directory = "c:/jobproject/dongnaesuper/docs/images"
    process_icon(input_image, output_directory)
