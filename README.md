# World Manager

A self-contained web app for running a fictional colony world: a generated planet you can explore, sculpt, paint and settle; characters with HP, stats, afflictions and blessings, inventories, magic, fertility and relationships; a codex of lore, quests and session logs; dice; and an endless timeline counted from **0 CS** (Colony Standard).

Live copy: https://vibratingcode.github.io/world-manager/

## The look: Orbit

The app is always dark and opens on your planet: the real terrain of the world on the map, drawn live on a globe with cloud, sunlight and air. It turns slowly on its axis. Drag it any way you like, over either pole and right round, and tap the capital's pin to go there.

- **Home** is a menu of big words: Map, People, Time, Codex and Ships, each with how many places, people, events, entries or ships you have, and Settings, Search, Dice and Saves underneath. There is no tab bar. **Menu** at the top left of every screen comes back here (keys 0 or M).
- **People** is one person at a time: their name, a ring, and the actions beside it, with the rest of the party along the bottom. *All* shows everyone. The ring follows the tab: health on Vitals, what they carry on Items, their pool on Magic, the cycle or pregnancy on Fertility.
- **Places** open under their own town plan or dungeon map, with their actions as plain words and their facts as a list. Tap the plan to go in.
- **Time** is a rail running down the screen. Drag to move through time and pinch from days to aeons. The huge faint number is the year you are in, and the Earth calendar runs down the right edge.
- **Codex** entries open like a page, under the planet. **Settings** is an index of topics.
- **On a computer** everything uses the width: the planet sits beside the menu, People and Codex show a list beside the page, tabs split into two columns, Settings has its index down the side, and Time adds each event's description.
- **Sheets** take over a phone's screen and slide in as a side panel on a computer.
- The typeface is Jost (SIL Open Font License), built into `index.html` so it works offline. The planet is sampled once for each version of a world and kept on the device. It only animates on the home screen.

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
- **Worlds**: a campaign can have several worlds (planets, moons, other planes), each with its own map: terrain, sculpting, paint, places, roads and territory. Characters, the timeline, the codex, the calendar and species are shared by all of them.
  - Tap the campaign's name at the top left of the home screen (or Layers → Worlds, or Settings → Worlds) to see them. **Go** puts another world on the map, **New world** starts a blank planet from a fresh seed, and ⋯ renames or deletes one (an automatic save is made first).
  - With more than one world, the home screen shows the world on the map, with the campaign underneath.
  - A character can be at a place on any world, and an event can happen on any of them: place pickers group places by world, and other worlds' places are shown as "First Landing (Home world)". Opening one of them (from a character, an event, a [[link]] or search) takes you to that world and that place.
- **Save & load** is the disk button at the top. Tap it (or press Ctrl/⌘ + S on a keyboard) to:
  - **Save** a named snapshot of the whole campaign: every world's map and edits, characters and timeline, with a small picture of the map.
  - **Load** any save. Whatever you had open is kept first as an automatic save, so loading never loses anything.
  - **Rename** a save, **save over** it with the current world, **export** it to a file, or **delete** it (the ⋯ button).
  - Start a **New campaign** from a fresh seed. Your units, calendar and species carry over, and the old campaign becomes a save. (To add a planet to this campaign instead, use Worlds.)
  - **Import** a `.json` file as a new save, then load it if you want.
- Automatic saves are also made before clearing sculpting, paint or stamps, before starting over, and once a day. The newest 8 are kept.
- **Settings → Export to a file** writes a `.json` file of the whole campaign. On iPhone it opens the Share sheet, so choose **Save to Files**. Export now and then: it is how you move a world between devices, because each browser or Home Screen app keeps its own storage.

## Everywhere

- **Search** (magnifier at the top, or `/` or Ctrl+K): finds characters, items, places, map features, events, codex entries and eras, and runs commands such as "advance one day", "new quest" or "party". Type a roll such as `2d6+3` to roll it.
- **Dice** (die button, or `R`): `2d6+3`, `4d6kh3` (keep the highest 3), `d20 adv` or `dis`, `3d10!` (exploding), `d%`, `4dF`, `r1` (reroll ones). Count and modifier buttons, rolling as a character, saved rolls and a history.
- **Links**: write `[[Name]]` in any notes field (characters, places, events, codex) to link to a codex entry, character, place, named river or road, or event. A link to something that does not exist yet becomes a new codex entry when tapped, and renaming something updates the links to it. `{1d8+3}` makes a roll you can tap, and `- [ ]` makes a checkbox.
- **Undo**: deleting an item, condition, ability, stat, relationship, event, place, era or codex entry shows an Undo button for a few seconds.
- **Keyboard**: `1` to `5` switch tabs, `N` adds a new thing on the current tab, `[` and `]` move the date a day (`{` and `}` a week), `D` opens the date and almanac, `P` the party, and `?` lists everything.

