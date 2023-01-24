import { 
    sortIntervals, 
    generateInterval,
    getDayIntervals,
    getFreeIntervals,
    createIntervals,
    isReservedInterval,
    getHalfHour,
    isOverlapping,
    isIntervalError,
} from './intervals';
// _api_
import { MOCK_RULS, USER_FREE_INTERVAL } from '../_apis_';



describe('sortIntervals', () => {


    it('should sort intervals: sucsses', () => {
        const intervals = [
            { from: '11:00', to: '11:30' },
            { from: '10:00', to: '10:30' },
            { from: '12:00', to: '12:30' },
            { from: '10:30', to: '11:00' },
            { from: '11:30', to: '12:00' },
        ];

        const sorted = sortIntervals(intervals);

        expect(sorted).toEqual([
            { from: '10:00', to: '10:30' },
            { from: '10:30', to: '11:00' },
            { from: '11:00', to: '11:30' },
            { from: '11:30', to: '12:00' },
            { from: '12:00', to: '12:30' },
        ]);
    });



});


describe('getDayIntervals', () => {

    it('should generate intervals: sucsses', () => {

        let dayId = 'monday';
        const intervals = getDayIntervals(MOCK_RULS as any, dayId);

        expect(intervals).toEqual(MOCK_RULS[0].intervals);

    });

});




describe('getFreeIntervals', () => {
    
    it('should get free intervals', () => {

        const intervals = MOCK_RULS[0].intervals;
        // console.log('getFreeIntervals', intervals);

        const free = getFreeIntervals(intervals);
        // console.log('free', free);

        expect(free)
        .toEqual(USER_FREE_INTERVAL);

    });

});




/*

describe('isReservedInterval', () => {

    it('should return empty arry', () => {

        const intervals = [
            {
               from: '10:00',
               to: '12:30' 
            },
            {
                from: '15:00',
                to: '20:30'
            }
        ];

        const interval = {
            from: '10:00',
            to: '12:30'
        }

        const isReserved = isReservedInterval('08:00', intervals);
        console.log(isReserved);

        expect(isReserved)
        .toEqual(true);

    });



    it('should return array of index', () => {

        let dayId = 'monday';
        const intervals = getDayIntervals(MOCK_RULS as any, dayId);

        const isReserved = isReservedInterval('11:30', intervals);
       // console.log(isReserved);

        expect(isReserved)
        .toEqual(false);

    });

});    

*/






describe('createIntervals', () => {

    it('should generate intervals: sucsses', () => {

        let dayId = 'monday';
        const intervals = getDayIntervals(MOCK_RULS as any, dayId);

        const generated = createIntervals(intervals);
        console.log(generated);

        expect(generated)
        .toEqual([
            { from: '08:00', to: '08:30' },
            { from: '08:30', to: '09:00' },
            { from: '09:00', to: '09:30' }
        ]);

    });

});



describe('isOverlapping', () => {
    

    it('does not overlap ', () => {
    
        const interval = {
            from: '13:00',
            to: '14:30'
        }

        const intervals = [
            {
                from: '10:00',
                to: '12:30'
            },
            {
                from: '15:00',
                to: '20:30'
            }
        ];
 
        const isOverlap = isOverlapping(intervals, interval);
        console.log(isOverlap);

        expect(isOverlap)
        .toEqual(false);

    });



        it('overlap after', () => {
    
            const interval = {
                from: '10:00',
                to: '12:30'
            }
    
            const intervals = [
                {
                    from: '09:00',
                    to: '12:30'
                },
                {
                    from: '15:00',
                    to: '20:30'
                }
            ];
    
            const isOverlap = isOverlapping(intervals, interval);
            console.log(isOverlap);
    
            expect(isOverlap)
            .toEqual(true);
    
        });
    

        it('overlap before', () => {
    
            const interval = {
                from: '04:45',
                to: '05:45'
            }
    
            const intervals = [
                {
                    from: '02:00',
                    to: '05:45'
                },
                {
                    from: '00:00',
                    to: '01:00'
                }
            ];
    
            const isOverlap = isOverlapping(intervals, interval);
            console.log(isOverlap);
    
            expect(isOverlap)
            .toEqual(true);
    
        });



});



//-----------------------------------------------------

describe('isIntervalError ......', () => {
    describe('isIntervalError', () => {
        it('should return false', () => {
            const interval = {
                from: '10:00',
                to: '12:30'
            }
            const isError = isIntervalError(interval);
            expect(isError).toEqual(false);
        });
    });

    describe('isIntervalError', () => {
        it('should return false', () => {
            const interval = {
                from: '10:00',
                to: '10:30'
            }
            const isError = isIntervalError(interval);
            expect(isError).toEqual(false);
        });
    });

    describe('isIntervalError', () => {
        it('should return false', () => {
            const interval = {
                from: '10:00',
                to: '10:30'
            }
            const isError = isIntervalError(interval);
            expect(isError).toEqual(false);
        });
    });
});