import type { DateTime } from "schema-dts";
import type { Schedule, DayOfWeek, ScheduleData, TimeInterval, PublicHolidays } from "./schedule.interface.ts";

export const schedules: Schedule = {
    'phoneAppointment': {
        0: null,
        1: [
            ['08:00:00', '12:00:00'],
            ["14:00:00", "16:00:00"]
        ],
        2: [
            ['08:00:00', '12:00:00'],
            ["14:00:00", "16:00:00"]
        ],
        3: [
            ['08:00:00', '12:00:00'],
            ["14:00:00", "16:00:00"]
        ],
        4: [
            ['08:00:00', '12:00:00'],
            ["14:00:00", "16:00:00"]
        ],
        5: [
            ['08:00:00', '12:00:00'],
            ["14:00:00", "16:00:00"]
        ],
        6: null,
        holidays: false,
    }
};

export function validateTime(dateTime: Date, intervals: TimeInterval[]) {
    const cH: number = dateTime.getHours();
    const cM: number = dateTime.getMinutes();
    const cS: number = dateTime.getSeconds();
    //console.log(`cH=${cH} cM=${cM} cS=${cS}`);
    //const time = dateTime.toTimeString().split(' ')[0];
    for (const interval of intervals) {
        const [startH, startM, startS] = interval[0].split(':');
        //console.log(`startH=${parseInt(startH)} startM=${parseInt(startM)} startS=${parseInt(startS)}`);
        if ( cH < parseInt(startH, 10) ) return false;
        if ( cM < parseInt(startM, 10) ) return false;
        if ( cS < parseInt(startS, 10) ) return false;
        const [stopH, stopM, stopS] = interval[1].split(':');
        //console.log(`stopH=${parseInt(stopH,10)} stopM=${parseInt(stopM,10)} stopS=${parseInt(stopS,10)}`);
        //console.log(`cH < parseInt(stopH, 10) : ${cH < parseInt(stopH, 10)}`);
        if ( cH < parseInt(stopH, 10) ) return true;
        //console.log(`cH < parseInt(stopH, 10) : ${cH < parseInt(stopH, 10)}`);
        if ( cM < parseInt(stopM, 10) ) return true;
        if ( cS < parseInt(stopS, 10) ) return true;
    };
    return false;
}

function isoDateString(dateTime: Date) {
    let yearNum = dateTime.getFullYear();
    let monthNum = dateTime.getMonth()+1;
    let dateNum = dateTime.getDate();
    const dateStr = (dateNum < 10) ? `0${dateNum}`: String(dateNum);
    const monthStr = (monthNum < 10) ? `0${monthNum}`: String(monthNum);
    return yearNum + '-' + monthStr + '-' + dateStr;
}

export function isDateHoly(dateTime: Date, holidays: PublicHolidays) {
    const isoDate = isoDateString(dateTime);
    return Object.keys(holidays).some((element) => element===isoDate)
};

export const isServiceAvailable = (name: string, dateTime: Date, holidays: PublicHolidays) => {
    let schedule = schedules[name];
    const day = dateTime.getDay();
    const intervals = schedule[day];
    if ( intervals == null ) return false;
    if ( isDateHoly(dateTime, holidays)) return false;
    return validateTime(dateTime, intervals);
};  