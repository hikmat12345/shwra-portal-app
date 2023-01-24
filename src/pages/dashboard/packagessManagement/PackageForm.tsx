import { useParams, useLocation } from 'react-router-dom';
import { Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../../routes/paths';
import useSettings from '../../../hooks/useSettings';
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import CreateEditPackage from 'components/_dashboard/package/CreateEditPackage';

export default function PackageForm() {
  const { themeStretch } = useSettings();
  const { pathname } = useLocation();
  const { packageId = '' } = useParams();
  const isEdit = pathname.includes('edit');


  return (
    <Page title="العملاء: انشاء باقة جديد | شورى">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'انشاء باقة جديد' : 'تعديل الباقة'}
          links={[
            { name: 'الرئيسية', href: PATH_DASHBOARD.root },
            { name: 'الباقات', href:  PATH_DASHBOARD.packages.list },
            { name: !isEdit ? 'باقة جديد' : 'تعديل الباقة' }
          ]}
        />
        <CreateEditPackage isEdit={isEdit} packageId={packageId} />
      </Container>
    </Page>
  );
}
