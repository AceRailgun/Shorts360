let rotation = 0;
let previousRotation = 0;
let isManuallyRotated = false;

// Shorts360 
function isFullscreen() {
  return !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement);
}

const SCALE_NORMAL = 1.78;       
const SCALE_FULLSCREEN = 1.83;   

function rotateVideo(video, angle) {
  isManuallyRotated = true;
  const isHorizontal = angle === 90 || angle === 270;
  const fullscreen = isFullscreen();
  const scale = fullscreen && isHorizontal ? SCALE_FULLSCREEN : SCALE_NORMAL;

  Object.assign(video.style, {
    position: "fixed",
    top: "50%",
    left: "50%",
    transformOrigin: "center center",
    transform: `translate(-50%, -50%) rotate(${angle}deg) scale(${scale})`,
    maxWidth: "100vw",
    maxHeight: "100vh",
    zIndex: "9998",
    objectFit: isHorizontal ? "contain" : "cover",
    transition: "transform 0.3s ease"
  });
}

function rotatePlayer(player) {
  isManuallyRotated = true; 
  Object.assign(player.style, {
    transformOrigin: "center center",
    transition: "transform 0.3s ease",
    transform: "rotate(180deg)",
    position: "relative"
  });
}

function restoreVideo(video, previousAngle) {
  isManuallyRotated = false; 
  if (previousAngle === 270) {
    video.style.position = "";
    video.style.top = "";
    video.style.left = "";
    video.style.transform = "";
    video.style.transformOrigin = "";
    video.style.zIndex = "";
    video.style.transition = "";
    video.style.width = `${video.videoWidth}px`;
    video.style.height = `${video.videoHeight}px`;
  }
}

function resetPlayerStyles() {
  const player = document.getElementById("shorts-player");
  if (!player) return;
  player.style.transform = "";
  player.style.transition = "";
}
// Shorts360 


//Ocultar Overlay 
function toggleOverlay() {
  const overlay = document.querySelector("ytd-reel-player-overlay-renderer");
  const controls = document.querySelector("ytd-shorts-player-controls");
  if (!overlay && !controls) return;

  [overlay, controls].forEach(el => {
    if (!el) return;
    el.style.transition = "opacity 0.3s ease";
  });

  const isHidden = overlay && overlay.style.opacity === "0";

  if (isHidden) {
    // Fade in
    [overlay, controls].forEach(el => {
      if (!el) return;
      el.style.display = "";
      el.style.opacity = "1";
      // ⚠️ no tocar pointerEvents, se queda en auto
    });
    console.log("UI mostrada");
  } else {
    // Fade out
    [overlay, controls].forEach(el => {
      if (!el) return;
      el.style.opacity = "0";
      // ⚠️ no tocar pointerEvents, siguen activos aunque invisibles
    });
    console.log("UI oculta pero botones siguen clicables");
  }
}

(function installStyle(){
  const id = "shorts-neutralize-style";
  if (document.getElementById(id)) return;
  const style = document.createElement("style");
  style.id = id;
  style.textContent = `
    ytd-reel-player-overlay-renderer { pointer-events: none !important; }
    .ui-hidden ytd-reel-player-overlay-renderer,
    .ui-hidden ytd-shorts-player-controls {
      opacity: 0 !important;
      visibility: hidden !important;
      transition: opacity 0.3s ease !important;
    }
  `;
  document.head.appendChild(style);
})();

//Ocultar Overlay 



