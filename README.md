# Sukriti Digital

A responsive five-page portfolio website for Sukriti Bhattarai.

## Preview locally

From the aurasukriti-site folder, serve the dist directory with any static server.

PowerShell example: python -m http.server 4173 --directory dist

Then open http://localhost:4173.

## Publish updates

Vercel deploys the `dist` folder automatically whenever a commit is pushed to
`main`. For future updates, run these commands from the `aurasukriti-site`
folder:

```powershell
git add .
git commit -m "Update website"
git push origin main
```

Do not run Git commands from the parent `digital sukriti website` folder.

## Vercel configuration

Import this GitHub repository into Vercel with these settings:

- Project name: `sukriti-digital-portfolio`
- Framework preset: `Other`
- Root directory: `./`

The committed `vercel.json` permanently configures `dist` as the output
directory, so no build command or environment variables are required.

## Connect the booking flow

The website works immediately without private credentials:

- Every primary CTA opens the consultation form on the Contact page.
- The form validates the fields and submits the request through FormSubmit.

To connect a scheduling service, edit `dist/assets/site.js`:

1. To send every CTA directly to Calendly, Cal.com, or another scheduling service, paste the full booking URL into `bookingUrl`.
2. Keep private API keys out of this repository.

No API key is required for a booking-link integration. If you later connect a hosted form service, follow that provider's setup instructions and never commit private keys into this folder.

## Customize

- Text content: edit the five HTML files in dist.
- Colors and layout: edit dist/assets/styles.css.
- Hero visual: replace dist/assets/ai-growth-hero.png with a new image using the same filename.

## Pages

- index.html — Homepage
- about.html — About Me
- services.html — Services
- blog.html — Blog
- contact.html — Contact and consultation request
