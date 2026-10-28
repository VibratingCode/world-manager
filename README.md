# World Manager

A self-contained web app for running a fictional colony world: a generated planet you can explore, sculpt and paint; characters with HP, afflictions and blessings, inventories, magic and fertility; and an endless timeline counted from **0 CS** (Colony Standard).

Everything lives in `index.html`. The other files make it installable and offline-capable:

| File | Purpose |
| --- | --- |
| `index.html` | The whole app (HTML, CSS, JavaScript, terrain generator) |
| `sw.js` | Service worker that caches the app for offline use |
| `manifest.webmanifest`, `icon-*.png`, `apple-touch-icon.png` | Home Screen name and icons |

## Getting it onto your iPhone or iPad

Safari can't run an HTML file straight from the Files app. You need to open the app from a web address.

**Option A: host it free over HTTPS (recommended: works offline)**
1. Put the whole `world-manager` folder online. GitHub Pages works (new repository → upload the files → Settings → Pages → deploy from the main branch). So do Netlify Drop and Cloudflare Pages.
2. Open the address in Safari on the iPhone.
3. Tap **Share → Add to Home Screen**. It opens full-screen like an app and keeps working without a connection.

**Option B: serve it from this PC on your home Wi-Fi (quick test)**
1. In a terminal, from the `Standard Creations` folder:
   ```bash
   python -m http.server 8771 -d world-manager
   ```
2. On the iPhone (same Wi-Fi), open `http://<your-PC's-IP>:8771`. You can find the IP with `ipconfig`.
3. This works while the PC is on, but offline mode needs HTTPS (Option A). Data saved this way belongs to that address, so if the PC's IP changes, export a backup first.

On a computer you can also double-click `index.html` to open it in a browser. That should work apart from offline caching, though so far it has only been tested served over `http://localhost`.

## Saving, loading and backups

- Every change is kept automatically on the device, in the browser's storage (IndexedDB).
- **Save & load** is the disk button at the top. Tap it (or press Ctrl/⌘ + S on a keyboard) to:
  - **Save** a named snapshot of the whole world: map, edits, stamps, characters and timeline, with a small picture of the map.
  - **Load** any save. Whatever you had open is kept first as an automatic save, so loading never loses anything.
  - **Rename** a save, **save over** it with the current world, **export** it to a file, or **delete** it (the ⋯ button).
  - Start a **New world** from a fresh seed. Your units, calendar and species carry over, and the old world becomes a save.
  - **Import** a `.json` file as a new save, then load it if you want.
- Automatic saves are also made before clearing sculpting, paint or stamps, before starting over, and once a day. The newest 8 are kept.
- **Settings → Export this world** writes a `.json` file. On iPhone it opens the Share sheet, so choose **Save to Files**. Export now and then: it is how you move a world between devices, because each browser or Home Screen app keeps its own storage.

## How to use it

**Map**
- Pinch or scroll to zoom. The whole planet is shown in the **Robinson** projection. Below about 1,200 miles across it switches to a local **Transverse Mercator** view (60 zones of 6°, like UTM). Below about 40 miles across it becomes a **USGS-style topographic sheet**: brown contours with labelled index contours, spot heights on summits, shaded relief, green woodland tint, blue water with depth contours, marsh and sand symbols, a lat/long graticule, a scale bar and contour-interval note, and a survey grid of 1-mile **sections** in 6-mile **townships** (a 1 km grid in metric).
- Tap anywhere for coordinates, elevation, biome, climate and the grid reference (zone, easting/northing, section-township-range).
- The bottom tools are, in order:
  - **Explore**: the default.
  - **Place**: tap to add a named place. Places show at every zoom level that suits their type.
  - **Sculpt**: Raise, Lower, Flatten, Smooth and Rough brushes.
  - **Paint**: biomes, including *Lake / river* for drawing your own waters. "Erase" restores the generated biome.
  - **Stamp**: geographic features (see below).
  - **Measure**: great-circle distance, with travel-day estimates.
- While sculpting, painting or drawing a stamp line, one finger draws and two fingers move the map. Undo and Redo are in the tool panel.
- **Stamps** come in two kinds. You tap to place landforms and lakes, and drag to draw the line features:
  - **River**: carves a real valley, so contours bend where they cross it. It always flows toward its lower end, widens downstream, and shows finer meanders the closer you zoom.
  - **Canyon**: a deep gorge with a stream at the bottom.
  - **Lake**: fills its basin up to the lowest point of its rim, so the shoreline follows the land.
  - **Mountain**, **volcano** (summit crater and gullies down the flanks), **crater**, **mesa**, **hill** and **island** (always rises above sea level).
  - **Road**, **trail** and **border**: map symbols drawn over the terrain.
  - Sliders set size and height, depth or width. **All features** lists everything stamped.
