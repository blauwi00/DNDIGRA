// Software WebGL can render slowly in CI. Keep real controls and game rules;
// use the same lighting preference available in the game's settings menu.
async function configureBrowserPage(page) {
  page.setDefaultTimeout(120000);
  page.setDefaultNavigationTimeout(120000);
  await page.addInitScript(() => {
    localStorage.setItem('beyond-menu-preferences-explicit', 'true');
    localStorage.setItem('beyond-menu-preferences', JSON.stringify({lights: false}));
  });
}

module.exports = {configureBrowserPage};
