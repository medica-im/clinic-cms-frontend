import { expect, test } from 'vitest';
import { validateTime, isServiceAvailable, isDateHoly } from './available.ts';

const publicHolidays2025 = {
    "2025-01-01": "Jour de l'an",
    "2025-04-21": "Lundi de Pâques",
    "2025-05-01": "Fête du Travail",
    "2025-05-08": "Victoire des alliés",
    "2025-05-29": "Ascension",
    "2025-06-09": "Lundi de Pentecôte",
    "2025-07-14": "Fête Nationale",
    "2025-08-15": "Assomption",
    "2025-11-01": "Toussaint",
    "2025-11-11": "Armistice",
    "2025-12-25": "Noël"
}

const intervals0 = [
    ["01:00:00", "02:00:00"]
];
const intervals1 = [
    ["01:00:00", "02:00:00"],
    ["03:00:00", "04:00:00"]
];
const dt003000 = new Date('1970-01-01T00:30:00')
const dt013000 = new Date('1970-01-01T01:30:00')
const dt023000 = new Date('1970-01-01T02:30:00')
const dt033000 = new Date('1970-01-01T03:30:00')
const dt043000 = new Date('1970-01-01T04:30:00')

test('validateTime', () => {
    expect(validateTime(dt003000, intervals0)).toEqual(false);
    expect(validateTime(dt013000, intervals0)).toEqual(true);
    expect(validateTime(dt023000, intervals0)).toEqual(false);
    expect(validateTime(dt013000, intervals1)).toEqual(true);
    expect(validateTime(dt023000, intervals1)).toEqual(false);
    expect(validateTime(dt033000, intervals1)).toEqual(true);
    expect(validateTime(dt043000, intervals1)).toEqual(false);
});

const sunday000000 = new Date('2024-10-27T00:00:00');
const monday000000 = new Date('2024-10-28T00:00:00');
const monday090000 = new Date('2024-10-28T09:00:00');
const monday130000 = new Date('2024-10-28T13:00:00');
const monday140000 = new Date('2024-10-28T14:00:00');
const monday150000 = new Date('2024-10-28T15:00:00');
const monday160000 = new Date('2024-10-28T16:00:00');
const christmas2025 = new Date('2025-12-25T11:00:00');
const NYD2025 = new Date('2025-01-01T11:00:00');
const NYE2025 = new Date('2025-12-31T11:00:00');

test('isServiceAvailable', () => {
    expect(
        isServiceAvailable('phoneAppointment', sunday000000,
    publicHolidays2025)).toEqual(false);
    expect(isServiceAvailable('phoneAppointment', monday000000, publicHolidays2025)).toEqual(false);
    expect(isServiceAvailable('phoneAppointment', monday090000, publicHolidays2025)).toEqual(true);
    expect(isServiceAvailable('phoneAppointment', monday130000, publicHolidays2025)).toEqual(false);
    expect(isServiceAvailable('phoneAppointment', monday140000, publicHolidays2025)).toEqual(true);
    expect(isServiceAvailable('phoneAppointment', monday150000, publicHolidays2025)).toEqual(true);
    expect(isServiceAvailable('phoneAppointment', monday160000, publicHolidays2025)).toEqual(false);
    expect(isServiceAvailable('phoneAppointment', christmas2025, publicHolidays2025)).toEqual(false);
});

test('isDateHoly', () => {
    expect(isDateHoly(christmas2025, publicHolidays2025)).toEqual(true);
    expect(isDateHoly(NYD2025, publicHolidays2025)).toEqual(true);
    expect(isDateHoly(NYE2025, publicHolidays2025)).toEqual(false);
});