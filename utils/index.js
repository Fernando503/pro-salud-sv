'use strict'

function hoyFecha() {
    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth() + 1;
    var yyyy = hoy.getFullYear();

    dd = addZero(dd);
    mm = addZero(mm);

    return yyyy + '-' + mm + '-' + dd

}

function addZero(i) {
    if (i < 10) {
        i = '0' + i;
    }
    return i;
}


module.exports = {
    hoyFecha
}