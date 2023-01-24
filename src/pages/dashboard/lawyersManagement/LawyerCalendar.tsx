import FullCalendar, { DateSelectArg, EventClickArg, EventDropArg } from '@fullcalendar/react'; // => request placed at the top
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import interactionPlugin, { EventResizeDoneArg } from '@fullcalendar/interaction';
import { useSnackbar } from 'notistack';
import { useState, useRef, useEffect } from 'react';
// material
import { useTheme } from '@mui/material/styles';
import { Card, Container, DialogTitle, useMediaQuery } from '@mui/material';
// redux
import { RootState, useDispatch, useSelector } from '../../../redux/store';
import {
  getAvailabilities,
  openModal,
  closeModal,
  updateAvailability,
  selectAvailability,
  selectRange
} from '../../../redux/slices/calendar';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// @types
import { CalendarView } from '../../../@types/calendar';
//
//import arSaLocale from '@fullcalendar/core/locales/ar-sa';
import arLocale from '@fullcalendar/core/locales/ar';
// components
import Page from '../../../components/Page';
import { DialogAnimate } from '../../../components/animate';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import {
  AvailabilityCalendarForm,
  AvailabilityCalendarStyle,
  AvailabilityCalendarToolbar
} from '../../../components/_dashboard/calendar';

// ----------------------------------------------------------------------

const selectedAvailabilitySelector = (state: RootState) => {
  const { availabilities, selectedAvailabilityId } = state.calendar;

  if (selectedAvailabilityId) {
    return availabilities.find((_availability) => _availability.id === selectedAvailabilityId);
  }
  return null;
};

export default function LawyerCalendar() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const calendarRef = useRef<FullCalendar>(null);

  const { enqueueSnackbar } = useSnackbar();
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<CalendarView>(isMobile ? 'listWeek' : 'dayGridMonth');

  const selectedAvailability = useSelector(selectedAvailabilitySelector);

  const { availabilities, isOpenModal, selectedRange } = useSelector(
    (state: RootState) => state.calendar
  );

  useEffect(() => {
    dispatch(getAvailabilities());
  }, [dispatch]);

  useEffect(() => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      const newView = isMobile ? 'timeGridWeek' : 'timeGridWeek';
      calendarApi.changeView(newView);
      setView(newView);
    }
  }, [isMobile]);

  const handleClickToday = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.today();
      setDate(calendarApi.getDate());
    }
  };

  const handleChangeView = (newView: CalendarView) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.changeView(newView);
      setView(newView);
    }
  };

  const handleClickDatePrev = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.prev();
      setDate(calendarApi.getDate());
    }
  };

  const handleClickDateNext = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.next();
      setDate(calendarApi.getDate());
    }
  };

  const handleSelectRange = (arg: DateSelectArg) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.unselect();
    }
    dispatch(selectRange(arg.start, arg.end));
  };

  const handleSelectEvent = (arg: EventClickArg) => {
    dispatch(selectAvailability(arg.event.id));
  };

  const handleResizeEvent = async ({ event }: EventResizeDoneArg) => {
    try {
      dispatch(
        updateAvailability(event.id, {
          allDay: event.allDay,
          start: event.start,
          end: event.end
        })
      );
      enqueueSnackbar('تم تحديث الاتاحة بنجاح', { variant: 'success' });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDropEvent = async ({ event }: EventDropArg) => {
    try {
      dispatch(
        updateAvailability(event.id, {
          allDay: event.allDay,
          start: event.start,
          end: event.end
        })
      );
      enqueueSnackbar('تم تحديث الاتاحة بنجاح', {
        variant: 'success'
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <Page title="المحامين: جداول المواعيد | شورى">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={'جداول المواعيد'}
          links={[{ name: 'الرئيسية', href: PATH_DASHBOARD.root }, { name: 'جداول المواعيد' }]}
        />

        <Card>
          <AvailabilityCalendarStyle>
            <AvailabilityCalendarToolbar
              date={date}
              view={view}
              onNextDate={handleClickDateNext}
              onPrevDate={handleClickDatePrev}
              onToday={handleClickToday}
              onChangeView={handleChangeView}
            />
            <FullCalendar
              locale={arLocale}
              weekends
              editable={false}
              droppable={false}
              selectable
              allDaySlot={false}
              events={availabilities}
              ref={calendarRef}
              rerenderDelay={10}
              initialDate={date}
              initialView={view}
              dayMaxEventRows={1}
              eventDisplay="block"
              headerToolbar={false}
              allDayMaintainDuration={false}
              eventResizableFromStart
              select={handleSelectRange}
              eventDrop={handleDropEvent}
              eventClick={handleSelectEvent}
              eventResize={handleResizeEvent}
              height={isMobile ? 'auto' : 720}
              plugins={[
                listPlugin,
                dayGridPlugin,
                timelinePlugin,
                timeGridPlugin,
                interactionPlugin
              ]}
            />
          </AvailabilityCalendarStyle>
        </Card>

        <DialogAnimate open={isOpenModal} onClose={handleCloseModal}>
          <DialogTitle>{selectedAvailability ? 'تعديل اتاحة' : 'إنشاء إتاحة'}</DialogTitle>

          <AvailabilityCalendarForm
            availability={selectedAvailability || {}}
            range={selectedRange}
            onCancel={handleCloseModal}
          />
        </DialogAnimate>
      </Container>
    </Page>
  );
}
