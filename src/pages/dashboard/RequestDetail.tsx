import { useEffect, Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getRequest } from '../../redux/slices/request';
// material
import {
  Box,
  Container,
  Typography,
  Pagination,
  Divider
} from '@mui/material';

// @types
import { RequestComment , RequestState } from '../../@types/request';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Label from '../../components/Label';
import { 
    RequestDetailCard,
    RequestCommentForm,
    RequestCommentList,
    RequestDetailError,
    RequestCommentEmpty
} from '../../components/_dashboard/request/details';


const comments: RequestComment[] =[]


export default function RequestDetail() {

  const dispatch = useDispatch();

  const { requestId = '' } = useParams();

  const { request , isLoading , error } = useSelector((state: { request: RequestState }) => state.request);


  useEffect(() => {
    dispatch(getRequest({ requestId }));
  }, [dispatch, requestId]);

  const isRequest = request && request 

  // comment paganation
  const [page, setPage] = useState(0);

  const commentPerPage: number = 10;

  function handleCommentPagination(event: React.ChangeEvent<unknown>, value: number) {
    setPage(value-1)
  }


  // sort comments
  function applySortFilter(
    comments: RequestComment[]
  ) {
     return comments.slice().sort((a:any , b:any) => b.createdDate - a.createdDate)
  }

  return (
    <Page title={`الاستشاره :  | Shwra`}>
      <Container maxWidth={request ? false : 'lg'}>

        {/** page header */}
        <HeaderBreadcrumbs
          heading={'عرض الاستشاره'}
          links={[
            { name: 'لوحه التحكم', href: PATH_DASHBOARD.root },
            { name: 'الاستشارات', href: PATH_DASHBOARD.request.root },
            { name: `${isLoading ? "جارى التحميل ...." : request?.subject}` }
          ]}
        />

     {/* error && <RequestDetailError error={error} /> */}


      { isRequest && (   
          <Fragment>
          
             <RequestDetailCard 
                request={isRequest}
                isLoading={isLoading}
              />

              <Box sx={{ my: 5 }}>
                  <Divider />
              </Box>

              <Box sx={{ display: 'flex', alignItems:'center', mb: 2 }}>
                <Typography variant="h4"> الردود </Typography>
                <Typography variant="subtitle2" sx={{ color: 'text.disabled',margin:'0 2px' }}>
                  {isRequest.comments.length}
                </Typography>
              </Box>


              { isRequest.comments && (
                <RequestCommentList 
                  comments={isRequest.comments} 
                  commentPerPage={commentPerPage}
                  page={page} 
                />
              )}


              { isRequest.comments.length  === 0 && (
                <RequestCommentEmpty />
              )}


              { isRequest.comments && ( 
                <Box sx={{ mb: 5, mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <Pagination 
                    count={ Math.ceil(isRequest.comments.length / commentPerPage)}
                    color="primary"
                    onChange={handleCommentPagination}
                    disabled={isRequest.comments.length < commentPerPage} 
                  />
                </Box>
              )}


              <RequestCommentForm requestId={ isRequest.requestId} />
 
          </Fragment>
          )   
        }
            

      </Container>
    </Page>
  )
}