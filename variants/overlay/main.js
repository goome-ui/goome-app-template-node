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
    g.hotkey("alt+h", 1);
  } catch (e) {}
  const ui = g.ui();
  const win = { x: 60, y: 60, w: 280, open: true };
  let clicks = 0, hidden = false;
  while (win.open) {
    for (const ev of g.events(16)) {
      if (ev.type === goome.QUIT) win.open = false;
      if (ev.type === goome.HOTKEY) hidden = !hidden;
      ui.feed(ev);
    }
    if (!win.open || !ui.begin(0)) continue;
    if (!hidden) {
      if (ui.window(APP_NAME, win, goome.WIN_MOVE | goome.WIN_CLOSE)) {
        ui.label("im on top of everything");
        if (ui.button("Click me")) clicks++;
        ui.label(`clicked ${clicks} times`);
        ui.label("alt+h hides me");
      }
      ui.windowEnd();
    }
    ui.end();
  }
  g.close();
  return 0;
}

process.exitCode = main();
