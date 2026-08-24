# Your portfolio site

A fast, static portfolio site you can update yourself from a private
`/admin` dashboard — no code required for day-to-day use.

- **Framework:** Eleventy (turns simple content files into plain, fast HTML — no JavaScript framework shipped to visitors)
- **CMS:** Decap CMS (the `/admin` dashboard)
- **Hosting:** Netlify, connected to a GitHub repo
- **Cost:** $0/year except your domain

---

## 1. Put this code on GitHub

1. Go to github.com → click **New repository**. Name it something like `portfolio-site`. Keep it **Private** if you like (doesn't matter either way). Don't add a README/gitignore — leave it empty.
2. On the empty repo's page, click **uploading an existing file**.
3. Drag in *every file and folder* from this project (everything except the `node_modules` folder if present — it isn't included here).
4. Commit directly to the `main` branch.

## 2. Connect it to Netlify

1. Go to app.netlify.com → **Add new site → Import an existing project → Deploy with GitHub**.
2. Pick the repo you just created. Netlify will auto-detect the build settings from `netlify.toml` (build command `npm run build`, publish folder `_site`) — you shouldn't need to change anything.
3. Click **Deploy**. In under a minute you'll get a live link like `random-name-123.netlify.app`. You can rename this in **Site settings → Change site name**.

## 3. Turn on the admin dashboard (one-time setup)

The `/admin` page needs a way to know it's really you logging in. This uses Netlify's free built-in Identity service:

1. In your Netlify site dashboard: **Site configuration → Identity → Enable Identity**.
2. Under **Identity → Registration**, set it to **Invite only** (so strangers can't sign up).
3. Under **Identity → Services**, enable **Git Gateway**. This lets the CMS save your changes back to GitHub for you, invisibly.
4. Still in Identity, click **Invite users** and invite your own email address. You'll get an email — click it, set a password.
5. Now visit `your-site-name.netlify.app/admin` and log in with that email/password.

You're set. From now on, updating art is just: open `/admin` → click **Artwork** → **New Artwork** → drag in an image, fill the title, pick the category, hit **Publish**. Netlify rebuilds the live site automatically in under a minute.

## 4. Point your Porkbun domain at it

1. In Netlify: **Site configuration → Domain management → Add a domain** → enter your domain → follow the prompts.
2. Netlify will show you either an **A record** + **CNAME**, or nameservers to use.
3. In Porkbun: **Domain Management → DNS** for your domain, add the records Netlify gave you (or switch nameservers if Netlify suggests that route — it's the more "set and forget" option).
4. DNS changes can take a few minutes to a few hours to go live. Netlify auto-issues a free HTTPS certificate once it detects the domain is pointed correctly.

---

## Editing content

Everything editable lives in two places:

- **`/admin` (recommended, no code):** Site Settings (your name, tagline, hero image, about text, résumé link, socials), Gallery Categories (add/rename/reorder whole sections), Artwork (add/edit individual pieces).
- **Code, if you ever want to dig in:**
  - `css/style.css` — every color, font, and spacing value is a variable at the very top of the file. Change a hex code there and it updates the whole site.
  - `content/` — the raw files the CMS edits, if you ever prefer editing text directly.

## Running it on your own computer (optional)

Only needed if you want to preview changes before pushing, or want my help iterating on the CSS locally:

```
npm install
npm start
```

Then open `http://localhost:8080`.

## Notes

- The hero image and 6 sample artwork pieces are placeholders (plain colored boxes) so the site works out of the box. Replace them from `/admin` any time — nothing else needs to change.
- Images are lazy-loaded and served at whatever size you upload, so keep uploads reasonably sized (under ~2–3MB, and resized to roughly the size they'll display at) for the fastest load times.