## How to use it

**Map**
- Pinch or scroll to zoom. The whole planet is shown in the **Robinson** projection. Below about 1,200 miles across it switches to a local **Transverse Mercator** view (60 zones of 6°, like UTM). Below about 40 miles across it becomes a **USGS-style topographic sheet**: brown contours with labelled index contours, spot heights on summits, shaded relief, green woodland tint, blue water with depth contours, marsh and sand symbols, a lat/long graticule, a scale bar and contour-interval note, and a survey grid of 1-mile **sections** in 6-mile **townships** (a 1 km grid in metric).
- **You are here**: tap a spot and choose *I'm here* to drop a blue arrow marker. Tap the arrow to set its heading with a compass dial (drag it, use N/NE/E… buttons, or *Point at a spot*), move it, or centre on it. Moving the party to a place or travelling with Measure moves the marker and points it along the way you went. Search "You are here" to jump to it.
- Tap anywhere for coordinates, elevation, biome, climate, the grid reference (zone, easting/northing, section-township-range) and the nearest place.
- A place's page shows its population, notes (with links), who is there, events there, the **nearest places** with distance, direction and days on foot, and every codex entry that mentions it. **Party is here** moves the PCs there.
- The bottom tools, each labelled, are:
  - **Explore**: the default.
  - **Place**: tap to add a named place (with type, population and notes). Places show at every zoom level that suits their type. **Auto settlements** founds villages, towns, ports and a city where people would settle (flat, temperate, watered land near coasts and rivers), with populations and names. **Auto roads** then joins the settlements in view with roads that follow the terrain and avoid water. Each undoes as one batch.
  - **Sculpt**: Raise, Lower, Flatten, Smooth and Rough brushes.
  - **Paint**: biomes, including *Lake / river* for drawing your own waters. "Erase" restores the generated biome.
    - **Soft blend** (the default) and **Solid** brushes. A soft stroke fades out towards its edge and takes over the ground in natural clumps, so two biomes interfinger like a real forest edge instead of meeting in a circle. The clumps are sized to the brush, stay the same at every zoom, and show finer detail as you zoom in.
    - Under *Softness, strength, mixing & smoothing*: **Softness** sets how much of the brush fades. **Strength** sets how much ground one pass takes, so low strength builds up pass by pass. **Mixing** runs from distinct clumps to smooth colour blends. **Smoothing** (both brushes) makes the brush trail your finger on a string, which steadies wobbly lines.
    - **Water is never painted over**: the brush, and its preview while you drag, stop at the sea, at lakes and at water you painted. A stroke that wanders out to sea is split where it crossed, and one that is all water is refused.
  - **Stamp**: geographic features (see below).
  - **Symbols** (first button in the Stamp tool): 1,010 map symbols in 20 groups. They include 22 drawn defaults for cities and fortresses (walled city, metropolis, capital, castle, keep, star fort, citadel, watchtower, bunker, outpost and more) and pictograms for settlements, military, faith and magic, industry, trade, travel, coast, nature, farms, creatures, hazards, sci-fi colonies, quest markers, factions, weather and loot. Tap the map to drop one as a place. Change a place's symbol in its Edit sheet, and the legend lists the symbols in use.
  - **Measure**: great-circle distance with travel time on foot, riding, by wagon or by boat. **Travel** advances the campaign date by the journey and can move the party to the place at the end.
