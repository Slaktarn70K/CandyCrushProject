document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".grid")
    const scoreDisplay = document.getElementById("score")
    const scoreOutput = document.getElementById("scoreEnd")
    const width = 8
    const squares = []
    let score = 0

    const candyColors = [
        "url(image/F1.png)", 
        "url(image/F2.png)", 
        "url(image/F3.png)", 
        "url(image/F4.png)", 
        "url(image/F5.png)", 
        "url(image/F6.png)"
    ]

    function createBoard() {
        for (let i = 0; i < width*width; i++) {
            const square = document.createElement("div")
            square.setAttribute("draggable", true)
            square.setAttribute("id", i)
            let randomColor = Math.floor(Math.random() * candyColors.length)
            square.style.backgroundImage = candyColors[randomColor]
            grid.appendChild(square)
            squares.push(square)
            console.log()
        }
    }
    createBoard();

    let colorBeingDragged
    let colorBeingReplaced
    let squareIdBeingDragged
    let squareIdBeingReplaced

    squares.forEach(square => square.addEventListener("dragstart", dragStart))
    squares.forEach(square => square.addEventListener("dragend", dragEnd))
    squares.forEach(square => square.addEventListener("dragover", dragOver))
    squares.forEach(square => square.addEventListener("dragenter", dragEnter))
    squares.forEach(square => square.addEventListener("dragleave", dragLeave))
    squares.forEach(square => square.addEventListener("drop", dragDrop))

    function dragStart() {
        colorBeingDragged = this.style.backgroundImage
        squareIdBeingDragged = parseInt(this.id)
        console.log(colorBeingDragged)
        console.log(this.id, "dragstart")
    }
    function dragEnd() {
        console.log(this.id, "dragend")
        let validMoves = [
            squareIdBeingDragged -1,
            squareIdBeingDragged -width,
            squareIdBeingDragged + 1,
            squareIdBeingDragged +width
        ]
        let validMove = validMoves.includes(squareIdBeingReplaced)

        if (squareIdBeingReplaced && validMove) {
            squareIdBeingReplaced = null
        } else if (squareIdBeingReplaced && !validMove) {
            squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced
            squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
        } else squares [squareIdBeingDragged].style.backgroundImage = colorBeingDragged
    }
    function dragOver(e) {
        e.preventDefault()
        console.log(this.id, "dragover")
    }
    function dragEnter(e) {
        e.preventDefault()
        console.log(this.id, "dragenter")
    }
    function dragLeave() {
        console.log(this.id, "dragleave")
    }
    function dragDrop() {
        console.log(this.id, "dragdrop")
        colorBeingReplaced = this.style.backgroundImage
        squareIdBeingReplaced = parseInt(this.id)
        this.style.backgroundImage = colorBeingDragged
        squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced
    }

    //drop candies down
    function moveDown() {
        for (i = 0; i < 55; i++) {
            if (squares[i + width].style.backgroundImage === "") {
                squares[i + width].style.backgroundImage = squares[i].style.backgroundImage
                squares[i].style.backgroundImage = ""
                const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
                const isFirstRow = firstRow.includes(i)
                if (isFirstRow && squares[i].style.backgroundImage === "") {
                    let randomColor = Math.floor(Math.random() * candyColors.length)
                    squares[i].style.backgroundImage = candyColors[randomColor]
                }
            }
        }
    }

    //check for five
    function checkRowForFive() {
        for (i = 0; i < 59; i++) {
            let rowOfFive = [i, i+1, i+2, i+3, i+4]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ""

            const nontvalid = [4, 5, 6, 7, 12, 13, 14, 15, 20, 21, 22, 23, 28, 29, 30, 31, 36, 37, 38, 39, 44, 45, 46, 47, 52, 53, 54, 55]
            if (nontvalid.includes(i)) continue

            if (rowOfFive.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 15
                scoreDisplay.innerHTML = score
                scoreOutput.innerHTML = score
                rowOfFive.forEach(index => {
                    squares[index].style.backgroundImage = "url(image/special.png)"
                })
            }
        }
    }
    checkRowForFive();

    function checkColumnForFive() {
        for (i = 0; i < 47; i++) {
            let ColumnOfFive = [i, i+width, i+width*2, i+width*3, i+width*4]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ""

            if (ColumnOfFive.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 15
                scoreDisplay.innerHTML = score
                scoreOutput.innerHTML = score
                ColumnOfFive.forEach(index => {
                    squares[index].style.backgroundImage = "url(image/special.png)"
                })
            }
        }
    }
    checkColumnForFive();

    //check for four
    function checkRowForFour() {
        for (i = 0; i < 60; i++) {
            let rowOfFour = [i, i+1, i+2, i+3]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ""

            const nontvalid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55]
            if (nontvalid.includes(i)) continue

            if (rowOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 10
                scoreDisplay.innerHTML = score
                scoreOutput.innerHTML = score
                rowOfFour.forEach(index => {
                    squares[index].style.backgroundImage = ""
                })
            }
        }
    }
    checkRowForFour();

    function checkColumnForFour() {
        for (i = 0; i < 47; i++) {
            let ColumnOfFour = [i, i+width, i+width*2, i+width*3]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ""

            if (ColumnOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 10
                scoreDisplay.innerHTML = score
                scoreOutput.innerHTML = score
                ColumnOfFour.forEach(index => {
                    squares[index].style.backgroundImage = ""
                })
            }
        }
    }
    checkColumnForFour();

    // check for three
    function checkRowForThree() {
        for (i = 0; i < 61; i++) {
            let rowOfThree = [i, i+1, i+2]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ""

            const nontvalid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
            if (nontvalid.includes(i)) continue

            if (rowOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 5
                scoreDisplay.innerHTML = score
                scoreOutput.innerHTML = score
                rowOfThree.forEach(index => {
                    squares[index].style.backgroundImage = ""
                })
            }
        }
    }
    checkRowForThree();

    function checkColumnForThree() {
        for (i = 0; i < 47; i++) {
            let ColumnOfThree = [i, i+width, i+width*2]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ""

            if (ColumnOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 5
                scoreDisplay.innerHTML = score
                scoreOutput.innerHTML = score
                ColumnOfThree.forEach(index => {
                    squares[index].style.backgroundImage = ""
                })
            }
        }
    }
    checkColumnForThree();

    window.setInterval(function(){
        moveDown()
        checkRowForFive()
        checkColumnForFive()
        checkRowForFour()
        checkColumnForFour()
        checkRowForThree()
        checkColumnForThree()
    }, 50)
})


var countdownTime = 60;
var countdownElement = document.getElementById('countdown');

var countdownInterval = setInterval(function() {
    countdownElement.innerHTML =  countdownTime + " s";
    countdownTime--;
    if (countdownTime === 0) {
    document.getElementById('death-screen').style.zIndex = '999';
    clearInterval(countdownInterval);
    }
}, 1000);