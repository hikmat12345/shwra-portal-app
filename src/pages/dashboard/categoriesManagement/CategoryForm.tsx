import { useParams, useLocation } from 'react-router-dom';
import { Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../../routes/paths';
import useSettings from '../../../hooks/useSettings';
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import CreateEditCategory from 'components/_dashboard/category/CreateEditCategory';

// ----------------------------------------------------------------------

export default function CategoryForm() {
  const { themeStretch } = useSettings();
  const { pathname } = useLocation();
  const { categoryId = '' } = useParams();
  const isEdit = pathname.includes('edit');


  return (
    <Page title="العملاء: انشاء تصنيف جديد | شورى">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'انشاء تصنيف جديد' : 'تعديل التصنيف'}
          links={[
            { name: 'الرئيسية', href: PATH_DASHBOARD.root },
            { name: 'التصنيفات', href: PATH_DASHBOARD.appointments.admin },
            { name: !isEdit ? 'تصنيف جديد' : '' }
          ]}
        />

        <CreateEditCategory isEdit={isEdit} categoryId={categoryId} />
      </Container>
    </Page>
  );
}
