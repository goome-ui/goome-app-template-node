"use strict";
const goome = require("goome");

const APP_NAME = "My Goome App";

const state = { clicks: 0, volume: 0.5, overlay: false, shown: false };
const win = { x: 40, y: 60, w: 300 };

function openMode(overlay) {
  if (!overlay) return goome.openApp(APP_NAME, 640, 420);
  const g = goome.open(APP_NAME);
  const mons = g.monitors();
  win.x = mons.length ? mons[0].area.x + mons[0].area.w - 340 : 40;
  return g;
}

function contents(ui) {
  state.overlay = ui.toggle("Overlay mode", state.overlay);
  ui.separator();
  ui.pushColor(goome.S_TEXT, ui.animColor("hello", state.shown ? 0xfff2f4f8 : 0x00f2f4f8, 600, goome.EASE_OUT));
  state.shown = true;
  ui.heading("Hello from " + APP_NAME);
  ui.pop(1);
  if (ui.button("Click me")) state.clicks++;
  ui.label(`clicked ${state.clicks} times`);
  state.volume = ui.slider("Volume", state.volume, 0, 1, "%.2f");
}

function main() {
  let g;
  try {
    g = openMode(false);
  } catch (e) {
    console.error(`couldnt open a window: ${e.message}`);
    return 1;
  }
  let ui = g.ui();
  let mode = false;
  let running = true;
  while (running) {
    for (const ev of g.events(16)) {
      if (ev.type === goome.QUIT || ev.type === goome.CLOSE) running = false;
      ui.feed(ev);
    }
    if (!running) break;
    if (state.overlay !== mode) {
      g.close();
      try {
        g = openMode(state.overlay);
      } catch (e) {
        console.error("no overlay here, staying in window mode");
        state.overlay = false;
        g = openMode(false);
      }
      mode = state.overlay;
      ui = g.ui();
      console.log(mode ? "overlay mode" : "window mode");
      continue;
    }
    if (!ui.begin(0)) continue;
    if (mode) {
      if (ui.window(APP_NAME, win, goome.WIN_MOVE | goome.WIN_COLLAPSE)) contents(ui);
      ui.windowEnd();
    } else {
      ui.app(APP_NAME);
      contents(ui);
      ui.appEnd();
    }
    ui.end();
  }
  g.close();
  return 0;
}

process.exitCode = main();