// BTN360 
function insertButton() {
  const overlay = document.querySelector("ytd-reel-player-overlay-renderer");
  if (!overlay) return;
  const interactionGroup = overlay.querySelector("#actions"); 
  if (!interactionGroup || interactionGroup.querySelector(".rotate-button")) return;
  insertHideOverlayButton(interactionGroup); 
  function insertHideOverlayButton() {
  const overlay = document.querySelector("ytd-reel-player-overlay-renderer");
  if (!overlay) return;
  const interactionGroup = overlay.querySelector("#actions");
  if (!interactionGroup || interactionGroup.querySelector(".hide-overlay-button")) return;
  const wrapper = document.createElement("div");
  Object.assign(wrapper.style, {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "48px",
    marginBottom: "12px",
    cursor: "pointer",
    zIndex: "1000"
  });
  const btn = document.createElement("div");
  btn.className = "hide-overlay-button";
  Object.assign(btn.style, {
    width: "48px",
    height: "48px",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  });
  const icon = document.createElement("img");
  icon.src = chrome.runtime.getURL("assets/overlay-icon.png");
  Object.assign(icon.style, {
  width: "36px",
  height: "36px",
  filter: "brightness(100%)",
  pointerEvents: "none"
 });
 document.body.appendChild(icon);

  btn.appendChild(icon);
  wrapper.appendChild(btn);
  interactionGroup.insertBefore(wrapper, interactionGroup.firstChild);
btn.onclick = () => {
  toggleOverlay(); 
};
const label = document.createElement("span");
label.textContent = "Hide"; 
Object.assign(label.style, {
  fontSize: "12px",
  color: "#fff",
  marginTop: "4px",
  fontFamily: "Roboto, Arial, sans-serif",
  textAlign: "center",
  pointerEvents: "none"
});
wrapper.appendChild(btn);
wrapper.appendChild(label);
interactionGroup.insertBefore(wrapper, interactionGroup.firstChild);
}
  const wrapper = document.createElement("div");
  Object.assign(wrapper.style, {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "48px",
    marginBottom: "12px",
    cursor: "pointer",
    zIndex: "1000"
  });
  const btn = document.createElement("div");
  btn.className = "rotate-button";
  Object.assign(btn.style, {
    width: "48px",
    height: "48px",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  });
  const icon = document.createElement("img");
  icon.src = chrome.runtime.getURL("assets/rotate-icon.png");
  Object.assign(icon.style, {
  width: "36px",
  height: "36px",
  filter: "brightness(100%)",
  pointerEvents: "none"
 });
 document.body.appendChild(icon);

  btn.appendChild(icon);
  const label = document.createElement("span");
  label.textContent = "0°";
  Object.assign(label.style, {
    fontSize: "12px",
    color: "#fff",
    marginTop: "4px",
    fontFamily: "Roboto, Arial, sans-serif",
    textAlign: "center",
    pointerEvents: "none"
  });
  wrapper.appendChild(btn);
  wrapper.appendChild(label);
  interactionGroup.insertBefore(wrapper, interactionGroup.firstChild);
  btn.onclick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    shiftActionButtons();
    const video = document.querySelector("video");
    const player = document.getElementById("shorts-player");
    if (!video || !player) return;
    const prev = rotation;
    rotation = (rotation + 90) % 360;
    label.textContent = `${rotation}°`;
    resetPlayerStyles();
    if (rotation === 0) {
    restoreVideo(video, previousRotation);
    if (prev === 270) { 
    safeFullscreenRefresh(video, rotation);
  }
  previousRotation = rotation;
  return;
}
if (rotation === 180) {
  rotatePlayer(player);
  if (prev === 90) { 
    safeFullscreenRefresh(video, rotation);
  }
  previousRotation = rotation;
  return;
}
    rotateVideo(video, rotation);
    previousRotation = rotation;
  }; 
}
// BTN360 


//Observer y eventos 
// Observer
const observer = new MutationObserver(() => {
  const video = document.querySelector("video");
  if (!video) return;
  const player = document.getElementById("shorts-player");
  // Rotación
  if (rotation === 90 || rotation === 270) {
    rotateVideo(video, rotation);
    shiftActionButtons();
  } else if (rotation === 180) {
    if (player) {
      rotatePlayer(player);
      shiftActionButtons();
    }
  } else {
    restoreVideo(video, previousRotation);
    insertButton();
    insertVideoButton();
    shiftActionButtons();
    insertSpeedButton();
  }
});
observer.observe(document.body, { childList: true, subtree: true });
document.addEventListener("fullscreenchange", () => {
  if (isManuallyRotated) return;
  shiftActionButtons();
});
window.addEventListener("resize", () => {
  const video = document.querySelector("video");
  if (isManuallyRotated || !video) return;
  if (rotation === 90 || rotation === 270) rotateVideo(video, rotation);
});
async function safeFullscreenRefresh(video, angle) {
  const container = video.closest("ytd-reel-video-renderer") || video.parentElement || video;
  if (!container?.requestFullscreen) return;
  try {
    await container.requestFullscreen();
    setTimeout(() => {
      if (document.fullscreenElement) {
        document.exitFullscreen().then(() => {
          if (angle === 0) {
            restoreVideo(video, previousRotation);
          } else if (angle === 180) {
            rotatePlayer(document.getElementById("shorts-player"));
          } else {
            rotateVideo(video, angle);
          }
        });
      }
    }, 100);
  } catch {}
}
//Observer y eventos 


