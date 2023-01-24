import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
// material
import { Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getRequest } from '../../redux/slices/request';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
import useAuth from '../../hooks/useAuth';
// @types
import { RequestState } from '../../@types/request';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import RequestNewForm from '../../components/_dashboard/request/RequestNewForm';

export default function RequestCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();

  const { pathname } = useLocation();
  const { requestId = '' } = useParams();

  const { request , isLoading , error } = useSelector((state: { request: RequestState }) => state.request);
  
  const isEdit = pathname.includes('edit');

  const currentRequest = request;

  useEffect(() => {
    dispatch(getRequest({ requestId }));
  }, [dispatch, requestId]);

  return (
    <Page title="الاستشارات: انشاء طلب جديد | Shwra">
      <Container maxWidth={themeStretch ? false : 'lg'}>

        {/** page header */}
        <HeaderBreadcrumbs
          heading={!isEdit ? 'انشاء طلب جديد' : 'تعديل طلب'}
          links={[
            { name: 'لوحه التحكم', href: PATH_DASHBOARD.root },
            { name: 'الطلبات', href: PATH_DASHBOARD.request.root },
            { name: !isEdit ? 'طلب جديد' : requestId }
          ]}
        />

        {/*** request from */}
        <RequestNewForm 
          isEdit={isEdit} 
          currentRequest={currentRequest}
        /> 

      </Container>
    </Page>
  )
}
