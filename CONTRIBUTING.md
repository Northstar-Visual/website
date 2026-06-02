# Content Curator Guide — Northstar Visual Website

This guide is written for **non-technical editors** who maintain site content using the GitHub web interface. You do **not** need to install anything or understand code.

---

## Table of Contents

1. [How the content system works](#how-the-content-system-works)
2. [How to find and edit a YAML file in GitHub](#how-to-find-and-edit-a-yaml-file-in-github)
3. [Uploading images](#uploading-images)
4. [Replacing the catalogue PDF](#replacing-the-catalogue-pdf)
5. [YAML file reference](#yaml-file-reference)
   - [site.yml — global settings](#siteyml--global-settings)
   - [home.yml — homepage content](#homeyml--homepage-content)
   - [products.yml — product listings](#productsyml--product-listings)
   - [markets.yml — market verticals](#marketsyml--market-verticals)
   - [case_studies.yml — case studies](#case_studiesyml--case-studies)
   - [about.yml — about page](#aboutyml--about-page)
6. [How to add a new product / market / case study](#how-to-add-a-new-product--market--case-study)
7. [How to check the site is live](#how-to-check-the-site-is-live)
8. [What NOT to edit](#what-not-to-edit)
9. [Common YAML mistakes and how to fix them](#common-yaml-mistakes-and-how-to-fix-them)
10. [Setting up the contact form (Formspree)](#setting-up-the-contact-form-formspree)

---

## How the content system works

All editable content lives in the **`_data/`** folder as YAML files. Each file controls a different area of the site:

| File | Controls |
|------|----------|
| `_data/site.yml` | Contact details, phone, email, GTM tracking ID |
| `_data/home.yml` | Homepage hero, stats, promo sections |
| `_data/products.yml` | All products and their specs |
| `_data/markets.yml` | All market vertical pages |
| `_data/case_studies.yml` | All case study entries |
| `_data/about.yml` | About page — company info, jobs, contact form labels |

When you save a change to one of these files on GitHub, the site automatically rebuilds (usually within 2–3 minutes).

---

## How to find and edit a YAML file in GitHub

1. Go to the repository on GitHub.com.
2. Click the **`_data`** folder.
3. Click the file you want to edit (e.g. `products.yml`).
4. Click the **pencil icon** (✏️) in the top-right of the file view — this opens the editor.
5. Make your changes.
6. Scroll to the bottom of the page to the **"Commit changes"** section.
7. Add a short description (e.g. "Add Nova X product").
8. Click **"Commit changes"** (green button).

The site will rebuild automatically. See [How to check the site is live](#how-to-check-the-site-is-live) for how to confirm the change went live.

---

## Uploading images

Images live in the **`assets/images/`** folder:

| Folder | What goes there |
|--------|-----------------|
| `assets/images/` | Hero background (`hero-bg.jpg`), OG image (`og-default.jpg`) |
| `assets/images/products/` | One image per product |
| `assets/images/markets/` | One image per market |
| `assets/images/case-studies/` | One image per case study |
| `assets/images/about/` | Team photo (`team.jpg`) and other about images |

### Steps to upload an image via GitHub:

1. Navigate to the correct folder (e.g. `assets/images/products/`).
2. Click **"Add file"** → **"Upload files"**.
3. Drag or select your image file.
4. Scroll down and click **"Commit changes"**.

### Image naming

Image filenames in YAML files must exactly match the file you uploaded. For example, if the YAML says:

```yaml
image: /assets/images/products/nova-fine-pitch.jpg
```

…then you must upload a file named exactly `nova-fine-pitch.jpg` to `assets/images/products/`.

### Recommended image sizes

| Location | Recommended size |
|----------|-----------------|
| Hero background | 1920 × 1080 px (or 2560 × 1440 px for retina) |
| Product images | 800 × 450 px (16:9 ratio) |
| Market images | 900 × 675 px (4:3 ratio) |
| Case study images | 1200 × 630 px |
| OG image | 1200 × 630 px |

Save as `.jpg` for photos. Keep file sizes under 500 KB where possible.

---

## Replacing the catalogue PDF

The catalogue PDF lives at `assets/pdf/catalogue.pdf`.

### To replace it:

1. Navigate to `assets/pdf/` in the repository.
2. Click **"Add file"** → **"Upload files"**.
3. Upload your new PDF file **named exactly `catalogue.pdf`** — this overwrites the old one.
4. Commit the change.

The download link in the header and footer will automatically point to the new file.

If you want the PDF at a different path, update the `catalogue_pdf` field in `_data/site.yml`.

---

## YAML file reference

### `site.yml` — global settings

```yaml
name: Northstar Visual             # Company name (used in page titles and footer)
tagline: Delivering Brilliant...   # Short strapline used in the footer
email: info@northstarvisual.co.uk  # Main contact email — appears in footer + about page
phone: "+44 (0)1234 567890"        # Main phone number
address_line1: Northstar Visual Ltd
address_line2: Unit 12, Technology Park
address_line3: "London, EC1A 1BB"
address_line4: United Kingdom

catalogue_pdf: /assets/pdf/catalogue.pdf  # Path to catalogue — update if file moves
catalogue_label: Download Catalogue       # Button label

formspree_endpoint: "https://formspree.io/f/YOUR_FORM_ID"  # Contact form endpoint

gtm_id: false        # Set to your GTM container ID (e.g. GTM-XXXXXXX) or leave false
```

---

### `home.yml` — homepage content

```yaml
hero:
  eyebrow: LED Display Solutions    # Small text above the main headline
  title: "Brilliant Visuals."       # Main hero headline (HTML allowed for line breaks)
  subtitle: "Your strapline..."     # Paragraph below the headline
  cta_primary_label: Explore Products   # First button text
  cta_primary_url: /products/           # First button link
  cta_secondary_label: Contact Us       # Second button text
  cta_secondary_url: /about/#support    # Second button link
  bg_image: /assets/images/hero-bg.jpg  # Background image path
```

To edit the three promo sections on the homepage, update the `promo_sections` list. Each item follows this pattern:

```yaml
- eyebrow: Technology              # Small label
  title: Engineered for Excellence # Section heading
  body: >                          # Main paragraph (use > for multi-line)
    Your text here.
  cta_label: View Products         # Button text
  cta_url: /products/              # Button link
  image: /assets/images/promo-tech.jpg  # Section image
  image_alt: Description of image       # Always provide alt text
```

---

### `products.yml` — product listings

Each product follows this structure:

```yaml
- id: my-product-id               # Unique slug — use lowercase-with-hyphens, no spaces
  name: My Product Name           # Product name (shown as heading)
  category: indoor                # One of: indoor | outdoor | rental | creative | control
  tagline: Short product tagline  # One sentence, shown on cards
  description: >                  # Full description paragraph
    Your description here.
  image: /assets/images/products/my-product.jpg  # Image path
  image_alt: Description of image
  featured: true                  # true = appears on homepage; false = products page only
  highlight_spec: "From 0.9 mm pixel pitch"  # Optional — short spec callout on cards
  specs:
    - label: Pixel Pitch          # Spec name
      value: "0.9 mm – 2.5 mm"   # Spec value (use quotes if it contains special chars)
    - label: Brightness
      value: "600 – 1200 nit"
```

**Required fields:** `id`, `name`, `category`, `tagline`, `description`, `image`

**To add a new product:** copy the block above, paste it at the end of the file, and fill in the fields.

---

### `markets.yml` — market verticals

```yaml
- id: broadcast
  name: Broadcast & Studio
  tagline: Studio-grade accuracy for every production
  description: >
    Short description (shown on homepage cards).
  body_extended: >
    Longer description (shown on the Markets page).
  image: /assets/images/markets/broadcast.jpg
  image_alt: Description
  featured: true      # true = shown on homepage
  products:           # List of product IDs to cross-reference
    - nova-fine-pitch
    - nova-control
```

---

### `case_studies.yml` — case studies

```yaml
- id: my-case-study-slug
  title: Project Title
  client: Client Name (or "withheld")
  market: Broadcast           # Market category label
  tagline: Short summary line
  description: >
    One-paragraph overview.
  challenge: >
    What the challenge was.
  solution: >
    What Northstar Visual did.
  results:
    - "Result one"
    - "Result two"
  image: /assets/images/case-studies/my-project.jpg
  image_alt: Description
  featured: true              # true = shown on homepage
  products_used:
    - nova-fine-pitch
    - nova-control
```

---

### `about.yml` — about page

The company bio, values, job listings, and contact form labels all live here. Edit text in:

- `company.body` / `company.body_extended` — the company description paragraphs
- `company.values` — the three value cards
- `support.intro` — the intro text above the contact form
- `join_us.roles` — the job listings

To **add a job role**, append an item to `join_us.roles`:

```yaml
- title: My Job Title
  type: Full-time          # or Contract, Part-time — leave empty to hide
  location: London (hybrid)
  description: >
    Job description here.
```

---

## How to add a new product / market / case study

1. Open the relevant YAML file (e.g. `_data/products.yml`).
2. Scroll to the end of the file.
3. Add a blank line, then paste and fill in the template for that file type (see above).
4. **Make sure the `id` is unique** — use lowercase letters, numbers, and hyphens only (e.g. `nova-x-series`).
5. Upload the corresponding image to the correct `assets/images/` subfolder.
6. Commit your changes.

---

## How to check the site is live

After committing a change:

1. On GitHub, click the **"Actions"** tab (top of the repository page).
2. You should see a build running (yellow dot) or completed (green tick).
3. If it shows a red cross, the build failed — usually a YAML formatting error (see below).
4. Once the green tick appears, visit your site URL. Changes go live within 30 seconds of the build completing.

---

## What NOT to edit

Do not edit these files unless you are a developer:

| File / Folder | Reason |
|---------------|--------|
| `_layouts/` | Page templates — editing breaks all pages |
| `_includes/` | Shared components (header, footer) |
| `assets/css/main.css` | Stylesheet — editing breaks the design |
| `assets/js/main.js` | JavaScript — editing breaks interactions |
| `_config.yml` | Jekyll configuration |
| `Gemfile` | Ruby dependencies |
| `CNAME` | Domain configuration |

If something looks wrong after a change, click **"Actions"** on GitHub — if a build failed, find the red ✗ build and click it to see the error message.

---

## Common YAML mistakes and how to fix them

### 1. Indentation error

YAML uses **spaces** (not tabs) for indentation. All items in a list must be indented the same number of spaces.

**Wrong:**
```yaml
specs:
    - label: Pixel Pitch      # 4 spaces
  value: 0.9mm                # 2 spaces — WRONG
```

**Right:**
```yaml
specs:
  - label: Pixel Pitch        # 2 spaces
    value: "0.9 mm"           # 4 spaces (under the list item)
```

### 2. Unquoted special characters

If a value contains `:`, `#`, `{`, `}`, `[`, `]`, or starts with a number, wrap it in quotes.

**Wrong:**
```yaml
tagline: Pixel pitch: 0.9mm
```

**Right:**
```yaml
tagline: "Pixel pitch: 0.9mm"
```

### 3. Multi-line text

Use `>` after the field name for multi-line text. Indent the text one level in.

```yaml
description: >
  This is line one of my description.
  This continues the same paragraph.
```

### 4. How to revert a bad edit

If you made a mistake and the site broke:

1. Open the file on GitHub.
2. Click the **History** icon (clock icon) to view past versions.
3. Find the last good version and click **"..."** → **"Restore this file"**.
4. Commit to restore.

---

## Setting up the contact form (Formspree)

The contact form on the **About → Support** page sends submissions via Formspree.

### Steps:

1. Go to [formspree.io](https://formspree.io) and create a free account.
2. Click **"New Form"** and give it a name (e.g. "Northstar Visual Contact").
3. Copy the form endpoint URL — it looks like `https://formspree.io/f/abcdefgh`.
4. Open `_data/site.yml` in GitHub.
5. Replace `https://formspree.io/f/YOUR_FORM_ID` with your endpoint URL.
6. Commit the change.

The free Formspree plan allows 50 submissions per month. Upgrade at formspree.io if you need more.

---

*Questions? Contact the site developer or email [info@northstarvisual.co.uk](mailto:info@northstarvisual.co.uk).*
