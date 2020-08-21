const baseURL = 'http://localhost:3000/birds'

const $nav = document.querySelector('.nav')
const $blurbZone = document.querySelector('.blurbZone')
const $marquee = document.querySelector('.marquee')
const $scoreBox = document.querySelector('.scoreBox')
const $daySwitch = document.querySelector('.daySwitch')
const $nightSwitch = document.querySelector('.nightSwitch')
const $title = document.querySelector('.title')
const $show = document.querySelector('.show')
const $branch = document.querySelector('.branch')
const $empty = document.querySelector('.empty')

fetch(baseURL)
  .then(response => response.json())
  .then(response => renderBirds(response))

function renderBirds(birds){
  birds.forEach(bird => showBirds(bird))
}

function showBirds(bird){
  const $img = document.createElement('img')
  const $li = document.createElement('li')
  $li.className = 'navClick'
  $img.src = bird.url
  $img.dataset.birdId = bird.id
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
  $infoContainer.className = 'invisible'
  $name.textContent = bird.name
  $name.dataset.birdId = bird.id
  $blurb.textContent = bird.blurb
  $name.append($blurb)
  $infoContainer.append($name)
  $blurbZone.append($infoContainer)
}

function showInfo(birdId){
  const $target = document.querySelector(`h2[data-bird-id="${birdId}"]`)
  $target.parentElement.className = 'show'
  setTimeout(() => {$target.parentElement.className = 'invisible'}, 3000) 
}

function dragHandler(){
  document.querySelectorAll('.navClick').forEach(birdCard => {
    birdCard.addEventListener('dragstart', dragStart)
    birdCard.addEventListener('dragend', dragEnd)
    
    const $empties = document.querySelectorAll('.empty')

    $empties.forEach(empty => {
      empty.addEventListener('dragover', dragOver)
      empty.addEventListener('dragenter', dragEnter)
      empty.addEventListener('drop', dragDrop)
      })
  })
}

function dragStart(event){
  event.dataTransfer.setData('text', event.target.src)
  showInfo(event.target.dataset.birdId)
  score.push(event.target.dataset.birdId)
}

function dragEnd(){}

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

function scoreCalculator(score){
  const allSame = score.every(value => value === score[0])
  if(allSame){
    achievementMaker('Achievement: Matchy Birdies')
  }
  let compare = (score, set) => set.every(value => score.includes(value))
  if(compare(score, whiteEyes)){
    achievementMaker('Achievement: White Eyes')
  }
  if(compare(score, boys)){
    achievementMaker('Achievement: Ugh, those Boys')
  }
  if(compare(score, funBunch)){
    achievementMaker('Achievement: The Fun Bunch')
  }
  if(compare(score, bigBirds)){
    achievementMaker('Achievement: Big Birds')
  }
}

let counter = 0
let score = []

let whiteEyes = ["79", "81", "84", "88", "90"]
let boys = ["89", "89", "89", "89", "89"]
let funBunch = ["76", "77", "83", "85", "88"]
let bigBirds = ["87", "86", "81", "76", "80"]

function achievementMaker(title){
  const $same = document.createElement('p')
  const $trophy = document.createElement('img')
  $trophy.src = 'https://i.gifer.com/VgL.gif'
  $same.textContent = title
  $scoreBox.append($same, $trophy)
}

$daySwitch.addEventListener('click', dayMode)

function dayMode(){
  document.body.classList.remove('dark')
  $title.classList.remove('dark')
  $branch.classList.remove('dark')
  $marquee.classList.remove('dark')
  $show.classList.remove('dark')
  $nightSwitch.classList.remove('dark')
  $daySwitch.classList.remove('dark')
  $nav.classList.remove('dark')
}

$nightSwitch.addEventListener('click', nightMode)

function nightMode(){
  document.body.classList.add('dark')
  $title.classList.add('dark')
  $branch.classList.add('dark')
  $marquee.classList.add('dark')
  $show.classList.add('dark')
  $nightSwitch.classList.add('dark')
  $daySwitch.classList.add('dark')
  $nav.classList.add('dark')
}

