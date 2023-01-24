import { useParams, useLocation } from 'react-router-dom';
import { Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../../routes/paths';
import useSettings from '../../../hooks/useSettings';
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import CreateEditPromotion from 'components/_dashboard/promotion/CreateEditPromotion';

export default function PromotionForm() {
  const { themeStretch } = useSettings();
  const { pathname } = useLocation();
  const { promotionId = '' } = useParams();
  const isEdit = pathname.includes('edit');


  return (
    <Page title="العملاء: انشاء كود خصم جديد | شورى">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'انشاء كود خصم جديد' : 'تعديل كود الخصم'}
          links={[
            { name: 'الرئيسية', href: PATH_DASHBOARD.root },
            { name: 'أكواد الخصم', href:  PATH_DASHBOARD.promotions.list },
            { name: !isEdit ? 'كود خصم  جديد' : '' }
          ]}
        />
        <CreateEditPromotion isEdit={isEdit} promotionId={promotionId} />
      </Container>
    </Page>
  );
}
