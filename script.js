
function showImage() {
  document.querySelector(".poster").style.display = "block";
  document.querySelector(".back").style.display = "block";

  document.querySelector(".lightview").style.display = "flex";
  document.querySelector(".doeview").style.display = "flex";
  document.querySelector(".schoolview").style.display = "flex";
  document.querySelector(".mapview").style.display = "flex";
}

function hideImage() {
  document.querySelector(".poster").style.display = "none";
  document.querySelector(".back").style.display = "none";


  document.querySelectorAll(".journal-overlay").forEach(j => {
    j.style.display = "none";
  });
}


function openJournal(which) {
  
  document.querySelectorAll(".journal-overlay").forEach(j => {
    j.style.display = "none";
  });

  if (which === "lighthouse") {
    document.querySelector(".journal-lighthouse").style.display = "flex";
    return;
  }

  if (which === "forest") {
    document.querySelector(".journal-forest").style.display = "flex";
    return;
  }

  if (which === "map") {
    document.querySelector(".journal-map").style.display = "flex";
    return;
  }


  if (which === "school") {
  const school = document.querySelector(".journal-school");
  school.style.display = "block";

  const page1 = school.querySelector(".school-page-1");
  const page2 = school.querySelector(".school-page-2");

  school.querySelector(".next").style.display = "block";
  school.querySelector(".prev").style.display = "none";
  return;
  }
}

function closeLighthouse() {
  closeWithFade(".journal-lighthouse");
}

function closeForest() {
  closeWithFade(".journal-forest");
}

function closeMaps() {
  closeWithFade(".journal-map");
}

function closeSchool() {
  closeWithFade(".journal-school", resetSchoolPages);
}

function schoolNext() {
  const school = document.querySelector(".journal-school");
  if (!school) return;

  const page1 = school.querySelector(".school-page-1");
  const page2 = school.querySelector(".school-page-2");

  const nextBtn = school.querySelector(".next");
  const prevBtn = school.querySelector(".prev");

  if (page1) page1.classList.remove("active");
  if (page2) page2.classList.add("active");

  if (nextBtn) nextBtn.style.display = "none";
  if (prevBtn) prevBtn.style.display = "block";
}

function schoolPrev() {
  const school = document.querySelector(".journal-school");
  if (!school) return;

  const page1 = school.querySelector(".school-page-1");
  const page2 = school.querySelector(".school-page-2");

  const nextBtn = school.querySelector(".next");
  const prevBtn = school.querySelector(".prev");

  if (prevBtn) prevBtn.style.display = "none";
  if (nextBtn) nextBtn.style.display = "block";
}

const bgm = document.getElementById("bgm");
let started = false;

window.addEventListener("DOMContentLoaded", () => {
  const bgm = document.getElementById("bgm");
  if (!bgm) return console.log("bgm not found in HTML");

  let started = false;

  function startMusic() {
    if (started) return;
    started = true;

    bgm.volume = 0;
    bgm.play().then(() => {
      let v = 0;
      const fade = setInterval(() => {
        v = Math.min(0.6, v + 0.02);
        bgm.volume = v;
        if (v >= 1) clearInterval(fade);
      }, 60);
    }).catch(err => console.log("Audio blocked or file missing:", err));
  }

  document.addEventListener("click", startMusic, { once: true });
}); 

function switchPage(current, next) {
  current.classList.add("fade-out");

  setTimeout(() => {
    current.classList.remove("active", "fade-out");
    next.classList.add("active", "fade-in");

    
    setTimeout(() => {
      next.classList.remove("fade-in");
    }, 500);

  }, 400); 
}

function nextPage() {
  schoolNext();
}

function prevPage() {
  schoolPrev();
}

function schoolNext() {
  const school = document.querySelector(".journal-school");
  if (!school) return;

  const page1 = school.querySelector(".school-page-1");
  const page2 = school.querySelector(".school-page-2");

  const nextBtn = school.querySelector(".next");
  const prevBtn = school.querySelector(".prev");

  if (!page1 || !page2) return;

  switchPage(page1, page2);

  setTimeout(() => {
    if (nextBtn) nextBtn.style.display = "none";
    if (prevBtn) prevBtn.style.display = "block";
  }, 400);
}

function schoolPrev() {
  const school = document.querySelector(".journal-school");
  if (!school) return;

  const page1 = school.querySelector(".school-page-1");
  const page2 = school.querySelector(".school-page-2");

  const nextBtn = school.querySelector(".next");
  const prevBtn = school.querySelector(".prev");

  if (!page1 || !page2) return;

  switchPage(page2, page1);

  setTimeout(() => {
    if (prevBtn) prevBtn.style.display = "none";
    if (nextBtn) nextBtn.style.display = "block";
  }, 400);
}

