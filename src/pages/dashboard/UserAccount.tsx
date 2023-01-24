import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import bellFill from '@iconify/icons-eva/bell-fill';
import shareFill from '@iconify/icons-eva/share-fill';
import roundVpnKey from '@iconify/icons-ic/round-vpn-key';
import roundReceipt from '@iconify/icons-ic/round-receipt';
import roundAccountBox from '@iconify/icons-ic/round-account-box';
import settings from '@iconify/icons-ic/settings';

// material
import { Container, Tab, Box, Tabs } from '@mui/material';
// redux
import { RootState, useDispatch, useSelector } from '../../redux/store';
import { getProfile } from '../../redux/slices/user';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import {
  AccountGeneral,
  AccountBilling,
  AccountSocialLinks,
  AccountNotifications,
  AccountChangePassword
} from '../../components/_dashboard/user/account';
import useAuth from 'hooks/useAuth';
import ConfigurationForm from './configurationManagement/ConfigurationForm';

// ----------------------------------------------------------------------

export default function UserAccount() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { cards, invoices, myProfile, addressBook, notifications } = useSelector(
    (state: RootState) => state.user
  );
  const { user } = useAuth();
  const [currentTab, setCurrentTab] = useState('general');

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  // if (!myProfile) {
  //   return null;
  // }

  // if (!cards) {
  //   return null;
  // }

  // if (!notifications) {
  //   return null;
  // }
  const usersTabs = [
    {
      value: 'general',
      label: 'الرئيسية',
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: <AccountGeneral />
    },
    {
      value: 'change_password',
      label: 'تغيير كلمة المرور',
      icon: <Icon icon={roundVpnKey} width={20} height={20} />,
      component: <AccountChangePassword />
    }
  ];

  const adminTabs = [
    {
      value: 'general',
      label: 'الرئيسية',
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: <AccountGeneral />
    },
    {
      value: 'billing',
      label: 'الفواتير',
      icon: <Icon icon={roundReceipt} width={20} height={20} />,
      component: (
        <AccountBilling
          cards={
            cards
              ? cards
              : [
                  {
                    id: '',
                    cardNumber: '',
                    cardType: ''
                  }
                ]
          }
          addressBook={addressBook}
          invoices={invoices}
        />
      )
    },
    {
      value: 'notifications',
      label: 'الإشعارات',
      icon: <Icon icon={bellFill} width={20} height={20} />,
      component: (
        <AccountNotifications
          notifications={
            notifications
              ? notifications
              : {
                  activityComments: false,
                  activityAnswers: false,
                  activityFollows: false,
                  applicationNews: false,
                  applicationProduct: false,
                  applicationBlog: false
                }
          }
        />
      )
    },
    {
      value: 'social_links',
      label: 'روابط مواقع التواصل الإجتماعي',
      icon: <Icon icon={shareFill} width={20} height={20} />,
      component: <AccountSocialLinks myProfile={myProfile ? myProfile : null} />
    },
    {
      value: 'change_password',
      label: 'تغيير كلمة المرور',
      icon: <Icon icon={roundVpnKey} width={20} height={20} />,
      component: <AccountChangePassword />
    },
    {
      value: 'configration',
      label: 'الإعدادات',
      icon: <Icon icon={settings} width={20} height={20} />,
      component: <ConfigurationForm />
    }
  ];
  const renderTabs = () => {
    return user?.role === 'Admin'
      ? adminTabs.map((tab: any) => (
          <Tab disableRipple key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
        ))
      : usersTabs.map((tab: any) => (
          <Tab disableRipple key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
        ));
  };
  return (
    <Page title="User: Account Settings | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="الحساب"
          links={[
            { name: 'لوحة التحكم', href: PATH_DASHBOARD.root },
            { name: 'المستخدم', href: PATH_DASHBOARD.lawyer.root },
            { name: 'إعدادات الحساب' }
          ]}
        />

        <Tabs
          value={currentTab}
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile
          onChange={(e, value) => {
            setCurrentTab(value);
          }}
        >
          {renderTabs()}
        </Tabs>

        <Box sx={{ mb: 5 }} />
        {user?.role === 'Admin' ? (
          <>
            {adminTabs.map((tab) => {
              const isMatched = tab.value === currentTab;
              return isMatched && <Box key={tab.value}>{tab.component}</Box>;
            })}
          </>
        ) : (
          <>
            {usersTabs.map((tab) => {
              const isMatched = tab.value === currentTab;
              return isMatched && <Box key={tab.value}>{tab.component}</Box>;
            })}
          </>
        )}
      </Container>
    </Page>
  );
}
