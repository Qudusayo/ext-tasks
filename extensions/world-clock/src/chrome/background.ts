export {};

const extensionIconClickListener = () => {
  chrome.tabs.create({ url: chrome.runtime.getURL("index.html") });
};

chrome.action.onClicked.addListener(extensionIconClickListener);
