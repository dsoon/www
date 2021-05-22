
var board = ['_', '_', '_', '_', '_', '_', '_', '_', '_', ];
var player_1 = true;
var finished = false;
var count = 0;

function reset_game() {
    player_1 = true;
    finished = false;
    count = 0;
    document.getElementById("input").value = '';

    for (var i=0; i<board.length; i++) {
        board[i] = '_';
    }
    document.getElementById("submit").disabled = false;
    document.getElementById("input").disabled = false;
    status("Player 1 turn");
    print_board();
}

function print_board() {
    b = document.getElementById("board")
    for (var i=0; i<b.rows.length; i++){
        for (var j=0; j<b.rows[i].cells.length; j++){
            b.rows[i].cells[j].innerHTML = board[i*3 + j];
        }
    }

}

function is_empty(pos) {
    return board[pos-1] == '_';
}

function set_pos(pos) {
    var sym = (player_1) ? 'X' : 'O';

    board[pos-1] = sym;
}

function status(msg) {
            document.getElementById("status").innerHTML = msg;
}

function win() {

    var symbol = (player_1) ? 'X' : 'O';

    if ((board[0] == symbol && board[1] == symbol && board[2] == symbol) ||
        (board[3] == symbol && board[4] == symbol && board[5] == symbol) ||
        (board[6] == symbol && board[7] == symbol && board[8] == symbol) ||
        (board[0] == symbol && board[3] == symbol && board[6] == symbol) ||
        (board[1] == symbol && board[5] == symbol && board[7] == symbol) ||
        (board[2] == symbol && board[5] == symbol && board[8] == symbol) ||
        (board[0] == symbol && board[4] == symbol && board[8] == symbol) ||
        (board[2] == symbol && board[4] == symbol && board[6] == symbol)) {

            return true;
    } else {
            return false;
    }

}

function submit_pos() {
    var pos = document.getElementById("input").value;

    if (pos == '') {
        return;
    }

    if (pos < 1 || pos > 9) {
        status("Position "+pos+" out of range, try again!");
        document.getElementById("input").value = '';
        return;
    }

    if (is_empty(pos) == false) {
        status("Position "+pos+" already taken, try again!");
        document.getElementById("input").value = '';
        return;
    }

    set_pos(pos)
    print_board();

    if (win()) {

        if (player_1) {
            status("Player 1 wins");
        } else {
            status("Player 2 wins");
        }
        finished = true;
        document.getElementById("submit").disabled = true;
        document.getElementById("input").disabled = true;
        return;
    }

    player_1 = (player_1) ? false : true;
    if (player_1) {
        status("Player 1 turn");
    } else {
        status("Player 2 turn");
    }
    document.getElementById("input").value = '';
    document.getElementById("input").focus();
}