//Detectar pantalla completa 
document.addEventListener("fullscreenchange", () => {
  const video = document.querySelector("video");
  const player = document.getElementById("shorts-player");
  if (!video || !player) return;

  applyFullscreenLayout(!!document.fullscreenElement);

  if (document.fullscreenElement) {
    if (rotation === 90 || rotation === 270) {
      rotateVideo(video, rotation);
    } else if (rotation === 180) {
      rotatePlayer(player);
    } else {
      restoreVideo(video, previousRotation);
    }
  } else {
    if (rotation === 90 || rotation === 270) {
      rotateVideo(video, rotation);
    } else if (rotation === 180) {
      rotatePlayer(player);
    } else {
      restoreVideo(video, previousRotation);
    }
  }

  if (!isManuallyRotated) {
    shiftActionButtons();
  }
});

// Real fullscreen 
function applyFullscreenLayout(active) {
  const nav = document.querySelector(".navigation-container.style-scope.ytd-shorts");
  const shorts = document.querySelector("ytd-shorts");
  const inner = document.querySelector("#shorts-inner-container");

  if (active) {
    if (nav) nav.style.setProperty("display", "none", "important");
    if (shorts) {
      shorts.style.setProperty("display", "flex", "important");
      shorts.style.setProperty("justify-content", "center", "important");
      shorts.style.setProperty("align-items", "center", "important");
    }
    if (inner) {
      inner.style.setProperty("margin-left", "0", "important");
      inner.style.setProperty("width", "100vw", "important");
      inner.style.setProperty("max-width", "100vw", "important");
    }
  } else {
    if (nav) nav.style.removeProperty("display");
    if (shorts) {
      shorts.style.removeProperty("display");
      shorts.style.removeProperty("justify-content");
      shorts.style.removeProperty("align-items");
    }
    if (inner) {
      inner.style.removeProperty("margin-left");
      inner.style.removeProperty("width");
      inner.style.removeProperty("max-width");
    }
  }
}

// Real fullscreen 
//Detectar pantalla completa 


//Mover interfaz en pantalla completa cuando está rotado 
function shiftActionButtons() {
  const actions = document.querySelector("ytd-reel-player-overlay-renderer #actions");
  if (!actions) return;

  if (rotation === 90 || rotation === 270) {
    Object.assign(actions.style, {
      marginLeft: "auto",
      marginRight: "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end"
    });
  } else {
    actions.style.marginLeft = "";
    actions.style.marginRight = "";
    actions.style.alignItems = "";
  }
}
//Mover interfaz en pantalla completa cuando está rotado 


// BTN Switch to video
// BTN Video 
function insertVideoButton() {
  const overlay = document.querySelector("ytd-reel-player-overlay-renderer");
  if (!overlay) return;

  const interactionGroup = overlay.querySelector("#actions");
  if (!interactionGroup || interactionGroup.querySelector(".video-button")) return;

  const wrapper = document.createElement("div");
  Object.assign(wrapper.style, {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "48px",
    marginBottom: "12px",
    cursor: "pointer",
    zIndex: "1000"
  });

  const btn = document.createElement("div");
  btn.className = "video-button";
  Object.assign(btn.style, {
    width: "48px",
    height: "48px",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  });

  const icon = document.createElement("img");
  icon.src = chrome.runtime.getURL("assets/open-icon.png");
  Object.assign(icon.style, {
  width: "32px",
  height: "32px",
  filter: "brightness(100%)",
  pointerEvents: "none"
 });
 document.body.appendChild(icon);

  btn.appendChild(icon);

  const label = document.createElement("span");
  label.textContent = "Video";
  Object.assign(label.style, {
    fontSize: "12px",
    color: "#fff",
    marginTop: "4px",
    fontFamily: "Roboto, Arial, sans-serif",
    textAlign: "center",
    pointerEvents: "none"
  });

  wrapper.appendChild(btn);
  wrapper.appendChild(label);
  interactionGroup.insertBefore(wrapper, interactionGroup.firstChild);

  wrapper.appendChild(btn);
  wrapper.appendChild(label);
  interactionGroup.insertBefore(wrapper, interactionGroup.firstChild);

  wrapper.addEventListener("click", switchToNormalVideo);
}


function switchToNormalVideo() {
  const match = location.href.match(/\/shorts\/([^/?]+)/);
  if (match && match[1]) {
    const videoId = match[1];
    location.href = `https://www.youtube.com/watch?v=${videoId}`;
  }
}
// BTN Switch to video
// BTN Video 


