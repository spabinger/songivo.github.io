# SongivoWeb

Static marketing and documentation website for Songivo.

The canonical source is this `SongivoWeb` folder. Keep the site static unless a
future requirement clearly needs a build system.

Songivo entered production and launched on the App Store on August 26, 2026.
Use the canonical [Songivo App Store listing](https://apps.apple.com/app/songivo/id6766636418)
(App Store ID `6766636418`) for every website download link.

## Local preview

From this folder:

```bash
python3 -m http.server 4173
```

Then open `http://127.0.0.1:4173/`.

## Maintenance workflow

1. Inspect the current site before editing:

   ```bash
   find SongivoWeb -maxdepth 3 -type f -print
   ```

2. Change only the files required for the update:

   - shared styling: `assets/css/styles.css`
   - shared behavior: `assets/js/site.js`
   - homepage marketing copy: `index.html`
   - documentation hub: `help.html`
   - individual docs: `docs/*.html`

3. Keep screenshot filenames stable. Replace image files in place when better
   screenshots are captured, so article HTML does not need unrelated edits.

4. Run validation from the repository root or this folder:

   ```bash
   SongivoWeb/scripts/validate-site.sh
   git diff --check -- SongivoWeb tasks/todo.md
   ```

5. For layout changes, preview locally and inspect desktop and mobile widths.
   Verify the mobile menu opens and the page has no horizontal overflow.

## Validation

`scripts/validate-site.sh` is dependency-free and checks:

- internal links and fragments
- image, stylesheet, and script paths
- missing or duplicate page metadata
- remaining launch placeholders, including unresolved App Store links

Normal validation fails on unresolved support, legal, pricing, or App Store
placeholders.

## Publishing model

The canonical website source lives in this private app repository under
`SongivoWeb`. For GitHub Pages, copy this folder into a separate public
repository configured for Pages.

GitHub Pages branch publishing supports the repository root or `/docs` as a
source. Because this site intentionally lives in `SongivoWeb`, use a separate
public Pages repo or a Pages workflow in that public repo.

## Copy to public Pages repository

The production checkout is:

```text
/Users/stephan/development/apps/Songivo/SongivoWeb
```

Run the publishing script from the app repository:

```bash
SongivoWeb/scripts/copy-to-pages-repo.sh
```

The script validates the static site, copies static files into the production
checkout, commits the production checkout, and pushes the production branch.
It does not stage, commit, or push this source repository.

To use another local checkout, set `SONGIVO_PRODUCTION_REPO`. The legacy
`SONGIVO_PAGES_REPO` variable is still accepted as a fallback.

Recommended publishing sequence:

```bash
SongivoWeb/scripts/validate-site.sh
SongivoWeb/scripts/copy-to-pages-repo.sh
```

## App Store maintenance

- Keep all download links pointed at the canonical App Store listing above.
- Confirm the App Store product page is Free and App Store Connect prices match
  the website: 3.99€ yearly, 14.99€ lifetime, and €0.99 per extra active band
  slot.
- Run normal static-site validation after changing download links or pricing.
