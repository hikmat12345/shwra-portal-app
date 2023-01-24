import { useState, useEffect, Fragment } from 'react';
// material
import {
  Card,
  Toolbar,
  Container,
  //
  Tabs,
  Tab
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { RootState, useDispatch, useSelector } from '../../../redux/store';
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// @types
// import {  } from '../../@types/';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { AppointmentList } from '../../../components/_dashboard/appointment/list';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3)
}));

const TabsWrapperStyle = styled('div')(({ theme }) => ({
  // zIndex: 9,
  //bottom: 0,
  width: '100%',
  display: 'flex',
  //position: 'absolute',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'center'
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-start',
    paddingRight: theme.spacing(3)
  }
}));

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'date', label: 'التاريخ', alignRight: false },
  { id: 'category', label: 'التصنيف', alignRight: false },
  { id: 'cost', label: 'القيمة', alignRight: false },
  { id: 'notes', label: 'الملاحظات', alignRight: false },
  { id: 'actions', label: 'إجراءات', alignRight: false }
  //{ id: '' }
];

// ----------------------------------------------------------------------

export default function LawyerAppointments() {
  const { themeStretch } = useSettings();

  // REDUX
  const dispatch = useDispatch();
  const { commingAppointmentList, lastAppointmentList, isLoading, error } = useSelector(
    (state: RootState) => state.appointment
  );

  // useEffect(() => {
  //   dispatch(getCommingAppointmentList());
  //   dispatch(getLastAppointmentList());
  // }, [dispatch]);

  // Tabs Controls
  const [currentTab, setCurrentTab] = useState('comming-appointments');

  const handleChangeTab = (newValue: string) => {
    setCurrentTab(newValue);
  };

  //
  const APPOINTMENTS_TABS = [
    {
      value: 'comming-appointments',
      label: 'المواعيد القادمة',
      icon: <> </>,
      component: <AppointmentList statusId={2} />
    },
    {
      value: 'last-appointments',
      label: 'المواعيد السابقة',
      icon: <> </>,
      component: <AppointmentList statusId={5} />
    }
  ];

  return (
    <Page title="المحامين:  المواعيد | شورى">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={' المواعيد'}
          links={[{ name: 'الرئيسية', href: PATH_DASHBOARD.root }, { name: ' المواعيد' }]}
        />

        <RootStyle>
          <TabsWrapperStyle>
            <Tabs
              value={currentTab}
              scrollButtons="auto"
              variant="scrollable"
              allowScrollButtonsMobile
              onChange={(e, value) => setCurrentTab(value)}
            >
              {APPOINTMENTS_TABS.map((tab) => (
                <Tab
                  disableRipple
                  key={tab.value}
                  label={tab.label}
                  icon={tab.icon}
                  value={tab.value}
                />
              ))}
            </Tabs>
          </TabsWrapperStyle>
        </RootStyle>

        {APPOINTMENTS_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Fragment key={tab.value}>{tab.component}</Fragment>;
        })}
      </Container>
    </Page>
  );
}
