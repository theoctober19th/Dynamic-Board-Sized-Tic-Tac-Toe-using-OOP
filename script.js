var p1score = 0;
var p2score = 0;
var ties = 0;


$(document).on('ready', function() {
    $('boardSizeForm').on('submit', function(event) {
        var gameBoardSize = parseInt($('#boardSize').val());
        newGame = new GameBoard(gameBoardSize);
        result = new Result;
        newGame.createGameBoard(gameBoardSize);
        newGameBoard.onCellClick();
    });



    class GameBoard {
        constructor(boardSize) {
            this.boardSize = boardSize;
        }

        createGameBoard(boardSize) {
            $('#gameGrid').empty();

            // Creating rows in the board 
            for (var i = 0; i < this.boardSize; i++) {
                var newRow = "<tr></tr>";
                $('#gameGrid').append(newRow);
                $('tr').addClass('gameRow');
            }

            // Creating cells inside rows
            for (var i = 0; i < this.boardSize; i++) {
                var newCell = "<td></td>";
                $('.gameRow').append(newCell);
            }

            // id value of a cell, with xy coordinate
            for (var i = 0; i < this.boardSize; i++) {
                var row = i + 1;
                $('.gameRow').eq(i).find('td').each(function(n) {
                    var col = n + 1;
                    var cellId = "xy-" + row + "-" + col
                    $(this).attr('id', cellId);
                });
            }

        }

        // Defining event for the cell clicks 
        onCellClick() {
            var turn = 0;
            $('td').one('click', function(event) { // .one() only allows the event function to be performed once
                if (turn % 2) {
                    $(this).html('<span >O</span>').addClass('o');
                } else {
                    $(this).html('<span >X</span>').addClass('x');
                }

                // Checking if wining condition has met
                result.checkWinner(gameBoardSize);

                // Increase turn counter
                turn++;
            });
        }
    }



    class Result {
        //Get the cell ids
        getIds(cellClass) {
                return $(cellClass).map(function(index) {
                    return $(this).attr('id');
                });
            }
            // Get the x-y coordinates of each cell from the id values array
        getCoordinates(arrayOfIds) {
            var arrayOfCoordinates = [];
            // mapping id to coordinates
            $(arrayOfIds)
                .map(function(index) {
                    arrayOfCoordinates.push([parseInt(this.substr(3, 1)), parseInt(this.substr(5, 1))]);
                })
                .get();

            return arrayOfCoordinates;
        }

        // counting a coordinate in the array of coordinates
        countDuplicates(coordinates) {
            var count = {};
            var countValues = [];

            coordinates.forEach(function(i) {
                count[i] = (count[i] || 0) + 1;
            });
            countValues = Object.keys(count)
                .map(function(key) {
                    return count[key];
                });
            return countValues;
        }

        // Check for a horizontal row win
        countRows(playerCoordinates) {
            var yCoords = [];

            // Retrieve the y coordinates of the player coordinates
            for (var i = 0; i < playerCoordinates.length; i++) {
                yCoords.push(playerCoordinates[i][1]);
            }

            // Count the number of times a y-coordinate appears in the y-coordinates array
            return countDuplicates(yCoords);
        }


        // Check for a vertical column win
        countColumns(playerCoordinates) {
            var xCoords = [];

            // Retrieve the x coordinates of the player coordinates
            for (var i = 0; i < playerCoordinates.length; i++) {
                xCoords.push(playerCoordinates[i][0]);
            }

            // Count the number of times a y-coordinate appears in the y-coordinates array
            return countDuplicates(xCoords);
        }

        // Function to check if values are true
        isTrue(value) {
            return value === true;
        }

        // Check for a primary diagonal win
        countPrimaryDiagonalCells(playerCoordinates) {
            var primaryDiagonalCells = [];

            for (var i = 0; i < playerCoordinates.length; i++) {
                primaryDiagonalCells.push(playerCoordinates[i][0] === playerCoordinates[i][1]);
            }

            return primaryDiagonalCells.filter(isTrue);
        }

        // Check for a Secondaryry diagonal win
        countSecondaryDiagonalCells(playerCoordinates) {
            var secondaryDiagonalCells = [];

            for (var i = 0; i < playerCoordinates.length; i++) {
                secondaryDiagonalCells.push(playerCoordinates[i][0] === (gameBoardSize - playerCoordinates[i][1] + 1));
            }

            return secondaryDiagonalCells.filter(isTrue);
        }

        // Checking wining lines
        checkForWinningLines(rowCount, colCount, primaryDiagonalCount, secondaryDiagonalCount) {
            return (
                // Checking if no. of cells in a row are equal to game board size
                rowCount.includes(gameBoardSize) ||

                // Checking if no. of cells in a column are equal to game board size
                colCount.includes(gameBoardSize) ||

                // Checking if no. of primary diagonal cells are equal to the game board size
                (primaryDiagonalCount.length === gameBoardSize) ||

                // Checking if no.of secondary diagonal cells are equal to the game board size
                (secondaryDiagonalCount.length === gameBoardSize)
            );
        }

        checkWinner(gameBoardSize) {
            var gameBoardSize = gameBoardSize;

            //    For Player O::: 
            // Getting all id values for Player O
            var oPlayerIds = getIds('.o');

            // Getting coordinates from Player O's id values
            var oplayerCoordinates = getCoordinates(oPlayerIds);

            // Counting Player O appearing in each row of the board
            var oPlayerRows = countRows(oplayerCoordinates);

            // Counting Player O appearing in each column of the board
            var oPlayerCols = countColumns(oplayerCoordinates);

            // Counting Player O appearing in primary diagonal of the board
            var oPlayerPrimaryDiagonalCells = countPrimaryDiagonalCells(oplayerCoordinates);

            // Counting Player O appearing in secondary diagonal of the board
            var oPlayerSecondaryDiagonalCells = countSecondaryDiagonalCells(oplayerCoordinates);

            // Checking for Player O's winning Conditions
            var oPlayerWin = checkForWinningLines(oPlayerRows, oPlayerCols, oPlayerPrimaryDiagonalCells, oPlayerSecondaryDiagonalCells);



            //    For Player O::: 
            // Getting all id values for Player X
            var xPlayerIds = getIds('.x');

            // Getting coordinates from Player X's id values
            var xplayerCoordinates = getCoordinates(xPlayerIds);

            // Counting Player X appearing in each row of the board
            var xPlayerRows = countRows(xplayerCoordinates);

            // Counting Player X appearing in each column of the board
            var xPlayerCols = countColumns(xplayerCoordinates);

            // Counting Player X appearing in primary diagonal of the board
            var xPlayerPrimaryDiagonalCells = countPrimaryDiagonalCells(xplayerCoordinates);

            // Counting Player X appearing in secondary diagonal of the board
            var xPlayerSecondaryDiagonalCells = countSecondaryDiagonalCells(xplayerCoordinates);

            // Checking for Player X's winning Conditions
            var xPlayerWin = checkForWinningLines(xPlayerRows, xPlayerCols, xPlayerPrimaryDiagonalCells, xPlayerSecondaryDiagonalCells);


            // If Player O wins
            if (oPlayerWin) {
                alert("Congratulations,Player O wins the game !! Play again?");
                p1score++;
                $("#player-1").text(p1score);
                $('#gameGrid').empty();

                // If Player X wins
            } else if (xPlayerWin) {
                alert("Congratulations,Player X wins the game !! Play again?");
                p2score++;
                $("#player-2").text(p2score);
                $('#gameGrid').empty();

                // If Game Draws
            } else if ($('td:empty').length === 0) {
                alert("Game Draw !! Play again?");
                ties++;
                $("#ties").text(ties);
                $('#gameGrid').empty();
            }
        }
    }

});