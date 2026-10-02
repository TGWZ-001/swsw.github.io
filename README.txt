MY PLANNER - installable web app (PWA)

FILES (keep them all together in one folder)
  index.html, manifest.webmanifest, sw.js, icon-192.png, icon-512.png, icon-maskable-512.png

1) PUT IT ONLINE (free, needs https)
  Cloudflare Pages: Workers & Pages > Create > Pages > Upload assets > drop this folder.
  Netlify: app.netlify.com/drop > drop this folder (create a free account so the site stays online).
  GitHub Pages: upload the files to a repo > Settings > Pages.
  You get an address like https://something.pages.dev

2) INSTALL ON ANDROID (Chrome)
  Open the address > tap the "Install" button at the top of the page,
  or Chrome menu (3 dots) > Install app / Add to Home screen.

3) SHORTCUTS
  Long-press the app icon: Today, Homework, Routine, Calendar, Tasks, Notes.
  Any other tab: open that tab, then Chrome menu > Add to Home screen.
  (the address changes to ?tab=... so the shortcut opens that tab)

4) NOTIFICATIONS
  Backup tab > Enable notifications > Allow.
  You get a warning when you open the app. Chrome may also wake an installed app about once a day;
  this is up to Chrome and is not guaranteed.

5) DATA
  Stored on the phone, inside the installed app/browser. Clearing site data or uninstalling deletes it.
  Use Backup tab > Export backup file now and then. Photos/videos are not in the backup file.

NOTE: opening index.html directly from the phone's files will NOT install or notify; it must be served from https.
