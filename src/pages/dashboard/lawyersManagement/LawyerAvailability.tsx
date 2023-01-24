import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { filter } from 'lodash';
// material
import { useTheme } from '@mui/material/styles';
import { 
  Card,
  Button, 
  Container,
  Paper,
  Typography,
  Box
 } from '@mui/material';
// redux
import { RootState, useDispatch, useSelector } from '../../../redux/store';
import { 
  getAvailabilities,
  getWorkDays,
  // rules,
  dayAvailabilityToggle,
  asyncAvailabilities,
  // intervals
  createInterval,
  deleteInterval,
  updateInterval,
  availabilityOverlapingError,
  setAvailabilitiesStatus,
  availabilitiesChanges,
} from '../../../redux/slices/availability';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// @types
import { Rule, Interval } from '../../../@types/availability';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { AvailabilitySchedulesDay } from '../../../components/_dashboard/availability';
import LoadingButton from '@mui/lab/LoadingButton';

// ----------------------------------------------------------------------


export default function LawyerAvailability() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const [isSubmitting, setIsSubmitting] =useState(false)
  // redux
  const { rules, workDays, isLoading , isChanged, overlapingError,availabilityStatus } = useSelector((state: RootState) => state.availability);

  useEffect(() => {
    dispatch(getAvailabilities());
    dispatch(getWorkDays());
    dispatch(availabilityOverlapingError(false))

    return(()=>{
      dispatch(availabilityOverlapingError(false))
      dispatch(setAvailabilitiesStatus({}));

    })
  }, [dispatch]);

  useEffect(()=>{
    if(availabilityStatus?.status){
      setIsSubmitting(false)
    }
    if(availabilityStatus?.status==='error'){
      Object.values(availabilityStatus?.error?.errors)
      .flat()
      .map((error: any) => {
        return enqueueSnackbar(error, {
          variant: 'error',
          onClose: () => {
            dispatch(setAvailabilitiesStatus({}));
          }
        });
      });
    }else if(availabilityStatus?.status ==='success'){
      dispatch(getAvailabilities());
      enqueueSnackbar('تم حغظ ', {
        variant: 'success',
        onClose: () => {
          dispatch(setAvailabilitiesStatus({}));
        },
        anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',
        },
      });
    }
  },[availabilityStatus,enqueueSnackbar, dispatch])
  const handleSaveAvailabilities = async () => {
    setIsSubmitting(true)
    dispatch(asyncAvailabilities(rules));
  }




  //------------------------------------------------------
  // methods

  const handleDayToggle = async (dayId: string) => {
    try {

      dispatch(dayAvailabilityToggle({
        dayId
      }));

    } catch (error) {
      console.log(error)
    }
  }

  const handleRemoveInterval = async (dayId: string, intervalIndex: string) => {
    dispatch(availabilitiesChanges())
    try {

      dispatch(deleteInterval({
        dayId,
        intervalIndex
      }));

    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateInterval = async (
    dayId: string,
    intervalIndex: string,
    interval: Interval
  ) => {
    dispatch(availabilitiesChanges())
    try {

      dispatch(updateInterval({
        dayId,
        intervalIndex,
        interval
      }));

    } catch (error) {
      console.log(error)
    }
  }

  const handleCreateInterval = async(dayId: string) => {
    dispatch(availabilitiesChanges())
    try {

      dispatch(createInterval({
        dayId
      }));


    } catch (error) {
      console.log(error)
    }
  }
  

  return (
    <Page title="المحامين: جداول المواعيد | شورى">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={'جداول المواعيد'}
          links={[
            { name: 'الرئيسية', href: PATH_DASHBOARD.root },
            { name: 'جداول المواعيد' },
          ]}
        />

        <Card>
   
        {
        rules&&(
            
            <Paper 
            elevation={0} 
            sx={{
              m: 2,
            }}
          >
    
           <Typography 
            variant="h6"
            component="h6"
            sx={{
              fontSize: '1.25rem',
              my: "1rem !important",
            }}
           >
            حدد ساعاتك الأسبوعية
    
           </Typography>
    
                { workDays.map(day => (
                    <AvailabilitySchedulesDay
                      key={day.id}
                      day={day}
                      dayRule={filter(rules, (rule: Rule) => rule.dayId === day.id)[0]}
                      onChangeDayAvailability={handleDayToggle}
                      onRemoveInterval={handleRemoveInterval}
                      onUpdateInterval={handleUpdateInterval}
                      onCreateInterval={handleCreateInterval}
                    />
                ))}
                <Box sx={{ mt: 2 }}>
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={handleSaveAvailabilities}
                      loading={isSubmitting}
                      disabled={!isChanged || overlapingError}
                      loadingIndicator={<span style={{ fontSize: 12, whiteSpace: 'nowrap' }}>جارى الحفظ</span>}
                    >
                      حفظ التغييرات
                    </LoadingButton>
                </Box>

          </Paper>

          )
        }







        </Card>
      </Container>
    </Page>
  );
}
