# probems:
    1- only half hour intetval
    2- none dedicated time intetval
    3- 48 intetvals
    4- sort rule intetvals by start time 


# Algorithm:
    1- filter slices that need to sort in intetvals
     * createIntervalSuccess
        - before:
            - startTime
            - endTime
            - duration
     * updateIntervalSuccess


# Methods
 - SortIntervals
    - Description: sort intervals by start time 
        
    - Input:
        - intervals: list of intervals
    - Output:
        - sortedIntervals: list of sorted intervals


 -  Reserved Time Slots
    - Description: check if there is dedicated time in the day
        
    - Input:
        - intervals: list of intervals
    - Output:
        - dedicatedTime: boolean

- GenerateInterval
    - Description: generate intetvals for the day
        
    - Input:
        - startTime: start time of the day
        - endTime: end time of the day
        - duration: duration of the day
    - Output:
        - intervals: list of intervals




https://calendly.com/api/booking/event_types/CGBMUWUTW4RXALBP/calendar/range?timezone=Africa%2FCairo&diagnostics=false&range_start=2022-01-30&range_end=2022-01-31



ru