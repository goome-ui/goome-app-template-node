<p align="center">
  <img src="https://raw.githubusercontent.com/goome-ui/.github/main/profile/logo.png" alt="goome" width="150">
</p>

<h1 align="center">🟩 goome app template: Node 🟩</h1>

<p align="center">
<b>A tiny goome app in Node to start from. A normal window, and one toggle turns it into an overlay on top of everything.</b>
</p>

<p align="center">
  <img src="https://goome.wtf/badges/node-18.svg" alt="Node 18+">
  <img src="https://goome.wtf/badges/template-use-me.svg" alt="template">
  <img src="https://img.shields.io/badge/license-GPL--3.0-1b1d22?style=flat-square" alt="GPL-3.0">
</p>

<p align="center">
  Hit <b>Use this template</b> up top and you get your own copy that builds right away, CI included. Or let <a href="https://github.com/goome-ui/goome-cli">goome-cli</a> make it with your own name already in it.<br>
  Its <a href="https://github.com/goome-ui/node-goome">node-goome</a> underneath, the docs for the whole ui kit are at <a href="https://goome.wtf/docs/">goome.wtf/docs</a>.<br> <br>
  Do you like this project? If so, please let me know!
  <a href="https://sevvy-wevvy.com/discord">Discord</a>
</p>

<p align="center">
  <a href="https://goome.wtf/docs/">Docs</a> &nbsp;·&nbsp;
  <a href="https://github.com/goome-ui/goome-cli">goome-cli</a> &nbsp;·&nbsp;
  <a href="https://github.com/goome-ui/node-goome">node-goome</a> &nbsp;·&nbsp;
  <a href="https://github.com/goome-ui/examples">Examples</a>
</p>

<p align="center">
  The <a href="https://goome.wtf/docs/downloads/">ready made apps</a> on the <a href="https://github.com/goome-ui/examples/releases/latest">examples release</a> show what you can build from here.<br>
  If you get stuck, ask in <a href="https://github.com/goome-ui/c-goome/discussions">Discussions</a>. The <a href="https://github.com/goome-ui/node-goome/labels/good%20first%20issue">good first issues</a> on node-goome are small ones if you want to help.
</p>

<details>
<summary align="center"><b>🚀 Make Your Own 🚀</b></summary>

<br>

<p align="center">
<b>Use this template</b> on GitHub gives you this repo as it is. With goome-cli you pick the name and which template you want:
</p>

```sh
pip install git+https://github.com/goome-ui/goome-cli
goome new my-thing --lang node
goome new my-thing --lang node --template hud
```

<p align="center">
It swaps "My Goome App" and friends for your name everywhere, files too, and leaves out the template only stuff.
</p>
</details>

<details>
<summary align="center"><b>🔨 Build And Run 🔨</b></summary>

<br>

<p align="center">
You need Node 18 or newer, 64 bit. goome isnt on npm, so <code>package.json</code> pulls it from the <a href="https://github.com/goome-ui/node-goome/releases">node-goome releases page</a>. That package already has the addon built for linux x64, windows x64 and both macs, so theres nothing to compile.
</p>

```sh
npm install
node main.js
```

<p align="center">
Anywhere else npm builds the addon with node-gyp the first time, that needs a C compiler and Python. On Debian/Ubuntu thats <code>sudo apt install build-essential python3</code>.<br> <br>
To update goome swap <code>0.5.3</code> in both spots of the goome url in <code>package.json</code> for a newer release and run <code>npm install</code> again.
</p>
</details>

<details>
<summary align="center"><b>🧩 Other Templates 🧩</b></summary>

<br>

<p align="center">
<code>variants/</code> has the other starting points. Each one is the file that replaces <code>main.js</code>:<br> <br>
<b>overlay</b> - a see-through overlay over the whole desktop, only the window takes clicks. alt+h hides it<br>
<b>mod-menu</b> - a menu with toggles and sliders over whatever game is running, alt+m opens and closes it<br>
<b>hud</b> - a little panel in the corner with the time and fps, every click goes straight through it<br><br>
<code>goome new</code> puts the one you pick in place for you. By hand, copy the file over <code>main.js</code> and delete <code>variants/</code>.
</p>
</details>

<details>
<summary align="center"><b>🧪 Testing Without A Screen 🧪</b></summary>

<br>

<p align="center">
goome has a test backend that fakes a whole screen, so the app runs in CI with nothing on screen. The script says what the "user" does and you get a screenshot of every frame in <code>shots/</code>. This one clicks the toggle:
</p>

```sh
GOOME_BACKEND=test GOOME_TEST_SHOTS=shots/ GOOME_TEST_SCRIPT="screen 1280x720 1; 3 click 60,28; end 6" node main.js
```

<p align="center">
CI does that on linux, windows and mac on every push. The script format is in the <a href="https://github.com/goome-ui/c-goome/blob/main/docs/DESIGN.md">c-goome docs</a> under Test.
</p>
</details>

<details>
<summary align="center"><b>🛠 Pull Requests 🛠</b></summary>

<br>

<p align="center">
Want to help with this template? Make A pull request to <b>dev</b>!<br>
Keep it small, its supposed to be the least code you need to get going. Bugs in goome itself go to <a href="https://github.com/goome-ui/node-goome">node-goome</a>.<br> <br>
As long as it works, and doesnt vary off too far from the main idea its very likely it get accepted!<br>
Read <a href="CONTRIBUTING.md">CONTRIBUTING.md</a> before you send one.
</p>
</details>

<details>
<summary align="center"><b>⚖️ License ⚖️</b></summary>

<br>

<p align="center">
This template is under the <a href="LICENSE">GPL-3.0</a>, same as goome.<br> <br>
<sub>
• You can use it, change it and share it<br>
• If you share something made with it, you have to share your source too, under the same license<br>
• Keep the credits
</sub><br> <br>
In short: play fair, keep it open, and give credit where it's due.
</p>
</details>

<details>
<summary align="center"><b>🩷 Donate 🩷</b></summary>

<br>

<p align="center">
<a href="https://sevvy-wevvy.com/kofi">Ko-fi</a> (Preferred)<br>
<a href="https://sevvy-wevvy.com/patreon">Patreon</a><br>
<a href="https://sevvy-wevvy.com/throne">Throne</a>
</p>
</details>

<p align="center">
<b>🫶 Contributors 🫶</b><br>
Thanks to everyone who helped out!<br> <br>
<a href="https://github.com/goome-ui/goome-app-template-node/graphs/contributors"><img src="https://contrib.rocks/image?repo=goome-ui/goome-app-template-node" alt="contributors"></a>
</p>