- While sculpting, painting or drawing a stamp line, one finger draws and two fingers move the map. Undo and Redo are in the tool panel.
- **Stamps** come in two kinds. You tap to place landforms and lakes, and drag to draw the line features:
  - **River**: carves a real valley, so contours bend where they cross it. It always flows toward its lower end, widens downstream, and shows finer meanders the closer you zoom.
  - **Canyon**: a deep gorge with a stream at the bottom.
  - **Lake**: fills its basin up to the lowest point of its rim, so the shoreline follows the land. Lakes have lobed, natural outlines, pale shallows that deepen towards the middle, a soft waterline and damp green ground along the shore. A deep basin no longer shows a patch of sea in its middle.
  - **Mountain**, **volcano** (summit crater and gullies down the flanks), **crater**, **mesa**, **hill** and **island** (always rises above sea level).
  - **Road**, **trail** and **border**: map symbols drawn over the terrain.
  - Sliders set size and height, depth or width. **All features** lists everything stamped.
- **Auto rivers** (Stamp → River) traces rivers downhill from the high ground in view to the sea, joins tributaries, and names them. Undo removes the whole batch.
- Tap a river, road, trail or border in Explore mode to name it (names are drawn along the line) or remove it.
- The dice button next to any name field makes up a fitting name: towns, rivers, peaks, regions, people.
- **Settings → Random names → Hebrew** switches every made-up name (dice buttons, auto settlements, rivers, roads and new factions) to Hebrew style: real towns such as Be'er Sheva, Tzfat or Megiddo, Hebrew place words (Kfar Oren, Nahal Tavor, Har Meron, Givat Kalanit, Horvat Shaked, Agam Tamar) and roots shaped like Hebrew words, plus Hebrew personal names. Names you already have stay as they are.
- **World generation** is the first row of **Layers** (and a button in Settings): seed, planet radius, ocean %, continent size, mountains, roughness, climate, moisture, and which longitude sits in the middle of the world map. Places and edits are stored by latitude/longitude and stay where they are when you regenerate.
- **Biome painting**: 57 biomes in groups (Forests, Grass & scrub, Dry lands, Cold & high, Wet lands, Farmed & built, Volcanic & strange). New ones include mangrove, swamp forest, bog, heath, steppe, prairie, alpine meadow, chaparral, cloud and bamboo forest, fungal forest, salt flats, red-rock canyonlands, scree, snowfield, lava field, ash plain, crystal fields, blighted land, orchards, vineyards, rice paddies, pasture, quarries, ruins, beach, oasis and karst. Map sheets draw sand, rock and marsh symbols on them.
- **Town plans and dungeons**: every place (except regions and waters) has a map of its own, opened from the card near the top of its page. *Town* and *Dungeon* switch between the two, so a city can have sewers and a ruin can have a town.
  - **Town plans** are generated to fit the place: villages, towns, cities and great cities by population. The gates face the place's real roads, and a nearby sea, lake or river from the world map runs through or along it (or pick Coast, River or None under Options).
  - **Middle Eastern by default**. Winding main streets run from the gates to a covered souk around the great temple (courtyard, arcades, columned prayer hall, dome, minaret). Lanes and blind alleys with dog-legs reach every house, and most houses are built round a courtyard. Caravanserais stand by the gates and the souk, with walled gardens, bathhouses with domes, a small temple in every quarter, little squares inside the gates, a citadel with a keep, palace and barracks (uphill when there is a hill), square towers on the walls, cemeteries outside the gates and houses strung along the roads.
  - **Styles** (Options → Style): *From the land* builds pale-stone Levantine towns with olive groves (and terraces on hills) in green country, and mud-brick desert medinas in a ragged oasis of palms and irrigated plots in dry country. *Stone* and *Desert* pick one, and *European* gives the medieval look: a market square and church, street-front houses with back gardens, a street round the inside of the wall, round towers.
  - **Pins** are the place's points of interest: tap *Pin* and then the map to add an inn, shop, temple and so on, or put existing ones on the map from *Places*. Drag a pin to move it. Tap a district to rename it and write notes about it.
  - **Dungeons** come as rooms and corridors or as caves, in three sizes, with doors (some locked or secret), pillars, pools and stairs up and down. Rooms are numbered from the entrance; tap a room to write its key (names, read-aloud text, monsters, treasure, {dice}). *Pin* marks monsters, treasure, traps, people and secrets. Add as many levels as you like under *Options*.
  - **Remake** draws a fresh layout (with Undo), and **Image** saves or shares a print-quality picture.
