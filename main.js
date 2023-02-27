const url = 'https://islomapi.uz/api/monthly?region=Xiva&month=1';

const region = document.getElementById("region");
const month = document.getElementById("month");

let table = document.getElementById("taqvim");

function getRow(month, day, weekday, tong_saharlik, peshin, asr, shom_iftor, hufton) {
    switch (month) {
        case 1: month = "yanvar"; break;
        case 2: month = "fevral"; break;
        case 3: month = "mart"; break;
        case 4: month = "aprel"; break;
        case 5: month = "may"; break;
        case 6: month = "iyun"; break;
        case 7: month = "iyul"; break;
        case 8: month = "avgust"; break;
        case 9: month = "sentyabr"; break;
        case 10: month = "oktyabr"; break;
        case 11: month = "noyabr"; break;
        case 12: month = "dekabr"; break;
    }
    return `
            <tr class="row">
            <td class="data" colspan="7">${month}</td>
            </tr>
            <tr class="row">
            <td class="data" rowspan="2">${day}</td>
            <td class="data" rowspan="2">${weekday}</td>
                <td class="time-string">Bomdod (saharlik)</td>
                <td class="time-string">Peshin</td>
                <td class="time-string">Asr</td>
                <td class="time-string">Shom (Iftorlik)</td>
                <td class="time-string">Xufton</td>
                <tr class="row" style="background-color: #0f9602;">                
                <td class="time">${tong_saharlik}</td>
                <td class="time">${peshin}</td>
                <td class="time">${asr}</td>
                <td class="time">${shom_iftor}</td>
                <td class="time">${hufton}</td></tr>
            </tr>
 `
}

function getCalendar(url) {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            for (const i of data) {
                table.innerHTML += getRow(i.month, i.day, i.weekday, i.times.tong_saharlik, i.times.peshin, i.times.asr, i.times.shom_iftor, i.times.hufton)
            }
        })
}

region.addEventListener('change', function (e) {
    let url = `https://islomapi.uz/api/monthly?region=${e.target.value}&month=${month.value}`;
    table.innerHTML = "";
    getCalendar(url);
})

month.addEventListener('change', function (e) {
    let url = `https://islomapi.uz/api/monthly?region=${region.value}&month=${e.target.value}`;
    table.innerHTML = "";
    getCalendar(url);
})

