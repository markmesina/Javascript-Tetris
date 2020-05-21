document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  let squares = Array.from (document.querySelectorAll('.grid div'));
  const ScoreDisplay = document.querySelectorAll('#score');
  const StartBtn = document.querySelector('#start-button');
  const width = 10
  let nextRandom = 0
  //tetrominoes
  const lTetromino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
  ]
  const zTetromino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1]
  ]

  const tTetromino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1]
  ]

  const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1]
  ]

  const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3]
  ]

  const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

  let currentPosition = 4
  let currentRotation = 0

  let random = Math.floor(Math.random()*theTetrominoes.length)
  console.log(random)

  let current = theTetrominoes[random][0]

  //draw the tetromino
  function draw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.add('tetromino')
    })
  }
  //undraw tetrominow
  function undraw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.remove('tetromino')
    })
  }


  //make the tetrommino move down every second

  timerId = setInterval(moveDown, 400)

  //assign func to keycode
  function control(e) {
    console.log('im hit')
    if(e.keyCode === 37) {
      moveLeft();
    } else if (e.keyCode === 38) {
      rotate()
    } else if (e.keyCode === 39) {
      moveRight()
    } else if (e.keyCode === 40) {
      //moveDown()
    }
  }
  document.addEventListener('keyup',control)


  //move down func
  function moveDown() {
    undraw()
    currentPosition += width
    draw()
    freeze()
  }

  //freeze func
  function freeze() {
    if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
      current.forEach(index => squares[ currentPosition + index].classList.add('taken'))
      //start a new tetromino falling
      random = nextRandom
      nextRandom = Math.floor(Math.random() * theTetrominoes.length)
      current = theTetrominoes[random] [currentRotation]
      currentPosition = 4
      draw()
      displayShape()
    }
  }

  //move blocks left, unless its at the edge or there is a blockade

  function moveLeft() {
    undraw()
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)

    if(!isAtLeftEdge) currentPosition -=1

    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition += 1
    }

    draw()

  }
  //moveRight func
  function moveRight() {
    undraw()
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width -1)

    if(!isAtRightEdge) currentPosition +=1

    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition -= 1
    }

    draw()
  }

  //rotate the teromino
  function rotate() {
    undraw()
    currentRotation ++
    if(currentRotation === current.length) {
      currentRotation = 0
    }
    current = theTetrominoes[random] [currentRotation]
    draw()
  }

  //show up next tetromino

  const displaySquares = document.querySelectorAll('.mini-grid div')
  const displayWidth = 4
  let displayIndex = 0
  
  //the tetrominos w/o rotatio
  const upNextTetrominoes = [
    [1,displayWidth+1, displayWidth*2+1, 2],
    [0, displayWidth, displayWidth+1, displayWidth*2+1],
    [1, displayWidth, displayWidth+1, displayWidth+2],
    [0, 1, displayWidth, displayWidth+1],
    [1,displayWidth+1, displayWidth*2+1, displayWidth*3+1]
  ]
  //display shape
  function displayShape() {
    displaySquares.forEach( square => {
      square.classList.remove('tetromino')
    })
    upNextTetrominoes[nextRandom].forEach ( index => {
      displaySquares[displayIndex + index].classList.add('tetromino')
    })
  }















})