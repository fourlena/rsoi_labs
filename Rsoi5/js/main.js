var Database_Name = 'ParkingDB';
var Version = 1.0;
var Text_Description = 'Web-SQL db for storing parking data.';
var Database_Size = 2 * 1024 * 1024;
var dbObj = openDatabase(Database_Name, Version, Text_Description, Database_Size);

dbObj.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS parking_data (model, username, car_num, time, custom)');
    tx.executeSql('SELECT rowid FROM parking_data', [], function (tx, results) {
        populateSelect(results)
    })

    var data1 = new ParkingData("Audi A5 2011", "Petrov Pavel Igorevich", "BM28462", "19:23", "")
    // var data2 = new ParkingData("Lada Largus IV","Karasev Eduard Pavlovich", "BM94562", "21:13")
    // var data3 = new ParkingData("Ford Mustang","Belov Alexander Mihailovich", "BM98122", "22:55")
    // var data4 = new ParkingData("Mitsubishi Lancer Evo 2035","Lysenko Inna Vladimirovna", "MM92362", "02:23")

    tx.executeSql('insert into parking_data(model, username, car_num, time, custom) values(?,?,?,?,?)', [data1.car_model, data1.username, data1.car_num, data1.parking_time, JSON.stringify(data1.custom)]);
    // tx.executeSql('insert into parking_data(model, username, car_num, time) values(?,?,?,?)', [data2.car_model, data3.username, data2.car_num, data2.parking_time]);  
    // tx.executeSql('insert into parking_data(model, username, car_num, time) values(?,?,?,?)', [data3.car_model, data3.username, data3.car_num, data3.parking_time]);
    // tx.executeSql('insert into parking_data(model, username, car_num, time) values(?,?,?,?)', [data4.car_model, data4.username, data4.car_num, data4.parking_time]);

    // tx.executeSql('SELECT * FROM parking_data ORDER BY time DESC', [], function (tx, results) {
    //     console.log(results)
    // })

    // tx.executeSql('DROP TABLE parking_data');  
});

function inserRow() {
    var car_model = document.getElementsByTagName("input")[0].value
    var username = document.getElementsByTagName("input")[1].value
    var car_num = document.getElementsByTagName("input")[2].value
    var time = document.getElementsByTagName("input")[3].value
    var customKey = document.getElementsByTagName("input")[4].value
    var customValue = document.getElementsByTagName("input")[5].value

    var custom = '{"' + customKey + '":"' + customValue + '"}'

    var data = new ParkingData(car_model, username, car_num, time, custom)

    dbObj.transaction(function (tx) {
        tx.executeSql('insert into parking_data(model, username, car_num, time, custom) values(?,?,?,?,?)', [data.car_model, data.username, data.car_num, data.parking_time, data.custom]);
    });
}

function populateSelect(results) {
    var len = results.rows.length
    for (i = 0; i < len; i++) {
        var idValue = results.rows.item(i).rowid
        var newOption = document.createElement('option')
        newOption.text = idValue
        newOption.value = idValue
        document.getElementById("ids").appendChild(newOption)
    }
}

function cleanup() {
    document.getElementsByTagName("input")[0].value = null
    document.getElementsByTagName("input")[1].value = null
    document.getElementsByTagName("input")[2].value = null
    document.getElementsByTagName("input")[3].value = null
}

function removeRow() {
    rowid = document.getElementById('ids').options[document.getElementById('ids').selectedIndex].value;
    dbObj.transaction(function (tx) {
        tx.executeSql('delete from parking_data where rowid=' + rowid);
    });
}

function showResults() {
    dbObj.transaction(function (tx) {
        tx.executeSql('SELECT rowid, * FROM parking_data', [], function (tx, results) {
            document.getElementsByClassName('results')[0].innerHTML = null
            var rowsLen = results.rows.length
            var newTable = document.createElement('table')
            newTable.setAttribute('id', 'resultTable')
            newTable.setAttribute('border', '1px')
            var newTr = document.createElement('tr')

            var th1 = document.createElement('th')
            th1.innerHTML = "ID Записи"
            newTr.appendChild(th1)
            var th2 = document.createElement('th')
            th2.innerHTML = "Модель авто"
            newTr.appendChild(th2)
            var th3 = document.createElement('th')
            th3.innerHTML = "ФИО владельца"
            newTr.appendChild(th3)
            var th4 = document.createElement('th')
            th4.innerHTML = "Номер авто"
            newTr.appendChild(th4)
            var th5 = document.createElement('th')
            th5.innerHTML = "Время стоянки"
            newTr.appendChild(th5)
            var th6 = document.createElement('th')
            th6.innerHTML = "Доп. информация"
            newTr.appendChild(th6)
            newTable.appendChild(newTr)
            document.getElementsByClassName('results')[0].appendChild(newTable)

            for (i = 0; i < rowsLen; i++) {
                console.log(results.rows.item(i))
                var data = results.rows.item(i)

                var table = document.getElementById('resultTable')
                var newTr = document.createElement('tr')

                var idTd = document.createElement('td')
                var carModelTd = document.createElement('td')
                var usernameTd = document.createElement('td')
                var carNumTd = document.createElement('td')
                var timeTd = document.createElement('td')
                var customTd = document.createElement('td')

                idTd.innerHTML = results.rows.item(i).rowid
                carModelTd.innerHTML = data.model
                usernameTd.innerHTML = data.username
                carNumTd.innerHTML = data.car_num
                timeTd.innerHTML = data.time
                customTd.innerHTML = data.custom

                newTr.appendChild(idTd)
                newTr.appendChild(carModelTd)
                newTr.appendChild(usernameTd)
                newTr.appendChild(carNumTd)
                newTr.appendChild(timeTd)
                newTr.appendChild(customTd)
                table.appendChild(newTr)
            }
            document.getElementsByClassName('results')[0].style.display = "block"
        }
        )
    });
}

