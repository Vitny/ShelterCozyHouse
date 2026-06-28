// PETS CARDS
;(function () {
  fetch('../../pets.json')
    .then((r) => r.json())
    .then((pets) => {
      pets = pets.map((p) => ({
        name: p.name,
        img: '../../assets/png/pets/pets-' + p.img.split('/').pop(),
      }))

  function generate48() {
    const pool = []
    for (let i = 0; i < 6; i++) pool.push(...pets)

    const result = []
    while (pool.length) {
      const last = result.length ? result[result.length - 1] : null
      const available = pool.filter(
        (p) => p !== last || pool.every((x) => x === last),
      )
      const idx = pool.indexOf(available[0])

      let pick = -1
      for (let i = 0; i < pool.length; i++) {
        if (pool[i] !== last) {
          pick = i
          break
        }
      }
      if (pick === -1) pick = 0
      result.push(pool[pick])
      pool.splice(pick, 1)
    }
    return result
  }

  const allCards = generate48()

  const container = document.querySelector('.pets-cards')
  const btnFirst = document.querySelector('.btn-first-page')
  const btnPrev = document.querySelector('.btn-prev-page')
  const btnCur = document.querySelector('.btn-current-page')
  const btnNext = document.querySelector('.btn-next-page')
  const btnLast = document.querySelector('.btn-last-page')

  let currentPage = 1
  let isAnimating = false

  function getPerPage() {
    if (window.innerWidth >= 1280) return 8
    if (window.innerWidth >= 768) return 6
    return 3
  }

  function getTotalPages() {
    return 48 / getPerPage()
  }

  function buildPage(pageCards) {
    const wrap = document.createElement('div')
    wrap.className = 'pets-page'
    pageCards.forEach((pet) => {
      wrap.insertAdjacentHTML(
        'beforeend',
        `<div class="card-pet">
          <img class="pet-photo" src="${pet.img}" alt="photo of a pet" />
          <span class="pet-name">${pet.name}</span>
          <button class="btn-pet" type="button">Learn more</button>
        </div>`,
      )
    })
    return wrap
  }

  function getPageCards(page) {
    const perPage = getPerPage()
    const start = (page - 1) * perPage
    return allCards.slice(start, start + perPage)
  }

  function animateTo(page, direction) {
    isAnimating = true
    const oldWrap = container.querySelector('.pets-page')
    const newWrap = buildPage(getPageCards(page))

    newWrap.style.position = 'absolute'
    newWrap.style.top = '0'
    newWrap.style.left = direction === 'next' ? '100%' : '-100%'
    newWrap.style.width = '100%'
    container.appendChild(newWrap)

    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const move = direction === 'next' ? '-100%' : '100%'
        oldWrap.style.transition = newWrap.style.transition =
          'transform 0.4s ease'
        oldWrap.style.transform = `translateX(${move})`
        newWrap.style.transform = 'translateX(0)'
      }),
    )

    setTimeout(() => {
      oldWrap.remove()
      newWrap.style.position = ''
      newWrap.style.top = ''
      newWrap.style.left = ''
      newWrap.style.transition = ''
      newWrap.style.transform = ''
      isAnimating = false
    }, 320)
  }

  function goTo(page, direction) {
    if (isAnimating) return
    if (page < 1 || page > getTotalPages()) return
    animateTo(page, direction)
    currentPage = page
    updateControls()
  }

  function updateControls() {
    const total = getTotalPages()
    btnCur.textContent = currentPage

    const isFirst = currentPage === 1
    const isLast = currentPage === total

    btnFirst.classList.toggle('inactive', isFirst)
    btnPrev.classList.toggle('inactive', isFirst)
    btnNext.classList.toggle('inactive', isLast)
    btnLast.classList.toggle('inactive', isLast)
  }

  function init() {
    container.innerHTML = ''
    container.style.position = 'relative'
    container.style.overflow = 'hidden'
    const wrap = buildPage(getPageCards(currentPage))
    container.appendChild(wrap)
    updateControls()
  }

  btnFirst.addEventListener('click', () => {
    if (currentPage > 1) goTo(1, 'prev')
  })
  btnPrev.addEventListener('click', () => {
    if (currentPage > 1) goTo(currentPage - 1, 'prev')
  })
  btnNext.addEventListener('click', () => {
    if (currentPage < getTotalPages()) goTo(currentPage + 1, 'next')
  })
  btnLast.addEventListener('click', () => {
    if (currentPage < getTotalPages()) goTo(getTotalPages(), 'next')
  })

  let lastPerPage = getPerPage()
  window.addEventListener('resize', () => {
    const newPerPage = getPerPage()
    if (newPerPage !== lastPerPage) {
      lastPerPage = newPerPage
      currentPage = 1
      init()
    }
  })

init()
    })
})()