// detectar letra R 
document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() !== "r") return;

  const btn = document.querySelector(".rotate-button");
  if (btn) {
    btn.click();
  }
});
// detectar letra R 

// detectar letra O 
document.addEventListener("keydown", (event) => {
  if (/INPUT|TEXTAREA/.test(event.target.tagName)) return;
  if (event.key.toLowerCase() === "o") toggleOverlay();
}, true);

document.addEventListener("click", (e) => {
  if (e.target.id === "hide-ui-btn") toggleOverlay();
});
// detectar letra O 

// detectar S 
document.addEventListener("keydown", (event) => {
  if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA" || event.target.isContentEditable) {
    return;
  }
  if (event.key.toLowerCase() === "s") {
    switchToNormalVideo();
  }
});
// detectar S 



// MENSAJE F11 
(function shorts360F11Toast(){
  if (document.getElementById("shorts360-f11-toast")) return;

  const lang = navigator.language || "en";
  const isSpanish = lang.startsWith("es");

  function isOnShorts() {
    const pathOK = location.pathname.startsWith("/shorts");
    const domOK =
      document.querySelector("ytd-reel-video-renderer") ||
      document.querySelector("#shorts-player") ||
      document.querySelector("ytd-shorts");
    return pathOK || !!domOK;
  }

  const style = document.createElement("style");
  style.id = "shorts360-f11-toast-style";
  style.textContent = `
    #shorts360-f11-toast {
      position: fixed;
      left: 50%;
      bottom: 24px;
      transform: translateX(-50%);
      max-width: 680px;
      padding: 12px 16px;
      border-radius: 8px;
      background: rgba(20,20,20,0.9);
      color: #fff;
      font: 500 14px/1.5 system-ui, sans-serif;
      box-shadow: 0 8px 24px rgba(0,0,0,0.35);
      z-index: 999999;
      pointer-events: none;
      opacity: 0; /* estado inicial invisible */
      will-change: opacity;
      transition: opacity 500ms ease; /* fade de 500ms */
    }
    #shorts360-f11-toast.show {
      opacity: 1; /* aparece con fade-in */
    }
  `;
  document.head.appendChild(style);

  const toast = document.createElement("div");
  toast.id = "shorts360-f11-toast";
  toast.innerHTML = isSpanish
  ? "<strong>Se ha detectado pantalla completa con F11.</strong><br>Shorts360 puede usarse en este modo, pero no está optimizado.<br>Recomendamos usar la pantalla completa de YouTube (tecla F) para una experiencia más fluida."
  : "<strong>Detected browser fullscreen (F11).</strong><br>Shorts360 can be used in this mode, but it is not optimized.<br>We recommend using YouTube’s fullscreen (key F) for a smoother experience.";
  document.body.appendChild(toast);

  let hideTimer = null;

  function showToast(){
    void toast.offsetWidth;
    requestAnimationFrame(() => {
      toast.classList.add("show");
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => {
        toast.classList.remove("show"); // fade-out
      }, 6000);
    });
  }
  window.addEventListener("keydown", (e) => {
    if (e.key === "F11" && isOnShorts()) {
      showToast();
    }
  });

})();
// MENSAJE F11 





// BOTON DE VELOCIDAD 
function isShortsPage() {
  return window.location.pathname.startsWith("/shorts/");
}

function cycleSpeed() {
  if (!isShortsPage()) return;
  const video = document.querySelector("video");
  if (!video) return;
  let newRate;
  if (video.playbackRate === 0.5) newRate = 0.75;
  else if (video.playbackRate === 0.75) newRate = 1;
  else if (video.playbackRate === 1) newRate = 1.25;
  else if (video.playbackRate === 1.25) newRate = 1.5;
  else if (video.playbackRate === 1.5) newRate = 1.75;
  else if (video.playbackRate === 1.75) newRate = 2;
  else newRate = 2; 

  video.playbackRate = newRate;
sessionStorage.setItem("shortsPlaybackRate", newRate);
updateChecks(video);
showSpeedOverlay(newRate); 
console.log("Speed:", newRate);

}

// Detectar shift + > 
document.addEventListener("keydown", (e) => {
  if (e.shiftKey && e.key === ">") {
    cycleSpeed();
  }
});
// Detectar shift + > 

