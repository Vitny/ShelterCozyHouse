// OUR FRIENDS CARDS
function initSlider() {
  fetch('pets.json')
    .then((r) => r.json())
    .then((data) => {
      const pets = data.map((p) => ({
        name: p.name,
        img: 'assets/png/pets/pets-' + p.img.split('/').pop(),
      }))

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
    })
}

initSlider()
