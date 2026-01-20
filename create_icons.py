from PIL import Image, ImageDraw, ImageFont
import os

def create_icon(size, color, text):
    img = Image.new('RGB', (size, size), color=color)
    d = ImageDraw.Draw(img)
    
    # Simple 'D' for Dongnae
    try:
        # Try to use a default font
        font = ImageFont.load_default()
        # Scale isn't easy with default font, so we'll just draw a circle
        margin = size // 4
        d.ellipse([margin, margin, size-margin, size-margin], fill=(255, 255, 255))
    except:
        pass
        
    directory = 'static/images'
    if not os.path.exists(directory):
        os.makedirs(directory)
        
    img.save(f'{directory}/icon-{size}x{size}.png')
    print(f"Created icon-{size}x{size}.png")

if __name__ == '__main__':
    # Green background, similar to theme
    create_icon(192, '#2e8b57', 'D')
    create_icon(512, '#2e8b57', 'D')
