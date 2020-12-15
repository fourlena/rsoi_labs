var colsInserted = 0;
var rowsInserted = 0;

function add() {
    var wordSelect = document.getElementById('cars')
    var directionSelect = document.getElementById('direction')
    var radio = document.getElementsByName('where')

    var selectedWord = wordSelect.options[wordSelect.selectedIndex].value
    var selectedDirection = directionSelect.options[directionSelect.selectedIndex].value
 
    for (let i = 0; i < radio.length; i++) {
        if (radio[i].checked) {    
            var where = radio[i].value
        }
      }

      var table = document.getElementById('main-table')

      switch (selectedDirection) {
          case 'up': 
            if (where === 'row') {
                var row = table.insertRow(0);
                for (let i = 0; i < table.rows[1].cells.length; i++) {
                    var cell = row.insertCell(i);
                    colsInserted++;
                    cell.innerHTML = selectedWord;
                }
            }
            if (where === 'col') {
                var rowsLength = table.rows.length
                for (let i = 0; i < rowsLength; i++) {
                    var row = table.insertRow(i)
                    var cell = row.insertCell(0);
                    colsInserted++;
                    cell.innerHTML = selectedWord;
                }
            }
            break;
          case 'down':
            if (where === 'row') {
                var row = table.insertRow(table.rows.length);
                for (let i = 0; i < table.rows[1].cells.length; i++) {
                    var cell = row.insertCell(i);
                    colsInserted++;
                    cell.innerHTML = selectedWord;
                }
            }
            if (where === 'col') {
                var rowsLength = table.rows.length
                for (let i = 0; i < rowsLength; i++) {
                    var row = table.insertRow(table.rows.length)
                    var cell = row.insertCell(0);
                    colsInserted++;
                    cell.innerHTML = selectedWord;
                }
            }
            break;
            //fixme cell index is incorrect when insert to right
          case 'right':
            if (where === 'row') {
                var row = table.rows[0];
                var rowLength = table.rows[0].cells.length
                for (let i = rowLength; i > 0; i--) {
                    var cell = row.insertCell(i);
                    colsInserted++;
                    cell.innerHTML = selectedWord;
                }
            }
            if (where === 'col') {
                for (let i = 0; i < table.rows.length; i++) {
                    var cell = table.rows[i].insertCell(table.rows[i].length)
                    colsInserted++;
                    cell.innerHTML = selectedWord;
                }
            }
            break;
          case 'left':
            if (where === 'row') {
                var row = table.rows[0];
                var rowLength = table.rows[0].cells.length
                for (let i = 0; i < rowLength; i++) {
                    var cell = row.insertCell(i);
                    colsInserted++;
                    cell.innerHTML = selectedWord;
                }
            }
            if (where === 'col') {
                for (let i = 0; i < table.rows.length; i++) {
                    var cell = table.rows[i].insertCell(0);
                    colsInserted++;
                    cell.innerHTML = selectedWord;
                }
            }
            break;
      }
}

function refreshStats() {
    document.getElementById('colstat').innerHTML = 'Колонки: ' + colsInserted + '  ';
    document.getElementById('rowstat').innerHTML = 'Строки: ' + rowsInserted;
}

function removeTopRow() {
    document.getElementById('main-table').deleteRow(0)
}

function removeBottomRow() {
    var table = document.getElementById('main-table')
    table.deleteRow(table.rows.length - 1)
}