- **Ships and deck plans**: **Ships** on the home screen lists the campaign's starships. Each one is a codex entry (so `[[links]]`, search and backlinks work) with deck plans drawn on a grid of 2 m squares, nose up.
  - **Classes**: Shuttle, Scout, Freighter, Frigate and Colony ship, from a 25 m shuttle to a 150 m colony ship with four decks. Every deck is cut from one hull, so the lift shafts line up. Decks have jobs: the command deck has the bridge, comms, the captain's cabin and an armoury; crew and habitat decks have cabins, bunk rooms, a mess and galley, medbay, washrooms, labs and hydroponics; a cryo deck is rows of sleeper pods; cargo and engineering decks have holds, a hangar with a parked craft, workshops, life support, weapons bays, the reactor and the engines. Airlocks sit where corridors meet the hull.
  - **Looks** (Options → Look): *Industrial* (worn steel plate, grated corridors, hazard stripes, warm light), *Sleek* (white panels, blue light), *Military* (dark gunmetal, red light) and *Blueprint* (a white line plan on blue). Floors, hull plating, grating, tiles and carpet are textures drawn in the app, with lighting, shadows along the walls, glowing screens and windows, engine glow, and furniture in every room.
  - **The deck plans**: ship screens fill the display. Deck numbers run along the top, *Undo*, *Redo*, *Mirror* and *Frame* down the right, and the tools along the bottom as plain words. The camera keeps the ship framed as panels come and go until you zoom or pan yourself. On a wide screen, or a phone on its side, the library becomes a sidebar, and big screens add a readout of length, beam, floor, rooms and berths.
  - **Build** has five tools. **Add**: a library of modules drawn as real renders in the ship's own look, grouped (Recent, Hulls, Sections, Corridors, Command, Living, Working, Engines) with search. Tap one to see it on the plan with its measurements and green seams where it joins, then press *Place* or tap it again. **Select**: tap a room for handles and an inspector with its name, type, *Width*, *Length*, *Turn*, *Copy*, *Notes* and *Remove*; drag a room or corridor piece to move it. **Doors**: tap a wall to add a door, drag a door to move it, tap one to change its kind or remove it, or redo all the doors. **Windows** and **Paint** are below. Undo and Redo cover all of it. The status chip in the header (*Clear* or *3 to check*) opens floor area, rooms, berths and problems such as rooms with no door or no engine.
  - **Keyboard**: 1–5 switch tools, R turns, M mirrors, F frames the ship, Enter places, Delete removes, + and − change size, Esc backs out, Ctrl+Z and Ctrl+Y undo and redo.
  - **Placing**: drag a module out of the library, or drag on the plan. It sits above your finger, the tools get out of the way, the plan scrolls at the edges, and it snaps on near the ship or stays exactly where you drop it. Dropping it on the dock cancels. With a mouse, the module follows the pointer and a click places it.
  - **Mirror** is one switch for the whole Build screen, with its centre line drawn on the plan. Adding, moving, removing, doors, windows and paint all act on both sides, and twin rooms get mirrored furniture. A spot only counts if both sides fit, and anything across the line is centred on it. *Select → Centre on the line* straightens a lopsided deck.
  - **Sizes**: − and + on the bar above the library scale a module from ×0.5 to ×3 before placing (corridors stay one square wide). In Select, pull a room's handles or use its *Width* and *Length* steppers.
  - **Fill in** (Paint): tap a gap inside the ship to floor it with the chosen room or with corridor, or tap a room to change what it is.
  - **Windows mode**: tap or drag along the outer wall to add or remove windows; *All round*, *None* and *Automatic* set a whole deck.
  - **Windows** only appear facing open space. Any that would touch each other, sit in a door or face hull are left out, and a room can turn its windows off.
  - **Decks**: *+* beside the deck buttons adds one, and Options can copy or clear a deck or return it to the generated layout.
  - **Rooms and marks**: tap a room to name it, change what it is (its furniture is refitted) or write notes. *Mark* places crew, cargo, hazards and so on; *Rooms* lists every room on the deck with its picture.
  - **Print**: the *Print* button on the deck plans or the ship's page makes a finished drawing, with a live preview. Choose the title, the size (Page, Landscape, Square, 4:5, Story, 16:9), the style (*Spec sheet* is framed with a title block, spec table, scale bar, dimension lines and a FORE arrow; *White paper* is the same with less ink; *Clean* runs edge to edge with a caption), all decks at one scale or just one, any look, room names and marks on or off, and double resolution. *Create image* then offers Save, Share on iPhone, and Print. In the Home Screen app, print with Share → Print.
  - **On the map**: *Put on the map* on the ship's page adds a ship marker where the map is looking and lets you drag it into place. *Bring here* moves it to the world on the map, and *Off the map* removes the marker but keeps the ship. Any place's map can also switch to *Ship* (next to *Town* and *Dungeon*), which makes a ship named after the place. The place type *Ship / landing site* opens as a ship.
