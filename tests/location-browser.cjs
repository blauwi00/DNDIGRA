const fs = require("fs"), http = require("http"), path = require("path"), assert = require("node:assert/strict");
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
(async () => {
  const root = path.resolve(__dirname, "../dist"), qa = path.resolve(__dirname, "../qa");
  fs.mkdirSync(qa, { recursive: true });
  const server = http.createServer((q, r) => {
    if (q.url.startsWith("/api")) {
      r.setHeader("Content-Type", "application/json");
      return r.end('{"heroes":[],"worlds":[]}');
    }
    try {
      const f = path.join(root, q.url.split("?")[0] === "/" ? "index.html" : q.url.split("?")[0]);
      r.setHeader("Content-Type", { js: "application/javascript", css: "text/css", html: "text/html", svg: "image/svg+xml", png: "image/png", woff: "font/woff" }[f.split(".").pop()] || "application/octet-stream");
      r.end(fs.readFileSync(f));
    } catch {
      r.statusCode = 404;
      r.end();
    }
  });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  let browser;
  try {
    browser = await chromium.launch({ executablePath: process.env.CHROME_EXECUTABLE, args: [...JSON.parse(process.env.CHROMIUM_ARGS || "[]"), "--no-sandbox", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }), errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("http://127.0.0.1:" + server.address().port);
    await page.waitForFunction(() => window.voxel?.ready);
    await page.evaluate(() => {
      document.querySelectorAll("dialog").forEach((d) => d.close());
      CinematicMenu.play();
      Worlds.detach();
      gameDebug.test("reset");
      gameDebug.state.settings.animations = false;
      viewsDebug.switchTab("map");
    });
    async function interact(id) {
      console.log("INTERACT", id);
      await page.evaluate((id2) => {
        closeDialogue();
        gameDebug.select(gameDebug.props.find((p) => p.id === id2));
      }, id);
      assert.ok(await page.locator("#action").isEnabled(), id);
      await page.locator("#action").click();
      await page.waitForFunction(() => !gameDebug.busy);
    }
    async function shot(name) {
      await page.evaluate(() => {
        closeDialogue();
        camera.fit();
      });
      await page.waitForTimeout(150);
      await page.screenshot({ path: path.join(qa, name) });
      const b = await page.evaluate(() => ({ dock: document.querySelector(".play-dock").getBoundingClientRect().bottom, tabs: document.querySelector(".tabs").getBoundingClientRect().top }));
      assert.ok(b.dock <= b.tabs + 1);
    }
    for (const seed of ["tavern-1", "qa-8"]) {
      await page.evaluate(() => ProceduralLocations.open());
      await page.locator('#modal-body details summary').click();
      await page.locator("#location-seed").fill(seed);
      await page.locator("#generate-locations").click();
      await page.waitForFunction(() => gameDebug.state.scene === "proc-street");
      if (seed === "tavern-1") {
        await shot("locations-street-390.png");
        await interact("street-guard");
        assert.match(await page.locator("#speaker-caption").innerText(), /Рада/);
        assert.equal(await page.locator("#speaker-art svg").count(), 1);
      }
      await interact("to-tavern");
      assert.equal(await page.evaluate(() => gameDebug.state.scene), "proc-tavern");
      await interact("innkeeper");
      assert.match(await page.locator("#dialogue-text").innerText(), /Медный фонарь/);
      assert.match(await page.locator("#target-art svg").getAttribute("aria-label"), /Брам/);
      assert.ok(await page.evaluate(() => gameDebug.state.doors["proc-tavern:hall-door"]));
      if (seed === "tavern-1") await shot("locations-tavern-390.png");
      await interact("to-cellar");
      assert.equal(await page.evaluate(() => gameDebug.state.scene), "proc-cellar");
      if (seed === "tavern-1") await shot("locations-cellar-390.png");
      const gold = await page.evaluate(() => gameDebug.state.gold);
      await interact("cellar-chest");
      assert.equal(await page.evaluate(() => gameDebug.state.gold), gold + 15);
      await page.evaluate(() => {
        gameDebug.state.active = gameDebug.state.party[1].id;
        gameDebug.render();
      });
      await interact("to-tavern");
      assert.ok(await page.evaluate(() => {
        const p = gameDebug.props.find((p2) => p2.id === "to-cellar"), a = gameDebug.active();
        return Math.abs(a.x - p.x) + Math.abs(a.y - p.y) === 1;
      }));
      await interact("to-street");
      assert.equal(await page.evaluate(() => gameDebug.state.scene), "proc-street");
    }
    const snapshot = () => ({ seed: gameDebug.state.procedural, scene: gameDebug.state.scene, party: gameDebug.state.party.map((p) => [p.x, p.y]), doors: gameDebug.state.doors, loot: gameDebug.state.loot, layout: JSON.stringify(ProceduralLocations.current.locations) });
    const before = await page.evaluate(snapshot);
    await page.reload();
    await page.waitForFunction(() => window.voxel?.ready);
    assert.deepEqual(await page.evaluate(snapshot), before);
    await page.evaluate(() => {
      document.querySelectorAll("dialog").forEach((d) => d.close());
      ProceduralLocations.open();
    });
    await page.locator('#modal-body details summary').click();
    await page.evaluate(()=>document.getElementById('location-seed').value='a'.repeat(65));
    await page.locator("#generate-locations").click();
    assert.match(await page.locator("#generation-result").innerText(), /Seed/);
    assert.equal(await page.evaluate(() => gameDebug.state.procedural.seed), "qa-8");
    await page.locator("#location-seed").fill("tavern-1");
    assert.equal(await page.locator("#generation-result").innerText(), "");
    for (const width of [320, 390]) {
      await page.setViewportSize({ width, height: 844 });
      const b = await page.evaluate(() => ({ title: document.getElementById("modal-title").getBoundingClientRect().right, close: document.getElementById("close").getBoundingClientRect().left, scroll: document.body.scrollWidth }));
      assert.ok(b.title <= b.close && b.scroll <= width);
    }
    await page.screenshot({ path: path.join(qa, "locations-seed-390.png") });
    assert.deepEqual(errors, []);
    const report = { pass: true, seeds: 2, fullRoundTrips: 2, viewport: [390, 844], reload: true, physicalIPhoneTested: false, errors };
    fs.writeFileSync(path.join(qa, "locations-browser-results.json"), JSON.stringify(report, null, 2));
    console.log(JSON.stringify(report));
  } finally {
    await browser?.close();
    server.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