// Menos velocidad 
function cycleSpeedDown() {
  if (!isShortsPage()) return;
  const video = document.querySelector("video");
  if (!video) return;

  let newRate;
  if (video.playbackRate === 2) newRate = 1.75;
  else if (video.playbackRate === 1.75) newRate = 1.5;
  else if (video.playbackRate === 1.5) newRate = 1.25;
  else if (video.playbackRate === 1.25) newRate = 1;
  else if (video.playbackRate === 1) newRate = 0.75;
  else if (video.playbackRate === 0.75) newRate = 0.5;
  else newRate = 0.5; 

  video.playbackRate = newRate;
sessionStorage.setItem("shortsPlaybackRate", newRate);
updateChecks(video);
showSpeedOverlay(newRate); 
console.log("Speed:", newRate);
}

// Detectar shift + < 
document.addEventListener("keydown", (e) => {
  if (e.shiftKey && e.key === "<") {
    cycleSpeedDown();
  }
});
// Detectar shift + < 

// BTN Speed
function updateChecks(video) {
  const menu = document.querySelector(".speed-menu");
  if (!menu) return;
  const options = menu.querySelectorAll(".speed-option"); 
  options.forEach(opt => {
    const rate = parseFloat(opt.textContent);
    const checkIcon = opt.querySelector("img");
    if (checkIcon) {
      checkIcon.style.display = (video && video.playbackRate === rate) ? "inline" : "none";
    }
  });
}

function insertSpeedButton() {
  const savedRate = sessionStorage.getItem("shortsPlaybackRate");
  if (savedRate) {
    const video = document.querySelector("video");
    if (video) {
      video.playbackRate = parseFloat(savedRate);
    }
  }

  const overlay = document.querySelector("ytd-reel-player-overlay-renderer");
  if (!overlay) return;

  const interactionGroup = overlay.querySelector("#actions");
  if (!interactionGroup || interactionGroup.querySelector(".speed-button")) return;

  const wrapper = document.createElement("div");
  Object.assign(wrapper.style, {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "48px",
    marginBottom: "12px",
    cursor: "pointer",
    zIndex: "1000",
    position: "relative"
  });

  const btn = document.createElement("div");
  btn.className = "speed-button";
  Object.assign(btn.style, {
    width: "48px",
    height: "48px",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative"
  });

  const icon = document.createElement("img");
  icon.src = chrome.runtime.getURL("assets/speed-icon.png");
  Object.assign(icon.style, {
    width: "32px",
    height: "32px",
    filter: "brightness(100%)",
    pointerEvents: "none"
  });

  btn.appendChild(icon);

  const label = document.createElement("span");
  label.textContent = "Speed";
  Object.assign(label.style, {
    fontSize: "12px",
    color: "#fff",
    marginTop: "4px",
    fontFamily: "Roboto, Arial, sans-serif",
    textAlign: "center",
    pointerEvents: "none"
  });

  wrapper.appendChild(btn);
  wrapper.appendChild(label);

  interactionGroup.insertBefore(wrapper, interactionGroup.firstChild);

  // Menú flotante
  const menu = document.createElement("div");
  menu.className = "speed-menu"; 
  Object.assign(menu.style, {
    display: "block",
    position: "absolute",
    top: "60px",
    left: "-80px",
    backgroundColor: "rgba(34,34,34,0.85)",
    borderRadius: "6px",
    padding: "4px 0",
    boxShadow: "0 2px 10px rgba(0,0,0,0.5)",
    zIndex: "2000",
    opacity: "0",
    visibility: "hidden",
    transition: "opacity 0.3s ease, visibility 0.3s ease"
  });

  const speeds = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
  const options = [];

  speeds.forEach(rate => {
    const option = document.createElement("div");
    option.className = "speed-option"; 
    option.textContent = `${rate}x`;
    Object.assign(option.style, {
      padding: "6px 16px",
      fontSize: "14px",
      color: "#fff",
      fontFamily: "Roboto, Arial, sans-serif",
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-between"
    });

    const check = document.createElement("img");
    check.src = chrome.runtime.getURL("assets/check-icon.png");
    Object.assign(check.style, {
      width: "16px",
      height: "16px",
      marginLeft: "8px",
      filter: "brightness(100%)",
      display: "none"
    });
    option.appendChild(check);

    option.addEventListener("mouseenter", () => {
      option.style.backgroundColor = "#444";
    });
    option.addEventListener("mouseleave", () => {
      option.style.backgroundColor = "transparent";
    });

    option.addEventListener("click", () => {
      const video = document.querySelector("video");
      if (video) {
        video.playbackRate = rate;
        sessionStorage.setItem("shortsPlaybackRate", rate);
        updateChecks(video); 
      }
      menu.style.opacity = "0";
      menu.style.visibility = "hidden";
    });

    options.push(option);
    menu.appendChild(option);
  });

  wrapper.appendChild(menu);

  // Mostrar/ocultar menú con fade y actualizar selección
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();
    const video = document.querySelector("video");
    if (menu.style.visibility === "hidden") {
      updateChecks(video); 
      menu.style.visibility = "visible";
      menu.style.opacity = "1";
    } else {
      menu.style.opacity = "0";
      menu.style.visibility = "hidden";
    }
  });

  // Cerrar menú si se hace clic fuera
  document.addEventListener("click", (e) => {
    if (!wrapper.contains(e.target)) {
      menu.style.opacity = "0";
      menu.style.visibility = "hidden";
    }
  });
}

