import { compact } from 'lodash';
import { useReducer, Reducer } from 'react';
// @types
import { Interval } from '../@types/availability';
// utils
import { isReservedInterval , getHalfHour } from '../utils/intervals';


  
type InitialStateProps = {
    interval: null|Interval,
    error: string
}

enum IntervalActionKind {
    ReservedInterval = 'RESERVED_INTERVAL',
    FreeInterval = 'FREE_INTERVAL',
    ErrorInterval = 'ERROR_Interval'
}

type IntervalAction = {
    type: IntervalActionKind,
    payload: any
}
  


const intervalInitialState: InitialStateProps = {
    interval: null,
    error: ''
};


function intervalReducer(state: InitialStateProps, action: IntervalAction) {
   
    const { type, payload } = action;

    switch (type) {
      case IntervalActionKind.ReservedInterval:
        return {
            interval: null,
            error: ""
        }
      case IntervalActionKind.FreeInterval:
        return {
            interval: payload.interval,
            error: ""
        }
      default:
        return {
            interval: null,
            error: "Error"
        }
    }
}

// expected errors
// 1. if to before the from
// 2. if interval is free, return interval


export default function useInterval(intervals: Interval[]) {

    const [ state , dispatch ] = useReducer(intervalReducer, intervalInitialState);


    const applyInterval =  (start: string) => {

        if(!isReservedInterval(start, intervals)) {
           
            const to = getHalfHour(start);


            dispatch({
                type: IntervalActionKind.FreeInterval,
                payload: {
                   interval: {
                    from: start,
                    to
                },
              }
            })


       } else {

            dispatch({
                type: IntervalActionKind.ReservedInterval,
                payload: null
            })

       }
    }


    // validate the interval
    const createInterval = ({ from, to }: Interval) => {
    
        if(!from || !to) {
            console.error('from or to is not defined');
            return;
        }

        if(from > to) {
            console.error('from is after to');
            return;
        }

        if(isReservedInterval(from, intervals)) {
            console.error('interval is reserved');
            return;
        }

        if(isReservedInterval(to, intervals)) {
            console.error('interval is reserved');
            return;
        }

        dispatch({
            type: IntervalActionKind.FreeInterval,
            payload: {
                from,
                to
            }
        })

   
    }

    return {
        interval: state.interval,
        error: state.error,
        applyInterval,
        createInterval
        /*
          
        */
    }

}