function closeWithFade(selector, afterClose) {
  const el = document.querySelector(selector);
  if (!el) return;

  el.classList.add("fade-out");

  setTimeout(() => {
    el.style.display = "none";
    el.classList.remove("fade-out");
    if (typeof afterClose === "function") afterClose();
  }, 400); // matches your .fade-out (0.4s)
}

function resetSchoolPages() {
  const school = document.querySelector(".journal-school");
  if (!school) return;

  const page1 = school.querySelector(".school-page-1");
  const page2 = school.querySelector(".school-page-2");

  const nextBtn = school.querySelector(".next");
  const prevBtn = school.querySelector(".prev");

  if (nextBtn) nextBtn.style.display = "block";
  if (prevBtn) prevBtn.style.display = "none";
}

function hideImage() {
  closeWithFade(".poster", () => {
    document.querySelector(".back").style.display = "none";
    document.querySelectorAll(".journal-overlay").forEach(j => (j.style.display = "none"));
  });
}

function showSources() {
  document.querySelectorAll(".journal-overlay").forEach(j => j.style.display = "none");
  document.querySelector(".journal-sources").style.display = "flex";
  document.querySelector(".journal-sources").style.display = "flex";
  document.querySelector(".back").style.display = "block";
}

function openSources() {
  document.getElementById("sources-page").classList.remove("hidden");
}

function closeSources() {
  document.getElementById("sources-page").classList.add("hidden");
}

function showSources() {
  // hide all journal pages
  document.querySelectorAll(".journal-sources").forEach(el => el.style.display = "none");

  // show ONLY the Sources page
  const sourcesPage = document.querySelector(".journal-overlay.journal-sources");
  if (sourcesPage) sourcesPage.style.display = "flex";
}

function backToMap() {
  // hide all journal / fullscreen pages
  document.querySelectorAll(
    '.journal-overlay, .journal-school, .journal-page'
  ).forEach(el => el.style.display = 'none');

  // show the map again
  document.querySelector('.poster').style.display = 'flex';
}

function closeSources() {
  // hide the Sources overlay
  const sources = document.querySelector(".journal-sources");
  if (sources) sources.style.display = "none";

  // show the Map overlay again
  const map = document.querySelector(".journal-map");
  if (map) map.style.display = "flex";
}

function closeSources() {
  closeWithFade(".journal-sources", () => {
    const map = document.querySelector(".journal-map");
    if (map) map.style.display = "flex";
  });
}

window.addEventListener("load", () => {
  document.querySelectorAll(".journal-overlay, .poster").forEach(el => {
    el.style.display = "none";
  });

  // show the menu screen again if needed
  document.querySelector(".menu")?.style.setProperty("display", "block");
});

function closeSources() {
  document.querySelector(".journal-sources").style.display = "none";
}


window.addEventListener("load", () => {
  document.querySelectorAll(".journal-overlay").forEach(el => {
    el.style.display = "none";
  });
});

window.addEventListener("load", () => {
  document.querySelectorAll(".journal-overlay, .poster").forEach(el => {
    el.style.display = "none";
  });

  document.querySelector(".back")?.style.setProperty("display", "none");
  document.querySelector(".menu")?.style.setProperty("display", "block");
});

function closeWithFade(selector, afterClose) {
  const el = document.querySelector(selector);
  if (!el) return;

  el.classList.remove("fade-in");
  el.classList.add("fade-out");

  // MUST match your CSS animation duration (0.6s here)
  setTimeout(() => {
    el.style.display = "none";
    el.classList.remove("fade-out");
    if (typeof afterClose === "function") afterClose();
  }, 600);
}

function showSources() {
  // IMPORTANT: do NOT hide the map here
  // just hide the OTHER journal pages (optional)
  document.querySelectorAll(".journal-overlay").forEach(el => {
    if (!el.classList.contains("journal-map") && !el.classList.contains("journal-sources")) {
      el.style.display = "none";
      el.classList.remove("fade-in", "fade-out");
    }
  });

  // make sure map stays visible underneath
  const map = document.querySelector(".journal-overlay.journal-map");
  if (map) map.style.display = "flex";

  // show sources on top
  const sources = document.querySelector(".journal-overlay.journal-sources");
  if (!sources) return;

  sources.style.display = "flex";
  sources.classList.remove("fade-out");
  sources.classList.add("fade-in");
}

function closeSources() {
  const map = document.querySelector(".journal-overlay.journal-map");
  if (map) map.style.display = "flex";

  closeWithFade(".journal-overlay.journal-sources");
}