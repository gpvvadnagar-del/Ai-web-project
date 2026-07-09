# SPI/CGPA to Percentage Converter

A clean, accessible, open-source web application to convert Semester Performance Index (SPI) or Cumulative Grade Point Average (CGPA) into percentage.

## Features

- Real-time conversion on input
- Multiple grading scales: 10-point and 4-point
- Mobile-responsive design
- No authentication required
- Accessible markup and keyboard-friendly controls

## Conversion formula

The calculator uses a scale-based percentage formula:

```
Percentage = (score / scale) × 100
```

For a 10-point grading scale, this becomes:

```
Percentage = score × 10
```

For a 4-point grading scale, this becomes:

```
Percentage = score × 25
```

## Local deployment

1. Open a terminal in the `agent` folder.

2. Create and activate a virtual environment:

   Windows PowerShell:
   ```powershell
   python -m venv .venv
   .\.venv\Scripts\Activate.ps1
   ```

3. Install dependencies:

   ```powershell
   pip install -r requirements.txt
   ```

4. Run the app:

   ```powershell
   python app.py
   ```

5. Open the browser at:

   ```text
   http://127.0.0.1:5000
   ```
### Quick start script

You can also run the app with the helper script:

```powershell
.\run.ps1
```
### Agent folder context

This folder contains a complete, standalone Flask web application for SPI/CGPA percentage conversion. It is ready to deploy locally or package as a small open-source utility.

## Added features

- Copy percentage to clipboard via the `Copy` button next to the result.
- Light/dark theme toggle (uses localStorage) accessible via header control.
- Unit tests for the conversion logic using `pytest` in `agent/tests`.

## Run tests

From the `agent` folder, after activating the virtual environment:

```powershell
pip install -r requirements.txt
pytest -q
```

## Docker

Build the Docker image and run locally:

```bash
docker build -t grade-converter:latest .
docker run -p 5000:5000 grade-converter:latest
```

Or use docker-compose:

```bash
docker compose up --build
```

## Project structure

- `app.py` — Flask server entry point
- `templates/index.html` — UI template
- `static/style.css` — responsive styling
- `static/app.js` — client-side conversion logic
- `requirements.txt` — Python dependencies

## Notes

This app is designed for students and educators who need quick SPI/CGPA percentage conversions without signing in.
