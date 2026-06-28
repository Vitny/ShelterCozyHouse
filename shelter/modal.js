// MODAL
;(function () {
  const isMainPage = !document.querySelector('.pets-header')

  const jsonSrc = isMainPage ? 'pets.json' : '../../pets.json'

  const closeIconSrc = isMainPage
    ? 'assets/svg/close-modal.svg'
    : '../../assets/svg/close-modal.svg'

  const imgPrefix = isMainPage ? 'assets/png/pets/' : '../../assets/png/pets/'

  const overlay = document.querySelector('.overlay')
  const modalRoot = document.querySelector('.modal-window')

  let petsData = []

  fetch(jsonSrc)
    .then((r) => r.json())
    .then((data) => {
      petsData = data
    })

  function getImgSrc(pet) {
    const filename = pet.img.split('/').pop()
    return imgPrefix + 'pets-' + filename
  }

  function findPet(name) {
    return petsData.find((p) => p.name === name) || null
  }

  function openModal(pet) {
    modalRoot.innerHTML = `
      <div class="modal-window-container">
        <button class="btn-modal-close">
          <img src="${closeIconSrc}" alt="close button" />
        </button>
        <div class="modal-wrapper">
          <img class="modal-pet-pic" src="${getImgSrc(pet)}" alt="pet photo" />
          <div class="modal-content">
            <span class="name">${pet.name}</span>
            <div class="breed-line">
              <span class="type">${pet.type}</span> -
              <span class="breed">${pet.breed}</span>
            </div>
            <p class="description">${pet.description}</p>
            <ul class="pet-list">
              <li><span class="line-header">Age:</span> <span class="age">${pet.age}</span></li>
              <li><span class="line-header">Inoculations:</span> <span class="inoculations">${pet.inoculations.join(', ')}</span></li>
              <li><span class="line-header">Diseases:</span> <span class="diseases">${pet.diseases.join(', ')}</span></li>
              <li><span class="line-header">Parasites:</span> <span class="parasites">${pet.parasites.join(', ')}</span></li>
            </ul>
          </div>
        </div>
      </div>`

    modalRoot.classList.add('active')
    overlay.classList.add('active')
    document.body.classList.add('lock-scroll')

    modalRoot
      .querySelector('.btn-modal-close')
      .addEventListener('click', closeModal)
  }

  function closeModal() {
    modalRoot.classList.remove('active')
    overlay.classList.remove('active')
    document.body.classList.remove('lock-scroll')
    modalRoot.innerHTML = ''
  }

  modalRoot.addEventListener('click', (e) => {
    if (!e.target.closest('.modal-wrapper')) closeModal()
  })

  document.addEventListener('click', (e) => {
    const card = e.target.closest('.card-pet')
    if (!card) return
    e.preventDefault()
    const name = card.querySelector('.pet-name').textContent.trim()
    const pet = findPet(name)
    if (pet) openModal(pet)
  })
})()
