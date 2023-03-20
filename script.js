var board = [];
var current_player = 1;

window.addEventListener('DOMContentLoaded', (event) => {
    initBoard();
});

function initBoard() {
    for(let i=0;i<64;i++) {
        board[i] = Math.floor(Math.random() * 7);
    }
    
    updateBoard();
}


function updateBoard() {
    html = '';
    for(let i=0;i<64;i++) {
        if (board[i] == 0) { //Empty
            html += '<div data-index=' + i + ' class="flexitem"></div>';
        }
        else if (board[i] == 1) { //Player 1
            html += '<div data-index=' + i + ' class="flexitem player1"></div>';
        }
        else if (board[i] == 2) { //Player 2
            html += '<div data-index=' + i + ' class="flexitem player2"></div>';
        }
        else if (board[i] == 3) { //Player 3
            html += '<div data-index=' + i + ' class="flexitem player3"></div>';
        }
        else if (board[i] == 4) { //Player 4
            html += '<div data-index=' + i + ' class="flexitem player4"></div>';
        }
        else if (board[i] == 5) { //Player 5
            html += '<div data-index=' + i + ' class="flexitem player5"></div>';
        }
        else if (board[i] == 6) { //Player 6
            html += '<div data-index=' + i + ' class="flexitem player6"></div>';
        }
        else if (board[i] == 30) { //Available
            html += '<div data-index=' + i + ' class="flexitem available"></div>';
        }
    }
    document.getElementById('flexcontainer').innerHTML = html;
};