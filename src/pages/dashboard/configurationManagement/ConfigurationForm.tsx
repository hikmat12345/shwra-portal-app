import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Container } from '@mui/material';
import { useDispatch, useSelector, RootState } from '../../../redux/store';
import { getConfigurationsList } from '../../../redux/slices/user';
import { PATH_DASHBOARD } from '../../../routes/paths';
import useSettings from '../../../hooks/useSettings';
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import CreateEditConfiguration from 'components/_dashboard/configuration/CreateEditConfiguration';

// ----------------------------------------------------------------------

export default function ConfigurationForm() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { configurationId = '' } = useParams();
  const isEdit = true;
  const { configurationsList } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    dispatch(getConfigurationsList());
  }, [dispatch]);

  return (
    <Page title="العملاء: انشاء إعدادات جديد | شورى">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'انشاء إعدادات جديد' : 'تعديل الإعدادات'}
          links={[
            { name: 'الرئيسية', href: PATH_DASHBOARD.root },
            { name: 'الإعدادات', href: PATH_DASHBOARD.user.account },
            { name: !isEdit ? 'إعدادات جديد' : 'تعديل' }
          ]}
        />

        <CreateEditConfiguration
          isEdit={isEdit}
          configurationId={configurationId}
          configurationsList={configurationsList}
        />
      </Container>
    </Page>
  );
}
