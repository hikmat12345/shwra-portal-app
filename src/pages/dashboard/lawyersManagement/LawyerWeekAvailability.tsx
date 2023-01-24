import FullCalendar from '@fullcalendar/react';
import listWeek from '@fullcalendar/list';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import arLocale from '@fullcalendar/core/locales/ar';
import { useMediaQuery } from '@mui/material';
import { AvailabilityCalendarStyle } from 'components/_dashboard/calendar';
import { WeekEvent } from '../../../@types/availability';
import { CalendarView } from '../../../@types/calendar';

type LawyerWeekAvailabilityProps = {
  weekEvents: WeekEvent[];
  calendarRef: any;
};
export default function LawyerWeekAvailability({
  weekEvents,
  calendarRef
}: LawyerWeekAvailabilityProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [date] = useState(new Date());
  const [view] = useState<CalendarView>('timeGridWeek');
  return (
    <AvailabilityCalendarStyle todaycolor={'transparent'}>
      <FullCalendar
        displayEventTime={false}
        displayEventEnd={true}
        locale={arLocale}
        weekends
        editable={false}
        droppable={false}
        selectable
        allDaySlot={false}
        events={weekEvents}
        ref={calendarRef}
        rerenderDelay={10}
        initialDate={date}
        initialView={view}
        dayMaxEventRows={1}
        eventDisplay="block"
        allDayMaintainDuration={false}
        headerToolbar={false}
        eventResizableFromStart
        select={() => {}}
        eventDrop={() => {}}
        eventClick={() => {}}
        eventResize={() => {}}
        height={isMobile ? 'auto' : 720}
        dayHeaderContent={(day: any) => {
          return day.text?.split('،')[0];
        }}
        plugins={[listWeek, dayGridPlugin, timeGridPlugin]}
      />
    </AvailabilityCalendarStyle>
  );
}
