
const PopUp = document.querySelector('#popup')


const isOnScreen = (el) => {
    let rect = el.getBoundingClientRect()
    return rect.top > 0 && rect.bottom < window.innerHeight
}

const playAnimation = (el) => {

    if(isOnScreen(el)) el.style.animationPlayState = 'running'

}

const addAnimation = () => {
    const costumers =  document.querySelectorAll('.costumersText')
    const about =  document.querySelector('.About')
    const costumersBg =  document.querySelector('.clientesBg')

    playAnimation(about)
    costumers.forEach(playAnimation)
}

const creatImgContainer =  (amountImgs) => {
    const innerCarousel = document.querySelector('.popupCarousel')
   
    let count = 0

   amountImgs.forEach((imagens, index) => {
    
    const div = document.createElement('div')

    if(count === 0) {
        div.setAttribute('class', 'carousel-item active')
    } else {
        div.setAttribute('class', 'carousel-item')
    }

    const img = document.createElement('img')
     img.setAttribute("src", `${imagens.url}`)
     img.setAttribute("class", `d-block w-100 img`)

     div.append(img)

    innerCarousel.insertAdjacentElement('afterbegin', div)

    count >= imagens.length-1? count = 0 : count++
   })
}

const getImagesFromArray = (num) => {    
    const imgs = imagens[num-1]  
    creatImgContainer(imgs)
}

const getClickedCard = () => {
    const rowSlideContainer = document.querySelector('.rowSlide')


    rowSlideContainer.addEventListener('click', (e) => {
       if(e.target.tagName === 'I' || e.target.tagName === 'BUTTON') return

       const cardNumber = e.target.classList[1].slice(-1,)

       if(e.target.classList.contains(`cardcontent-${cardNumber}`)) {
          getImagesFromArray(cardNumber)
          PopUp.classList.toggle('hide')
       }
    })
}

const cleanSlidePopUpContainer = (slideImagens) => {
    slideImagens.forEach(img => img.remove())  
}

const slidePopUp = () => {
    const containerPopUp = document.querySelector('#portifolio')
     
    containerPopUp.addEventListener('click', (e) => {
        const childContainer = [...document.querySelector('.popupCarousel').children]

        if(e.target.dataset.js === 'close') {
            PopUp.classList.toggle('hide')
            cleanSlidePopUpContainer(childContainer) 
        }
    })
}

const slideInLine = () => {
    const slideContainer = document.querySelector('.rowSlide')
    const slide = document.querySelector('[data-js="slideContainer"]')

    slideContainer.addEventListener('click', (e) => {
        if(e.target.tagName === 'BUTTON' || e.target.tagName == 'I' ) {
            
            const direction = e.target.dataset.js === 'next'? 1 : -1

            slide.scrollBy({left: (slide.clientWidth * direction) - 180, behavior: 'smooth'})
       }
    })
}

window.addEventListener('scroll', addAnimation)

slideInLine()
slidePopUp()
getClickedCard()
// addAnimation()
