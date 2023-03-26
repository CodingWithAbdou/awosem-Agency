/// show  and hide menu in media min than 991px

let menu = document.querySelector(".container-links .menu");
let cntainerLinks = document.querySelector(".container-links");
let link = document.querySelector(".container-links .links");

link.onclick = (e) => {
  e.stopPropagation();
};

document.addEventListener("click", (event) => {
  if (event.target !== menu && event.target !== link) {
    if (cntainerLinks.classList.contains("active")) {
      cntainerLinks.classList.remove("active");
      head.classList.remove("hide-border");
    }
  }
});
menu.onclick = (e) => {
  e.stopPropagation();
  cntainerLinks.classList.toggle("active");
  head.classList.toggle("hide-border");
};

//show sitting

document.querySelector(".show-off").onclick = () => {
  document.querySelector(".setting").classList.toggle("start");
  document.querySelector(".show-off").classList.toggle("start");
};

/// floating header

let floatYes = document.querySelector(".box.float .yes");
let floatNo = document.querySelector(".box.float .no");
let head = document.querySelector(".head-landing");
let getOprionFloat = window.localStorage.getItem("option_float");

if (getOprionFloat) {
  if (getOprionFloat == "true") {
    addRemov(floatYes, floatNo, "on");
    head.classList.add("float");
  } else {
    addRemov(floatNo, floatYes, "on");
    head.classList.remove("float");
  }
}

floatYes.onclick = () => {
  addRemov(floatYes, floatNo, "on");
  head.classList.add("float");
  setItemsLocal("option_float", true);
};
floatNo.onclick = () => {
  addRemov(floatNo, floatYes, "on");
  head.classList.remove("float");
  setItemsLocal("option_float", false);
};

//change color and save them in localstorage

let lis = document.querySelectorAll(".box.color ul li");
let getOptionColor = localStorage.getItem("main-color");

if (getOptionColor) {
  document.documentElement.style.setProperty("--main-color", getOptionColor);
  lis.forEach((li) => {
    if (li.dataset.color == getOptionColor) {
      lis.forEach((li) => {
        li.classList.remove("on");
      });
      li.classList.add("on");
    }
  });
}

lis.forEach((li) => {
  li.onclick = (ev) => {
    handelEL(lis, ev, "on");
    document.documentElement.style.setProperty(
      "--main-color",
      li.dataset.color
    );
    setItemsLocal("main-color", li.dataset.color);
  };
});

//change background and save them in localstorage

let auto = document.querySelector(".box.background .auto");
let manual = document.querySelector(".box.background .manual");
let ulImg = document.querySelector(".box.background ul");
let imgs = document.querySelectorAll(".box.background ul li img");
let landing = document.querySelector(".landing ");
let getOptionBack = localStorage.getItem("option_background");
let getTypeBack = localStorage.getItem("typeOption_background");

if (getOptionBack == "true") {
  okAuto();
} else if (getOptionBack == "false") {
  okManual();
  if (getTypeBack) {
    imgs.forEach((i) => {
      i.classList.remove("on");
      if (getTypeBack === `url("../${i.getAttribute("src")}")`) {
        i.classList.add("on");
        landing.style.backgroundImage = `url("./${i.getAttribute("src")}")`;
        document.documentElement.style.setProperty(
          "---x",
          `url("./${i.getAttribute("src")}")`
        );
      }
    });
  }
}

auto.onclick = () => {
  setItemsLocal("option_background", true);
  okAuto();
};

manual.onclick = () => {
  setItemsLocal("option_background", false);
  okManual();
};

//show abd hide bullets and save them in localstorage

let yesBu = document.querySelector(".box.setting-bullets .yes");
let noBu = document.querySelector(".box.setting-bullets .no");
let bullets = document.querySelector(".bullets");
let getOptionBullets = window.localStorage.getItem("option_bullets");

