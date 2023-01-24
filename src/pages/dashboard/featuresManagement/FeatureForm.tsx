import { useParams, useLocation } from 'react-router-dom';
import { Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../../routes/paths';
import useSettings from '../../../hooks/useSettings';
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import CreateEditFeature from 'components/_dashboard/feature/CreateEditFeature';

export default function FeatureForm() {
  const { themeStretch } = useSettings();
  const { pathname } = useLocation();
  const { featureId = '' } = useParams();
  const isEdit = pathname.includes('edit');


  return (
    <Page title="العملاء: انشاء ميزة جديدة | شورى">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'انشاء ميزة جديدة' : 'تعديل الميزة'}
          links={[
            { name: 'الرئيسية', href: PATH_DASHBOARD.root },
            { name: 'ميزات الباقة', href:  PATH_DASHBOARD.features.list },
            { name: !isEdit ? 'ميزة جديد' : '' }
          ]}
        />
        <CreateEditFeature isEdit={isEdit} featureId={featureId} />
      </Container>
    </Page>
  );
}
