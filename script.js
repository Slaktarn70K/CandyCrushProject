var board = [];
var current_player = 1;

window.addEventListener('DOMContentLoaded', (event) => {
    initBoard();
});

function initBoard() {
    for(let i=0;i<64;i++) {
        board[i] = Math.floor(Math.random() * 5);
    }
    
    updateBoard();
}


function updateBoard() {
    html = '';
    for(let i=0;i<64;i++) {
        /*if (board[i] == 0) { //Empty
            html += '<div data-index=' + i + ' class="flexitem"></div>';
        }*/
        if (board[i] == 0) { //Player 1
            html += '<div data-index=' + i + ' class="flexitem player1"></div>';
        }
        else if (board[i] == 1) { //Player 2
            html += '<div data-index=' + i + ' class="flexitem player2"></div>';
        }
        else if (board[i] == 2) { //Player 3
            html += '<div data-index=' + i + ' class="flexitem player3"></div>';
        }
        else if (board[i] == 3) { //Player 4
            html += '<div data-index=' + i + ' class="flexitem player4"></div>';
        }
        else if (board[i] == 4) { //Player 5
            html += '<div data-index=' + i + ' class="flexitem player5"></div>';
        }
        else if (board[i] == 30) { //Available
            html += '<div data-index=' + i + ' class="flexitem available"></div>';
        }
    }
    document.getElementById('flexcontainer').innerHTML = html;

}

window.addEventListener('click', (event) => {

    if (event.target.matches('#restart')) {
        initBoard();
    }

    if (event.target.matches('.flexitem')) {
        var dataindex = event.target.getAttribute('data-index');        
   
        //Is clicked element empty (or available is set)?
        if (board[dataindex] == 0 || board[dataindex] == 30) {
            board[dataindex] = current_player;

            if (current_player == 1) {
                current_player = 2;
            }
            else {
                current_player = 1;
            }

            dataindex = parseInt(dataindex);

            //Check nearby empty
            nearby_indexes = [-1,1,-8,8,-7,7,-9,9];

            for(let i=0;i<nearby_indexes.length;i++) {
                let ni = nearby_indexes[i];

                if (board[dataindex+ni] == 0) {
                    board[dataindex+ni] = 30;
                }
            }


            updateBoard();
        }

    }
});