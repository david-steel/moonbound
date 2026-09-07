# MOONBOUND

A lunar landing game that runs in one HTML file. No dependencies, no build step, no external requests.

Launch a rocket off Earth, coast to the Moon, then deploy a lander and put it down on the surface. Where you put it down is the game.

## The four landing sites

The lander deploys east of Tranquility with a full tank. Everything else costs fuel to reach, and the harder sites are narrower, further out and stricter about how you arrive. Each one multiplies your score.

| Site | Tier | Pad width | Multiplier |
|---|---|---|---|
| Tranquility | Routine | 150 m | x1.0 |
| Copernicus Ledge | Technical | 92 m | x1.6 |
| Shackleton Spur | Expert | 84 m | x2.4 |
| ??? | Uncharted | ? | x3.5 |

The fourth site is not on the map. West of the landing zone the survey data just stops, and there is a gap in the surface line. It is real terrain, not a cutscene: fly down into it and the walls will kill you like any other rock.

The checks panel on the right always shows the limits for whichever site you are nearest to, so fly toward one and read it.

## Controls

| | |
|---|---|
| Thrust | `SPACE`, `UP`, `W`, or hold the on-screen button |
| Rotate | `LEFT`/`RIGHT`, `A`/`D` |
| Pause | `P` or `ESC` |
| Restart stage | `R` |

Steering aims the engine. It does not stop sideways motion by itself: tilt against your drift, burn, then straighten up before you touch down.

## Running it

Open `public/index.html` in a browser. That is the whole game.

To run the server locally:

```
npm start          # http://localhost:3000
```

## QA hooks

Append `?test=1` to the URL to expose `window.MoonboundTest`. Inert otherwise.

```js
MoonboundTest.getState()             // mode, ship, target site, discoveries
MoonboundTest.startLanding(practice) // jump straight to a descent
MoonboundTest.setShip({x, y, vx, vy, angle, fuel})
MoonboundTest.input('thrust', true)  // hold a control
MoonboundTest.advance(seconds)       // step the fixed-rate simulation
MoonboundTest.forget()               // clear saved records and discoveries
MoonboundTest.SITES / SHAFT / terrain / groundAt / limitsFor
```

Simulation runs at a fixed 120 Hz and is separate from rendering, so frame rate cannot change the physics and `advance()` is deterministic.

## Notes

- Physics is arcade, not orbital. Lunar gravity is 1.62 m/s^2; the Earth ascent and the transfer are deliberately compressed.
- Records are kept per site in `localStorage`. Nothing leaves the browser.
- `prefers-reduced-motion` is respected.
- Deployed on Railway as a static file server (`server.js`, zero dependencies).

## History

- **1.2** Four landing sites with per-site limits and score multipliers, one of them hidden in a crater. Fixed: the deploy briefing trapped you with no way back to the menu; clipping a pad while climbing counted as a perfect landing; the win screen never took keyboard focus.
- **1.1** Single pad at Tranquility.
