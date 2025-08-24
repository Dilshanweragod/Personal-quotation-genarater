# Quotation App

A modern, desktop-ready quotation generator for Dilshan Weragoda Graphics, built with HTML, CSS, JavaScript, and Electron.

## Features
- Add, edit, and remove quotation items
- Automatic calculation of subtotal, discount, final amount, advance, and balance
- Real-time date and time display
- Print-ready layout
- Desktop EXE app (Windows)

## How to Use

### As a Website
1. Open `index.html` in your browser.
2. Use the interface to create and print quotations.

### As a Desktop App (Windows)
1. Download or clone this repository.
2. Install dependencies:
   ```
   npm install
   ```
3. Run as a desktop app:
   ```
   npm start
   ```
4. To build a standalone EXE:
   ```
   npm run build-win
   ```
   The EXE will be in the `dist/quotation-win32-x64` folder.

## Requirements
- Node.js (for running/building the EXE)
- Windows (for EXE app)

## Project Structure
```
index.html
css/
  style.css
js/
  main.js
```

## License
ISC

---
For support, contact: dpasindu487@gmail.com
