# Aurasukriti.digital

A responsive five-page portfolio website for Sukriti Bhattarai.

## Preview locally

From the aurasukriti-site folder, serve the dist directory with any static server.

PowerShell example: python -m http.server 4173 --directory dist

Then open http://localhost:4173.

## Connect the booking flow

The website works immediately without third-party credentials:

- Every primary CTA opens the consultation form on the Contact page.
- The form validates the fields and opens the visitor's email app with the details pre-filled.

Before public launch, edit dist/assets/site.js:

1. Replace hello@aurasukriti.digital with Sukriti's confirmed email address.
2. To send every CTA directly to Calendly, Cal.com, or another scheduling service, paste the full booking URL into bookingUrl.

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
