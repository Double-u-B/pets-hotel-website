import {galleryPets, icons} from "./data.js"

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const logo = $(".logo img");
const nav = $("nav");
const desc = $("#description");
const iconsSection = $(".icons")
const price = $("#prices");
const gallery = $("#gallery");
const necStuff = $("#necessary-info");
const contact = $("#location");
const pets = $$(".pets");
const infoStuff = $$(".info-stuff ul li");
const actionP = $(".action p");

const modalGallery = $(".modal-gallery");
const modalCond = $(".modal-conditions");
const galleryCon = $(".gallery-container");
// const condCon = $(".conditions-container");

const condConBtn = $(".conditions");
const subMenuCondConBtn = $(".subMenuCond");

const closeBtn = $(".gallery-close-btn");
const condCloseBtn = $(".cond-close-btn");
const leftBtn = $(".left-btn");
const rightBtn = $(".right-btn");

const menuCloseBtn = $(".menu-close");
const menuOpenBtn = $(".menu-open");
const sidebar = $(".sidebar");

const sections = new Array(desc, price, gallery, necStuff, contact);
const scrollLinks = $$(".scroll-link");


/* FUNCTIONS */

/* scrollTo */

scrollLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    sidebar.classList.remove("sidebar-show");
    menuCloseBtn.classList.add("hide-btn");
    menuOpenBtn.classList.remove("hide-btn");
    const id = e.currentTarget.getAttribute("href").slice(1);
    const element = document.getElementById(id);
    const headerHeight = nav.getBoundingClientRect().height;

    let position = element.offsetTop - headerHeight;

    window.scrollTo({
      left: 0,
      top: position,
      behavior: "smooth",
    });
  });
});

/* Resizing window */

const showHide = () => {
  const descHeight =
    desc.getBoundingClientRect().y -
    Math.round(nav.getBoundingClientRect().height);
  /* Logo fade */
  descHeight < 420 && descHeight > -380 && window.innerWidth > 1024
    ? logo.classList.add("hide-logo")
    : logo.classList.remove("hide-logo");

  /* City name fade*/
  window.pageYOffset > necStuff.getBoundingClientRect().y * 20
    ? actionP.classList.add("hide")
    : actionP.classList.remove("hide");

  /* Necessaries text animation */
  if (window.pageYOffset > necStuff.getBoundingClientRect().y * 8.5)
    infoStuff.forEach((li) => (li.style.transform = "translateX(0)"));

  /* Locate sections */
  sections.map((section) => {
    const sectionHeight = section.getBoundingClientRect().height / 3;

    if (window.pageYOffset > section.offsetTop - sectionHeight) {
      scrollLinks.forEach((link) => {
        link.classList.remove("locateSection");

        if (link.getAttribute("href").slice(1) === gallery.id) return;

        link.getAttribute("href").slice(1) === section.id &&
          link.classList.add("locateSection");
      });
    }

    if (window.pageYOffset < section.offsetTop - sectionHeight) {
      scrollLinks.forEach((link) => {
        link.getAttribute("href").slice(1) === section.id &&
          link.classList.remove("locateSection");
      });
    }
  });
};


/* Pets containers hover */
pets.forEach((pet) => {
  pet.addEventListener("mouseover", (e) => {
    pets.forEach((pet) => pet.classList.remove("pet-hover"));
    e.currentTarget.classList.add("pet-hover");
  });
  pet.addEventListener("click", (e) => {
    pets.forEach((pet) => pet.classList.remove("pet-hover"));
    e.currentTarget.classList.add("pet-hover");
  });
});

/* Load Gallery and Icons */
gallery.innerHTML = galleryPets
  .map((pet) => {
    return `<div class="pic">
      <img src=${pet.url} alt="pet image" />
    </div>`;
  })
  .join("");

iconsSection.innerHTML = icons.map(icon=>{
  const {img, txt} = icon;
  return `<div class="icon-info">
          <img src=${img} alt="icon" />
          <p>${txt}</p>
        </div>`;
}).join('')


/* Modals */

/* Gallery Modal */
const petsPic = $$(".pic");
let picNr;

petsPic.forEach((pic) => {
  pic.addEventListener("click", (e) => {
    const imgSrc = e.target.getAttribute("src");

    modalGallery.classList.add("open-gallery-modal");
    document.body.classList.add("no-scrolling");
    picNr = e.target.getAttribute("src").substring(7, 8);
    galleryCon.style.backgroundImage = `url("${imgSrc}")`;
    return picNr;
  });
});

closeBtn.addEventListener("click", () => {
  modalGallery.classList.remove("open-gallery-modal");
  document.body.classList.remove("no-scrolling");
});

rightBtn.addEventListener("click", () => {
  picNr++;
  checkNr();
  galleryCon.style.backgroundImage = `url("img/pet${picNr}.webp")`;
});

leftBtn.addEventListener("click", () => {
  picNr--;
  checkNr();
  galleryCon.style.backgroundImage = `url("img/pet${picNr}.webp")`;
});

const checkNr = () => {
  if (picNr > 7) picNr = 0;
  if (picNr < 0) picNr = 7;
};

/* Conditions Modal and SideBar*/
condConBtn.addEventListener("click", () => {
  modalCond.classList.add("open-con-modal");
});

subMenuCondConBtn.addEventListener("click", () => {
  modalCond.classList.add("open-con-modal");
  sidebar.classList.remove("sidebar-show");
  menuCloseBtn.classList.add("hide-btn");
  menuOpenBtn.classList.remove("hide-btn");
});

condCloseBtn.addEventListener("click", () => {
  modalCond.classList.remove("open-con-modal");
});

menuOpenBtn.addEventListener("click", () => {
  sidebar.classList.add("sidebar-show");
  menuOpenBtn.classList.add("hide-btn");
  menuCloseBtn.classList.remove("hide-btn");
});

menuCloseBtn.addEventListener("click", () => {
  sidebar.classList.remove("sidebar-show");
  menuCloseBtn.classList.add("hide-btn");
  menuOpenBtn.classList.remove("hide-btn");
});

/* Window events */
window.addEventListener("click", (e) => {
  if (
    !e.target.classList.contains("menu-open") &&
    !e.target.classList.contains("menu-links") &&
    !e.target.parentElement.classList.contains("menu-links") &&
    !e.target.parentElement.parentElement.classList.contains("menu-links")
  ) {
    sidebar.classList.remove("sidebar-show");
    menuCloseBtn.classList.add("hide-btn");
    menuOpenBtn.classList.remove("hide-btn");
  }
});
window.addEventListener("scroll", showHide);

window.addEventListener("resize", () => {
  const descHeight =
    desc.getBoundingClientRect().y -
    Math.round(nav.getBoundingClientRect().height);

  $(".width").innerText = `${window.innerWidth}px`;

  descHeight < 420 && descHeight > -380 && window.innerWidth > 1024
    ? logo.classList.add("hide-logo")
    : logo.classList.remove("hide-logo");

  if (window.innerWidth > 1024) {
    sidebar.classList.remove("sidebar-show");
    menuCloseBtn.classList.add("hide-btn");
    menuOpenBtn.classList.remove("hide-btn");
  }
});

/* Footer */
$(
  "footer"
).innerHTML = `<p>&copy; ${new Date().getFullYear()} Pets Hotel. All Rights Reserved. made by <a
          href="https://github.com/Double-u-B"
          target="_blank"
          rel="noopener noreferrer"
        >Władysław Balandin</a></p> <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>`;
