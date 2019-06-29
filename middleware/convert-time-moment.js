const moment = require('moment')
const tz = require('moment-timezone')

module.exports = {
    toTimeZone
}


function toTimeZone(time, ampm, zone) {
    const reply = `${time} Lambda Time occurs at`
    time = time.split(':')
    time[0].padStart(2, 0)
    if (ampm.toUpperCase() === 'PM' && time[0] < 12) {
        time[0] = parseInt(time[0]) + 12
        time[0] = time[0].toString()
    }
    time = time.join(':')
    let newTime = moment.tz("1970-01-01 " + time , 'America/Los_Angeles')

    if (zone.toLowerCase() === 'mdt' || zone.toLowerCase() === 'mt') {
        newTime = newTime.tz('America/Denver').format('h:mma z')
        return `${reply} ${newTime}`
    }
    else if (zone.toLowerCase() === "cdt" || zone.toLowerCase() === 'ct' ) {
        newTime = newTime.tz('America/Chicago').format('h:mma z')
        return `${reply} ${newTime}`
    }
    else if (zone.toLowerCase() === "edt" || zone.toLowerCase() === 'et' ) {
        newTime = newTime.tz('America/New_York').format('h:mma z')
        return `${reply} ${newTime}`
    }
    else if (zone.toLowerCase() === 'pdt' || zone.toLowerCase() === 'pt') {
        return `You're already in Lambda Time :)`
    }
    else {
        return `Sorry, we haven't added support for your time zone yet. (Mountain Time = MDT, Central Time = CDT, Eastern Time = EDT)`
    }
}