const GOOGLE_ORIGIN = 'https://remix.ethereum.org';
console.log("Hello");
// Allows users to open the side panel by clicking on the action toolbar icon
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
    console.log(tab.url);
  if (!tab.url) return;
  const url = new URL(tab.url);
  // Enables the side panel on google.com
  console.log(url.origin);
  if (url.origin === GOOGLE_ORIGIN) {
    console.log("Hello");
    await chrome.sidePanel.setOptions({
      tabId,
      path: 'sidepanel.html',
      enabled: true
    });
  } else {
    // Disables the side panel on all other sites
    await chrome.sidePanel.setOptions({
      tabId,
      enabled: false
    });
  }
});