- **Auto rivers** (Stamp → River) traces rivers downhill from the high ground in view to the sea, joins tributaries, and names them. Undo removes the whole batch.
- Tap a river, road, trail or border in Explore mode to name it (names are drawn along the line) or remove it.
- The dice button next to any name field makes up a fitting name: towns, rivers, peaks, regions, people.
- The cog button holds **World generation**: seed, planet radius, ocean %, continent size, mountains, roughness, climate, moisture, and which longitude sits in the middle of the world map. Places and edits are stored by latitude/longitude and stay where they are when you regenerate.
- The layers button switches styles and overlays. *Sharp* render quality looks best on Retina screens.
- **Share or print an area** (the arrow-out-of-box button):
  1. Pick a format: square, 4:5, story, wide or screen.
  2. Pick a style:
     - **Map sheet**: a paper border, corner coordinates, and a title block with the CS and Earth dates, scale bar and north arrow.
     - **Clean**: the map edge to edge with a caption.
  3. Give it a title, then pan and zoom to frame the area.
  4. Tap **Create image**. It renders at full resolution (about 1080 px, or double for printing). On iPhone, Share sends it to Photos, Messages, social apps or AirPrint.

**Characters**
- **Vitals**: HP with temporary HP and an undo button; afflictions and blessings with severity, duration (counted against the campaign date) and an optional fertility modifier.
- **Party**: damage or heal several characters at once, full-heal them, restore their magic, or give them all an affliction.
- **Items**: money per currency, items with quantity, weight, value and category, carrying capacity, and **Give** to move items or money to another character or a container (a stash, a ship's hold).
- **Magic**: abilities with uses-per-rest, plus an optional resource pool such as mana. Using an ability with a numeric cost spends from the pool.
- **Fertility**:
  - who can carry or sire, and a fertility rating;
  - optional cycle tracking with the fertile window;
  - contraception;
  - pregnancies, showing weeks, trimester and due date from the campaign date;
  - births, which can create the children as new characters;
  - a **Conception roll**: a d100 against a shown breakdown of species base chance × both partners' fertility × cycle timing × contraception × affliction or blessing modifiers × a situational modifier.
- **Bio**: species, sex/gender, birth date (gives age), home and current location (linked to map places), family, and notes.

**Timeline**
- Drag to move through time. Pinch, scroll or use − and + to zoom anywhere from a single day to trillions of years, before and after 0 CS.
- Tap empty space to add an event at that date. Tap an event to edit or delete it. Events can span a period, carry a coloured category, and link to characters and a place.
- Births and pregnancies of characters appear automatically. You can toggle them off in the list view, which also filters categories.

**Earth calendar overlay**
- 0 CS lines up with Earth's calendar: day 1 of 0 CS is **Thursday 13 March 1997**, and every CS day is one Earth day.
- The timeline has a second, teal row of Earth (Gregorian) years, months and days under the Colony Standard axis, and the Now and 0 CS markers show both dates.
- The date button at the top right shows the Earth date under the CS date. Every date field shows its Earth equivalent ("Earth: Saturday 28 September 2002"), and the event list shows Earth dates as well.
- Earth's leap years are counted, so the two calendars drift apart by about a day every four years. For example, 1 Jan 100 CS falls on 16 Feb 2097.
- Turn it off, or move the anchor date, under **Settings → Calendar → Earth calendar overlay**.

**Campaign date** (top right) sets "now". Advancing it counts down afflictions and blessings, moves pregnancies along, and tells you what ran out or came due.

**Settings**: campaign name, units (miles/feet or km/m), currencies, the **calendar** (era name, months and their lengths), **species** defaults (gestation, cycle, fertile window, base conception and twin chances), save & load, and appearance.

## Known rough edges

- Auto rivers follow the generated terrain, so they can stop in an inland hollow; draw a river by hand where you want a specific course.
- Drawing a new area takes a moment, roughly a quarter to one second per screen on a phone, while the terrain is computed. Areas you've already seen are cached.
- The 1-mile sheets look most convincing. In between, around 5–30 miles across, the generated relief can look a bit lumpy.
- When the map switches from Robinson to the local projection there's a short crossfade, and coastlines shift shape slightly because the projection really changes.
- The survey grid is a fictional system based on the UTM-style zones, with townships counted from the equator.
- Tested in a Chromium browser at desktop and iPhone sizes, not yet on a physical iPhone.
