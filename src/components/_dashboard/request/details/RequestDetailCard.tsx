import { Link } from "react-router-dom";

import { styled } from '@mui/material/styles';
import {
    Card,
    Box,
    Typography,
    Divider,
    Avatar,
    Skeleton,
    Stack
} from '@mui/material';
// @types
import { Request , RequestStatus } from '../../../../@types/request';
// component
import Label from '../../../Label';
import FilePreviewList from '../../../file/FilePreviewList';
import RequestLawyerAssign from './RequestLawyerAssign';
import RequestActionManage from './RequestActionManage';
import RequestDetailToolbar from './RequestDetailToolbar';
// utils
import { getFullName } from '../../../../utils/helper'; 
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// guard
import CanGuard from '../../../../guards/CanGuard';


// ---------------------------------------------------------------

const Title = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

// --------------------------------------------------------------

type RequestDetailCardProps = {
  request: Request;
  isLoading: boolean;
}

export default function RequestDetailCard({ isLoading , request }: RequestDetailCardProps) {

   const { requestId, subject, standard, status, type, subType , lawyer, client , details, attachedFilesUrls  } = request;

    return (

        <Card>

            <Box sx={{ p: { xs: 3, md: 5 } }}>


                <CanGuard accessibleRoles={["Admin"]}>
                  <RequestDetailToolbar requestId={requestId} />
                </CanGuard>


                <Typography  variant="h4" sx={{ mb: 1 }}>
                  { isLoading  ? ( <Skeleton /> ): subject }
                </Typography>

                <Divider  sx={{ mb: 1 }}/>

    

                <Box sx={{ my: { xs: 1, md: 1 } }} >

                    <Label color='error' sx={{  mr: { xs: 2, md: 2 } }}>
                      { isLoading  ? (<Skeleton />): type }
                    </Label>

                   {!isLoading&&subType&&(
                      <Label color='error' sx={{  mr: { xs: 2, md: 2 } }}>
                        { isLoading  ? (<Skeleton />): subType }
                      </Label>
                    )}
                    
                    <Label  color='success'  sx={{ mr: { xs: 2, md: 2 } }}>
                      { isLoading  ? (<Skeleton />): standard }
                    </Label>

                    <Label  color='info'  sx={{ mr: { xs: 2, md: 2 } }}>
                      { isLoading  ? (<Skeleton />): status }
                    </Label>

                </Box>  


                <Typography  sx={{ mb: 3 }} variant="caption" display="block" gutterBottom>

                <CanGuard accessibleRoles={["Admin"]}>

                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                  >

                    <Typography  variant="caption" display="block" sx={{ py: 0.4 }}>
                      بواسطة
                    </Typography>
                      
                    <Link 
                      to={`${PATH_DASHBOARD.client.root}/${client.clientId}/profile`}
                    > 
                      { isLoading  ? ( <Skeleton />):(
                        <Typography variant="subtitle1"  sx={{ px: 1 }} gutterBottom component="div">
                          {client.company}
                        </Typography>
                      )}
                    </Link> 

                  </Stack>
                  </CanGuard>

                </Typography>






                <Box  sx={{ mb: 5, mt: 5 }} >

                    <Title> التفاصيل </Title>
                    { isLoading  ? <Skeleton />:  <div dangerouslySetInnerHTML={{ __html: details }} />  }
  
                </Box>




                <Box  sx={{ mb: 5, mt: 5 }} >

                    <Title> المحامى المسؤل </Title>
                    { 
                      isLoading  ? (
                        <Skeleton />
                      ):( 
                       <RequestLawyerAssign  
                         request={request} 
                      />  
                      )
                    }
                </Box>





                <Box  sx={{ mb: 5, mt: 5 }} >

                    <Title> بواسطة </Title>
                    { 
                      isLoading  ? (
                        <Skeleton />
                      ):( 
                        <Stack direction="row" spacing={2} >
                            <Avatar />
          
                            <Typography  variant="body1"  display="block" sx={{ py: 1 }}>
                               {getFullName(client)}
                             </Typography>

                        </Stack>
 
                      )
                    }
                </Box>




                <Box  sx={{ mb: 5, mt: 5 }} >
                   {/* <Divider /> */}
                    <Title> المرفقات </Title>
                    { isLoading  ? <Skeleton /> : (
                      <>
                       {attachedFilesUrls.length > 0 ? (
                         <FilePreviewList attachments={attachedFilesUrls} />
                       ):(
                          <Typography  variant="body1"  display="block" sx={{ py: 1 }}>
                            لا يوجد مرفقات
                          </Typography>
                        )}
                      </>
                    )}
                </Box>


            </Box>

      </Card>
    )
}
