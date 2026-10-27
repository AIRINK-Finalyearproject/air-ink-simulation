# AIR-INK LAB — Interactive Simulation

A static, browser-based educational simulator for a final-year engineering project exploring a simplified pathway from exhaust particulate carbon to carbon-based ink.

## Run locally
Open `index.html` in a browser.

## Deploy to GitHub Pages
1. Create a **public** GitHub repository, e.g. `air-ink-simulation`.
2. Upload `index.html`, `style.css`, `script.js`, and `.github/workflows/deploy.yml`.
3. In **Settings → Pages**, choose **GitHub Actions** as the source.
4. Push/commit to `main`.
5. After the Actions workflow completes, open the Pages URL.

## Model
Q = exhaust flow in m³/min  
C_PM = particulate concentration in g/m³  
t = duration in min  
η_capture = capture efficiency  
η_purify = purification recovery  
f_solids = ink solids fraction

PM_in = Q × C_PM × t  
Captured = PM_in × η_capture  
Usable carbon = Captured × η_purify  
Estimated ink = Usable carbon / f_solids

## Important
This is an illustrative mass-balance simulation. It does not claim that all exhaust particulate matter is pure carbon, nor does it validate a real capture/purification/ink-formulation process. Replace illustrative inputs with measured experimental data before making quantitative research claims.
