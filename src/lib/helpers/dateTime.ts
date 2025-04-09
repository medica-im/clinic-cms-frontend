import moment from 'moment-timezone/builds/moment-timezone-with-data-10-year-range.js';
import { variables } from '$lib/utils/constants.ts';

const defaultTZ = variables.TIMEZONE || 'Europe/Paris';

export function getDate(date: string, time: string, tz: string = defaultTZ): Date {
    return moment.tz(`${date} ${time}`, tz).toDate();
};