function showMaxMinTimeRecords() {
    dbObj.transaction(function (tx) {
        tx.executeSql('SELECT rowid, * FROM parking_data ORDER BY time', [], function (tx, results) {
            document.getElementsByClassName('results')[0].innerHTML = null
            var rowsLen = results.rows.length
            var newTable = document.createElement('table')
            newTable.setAttribute('id', 'resultTable')
            newTable.setAttribute('border', '1px')
            var newTr = document.createElement('tr')

            var th1 = document.createElement('th')
            th1.innerHTML = "ID Записи"
            newTr.appendChild(th1)
            var th2 = document.createElement('th')
            th2.innerHTML = "Модель авто"
            newTr.appendChild(th2)
            var th3 = document.createElement('th')
            th3.innerHTML = "ФИО владельца"
            newTr.appendChild(th3)
            var th4 = document.createElement('th')
            th4.innerHTML = "Номер авто"
            newTr.appendChild(th4)
            var th5 = document.createElement('th')
            th5.innerHTML = "Время стоянки"
            newTr.appendChild(th5)
            var th6 = document.createElement('th')
            th6.innerHTML = "Доп. информация"
            newTr.appendChild(th6)
            newTable.appendChild(newTr)
            document.getElementsByClassName('results')[0].appendChild(newTable)


            console.log(results.rows.item(results.rows.length - 1))
            var data = results.rows.item(results.rows.length - 1)

            var table = document.getElementById('resultTable')
            var newTr = document.createElement('tr')

            var idTd = document.createElement('td')
            var carModelTd = document.createElement('td')
            var usernameTd = document.createElement('td')
            var carNumTd = document.createElement('td')
            var timeTd = document.createElement('td')
            var customTd = document.createElement('td')

            idTd.innerHTML = results.rows.item(results.rows.length - 1).rowid
            carModelTd.innerHTML = data.model
            usernameTd.innerHTML = data.username
            carNumTd.innerHTML = data.car_num
            timeTd.innerHTML = data.time
            customTd.innerHTML = data.custom

            newTr.appendChild(idTd)
            newTr.appendChild(carModelTd)
            newTr.appendChild(usernameTd)
            newTr.appendChild(carNumTd)
            newTr.appendChild(timeTd)
            newTr.appendChild(customTd)
            table.appendChild(newTr)

            console.log(results.rows.item(0))
            var data = results.rows.item(0)

            var table = document.getElementById('resultTable')
            var newTr = document.createElement('tr')

            var idTd = document.createElement('td')
            var carModelTd = document.createElement('td')
            var usernameTd = document.createElement('td')
            var carNumTd = document.createElement('td')
            var timeTd = document.createElement('td')
            var customTd = document.createElement('td')

            idTd.innerHTML = results.rows.item(0).rowid
            carModelTd.innerHTML = data.model
            usernameTd.innerHTML = data.username
            carNumTd.innerHTML = data.car_num
            timeTd.innerHTML = data.time
            customTd.innerHTML = data.custom

            newTr.appendChild(idTd)
            newTr.appendChild(carModelTd)
            newTr.appendChild(usernameTd)
            newTr.appendChild(carNumTd)
            newTr.appendChild(timeTd)
            newTr.appendChild(customTd)
            table.appendChild(newTr)

            document.getElementsByClassName('results')[0].style.display = "block"
        }
        )
    });
}

class ParkingData {
    constructor(car_model, username, car_num, parking_time, custom) {
        this.car_model = car_model;
        this.username = username;
        this.car_num = car_num;
        this.parking_time = parking_time;
        this.custom = custom;
    }
}