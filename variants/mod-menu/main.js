"use strict";
const goome = require("goome");

const APP_NAME = "My Goome App";

function main() {
  let g;
  try {
    g = goome.open(APP_NAME);
  } catch (e) {
    console.error(`couldnt open an overlay: ${e.message}`);
    return 1;
  }
  try {
    g.hotkey("alt+m", 1);
  } catch (e) {}
  const ui = g.ui();
  const menu = { x: 80, y: 80, w: 300, open: false };
  let fly = false, god = false, speed = 1;
  let running = true;
  while (running) {
    for (const ev of g.events(16)) {
      if (ev.type === goome.QUIT) running = false;
      if (ev.type === goome.HOTKEY) menu.open = !menu.open;
      ui.feed(ev);
    }
    if (!running) break;
    const c = ui.begin(0);
    if (!c) continue;
    if (menu.open) {
      if (ui.window(APP_NAME, menu, goome.WIN_MOVE | goome.WIN_CLOSE)) {
        fly = ui.toggle("Fly", fly);
        god = ui.checkbox("God mode", god);
        speed = ui.slider("Speed", speed, 1, 10, "%.1f");
        if (ui.button("Respawn")) ui.toast("respawned", 2000);
      }
      ui.windowEnd();
    } else {
      c.roundRect(20, 20, 170, 30, 8, 0xc0202838);
      c.text(32, 26, "alt+m opens the menu", 0xffffffff);
    }
    ui.end();
  }
  g.close();
  return 0;
}

process.exitCode = main();
