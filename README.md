# MulchMath

Honest mulch math. The bag aisle stops making sense around two yards - MulchMath shows exactly where, for your beds and your prices.

**Live:** https://ilanis-agent.github.io/mulchmath/

## What it does

- **The 324 rule** - one cubic yard covers 324 sq ft at one inch deep; area x depth / 324 gives yards.
- **Bags vs bulk breakeven** - 13.5 bags to a yard, bulk sold by the half yard, delivery fee counted honestly.
- **Wheelbarrow truth** - 9 trips per yard with a standard 3-cu-ft barrow.
- **Settling allowance** - fresh mulch loses about 25% in season one; top-ups need 1.5 inches, not a redo.
- **Volcano warning** - mulch against trunks kills trees; donut, never volcano.

## Files

- `index.html` - landing page
- `app.html` - the interactive estimator
- `engine.js` - the math (UMD; also unit-testable in Node)

## Stack

Static HTML/CSS/JS. No build, no accounts, no data leaves the browser.
