import moment from "moment-timezone";

const dateTimeZone = function (date, timeZone = "America/Sao_Paulo") {
    var momentTz = moment(date);
    var now = momentTz.tz(timeZone);
    var formatted = now.format('YYYY-MM-DDTHH:mm:ssZ')
    return formatted;
}

const addDays = function (date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

const formatDate = function (date, format) {
    const map = {
        mm: date.getMonth() + 1,
        dd: date.getDate(),
        aa: date.getFullYear().toString().slice(-2),
        yyyy: date.getFullYear()
    }
    if (map.mm <= 9) map.mm = "0" + map.mm;
    if (map.dd <= 9) map.dd = "0" + map.dd;
    return format.replace(/mm|dd|aa|yyyy/gi, matched => map[matched])
}

export default {
    dateTimeZone: dateTimeZone,
    addDays: addDays,
    formatDate: formatDate
}
