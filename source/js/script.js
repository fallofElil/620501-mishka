//-----menu-----
var menu = document.querySelector(".menu");
var menuToggle = document.querySelector(".menu__toggle");

menu.classList.remove("menu--nojs");

menuToggle.addEventListener("click", function () {
  if (menu.classList.contains("menu--closed")) {
    menuToggle.classList.remove("menu__toggle--open");
    menuToggle.classList.add("menu__toggle--close");

    menu.classList.remove("menu--closed");
    menu.classList.add("menu--opened");
  } else {
    menuToggle.classList.add("menu__toggle--open");
    menuToggle.classList.remove("menu__toggle--close");

    menu.classList.add("menu--closed");
    menu.classList.remove("menu--opened");
  }
});

//-----modal-----
var weekArtBtn = document.querySelector(".btn--week-art");
var cartBtn = document.querySelectorAll(".article__link-to-cart");
var modal = document.querySelector(".modal");

weekArtBtn.addEventListener("click", function (evt) {
  evt.preventDefault();
  modal.classList.add("modal--show");
});

cartBtn.addEventListener("click", function (evt) {
  evt.preventDefault();
  modal.classList.add("modal--show");
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (modal.classList.contains("modal--show")) {
      modal.classList.remove("modal--show");
    }
  }
});

window.onclick = function (evt) {
  if (evt.target == modal) {
    modal.classList.remove("modal--show");
  }
}