if (getOptionBullets !== null) {
  if (getOptionBullets == "true") {
    addRemov(yesBu, noBu, "on");
    bullets.style.display = "block";
  } else {
    addRemov(noBu, yesBu, "on");
    bullets.style.display = "none";
  }
}

yesBu.onclick = () => {
  addRemov(yesBu, noBu, "on");
  bullets.style.display = "block";
  setItemsLocal("option_bullets", true);
};

noBu.onclick = () => {
  addRemov(noBu, yesBu, "on");
  bullets.style.display = "none";
  setItemsLocal("option_bullets", false);
};

// show image biger than after and add background overly

let images = Array.from(document.querySelectorAll(".gallery .image"));

images.forEach((image) => {
  image.addEventListener("click", () => {
    let overly = document.createElement("div");
    overly.className = "overly";
    document.body.appendChild(overly);
    let pop = document.createElement("div");
    pop.className = "pop-gallery";
    let headPop = document.createElement("h3");
    let txtHead = document.createTextNode(image.firstElementChild.alt);
    headPop.appendChild(txtHead);
    let imagePop = document.createElement("img");
    imagePop.src = image.firstElementChild.src;
    pop.appendChild(headPop);
    pop.appendChild(imagePop);
    document.body.appendChild(pop);
  });
});

document.addEventListener("click", (e) => {
  if (e.target.className === "overly") {
    document.querySelector(".overly").remove();
    document.querySelector(".pop-gallery").remove();
  }
});

//full width in our skills section

let skills = document.querySelector(".our-skills");
let allSkillsSpan = document.querySelectorAll(
  ".our-skills .box .progress span"
);

window.onscroll = () => {
  if (window.scrollY >= skills.offsetTop - 100) {
    allSkillsSpan.forEach((span) => {
      span.style.width = span.dataset.width;
    });
  }
};

// scroll to the page you need and take class active scroll with you

let links = document.querySelectorAll(".links li a");
let bulletss = Array.from(document.querySelectorAll(".bullets .bullet"));

bulletss.forEach((bu) => {
  bu.addEventListener("click", (ev) => {
    handelEL(bulletss, ev, "active");
    document.querySelector(bu.dataset.section).scrollIntoView({
      behavior: "smooth",
    });
  });
});

scollAdd(links);
scollAdd(bulletss);

// make option defult

let rest = document.getElementById("rest");
rest.onclick = () => {
  window.localStorage.clear();
  window.location.reload();
};

// add year in footer

let spanTime = document.querySelector("footer span");
time = new Date();
spanTime.innerHTML = time.getFullYear();

// functions

function setItemsLocal(a, b) {
  window.localStorage.setItem(a, b);
}

function addRemov(a, b, classNa) {
  a.classList.add(classNa);
  b.classList.remove(classNa);
}
function handelEL(parent, ev, classN) {
  parent.forEach((child) => {
    child.classList.remove(classN);
  });
  ev.target.classList.add(classN);
}

function okAuto() {
  addRemov(auto, manual, "on");
  ulImg.classList.remove("show-img");
  landing.classList.add("auto");
  head.classList.add("auto");
}

function okManual() {
  addRemov(manual, auto, "on");
  ulImg.classList.add("show-img");
  landing.classList.remove("auto");
  head.classList.remove("auto");
  imgs.forEach((img) => {
    img.onclick = (ev) => {
      handelEL(imgs, ev, "on");
      setItemsLocal(
        "typeOption_background",
        `url("./${img.getAttribute("src")}")`
      );
      landing.style.backgroundImage = `url("./${img.getAttribute("src")}")`;
      document.documentElement.style.setProperty(
        "---x",
        `url("./${img.getAttribute("src")}")`
      );
    };
  });
}
function scollAdd(parent) {
  window.addEventListener("scroll", () => {
    parent.forEach((child) => {
      if (
        window.scrollY >=
        document.querySelector(child.dataset.section).offsetTop - 200
      ) {
        parent.forEach((child) => {
          child.classList.remove("active");
        });
        child.classList.add("active");
      }
    });
  });
}
