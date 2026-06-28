// BURGER MENU
const burgerButton = document.querySelector('.burger-menu')
const navMenu = document.querySelector('.nav-list')
const overlay = document.querySelector('.overlay')

const closeNavMenu = function () {
  navMenu.classList.remove('active')
  burgerButton.classList.remove('active')
  overlay.classList.remove('active')
  document.body.classList.remove('lock-scroll')
}

const toggleNavMenu = function () {
  navMenu.classList.toggle('active')
  burgerButton.classList.toggle('active')
  overlay.classList.toggle('active')
  document.body.classList.toggle('lock-scroll')
}

// toggle navigation state
burgerButton.addEventListener('click', () => {
  toggleNavMenu()
})

// hide menu when clicked on link
document.querySelectorAll('.nav-list li a').forEach((link) => {
  link.addEventListener('click', () => {
    closeNavMenu()
  })
})

// hide menu when clicked area outside the menu
document.addEventListener('click', (event) => {
  const isClickInsideMenu = navMenu.contains(event.target)
  const isClickOnBurger = burgerButton.contains(event.target)

  if (
    navMenu.classList.contains('active') &&
    !isClickInsideMenu &&
    !isClickOnBurger
  ) {
    closeNavMenu()
  }
})

// disable overlay and lockscreen when resizing
window.addEventListener('resize', () => {
  if (window.innerWidth > 767) {
    closeNavMenu()
  }
})
