import { Card, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ReactNode } from 'react';
import { Calendar } from 'react-multi-date-picker';

const StylesCalendar = styled(Calendar)(({ theme }) => ({
  border: 'none !important',
  width: '100% !important',

  height: '100% !important',
  '.rmdp-top-class, .rmdp-calendar ,.rmdp-day-picker > div': {
    width: '100% !important',

    height: '100% !important'
  },
  '.rmdp-day-picker': {
    height: '100% '
  },
  '.rmdp-header': {
    '& + div': {
      height: '100% '
    }
  },
  '.rmdp-header-values': {
    color: '#212B36',
    fontSize: '14px',
    fontWeight: '700'
  },
  '.rmdp-week-day': {
    color: '#637381'
  },
  '.rmdp-week': {
    margin: '3px 0 ',
    '.rmdp-day': {
      span: {
        inset: '0',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        borderRadius: '5px',
        boxShadow: 'none !important',
        color: ' #637381',
        '&:hover': {
          backgroundColor: '#f9f5e9 !important',
          color: '#d49e24 !important'
        }
      },
      '&.rmdp-deactive': {
        span: {
          color: '#c6c6c6'
        }
      },
      '&.rmdp-today span': {
        backgroundColor: 'transparent',
        padding: '3px',
        color: '#212B36',
        position: 'relative',
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '100%',
          left: '50%',
          width: '5px',
          height: '5px',
          borderRadius: '50%',
          backgroundColor: '#d8a400',
          transform: 'translate(-50%)'
        }
      },
      '&.rmdp-selected span:not(.highlight)': {
        backgroundColor: '#d49e24',
        color: 'white',
        '&:hover': {
          backgroundColor: '#d49e24 !important',
          color: 'white !important'
        }
      }
    }
  },
  '.rmdp-arrow-container': {
    width: '30px',
    height: '30px',
    transition: 'all 0.25s ease-in-out',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #eeeeee',
    '.rmdp-arrow': {
      borderColor: '#637381',
      transition: 'all 0.25s ease-in-out',
      margin: 0
    },
    '&:hover': {
      backgroundColor: '#f9f5e9',
      border: '1px solid #f9f5e9',
      boxShadow: 'none',
      '.rmdp-arrow': {
        borderColor: '#d49e24'
      }
    }
  }
}));
export default function DatePickerCalendar() {
  return (
    <Card
      sx={{
        height: '100%'
      }}
    >
      <StylesCalendar value={new Date()} shadow={false} showOtherDays />
    </Card>
  );
}
