document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("title").textContent = chrome.i18n.getMessage("welcome_title");
  document.getElementById("subtitle").textContent = chrome.i18n.getMessage("welcome_subtitle");
  document.getElementById("rateButton").textContent = chrome.i18n.getMessage("rate_button");
  document.getElementById("changelogTitle").textContent = chrome.i18n.getMessage("changelog_title");
  document.getElementById("supportTitle").textContent = chrome.i18n.getMessage("support_title");

  // Changelog v1.1.1
  document.getElementById("changelogV111Title").textContent = chrome.i18n.getMessage("changelog_v111_title");
  document.getElementById("changelogV111Item1").textContent = chrome.i18n.getMessage("changelog_v111_item1");
  document.getElementById("changelogV111Item2").textContent = chrome.i18n.getMessage("changelog_v111_item2");

  // Changelog v1.1
  document.getElementById("changelogV11Title").textContent = chrome.i18n.getMessage("changelog_v11_title");
  document.getElementById("changelogV11Item1").textContent = chrome.i18n.getMessage("changelog_v11_item1");
  document.getElementById("changelogV11Item2").textContent = chrome.i18n.getMessage("changelog_v11_item2");
  document.getElementById("changelogV11Item3").textContent = chrome.i18n.getMessage("changelog_v11_item3");
  document.getElementById("changelogV11Item4").textContent = chrome.i18n.getMessage("changelog_v11_item4");
  document.getElementById("changelogV11Item5").textContent = chrome.i18n.getMessage("changelog_v11_item5");
  document.getElementById("changelogV11Item6").textContent = chrome.i18n.getMessage("changelog_v11_item6");
  document.getElementById("changelogV11Item7").textContent = chrome.i18n.getMessage("changelog_v11_item7");
  document.getElementById("changelogV11Item8").textContent = chrome.i18n.getMessage("changelog_v11_item8");

  // Changelog v1.0
  document.getElementById("changelogV10Title").textContent = chrome.i18n.getMessage("changelog_v10_title");
  document.getElementById("changelogV10Item1").textContent = chrome.i18n.getMessage("changelog_v10_item1");
  document.getElementById("changelogV10Item2").textContent = chrome.i18n.getMessage("changelog_v10_item2");
  document.getElementById("changelogV10Item3").textContent = chrome.i18n.getMessage("changelog_v10_item3");
});