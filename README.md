# Degree Checklist

**Free, private, no ads. No accounts, no tracking. Your progress never leaves your device.**

A phone-friendly checklist for college degree requirements. Check off classes once and see how far along every degree is, which classes count toward more than one degree, what is still needed, your XP level, and your GPA. It comes with three sample degrees and can load any other degree.

Everything you check off is stored **only on your own device**. There is no account, no server and no tracking.

## Put it online (GitHub Pages, no command line)

1. Sign in at github.com and choose **New repository**. Name it something like `degree-checklist`. Public is fine (see Privacy below). Create it.
2. On the new repository page choose **uploading an existing file**. Drag in **everything from this folder**: `index.html`, `sw.js`, `manifest.webmanifest`, and the whole `icons` folder. Commit.
3. Go to **Settings, Pages**. Under "Build and deployment" set the source to **Deploy from a branch**, pick the `main` branch and the `/ (root)` folder, and save.
4. After a minute or two the page shows your address, `https://YOUR-NAME.github.io/degree-checklist/`.

## Put it on a phone

Open the address on the phone, then:

- **iPhone or iPad (Safari):** Share button, then **Add to Home Screen**.
- **Android (Chrome):** the **Install app** button appears at the top of the page, or use the browser menu and **Install app**.

It opens full screen like an app and works offline after the first visit.

## Backups (do this once in a while)

Progress lives in the browser's storage on that device. Clearing website data, deleting the app, or switching phones erases it. Use **Backup** at the top of the page to save a file, and **Restore** to load it on any device. iPhones can also clear storage for sites you have not opened in about a week, which is another reason to add it to the Home Screen and keep a backup.

## Adding another degree

Open **Degrees** at the bottom of the page (or the **Add a degree** tab). Three ways:

1. **PDF:** choose the program page PDF from the college catalog. This works for catalogs laid out like the three samples (a "Program Requirements" section, "Choose one" groups separated by "OR", and a "Total" line).
2. **JSON:** choose a `.json` file in the format below.
3. **Ask an AI to make the JSON:** use **Copy prompt** in the app (or the prompt below), paste it into any AI chat together with your catalog page, then save the reply as a `.json` file or paste it into the box in the app.

Before anything is added you get a preview, and a warning if the classes do not add up to the catalog's unit total. Always skim the list against your catalog. AI can make mistakes.

### Prompt for an AI

```
I use a degree checklist app. Read the degree program page I give you (pasted text or attached PDF) and reply with ONLY one JSON object, no explanation and no markdown fences, in exactly this shape:

{
  "name": "Degree name without the degree type, e.g. Cybersecurity Professional",
  "type": "A.S.",
  "code": "Program code if the page shows one, otherwise an empty string",
  "units": [minimumTotalUnits, maximumTotalUnits],
  "sections": [
    { "name": "Section heading from the page", "units": "22-23 units",
      "items": [ "ITIS 10", "ITIS 14", ["ITIS 50", "ITIS 51"] ] }
  ],
  "courses": [
    { "code": "ITIS 10", "title": "Introduction to Computer Information Systems", "units": 3 }
  ],
  "notes": "Anything unusual you could not represent, otherwise an empty string"
}

Rules:
- Keep the sections in the same order as the page.
- A required course is a plain string with its code, written exactly as printed with one space between department and number.
- A "choose one" or OR group is an array of the codes. Taking any one of them satisfies it.
- Every code used in sections must appear exactly once in courses, with its full title and unit value as a number.
- Copy facts from the page only. Do not invent classes, units or sections. If something is unclear, say so in notes.
- If a rule needs more than one pick from a list (for example "choose two"), do not guess: describe it in notes and leave that list out of sections.
- If I give you several programs, return a JSON array containing one object per program.
```

## Privacy and security

- Your progress, grades, character choice and added degrees are saved in the browser storage on your own device and are never sent anywhere. There is no server and no account. (This storage is separate from browsing history. Clearing website data erases it, which is why Backup exists.)
- Two honest notes: GitHub, as the host, can see ordinary web traffic such as visit counts, and the fonts load from Google Fonts, so Google sees a font request. Neither can see anyone's progress. Catalog files you add are read inside your browser and are not uploaded. The app contains no ads or analytics.
- GitHub Pages serves the site over HTTPS. The page declares a strict Content Security Policy that only allows its own code plus Google Fonts and the PDF reader from cdnjs.
- The repository only holds the app. If you keep it public, anyone can open the app (that is how other students use it), but nobody can see anyone's progress. Free GitHub Pages needs a public repository. A private repository needs a paid plan, or you can host the same files on Cloudflare Pages or Netlify.
- Turn on two-factor sign-in for your GitHub account so nobody else can change the files.
- No site can be guaranteed 100% secure. Do not type anything private into the app. It does not need it.

## Notes

- The first visit needs internet. The fonts (Google Fonts) and the PDF reader (cdnjs) load from the web and are saved for offline use after they have been used once. If they cannot load, the app falls back to system fonts and the JSON and paste options still work.
- **Updating:** replace `index.html` on GitHub, and change the `VERSION` text at the top of `sw.js` (for example `degree-checklist-v2`) so phones pick up the new version.
- Characters are your own art, cut out and recolored to match the interface.

## Tip link (optional)

The app can show a small **Support** button that opens your tip page (Ko-fi, Buy Me a Coffee, GitHub Sponsors) in a new tab. Nothing loads from the tip site until someone taps it, so it adds no tracking. To turn it on:

1. Open `index.html` on GitHub and click the pencil icon.
2. Find the line `var TIP_URL="";` (use the browser's find, Ctrl+F).
3. Put your page address between the quotes, for example `var TIP_URL="https://ko-fi.com/yourname";`. It must start with `https://`.
4. Commit the change, then change the `VERSION` text in `sw.js` (for example to `degree-checklist-v3`) so phones pick up the update.

Until a link is set, the button stays hidden.


## Transfer agreements (ASSIST)

Download an agreement PDF from assist.org yourself, then open **Degrees → Choose PDF or JSON files** and pick it. Review the preview and press **Add this transfer agreement**. A **Transfer** tab appears, and a **Transfer** button in the highlight row outlines your classes that count, in faint purple.

Agreements change every year. Always confirm with a counselor. Classes needed only for transfer do not add XP.

JSON format, if you would rather make it with an AI: `{"kind":"transfer","university","short","from","major","year","groups":[{"name","pick","rows":[{"university":{"code","title","units"},"college":[{"code","title","units","substitute"}],"status":"articulated|not_articulated|never"}]}]}`.