- **Easier to read, everywhere**: bigger text, headings in plain sentence case instead of tiny capitals, higher-contrast secondary text, cards and buttons without outlines, bigger tap targets, labelled map tools, a two-line map readout on phones, and no zoom buttons on touch screens (pinch instead). The Layers sheet folds into Look, What to show, Factions & war, Terrain detail and Zoom & speed; place pages keep their actions on one sideways-scrolling row; the hit-point card has a single row of quick changes (temporary HP is set in Edit).
- **Places, overhauled**:
  - **Moving**: press and hold a marker with the hand tool to pick it up and drag it. Or tap *Move* on its page and then drag it or tap the new spot. Or type its coordinates in Edit → Location. Roads that end there follow, and every move can be undone.
  - **Folding sections**: every section on a place's page (Notes, Details, Points of interest, Characters, Roads, Events, Nearby, Mentioned in) folds away with a tap, and the app remembers which ones you folded.
  - **More to fill in**: a picture shown as a banner, a status (Unexplored, Visited, Abandoned, Ruined, Secret), tags, and details (ruler, government, founded, economy, defences, religion, culture, languages).
  - **Points of interest**: inns, shops, temples, guildhalls, secrets, each with notes. Search finds them.
  - **Status on the map**: unexplored and abandoned places are faded, unexplored ones get a ? and visited ones a ✓, ruined places are crossed out, and secret ones have a dashed ring. Layers can hide secret places before you share your screen.
  - **New buttons**: *Copy link* puts `[[Place]]` on the clipboard, and *Duplicate* makes a copy.
- **Place page**: opens with the name and symbol, then tiles for Population, Faction (from painted territory, or set on the place), Type and Terrain. Tap a tile to edit it. Tapping the map or hovering a place also says whose territory it is.
- **Factions & war** (flag tool):
  - **Land**: paint a faction's territory with a brush. Claiming land takes it from whoever held it, *Unclaim* shrinks it, and Undo works. Territories are tinted and outlined, with the faction's name written across them.
  - Territory is drawn into the map itself:
    - It is measured on the globe, so it sits in the same place at every zoom level.
    - It stops at coasts and lakes.
    - Its borders are smooth, anti-aliased lines.
    - Each stroke shows a preview straight away and stays visible until the map has redrawn.
  - **Contest**: paint a disputed zone between two sides, or slide *Frontier* to stripe a band along their whole shared border.
  - **Units**: NATO-style markers in 16 types (infantry, armour, cavalry, artillery, siege, air, naval, HQ, supply, engineers, medical, special forces, militia, mages, war beasts…) and 11 sizes from team to army. Drag them to move them, tap to edit name, side and strength.
  - **Arrows**: advance, attack, retreat or supply movements. **Front**: front lines with teeth toward the enemy. **Battle**: crossed-swords markers named after the nearest place and dated today, with an outcome.
  - **Factions…** lets you rename, recolour and delete factions and opens or creates their Codex page. **Military list** shows every unit, battle, front and movement.
  - In Layers you can turn territories, faction names, the military layer and unit names on or off, set the territory fill strength, and use *War-room view* for a one-tap antique war map.
- **Layers**:
  - **Tint**: Natural, Parchment, Antique, Vivid, Mono or Night, also applied to shared images.
  - **Label size**, show or hide place groups (settlements, forts, each symbol group…), and an option to hide names beside land-use symbols.
- **Labels that make room**: when names would overlap, they slide around their marker (right, left, above, below) and then tilt up or down before anything is hidden. Unit and battle names do the same. Turn it off in Layers. To pin one place's name, use Edit → *Name on the map* to choose a side and a tilt (up to 75°). This also tilts region and sea labels.
- **Places**: the list filters by group, sorts A–Z, nearest (to you), largest or by type, and shows each place's symbol. *Show these* fits them all on screen. A place's page has Route, I'm here and Measure buttons and shows how far it is from you. The open place is ringed on the map. Each place can have its own symbol size and can hide its name.
- **Measure**:
  - Taps snap to places, and each leg is labelled with its length.
  - *Profile* draws an elevation chart with climb, descent, highest, lowest and steepest grade. Roads, rivers and planned routes have profiles too.
  - *Close loop* gives the area.
  - *Make road / Trail / Border* turns the line into a feature, and a closed border shades its territory.
