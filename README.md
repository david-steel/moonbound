# MOONBOUND

A lunar landing game that runs in one HTML file. No dependencies, no build step, no external requests.

Tap a rocket off Earth through whatever the sky throws at it, coast to the Moon, put a lander down on the surface, drive two astronauts out on the rover and back, fly the ascent stage up to the command module and dock with it, then bring the capsule home under a parachute. Where you land on the Moon is the score. The EVA, the docking and how late you pull the chute are the bonuses.

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
| Thrust | Tap `SPACE`, `UP`, `W`, or the on-screen button. Each tap is one short burn; holding does nothing. On the rover a tap is a hop |
| Parachute / brake | `E`, `S`, `DOWN`, or the CHUTE button on the Earth return. The same key is BRAKE on the rover and during docking |
| Rotate / drive | `LEFT`/`RIGHT`, `A`/`D`. Hold them to drive the rover |
| Pause | `P` or `ESC` |
| Restart stage | `R` |

Thrust is flap-style: every tap is a fixed kick of velocity and gravity takes it back between taps. Rapid taps stack up to two pulses, so mashing burns fuel for little extra lift.

Steering aims the engine. It does not stop sideways motion by itself: tilt against your drift, burn, then straighten up before you touch down.

## The launch has things in it

The climb is no longer a formality. Debris comes through the launch corridor and every hit costs hull:

| Kind | Where | Hull cost | Notes |
|---|---|---|---|
| Bird strike | 60-900 m | 9 | Flocks cross from either side |
| Wind-borne debris | 80-1,500 m | 17 | Gale and worse. Rides the wind |
| Hail | 300-2,000 m | 6 | Thunderstorm and hurricane only |
| Range debris | 850 m and up | 32 | Heavy, falls fast, mostly down your column. A red marker shows one coming |

The rocket starts with 100% hull. A hit also kicks it sideways and spins it. Hull at zero is a break-up. Hull carries through the mission: bumps during docking take more off it, and a hull under 35% cracks the heat shield, which lowers the speed the parachute can survive to 88 m/s. Whatever hull is left at splashdown is a bonus.

## Weather

Earth has weather, and it is never calm. It is rolled fresh for every launch and every reentry (a retry rolls again). The Moon has no air, so the landing and lunar ascent are untouched.

| Tier | Chance | Wind | What it adds | Return score |
|---|---|---|---|---|
| Breezy | 25% | 6-12 m/s | Light gusts | x1.0 |
| Gale | 30% | 14-24 m/s | Gust slams, drafts | x1.25 |
| Thunderstorm | 30% | 20-32 m/s | Lightning, wind shear, heavy rain | x1.6 |
| Hurricane | 15% | 32-46 m/s | All of it, constantly, 6 m swell | x2.2 |

What the weather does:

- **Wind** drags you sideways and turns the rocket's nose into it. Leave the controls alone and it thrusts itself out of the corridor in seconds.
- **Turbulence and gust slams** twist the rocket and shove it sideways without warning.
- **Downdrafts and updrafts** push you down or up for a few seconds. A downdraft under a parachute can make a soft splashdown too fast.
- **Wind shear** (storms and hurricanes) flips the wind between 1,000 and 1,600 m on the way up.
- **Lightning** that hits you flames out the engine, or scorches a deployed chute so it holds less air.
- **Swell** moves the waterline and rocks the recovery ship.

Under the parachute you drift with the wind, so get upwind of the ship before you pull. Cadet feels the weather at 90% strength. The launch corridor is 520 m either side.

## The surface EVA

After a landing, DEPLOY THE ROVER starts the traverse. Two astronauts ride a rover across a course generated for the site (600 m each way at Tranquility, 1,200 m at the Hollow, seeded so it is the same course every time you land there).

