# Josua's Portfolio Version 2

Willkommen auf meinem Portfolio! Hier zeige ich einige meiner Projekte, die ich während meiner Ausbildung als Student und Developer erstellt habe.

## Projekte

- **Guess the Number** – Ein kleines Webspiel, um Python und Flask zu lernen.
- **Portfolio Website** – Diese Seite, die minimalistisch und Apple-inspiriert gestaltet ist.

## Online ansehen

Du kannst die Portfolio-Website hier besuchen:  
[Live-Website](https://Josua-08.github.io/josuasportfolio/)

---

## Changelog

- 2025-10-22 — v0.1.1 — Fixes and improvements (commit 3c02a6abe9718d73b0f776ea81f0c6818573676d)
  - Fixed malformed HTML in index.html (removed stray placeholders and incorrect tags).
  - Added a meta description and improved accessibility attributes (rel="noopener noreferrer" on external links).
  - Switched Font Awesome to a CDN stylesheet to avoid kit misconfiguration issues.
  - Consolidated and cleaned style.css: removed duplicated rules, added CSS variables and a safe top offset so the fixed navigation doesn't overlap content.
  - Improved script.js: throttled the parallax effect using requestAnimationFrame and translate3d for smoother performance.
  - Note: verify that referenced images exist in the images/ folder; update image paths or add missing images if necessary.

- Initial README content and project list (prior to 2025-10-22).

---

Danke fürs Reinschauen! 🚀

*Wie man Änderungen rückgängig macht*: Falls du die obigen Änderungen zurücknehmen möchtest, kannst du lokal den Commit revertieren:

```
# Erstelle einen neuen Branch von main
git checkout -b revert-fixes origin/main
# Revertiere den Commit
git revert 3c02a6abe9718d73b0f776ea81f0c6818573676d
# Push und öffne einen PR, wenn gewünscht
git push origin revert-fixes
```

Wenn du möchtest, kann ich auch einen PR mit alternativen Vorschlägen anlegen oder das Changelog anders strukturieren.