- **Borders** have their own colour and an optional shaded territory.
- **Everywhere else on the map**:
  - Hovering with a mouse shows a tooltip for places, roads and the arrow.
  - The point card says how far a spot is from you, and has *Symbol* and *Copy* buttons.
  - Search understands coordinates like `-24.1, 2.5` or `12N 40W`.
  - Dragging with the middle mouse button always moves the map, whatever tool is active.
  - The **Back** button (or `B`) returns to the previous view.
  - The symbol picker remembers your recent symbols.
- **Roads hub** (Place tool → *Roads…*, or search "Roads"):
  - **Route planner**: the fastest way between two places along the roads, leg by leg, with distance and days. Highways are quicker and tracks slower. *Show on map* highlights the route, and *Travel* moves the date, the party and the you-are-here arrow.
  - **Connect two places**: builds one terrain-following road between them, even off screen. It refuses if they already have a road.
  - **Remove duplicates**: keeps one road per pair of places.
  - **Name unnamed roads**: gives names like "Varstone–Ithstead Road".
  - **Auto roads**: classes roads by what they join (highway, road or lane).
  - **Road types**: Highway, Road, Lane and Track, each drawn differently.
  - Each place's page lists its roads (where they lead, how far, how many days) with *Connect* and *Route* buttons.
  - A road's page shows its ends and travel time, and has *Reroute along terrain*.
  - Roads drawn with the Stamp tool snap their ends to the places they start and finish at.
- **Ecology & land use symbols**: 22 drawn area badges (farming, herd, grazing, orchard, vineyard, rice paddies, irrigated, fallow, managed forest, logging, fishing, spawning, hunting, wetland, nature reserve, nesting, migration, mining, blight, flood, drought, foraging) plus 72 pictograms. There are 1,010 symbols in all.
- **Roads, trails and borders**: tap one to name it, remove it (with Undo), or **Reshape** it. While reshaping, drag the highlighted line to bend it. Nearby points follow smoothly and the ends stay put unless you drag them.
- **Moving places**: in the Place tool, drag a marker to move it. Roads that end there bend to follow, and Undo puts everything back.
- The map keeps its colours at every zoom. To get USGS-style map sheets when zoomed in, turn on *Switch to USGS sheets when zoomed in* in Layers, or pick the Topographic style. *Lock zoom at 10 miles across* in Layers stops close-ups there.
- The layers button switches styles and overlays (*Sharp* render quality looks best on Retina screens) and opens the **Legend** and **Saved views**. A saved view bookmarks a spot and zoom level, with a thumbnail.
- **Share or print an area** (the arrow-out-of-box button):
  1. Pick a format: square, 4:5, story, wide or screen. Your last format and style are remembered.
  2. Pick a style:
     - **Map sheet**: a paper border, corner coordinates, and a title block with the CS and Earth dates, scale bar and north arrow.
     - **Clean**: the map edge to edge with a caption.
  3. Give it a title, then drag and zoom to frame the area. The frame shows the whole page as it will come out, and can take in the whole planet.
  4. Tap **Create image**. It renders at full resolution (about 1080 px, or *Double size* for printing). On iPhone, Share sends it to Photos, Messages, social apps or AirPrint. In a browser there's a Print button too.

**Characters**
- The list filters by PC, NPC, stash, status and tag, and sorts by name, lowest HP, age or role. Search also finds tags and carried items.
- **Vitals**:
  - HP with temporary HP and an undo button.
  - **Rest**: refills HP, magic and trackers, and can move the date on.
  - **Stats & trackers** of four kinds: numbers (Level, XP), bars (Stamina), pips (Fatigue) and text (Class). They come with presets, copy-to-others and reset-on-rest.
  - Afflictions and blessings with severity, duration (counted against the campaign date) and an optional fertility modifier.
