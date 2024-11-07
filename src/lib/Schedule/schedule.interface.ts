export type TimeInterval = string[];
export type DayOfWeek = "0"|"1"|"2"|"3"|"4"|"5"|"6";

export interface ScheduleData {
    [index:number]: TimeInterval[] | null;
    //1: TimeInterval[] | null;
    //2: TimeInterval[] | null;
    //3: TimeInterval[] | null;
    //4: TimeInterval[] | null;
    //5: TimeInterval[] | null;
    //6: TimeInterval[] | null;
    'holidays': boolean
};

export type Schedule = Record<string, ScheduleData>;

export type PublicHolidays = Record<string, string>;