document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("popupEnjoy").textContent = chrome.i18n.getMessage("popup_enjoy");
  document.getElementById("popupRate").textContent = chrome.i18n.getMessage("popup_rate");
  document.getElementById("popupSupport").textContent = chrome.i18n.getMessage("popup_support");
});