- Hold `LEFT`/`RIGHT` to drive. Tap thrust to hop. `E` brakes.
- Bag the three samples on the way out, touch the survey marker at the end, and get back to the lander before the oxygen runs out. Oxygen is 55 s plus 0.3 s per metre of course.
- Rocks: crawl over them slowly or hop them. Hitting one fast costs rover hull.
- Craters are drivable bowls. Scarps are small steps: crawl or hop. Rilles are 30 m deep slots: hop them at speed, or lose the rover.
- Coming down hard (over 8 m/s) costs hull. Coming down more than 40 degrees off the slope rolls the rover. In the air the rover settles toward the ground beneath it; the arrows nudge it.
- Rover hull at zero, oxygen at zero, a rollover or a rille all end the EVA. Retry it from the lander.

EVA score counts samples, oxygen left, rover hull, and the site multiplier. You can skip the EVA from the landing screen and lift off straight away; it just scores nothing.

## Coming home

After the EVA, LIFT OFF FOR HOME starts the return:

1. **Lunar ascent.** The cabin lifts off the descent stage, which stays on the pad with your flag. Climb past 1,150 m. If you landed in the tube or the Hollow, you have to fly out first.
2. **Docking.** The command module is waiting in orbit, nose down, and it drifts. There is no gravity: every burn has to be undone by another one. Tilt and tap to translate, `E` for a brake pulse (kills 45% of your relative speed for 2.5% propellant). Bring the top hatch to the port under 1.6 m/s (Cadet) or 1.0 m/s (Pilot), within 4 m of centre and 14 or 9 degrees of upright. Faster, off-centre or tilted is a hard contact that costs hull and bounces you off. Over 3.4 m/s is a collision. Drifting out of the box or running dry is a failure too.
3. **Transearth coast.** Compressed, like the outbound trip.
4. **Earth return.** The capsule falls toward the ocean. Steer toward the recovery ship. The main chute is locked above 450 m and tears if pulled faster than 110 m/s. Splash down under 15 m/s (Cadet) or 11 m/s (Pilot). The later you pull, the bigger the nerve bonus. Do not land on the ship or the shoreline. Thrust fires small retro rockets.

Total score is landing plus EVA plus docking plus return, and the return includes four points for every percent of hull you brought home.

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
MoonboundTest.startAscent() / startRover() / startDock() / startReentry() / chute()
MoonboundTest.hull() / setHull(v) / debris() / rover() / course() / csm() / results()
MoonboundTest.advance(seconds, quiet) // step the fixed-rate simulation (quiet skips rendering)
MoonboundTest.setWeather(id, dir)    // breezy | gale | storm | hurricane, dir -1 or 1
MoonboundTest.weather()              // current weather state
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

- **1.5** The launch is a game: birds, wind-borne debris, hail and range debris in the corridor, a hull that only takes so much, and the hits kick the rocket. Surface EVA after every landing: a rover with two astronauts, a generated traverse per site with craters, rocks, scarps and rilles, three samples, a survey marker and an oxygen clock. Orbital docking with a drifting command module before the trip home, with a brake key and hard-contact damage. Hull carries through to reentry and cracks the heat shield under 35%.
- **1.4** Earth weather on the launch and the return: four tiers from breezy to hurricane, wind drag and weathervaning, gust slams, drafts, wind shear, lightning, rain, cloud layers and ocean swell. Return score multiplies by the weather. Launch corridor narrowed to 520 m, more air drag on the climb.
- **1.3** Tap-to-thrust on every stage. Marius Tube, a lava tube landing site with a mouth, a pinch point and a skylight. The return trip: lunar ascent off the descent stage, transearth coast, and an Earth reentry with a parachute window, recovery ship and nerve bonus. Launch checkpoint lowered to 2,400 m.

- **1.2** Four landing sites with per-site limits and score multipliers, one of them hidden in a crater. Fixed: the deploy briefing trapped you with no way back to the menu; clipping a pad while climbing counted as a perfect landing; the win screen never took keyboard focus.
- **1.1** Single pad at Tranquility.
