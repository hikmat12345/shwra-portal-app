

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/**
 * @description
 * @param
 * @return
 */
export function getDayId(date: Date|number|string): string {
    try {

        if(typeof date === 'number') {
            date = new Date(date);
        }

        if(typeof date === 'string') {
            date = new Date(date);
        }

        const day = days[date.getDay()]

        return day;

    } catch(e) {
        console.error(e);
        throw e;
    }
}





