import sys
import importlib.util

def install_and_import(package):
    if importlib.util.find_spec(package) is None:
        import subprocess
        subprocess.check_call([sys.executable, "-m", "pip", "install", package])
    return importlib.import_module(package)

try:
    pypdf = install_and_import('pypdf')
except Exception as e:
    print(f"Failed to install/import pypdf: {e}")
    sys.exit(1)

from pypdf import PdfReader

def extract_text_from_pdf(pdf_path):
    try:
        reader = PdfReader(pdf_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        return text
    except Exception as e:
        return f"Error reading PDF: {e}"

if __name__ == "__main__":
    pdf_path = r"c:\Users\User\Desktop\Earth-Scape-Climate-Prediction\docs\EarthScape_Climate_Analytics_System.pdf"
    print(extract_text_from_pdf(pdf_path))
