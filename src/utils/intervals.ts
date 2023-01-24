import { find, matchesProperty, get, filter, forEach , last, findIndex } from 'lodash';
// @types
import { Day, Interval, Rule } from '../@types/availability'
// _apis_/intervals.ts
import { FULL_INTERVAL } from '../_apis_';
// logger.ts
import { Logger } from '../utils/logger';



/**
 * @param intervals 
 * @returns 
 */
export function getDayIntervals(rules: Rule[], dayId: string): Interval[] {
    const rule = find(rules, (rule: Rule) =>  rule.dayId === dayId);
    if (!rule) {
        return [];
    }
    return rule.intervals;
}


/**
 * @param intervals
 *  
 * @returns
 */
export function isVaildInterval(intervals: Interval): boolean {
    return true
}

/**
 * @description
 * @param  
 * @return
 */
export function createIntervals(
    intervals: Interval[],
): Interval[] {
 
    const lastInterval = last(intervals);

    if (!lastInterval) {
        intervals.push(FULL_INTERVAL[0]);
    } else {
        const lastIntervalEnd = get(lastInterval, 'to');
        const lastIntervalStart = get(lastInterval, 'from');

        if(lastIntervalEnd === '24:00') {
             throw Error('Invalid interval');
        }

        intervals.push(generateInterval(lastIntervalEnd));
    }

    return intervals;
    
}

/**
 * @description
 * @param
 * @return
*/
export function deleteInterval() {

}


/**
 * @description
 * @param
 * @return
 */
export function updateInterval() {


}




/**
 * 
 * @param intervals 
 * @returns 
 */
export function generateInterval(to: string): Interval {
    return {
        from: to,
        to: getHalfHour(to),
    }
}

/**
 * 
 * @param time 
 * @returns 
 */
export function getHalfHour(time: string): string {
    const [hour, minute] = time.split(':');

    if (minute === '00') {
      return `${hour}:30`;
    }
  
    const newHour = parseInt(hour, 10) + 1;


    const formattednewHour = newHour.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    });

    return `${formatHours(Number(formattednewHour))}:00`;
};


/**
 * @description conver 1 to 01
 * @param hours 
 * @returns 
 */
export function formatHours(hours: number): string {
    return hours.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    });
}



/***
 * @description
 * @param
 * @return
 */
export function sortIntervals(intervals: Interval[]) {
    return intervals.sort((a, b) => {
        if (a.from < b.from) {
            return -1;
        }
        if (a.from > b.from) {
            return 1;
        }
        return 0;
    });
}

/**
 * @description
 * @param
 * @return
 */
export function getNextInterval(intervals: Interval[], currentInterval: Interval) {
    const nextInterval = find(intervals, (interval: Interval) => {
        
        if (interval.from > currentInterval.to) {
            return true;
        }
        return false;
    });
}


/**
 * @description returns list of user free intervals for given day
 * @param userIntervals 
 * @returns Interval[]
 */
export function getFreeIntervals(userIntervals: Interval[]) {
 
    const freeIntervals: Interval[] = [];

    forEach(FULL_INTERVAL, (interval: Interval) => {

        const isIntervalFree = find(userIntervals, (userInterval: Interval) => {
            if (interval.from === userInterval.from && interval.to === userInterval.to) {
                return true;
            }
            return false;
        });

        if (!isIntervalFree) {
            freeIntervals.push(interval);
        }
    });

    return freeIntervals;
}



/**
 * @description
 * @param  
 * @return
 */
export function isReservedInterval(to: string, intervals: Interval[]): number|null {


    // check if to 

    const index = findIndex(intervals, (interval: Interval) => {
        if (interval.from ||interval.to > to) {
            return true;
        }
        return false;
    });
    //const interval = find(intervals, (interval: Interval) => interval.from === start);
   
    if (!index) {
        return null;
    }

    return index;
}
        




export function hasIntervalError(interval: Interval): boolean {
    const { from , to } = interval;
    return from >= to || from === to;
}


/**
 * @param a_start 
 * @param a_end 
 * @param b_start 
 * @param b_end 
 * @returns 
 */
 function intervalOverlaps(a_start: string, a_end: string, b_start: string, b_end: string): boolean  {
    if (a_start < b_start && b_start < a_end) return true; // b starts in a
    if (a_start < b_end   && b_end   < a_end) return true; // b ends in a
    if (b_start <  a_start && a_end   <  b_end) return true; // a in b
    return false;
 }



/**
 * @description To chech Times overlap with another set of times.
 * @param  intervals Interval[]
 * @param  interval Interval
 * @return boolean
 */
export function isOverlapping(intervals: Interval[], interval: Interval): boolean {
  
    const { from, to } = interval;

    const conflictingIntevals = intervals.find(inter => intervalOverlaps(from, to, inter.from, inter.to));
        
    return !!conflictingIntevals 
}



