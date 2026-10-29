# AI Work Compass — 90-Day Roadmap

A responsive, static website for planning a niche site about AI data annotation and remote data work. Built with plain HTML, CSS, and JavaScript so it is easy to customize and deploy to GitHub Pages.

## Features

- Responsive layout for phones, tablets, and desktops
- 90-day milestone roadmap with interactive checkboxes
- 20-article content planner with priority filters and search
- Mark articles as published
- Weekly metrics tracker: articles, search impressions, email signups, affiliate clicks
- Progress automatically saved in the browser with `localStorage`
- Export progress as JSON and metrics as CSV
- Setup checklist and ethical publishing reminders
- Accessible labels, keyboard-friendly controls, and reduced-motion support
- No build step, package manager, or API keys required

## Deploy on GitHub Pages

1. Create a new repository on GitHub, for example `ai-work-compass`.
2. Upload the contents of this folder to the **root** of that repository. Make sure `index.html`, `styles.css`, and `script.js` are at the root, not nested inside another folder.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then click **Save**.
6. Wait for GitHub Pages to finish publishing. The URL will appear in the Pages settings, usually in the form `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`.

Every future push to the selected branch updates the site.

## Customize before launch

- Change `AI Work Compass` in `index.html` if you choose a different brand name.
- Update the page description and favicon.
- Add your real About, Contact, Privacy Policy, and Affiliate Disclosure pages before monetization.
- Replace example content with first-hand experience and verify current platform terms and payout details before publishing claims.
- Connect Google Search Console and your chosen analytics provider after deployment.
- If you use affiliate links, disclose them clearly and follow each program's requirements.
- Consider adding a custom domain from GitHub Pages settings once you own it.

## Important notes

- Progress is stored only in the visitor's current browser/device. It is not a shared account or cloud database.
- This project does not include a CMS, mailing-list backend, analytics integration, affiliate tracking, or a working contact form. Add those separately if needed.
- The content plan is adapted from the provided `90-Day Plan: AI Data Work Niche Site` document. It does not guarantee traffic, ad approval, or earnings.
- External Google Fonts are optional; the page falls back to local sans-serif fonts if they cannot load.

## Local preview

Open `index.html` in a browser. For a more realistic local server preview, run:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.
