"use strict";
const goome = require("goome");

const APP_NAME = "My Goome App";

function clock() {
  return new Date().toTimeString().slice(0, 8);
}

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
  const start = goome.nowMs();
  const pace = new goome.Pacer(30);
  let last = start, fps = 0, hidden = false, running = true;
  while (running) {
    for (const ev of g.events(pace.wait())) {
      if (ev.type === goome.QUIT) running = false;
      if (ev.type === goome.HOTKEY) hidden = !hidden;
    }
    if (!running) break;
    const now = goome.nowMs();
    if (now > last) fps = fps * 0.9 + 100 / (now - last);
    last = now;
    g.frame(0, (c) => {
      if (hidden) return;
      c.roundRect(20, 20, 160, 92, 10, 0xb0141820);
      c.text(34, 30, clock(), 0xffffffff, true);
      c.text(34, 62, `up ${Math.floor((now - start) / 1000)}s`, 0xffc0c8d0);
      c.text(34, 84, `${fps.toFixed(0)} fps`, 0xff6fdc5f);
    });
  }
  g.close();
  return 0;
}

process.exitCode = main();