// Overlay de velocidad 
function showSpeedOverlay(rate) {
  // Si ya existe un overlay, lo eliminamos para evitar duplicados
  let existing = document.querySelector(".speed-overlay");
  if (existing) existing.remove();

  const overlay = document.createElement("div");
  overlay.className = "speed-overlay";
  overlay.textContent = `${rate}x`; 

  Object.assign(overlay.style, {
    position: "absolute",
    top: "75px",              
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "rgba(0,0,0,0.5)", 
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "4px",
    fontSize: "14px",
    fontFamily: "Roboto, Arial, sans-serif",
    zIndex: "9999",
    opacity: "0",
    transition: "opacity 0.3s ease"
  });

  // Insertar en el contenedor del video
  const player = document.querySelector("ytd-reel-player-overlay-renderer") || document.body;
  player.appendChild(overlay);

  // Fade in
  requestAnimationFrame(() => {
    overlay.style.opacity = "1";
  });

  // Fade out 
  setTimeout(() => {
    overlay.style.opacity = "0";
    setTimeout(() => overlay.remove(), 300);
  }, 1200);
}
// BOTON DE VELOCIDAD 



// Switch to Shorts 
function switchToShorts() {
  const match = location.href.match(/watch\?v=([^&]+)/);
  if (match && match[1]) {
    const videoId = match[1];
    location.href = `https://www.youtube.com/shorts/${videoId}`;
  }
}

const controls = document.querySelector(".ytp-right-controls");
if (controls && !controls.querySelector(".shorts-button")) {
  const shortsBtn = document.createElement("button");
  shortsBtn.className = "shorts-button";

  const icon = document.createElement("img");
  icon.src = chrome.runtime.getURL("assets/open-icon.png");
  Object.assign(icon.style, {
    width: "24px",
    height: "24px",
    filter: "brightness(100%)",
    pointerEvents: "none"
  });

  Object.assign(shortsBtn.style, {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    marginLeft: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative"
  });

  shortsBtn.appendChild(icon);
  shortsBtn.addEventListener("click", switchToShorts);

  // Detectar idioma
  const lang = navigator.language || "en";
  const isSpanish = lang.startsWith("es");
  const tooltipText = isSpanish ? "Abrir en Shorts" : "Switch to Shorts";

  const tooltip = document.createElement("div");
  tooltip.textContent = tooltipText;
  Object.assign(tooltip.style, {
    position: "absolute",
    bottom: "60px", 
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "rgba(0,0,0,0.35)", 
    color: "#fff",
    padding: "4px 10px",
    borderRadius: "4px",
    fontSize: "12px",
    fontFamily: "Roboto, Arial, sans-serif",
    fontWeight: "500", 
    textShadow: "0 1px 2px rgba(0,0,0,0.8)", 
    whiteSpace: "nowrap",
    opacity: "0",
    pointerEvents: "none",
    transition: "opacity 0.2s ease",
    zIndex: "9999"
  });

  shortsBtn.appendChild(tooltip);

  // Mostrar/ocultar overlay al pasar el mouse
  shortsBtn.addEventListener("mouseenter", () => {
    tooltip.style.opacity = "1";
  });
  shortsBtn.addEventListener("mouseleave", () => {
    tooltip.style.opacity = "0";
  });

  controls.insertBefore(shortsBtn, controls.firstChild);
}
// Switch to Shorts 





// Thank You For Downloading 
// Shorts360 — YouTube Shorts Enhancer 
// Version 1.1
// https://github.com/AceRailgun 
// Developed by AceRailgun (AngelDavidGL) with iterative assistance from Microsoft Copilot (AI) 