- **Party**: damage or heal several characters at once, full-heal, rest, restore magic, give them all an affliction, move them to a place, or make a **group roll** (initiative or any check) that adds each character's stat and sorts the results.
- **Items**: money per currency, items with quantity, weight, value and category, carrying capacity, and **Give** to move items or money to another character or a container (a stash, a ship's hold).
- **Magic**: abilities with uses-per-rest, plus an optional resource pool such as mana. Using an ability with a numeric cost spends from the pool.
- **Fertility**:
  - who can carry or sire, and a fertility rating;
  - optional cycle tracking with the fertile window;
  - contraception;
  - pregnancies, showing weeks, trimester and due date from the campaign date;
  - births, which can create the children as new characters;
  - a **Conception roll**: a d100 against a shown breakdown of species base chance × both partners' fertility × cycle timing × contraception × affliction or blessing modifiers × a situational modifier.
- **Bio**:
  - a **portrait** from your photos or camera;
  - species, sex/gender, and **status** (alive, missing, captured, retired, or dead with a date of death);
  - birth date (gives age), **tags**, and home and current location;
  - **relationships** with an attitude from hostile to devoted, plus a relationship web of everyone;
  - family, and a **life & events** list built from the timeline and session logs;
  - notes with links, and where they are mentioned.

**Codex** (fourth tab)
- **Lore**: a wiki of lore, locations, factions, people, creatures, items, religions, cultures, rules and notes, with tags, pinning, filters and templates. Each entry lists everything that links to it.
- **Quests**: objectives are checkboxes, and the progress bar fills as you tick them. A quest is active, on hold, completed or failed.
- **Journal**: session logs with the date, who was there, and what was on the timeline that day. Logs appear on the timeline and in each character's life story.

**Timeline**
- Drag to move through time. Pinch, scroll or use − and + to zoom anywhere from a single day to trillions of years, before and after 0 CS.
- Tap empty space to add an event at that date. Tap an event to edit or delete it. Events can span a period, carry a coloured category, and link to characters and a place.
- Births, deaths, pregnancies and session logs appear automatically. You can toggle them off in the list view, which also filters categories.
- Tap an event to read it (links work), set it as today, or edit, duplicate or delete it.
- **Eras** shade spans of history and are named in the strip under the dates. **Holidays** show there as flags, and **moons** as full and new discs. Tap the strip to edit them.

**Earth calendar overlay**
- 0 CS lines up with Earth's calendar: day 1 of 0 CS is **Thursday 13 March 1997**, and every CS day is one Earth day.
- The timeline has a second, teal row of Earth (Gregorian) years, months and days under the Colony Standard axis, and the Now and 0 CS markers show both dates.
- The date button at the top right shows the Earth date under the CS date. Every date field shows its Earth equivalent ("Earth: Saturday 28 September 2002"), and the event list shows Earth dates as well.
- Earth's leap years are counted, so the two calendars drift apart by about a day every four years. For example, 1 Jan 100 CS falls on 16 Feb 2097.
- Turn it off, or move the anchor date, under **Settings → Calendar → Earth calendar overlay**.

**Campaign date** (top right) sets "now". Advancing it counts down afflictions and blessings and moves pregnancies along. It also tells you what ran out or came due, whose birthday it is, and which holidays and events arrived. The date sheet doubles as an **almanac**: the current era, today's holidays, each moon's phase, and what is coming up in the next few weeks.

**Settings**: campaign name, units (miles/feet or km/m), currencies, the **calendar** (era name, months and their lengths, holidays, moons and eras), **species** defaults (gestation, cycle, fertile window, base conception and twin chances), save & load, and appearance.

## Known rough edges

- Auto rivers follow the generated terrain, so they can stop in an inland hollow; draw a river by hand where you want a specific course.
- Drawing a new area takes a moment, roughly a quarter to one second per screen on a phone, while the terrain is computed. Areas you've already seen are cached.
- The 1-mile sheets look most convincing. In between, around 5–30 miles across, the generated relief can look a bit lumpy.
- When the map switches from Robinson to the local projection there's a short crossfade, and coastlines shift shape slightly because the projection really changes.
- The survey grid is a fictional system based on the UTM-style zones, with townships counted from the equator.
- Auto settlements and auto roads only look at the area in view. Zoom out for a wider network, or run them again in the next region.
- Tested in a Chromium browser at desktop and iPhone sizes, not yet on a physical iPhone.
