import { EventInput } from '@fullcalendar/common';

export type CalendarView = 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay' | 'listWeek';

export type CalendarState = {
  isLoading: boolean;
  error: boolean;
  availabilities: Availability[];
  isOpenModal: boolean;
  selectedAvailabilityId: null | string;
  selectedRange: null | { start: Date; end: Date };
};

export interface Availability extends EventInput {
  scheduleId: string;
  date: string | number;
  startTime: string | number;
  endTime: string | number;
  createdDate: string | number;
  status: number;
}
