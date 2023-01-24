import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Container } from '@mui/material';
import { useDispatch, useSelector, RootState } from '../../../redux/store';
import { getLawyer } from '../../../redux/slices/lawyer';
import { PATH_DASHBOARD } from '../../../routes/paths';
import useSettings from '../../../hooks/useSettings';
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import LawyerForm from '../../../components/_dashboard/lawyer/LawyerForm';

export default function LawyerCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { name = '' } = useParams();
  const isEdit = pathname.includes('edit');

  const lawyer = useSelector((state: RootState) => state.lawyer.lawyer);

  useEffect(() => {
    dispatch(getLawyer(name));
  }, [dispatch, name]);

  return (
    lawyer && (
      <Page title="المحامي| شورى">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading={!isEdit ? 'انشاء محامى جديد' : 'تعديل محامى'}
            links={[
              { name: 'الرئيسية', href: PATH_DASHBOARD.root },
              { name: 'المحامين', href: PATH_DASHBOARD.lawyer.root },
              { name: !isEdit ? 'محامى جديد' : lawyer.firstName }
            ]}
          />
          <LawyerForm isEdit={isEdit} lawyer={lawyer} />
        </Container>
      </Page>
    )
  );
}
