// material
import { styled } from '@mui/material/styles';
import { 
    Typography,
    Box,
    Card,
} from '@mui/material';
// routes
// utils
import { getFullName } from '../../../../utils/helper';
// components
import Label from '../../../Label';
import { useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

const Title = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1)
}));
  

// ----------------------------------------------------------------------

type ClientDetailCardProps = {
  client: any
}

export default function ClientDetailCard({ client }:ClientDetailCardProps) {
  const theme = useTheme();
    return (
    <Card
        sx={{
          mb: 3,
          p: { xs: 3, md: 5 },
          position: 'relative'
        }}
      >
  
        <Box sx={{ mb: { xs: 2, md: 2 } }} >
          <Title> اسم العميل </Title>
          {getFullName(client)}
        </Box>  
  
        <Box sx={{ mb: { xs: 2, md: 2 } }} >
          <Title> الشركة </Title>
          {client.company || '-'}
        </Box>  
  
        <Box sx={{ mb: { xs: 2, md: 2 } }} >
          <Title> الهاتف </Title>
          {client.phoneNumber || '-'}
        </Box> 

        <Box sx={{ mb: { xs: 2, md: 2 } }} >
          <Title> البريد الإلكتروني </Title>
          {client.email || '-'}
        </Box>  
  
  
        <Box sx={{ mb: { xs: 2, md: 2 } }} >
          <Title> العنوان </Title>
          {client.address || '-'}
        </Box>  
        <Box sx={{ mb: { xs: 2, md: 2 } }} >
          <Title> حالة قبول العميل </Title>
          
          <Label
            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
            color={client.isApproved ? 'success' : 'error'}
          >
            {client.isApproved ? 'تم القبول':'لم يتم القبول بعد'}
          </Label>
        </Box>  
  
      </Card>
  
    );
}
  