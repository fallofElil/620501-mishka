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
