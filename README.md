# Dragon Boat: The AI Crossing

**Play it:** https://geekyme.github.io/ai-game-dragonboat/

A purely front-end 3D dragon boat game about adopting AI as a team. You are Seat 8, an analyst;
your department head Director Mei is on the drum, rowing the crew toward Transformation Island.
Viewpoint is from the stern, looking down the boat.

## Deploy to GitHub Pages

The site is fully static, so it deploys straight from this repo:

1. Push to GitHub as `geekyme/ai-game-dragonboat` (any name works; if you change it, update the
   `og:url`, `og:image`, `canonical` and JSON-LD URLs in the `<head>` of `index.html`).
2. The workflow in `.github/workflows/pages.yml` builds and publishes on every push to `main`
   and enables Pages on the first run. Alternatively set **Settings → Pages → Source** to
   *Deploy from a branch*, `main` / `/ (root)`.
3. Open https://geekyme.github.io/ai-game-dragonboat/.

`.nojekyll` is included so Pages serves the files as-is.

## Sharing and SEO

`index.html` carries full Open Graph, Twitter card and JSON-LD (`VideoGame`) metadata, tagged around
AI adoption, change management and AI literacy. Social previews use `assets/og-image.png` (1200×630),
rendered from the game itself. The logo is `assets/logo.svg`, with PNG icons and a web manifest for
favicons and home-screen installs. To re-bake the images after a visual change, run `node serve.mjs`,
open the game, and POST canvases to the dev-only `/__save/<file>` endpoint (see `serve.mjs`).

## Run it locally

Everything lives in `index.html` (Three.js is loaded from a CDN, so you need internet access).
Browsers block ES modules on `file://`, so serve the folder:

```bash
node serve.mjs
```

Then open http://localhost:8765. Any static server works (`npx serve`, VS Code Live Server, etc.).

## Controls

| Action | Keys |
|---|---|
| Stroke on the beat | `Space`, `W`, `Up`, or click |
| Steer | `A` / `D` or arrow keys |
| Mute | `M` |
| Background music on/off (drum only) | `B`, the ♪ button in the HUD, or the checkbox on the title screen |

On phones and tablets: hold the ◀ ▶ buttons to steer and tap STROKE (or anywhere on the water) on the beat.
Landscape gives the best view.

## Performance

Graphics scale automatically. Three tiers (High / Medium / Low) adjust pixel ratio, water mesh density,
per-pixel water detail, bloom resolution, shadow map size and antialiasing. **Auto** starts on High for
desktops and Medium for phones, then steps down if the frame rate stays under about 38 fps for a few
seconds. Pick a tier on the title screen, press `G` in game, or use `?quality=low|medium|high|auto`.
The choice is remembered.

## How it plays

- **Rhythm**: the gold ring shrinks onto the white ring every drum beat. Stroke when they meet.
  PERFECT / GOOD strokes build speed and sync streaks; misses cost morale.
- **Steer** around Rocks of Skepticism, legacy debris barrels, Kraken tentacles and Meeting Vortexes.
- **Adopt AI tools** (glowing orbs: Copilot, Prompt Craft, Automation, Data Pipeline, AI Agent,
  Knowledge Base). Adoption unlocks tiers:
  1. Copilot: wider timing window
  2. Automation: +15% base speed
  3. Data Compass: threats flagged, tools pulled toward you
  4. Agentic Crew: a shield that absorbs a hit every 12s
- **Verify**: in the Storm of Hallucinations, red flickering orbs with glitched names are fakes.
  Grabbing one costs adoption and morale.
- **Team Sync Gates** give a morale and speed burst.
- Reach the island for an Adoption Report and a grade. Lose all morale and the crew loses heart.

## Stages

1. Harbor of Habit
2. Straits of Skepticism
3. The Kraken of Legacy Systems
4. Storm of Hallucinations
5. The Final Sprint (sunset, Transformation Island)

## Dev shortcuts

Append `?dist=1200` to start partway through, and `&adopt=80` to preset adoption.

## Music

All music is generated live with WebAudio, no audio files. A lookahead sequencer plays a different
song per stage (chords, bass, plucked arpeggio, generative melody, hats, shaker, toms), with reverb
and tempo-synced delay. The layers react to play: long sync streaks add hats and arpeggio density,
low morale darkens the mix through a low-pass filter. The boat drum and the rhythm ring are driven
by the music clock, so they stay locked to the track across tempo changes. Menu, win and lose
screens have their own themes. Turn the music off (`B`, the HUD button, or the title-screen checkbox) to
hear only Director Mei's drum; the choice is remembered in localStorage. Each drum hit briefly ducks the
music so the beat always cuts through, and a limiter on the master output keeps it from clipping. `window.DB` exposes `G`, `Music` and `Audio` for tinkering in the console.

## Credits

Made by a fellow AI adopter, [Shawn Lim](https://linkedin.com/in/geekyme). Built with Three.js and WebAudio;
no external assets. Share it with your team.
