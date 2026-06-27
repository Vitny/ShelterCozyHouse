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

// OUR FRIENDS CARDS
function initSlider() {
  const pets = [
    { name: 'Jennifer', img: 'assets/png/pets/pets-jennifer.png' },
    { name: 'Sophia', img: 'assets/png/pets/pets-sophia.png' },
    { name: 'Woody', img: 'assets/png/pets/pets-woody.png' },
    { name: 'Scarlett', img: 'assets/png/pets/pets-scarlet.png' },
    { name: 'Katrine', img: 'assets/png/pets/pets-katrine.png' },
    { name: 'Timmy', img: 'assets/png/pets/pets-timmy.png' },
    { name: 'Freddie', img: 'assets/png/pets/pets-fredie.png' },
    { name: 'Charly', img: 'assets/png/pets/pets-charly.png' },
  ]

  const container = document.querySelector('.pets-cards')
  let current = []
  let isAnimating = false

  function getCount() {
    if (window.innerWidth >= 1280) return 3
    if (window.innerWidth >= 768) return 2
    return 1
  }

  function getRandom(pool, count) {
    const available = [...pool]
    const result = []
    for (let i = 0; i < count; i++) {
      const idx = Math.floor(Math.random() * available.length)
      result.push(...available.splice(idx, 1))
    }
    return result
  }

  function buildTrack(group) {
    const track = document.createElement('div')
    track.className = 'pets-track'
    group.forEach((pet) => {
      track.insertAdjacentHTML(
        'beforeend',
        `<div class="card-pet">
          <img class="pet-photo" src="${pet.img}" alt="photo of a pet" />
          <span class="pet-name">${pet.name}</span>
          <button class="btn-pet" type="button">Learn more</button>
        </div>`,
      )
    })
    return track
  }

  function slide(direction) {
    if (isAnimating) return
    isAnimating = true

    const oldTrack = container.querySelector('.pets-track')
    const nextGroup = getRandom(
      pets.filter((p) => !current.includes(p)),
      getCount(),
    )
    const newTrack = buildTrack(nextGroup)

    Object.assign(newTrack.style, {
      position: 'absolute',
      top: '0',
      width: '100%',
      left: direction === 'right' ? '100%' : '-100%',
      pointerEvents: 'none',
    })
    oldTrack.style.pointerEvents = 'none'
    container.appendChild(newTrack)

    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const move = direction === 'right' ? '-100%' : '100%'
        oldTrack.style.transition = newTrack.style.transition =
          'transform 0.4s ease'
        oldTrack.style.transform = `translateX(${move})`
        newTrack.style.transform = 'translateX(0)'
      }),
    )

    setTimeout(() => {
      oldTrack.remove()
      Object.assign(newTrack.style, {
        position: '',
        top: '',
        left: '',
        transition: '',
        transform: '',
        pointerEvents: '',
      })
      current = nextGroup
      isAnimating = false
    }, 320)
  }

  function init() {
    current = getRandom(pets, getCount())
    container.innerHTML = ''
    container.appendChild(buildTrack(current))
  }

  document
    .querySelector('.btn-slider.left')
    .addEventListener('click', () => slide('left'))
  document
    .querySelector('.btn-slider.right')
    .addEventListener('click', () => slide('right'))

  let lastCount = getCount()
  window.addEventListener('resize', () => {
    const newCount = getCount()
    if (newCount !== lastCount) {
      lastCount = newCount
      init()
    }
  })

  init()
}

initSlider()
