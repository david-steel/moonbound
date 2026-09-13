# MOONBOUND

A lunar landing game that runs in one HTML file. No dependencies, no build step, no external requests.

Tap a rocket off Earth, coast to the Moon, put a lander down on the surface, then fly the ascent stage back to orbit and bring the capsule home under a parachute. Where you land on the Moon is the score. How late you pull the chute is the bonus.

## The five landing sites

The lander deploys east of Tranquility with a full tank. Everything else costs fuel to reach, and the harder sites are narrower, further out and stricter about how you arrive. Each one multiplies your score.

| Site | Tier | Pad width | Multiplier |
|---|---|---|---|
| Tranquility | Routine | 150 m | x1.0 |
| Copernicus Ledge | Technical | 92 m | x1.6 |
| Shackleton Spur | Expert | 84 m | x2.4 |
| Marius Tube | Subsurface | 80 m | x3.0 |
| ??? | Uncharted | ? | x3.5 |

Marius Tube is a lava tube under the eastern plain. Its pad sits under a solid roof: drop into the pit and fly in through the mouth (there is a pinch point halfway), or come straight down the skylight just west of the pad. The roof is terrain from both sides, so landing on top of it is a crash.

The fifth site is not on the map. West of the landing zone the survey data just stops, and there is a gap in the surface line. It is real terrain, not a cutscene: fly down into it and the walls will kill you like any other rock.

The checks panel on the right always shows the limits for whichever site you are nearest to, so fly toward one and read it.

## Controls

| | |
|---|---|
| Thrust | Tap `SPACE`, `UP`, `W`, or the on-screen button. Each tap is one short burn; holding does nothing |
| Parachute | `E`, `S`, `DOWN`, or the CHUTE button (Earth return only) |
| Rotate | `LEFT`/`RIGHT`, `A`/`D` |
| Pause | `P` or `ESC` |
| Restart stage | `R` |

Thrust is flap-style: every tap is a fixed kick of velocity and gravity takes it back between taps. Rapid taps stack up to two pulses, so mashing burns fuel for little extra lift.

Steering aims the engine. It does not stop sideways motion by itself: tilt against your drift, burn, then straighten up before you touch down.

## Coming home

After a landing, LIFT OFF FOR HOME starts the return:

1. **Lunar ascent.** The cabin lifts off the descent stage, which stays on the pad with your flag. Climb past 1,150 m. If you landed in the tube or the Hollow, you have to fly out first.
2. **Transearth coast.** Compressed, like the outbound trip.
3. **Earth return.** The capsule falls toward the ocean. Steer toward the recovery ship. The main chute is locked above 450 m and tears if pulled faster than 110 m/s. Splash down under 15 m/s (Cadet) or 11 m/s (Pilot). The later you pull, the bigger the nerve bonus. Do not land on the ship or the shoreline. Thrust fires small retro rockets.

Total score is landing score plus return score.

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
MoonboundTest.tap()                  // one thrust tap (input('thrust', true) also taps)
MoonboundTest.input('left', true)    // hold a steering control
MoonboundTest.startAscent() / startReentry() / chute()
MoonboundTest.advance(seconds)       // step the fixed-rate simulation
MoonboundTest.forget()               // clear saved records and discoveries
MoonboundTest.SITES / SHAFT / ROOFS / terrain / groundAt / floorBelow / roofHit / limitsFor
```

Simulation runs at a fixed 120 Hz and is separate from rendering, so frame rate cannot change the physics and `advance()` is deterministic.

## Notes

- Physics is arcade, not orbital. Lunar gravity is 1.62 m/s^2; the Earth ascent and the transfer are deliberately compressed.
- Records are kept per site in `localStorage`. Nothing leaves the browser.
- `prefers-reduced-motion` is respected.
- Deployed on Railway as a static file server (`server.js`, zero dependencies).

## History

- **1.3** Tap-to-thrust on every stage. Marius Tube, a lava tube landing site with a mouth, a pinch point and a skylight. The return trip: lunar ascent off the descent stage, transearth coast, and an Earth reentry with a parachute window, recovery ship and nerve bonus. Launch checkpoint lowered to 2,400 m.

- **1.2** Four landing sites with per-site limits and score multipliers, one of them hidden in a crater. Fixed: the deploy briefing trapped you with no way back to the menu; clipping a pad while climbing counted as a perfect landing; the win screen never took keyboard focus.
- **1.1** Single pad at Tranquility.
