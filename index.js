const baseURL = 'http://localhost:3000/birds'

const $nav = document.getElementById('nav')
const $blurbZone = document.getElementById('blurbZone')
const $marquee = document.getElementById('marquee')
const $scoreBox = document.getElementById('scoreBox')

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
  event.dataTransfer.setData('text', event.target.src)
  showInfo(event.target.id)
  score.push(event.target.id)
  console.log(score)
}

function dragEnd(){

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
  counter++
  gameEnd()
}

function gameEnd(){
  if (counter === 5){
    $marquee.textContent = 'BIRDS CHOSEN. ENJOY YOUR BIRDS.'
    $nav.remove()
    setTimeout(() => {$blurbZone.remove()}, 1500)
    scoreCalculator(score)
  }
}

function showInfo(id){
  const $target = document.getElementById(id)
  $target.parentElement.id = 'show'
  setTimeout(() => {$target.parentElement.id = 'invisible'}, 3000) 
}

function scoreCalculator(score){
  const allSame = score.every(value => value === score[0])
  if(allSame){
    const $same = document.createElement('p')
    const $trophy = document.createElement('img')
    $trophy.src = 'https://i.gifer.com/VgL.gif'
    $same.textContent = 'Achievement: Matchy Birdies'
    $scoreBox.append($same, $trophy)
  }
  let compare = (score, set) => set.every(value => score.includes(value))
  if(compare(score, whiteEyes)){
    const $same = document.createElement('p')
    const $trophy = document.createElement('img')
    $trophy.src = 'https://i.gifer.com/VgL.gif'
    $same.textContent = 'Achievement: White Eyes'
    $scoreBox.append($same, $trophy)
  }
  if(compare(score, boys)){
    const $same = document.createElement('p')
    const $trophy = document.createElement('img')
    $trophy.src = 'https://i.gifer.com/VgL.gif'
    $same.textContent = 'Achievement: Ugh, those Boys'
    $scoreBox.append($same, $trophy)
  }
}

let counter = 0
let score = []

let whiteEyes = ["79", "81", "84", "88", "90"]
let boys = ["89", "89", "89", "89", "89"]



