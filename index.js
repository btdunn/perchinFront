const baseURL = 'http://localhost:3000/birds'

const $nav = document.getElementById('nav')
const $blurbZone = document.getElementById('blurbZone')

fetch(baseURL)
  .then(response => response.json())
  .then(response => renderBirds(response))

function renderBirds(birds){
  birds.forEach(bird => showBirds(bird))
}

function showBirds(bird){
  const $img = document.createElement('img')
  const $li = document.createElement('li')
  $li.id = 'navClick'
  $img.src = bird.url
  $img.id = bird.id
  // $img.alt = bird.blurb
  $img.width = 100
  $li.append($img)
  $nav.appendChild($li)
  dragHandler()
  birdInfo(bird)
}

function birdInfo(bird){
  const $infoContainer = document.createElement('div')
  const $name = document.createElement('h2')
  const $blurb = document.createElement('p')
  $infoContainer.id = 'invisible'
  $name.textContent = bird.name
  $name.id = bird.id
  $blurb.textContent = bird.blurb
  $name.append($blurb)
  $infoContainer.append($name)
  $blurbZone.append($infoContainer)
}

function dragHandler(){
  document.querySelectorAll('#navClick').forEach(birdCard => {
    birdCard.addEventListener('dragstart', dragStart)
    birdCard.addEventListener('dragend', dragEnd)
    
    const $empties = document.querySelectorAll('#empty')

    $empties.forEach(empty => {
      empty.addEventListener('dragover', dragOver)
      empty.addEventListener('dragenter', dragEnter)
      empty.addEventListener('drop', dragDrop)
      })
  })
}

function dragStart(){
  console.log('start')
  event.dataTransfer.setData('text', event.target.src)
  showInfo(event.target.id)
}

function dragEnd(){
  console.log('end')
}

function dragOver(event){
  event.preventDefault()
}

function dragEnter(event){
  event.preventDefault()
}

function dragDrop(){
  $reveal = document.createElement('img')
  let source = event.dataTransfer.getData('text')
  $reveal.src = source
  this.append($reveal)
}

function showInfo(id){
  const $target = document.getElementById(id)
  $target.parentElement.id = 'show'
  setTimeout(() => {$target.parentElement.id = 'invisible'}, 3000) 

}



