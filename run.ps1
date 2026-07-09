# Run this script from the agent folder to launch the app quickly.
Write-Host "Creating virtual environment and installing dependencies..."
if (-Not (Test-Path -Path .venv)) {
    python -m venv .venv
}

Write-Host "Activating virtual environment..."
. .\.venv\Scripts\Activate.ps1

Write-Host "Installing required packages..."
pip install -r requirements.txt

Write-Host "Starting the Flask app..."
python app.py
