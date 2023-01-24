import { Icon } from '@iconify/react';
// @mui
import { IconButton, Tooltip } from '@mui/material';

// ---------------------------------------------------------------------

type IntervalCloneProps = {
    dayId: string;
    dayList: {
        id: string;
        name: string;
    }[];
}

export default function IntervalClone({ dayId }: IntervalCloneProps) {
   
return (
    <Tooltip title="نسخ الاتاحة">
        <IconButton>
        <Icon icon='eva:copy-outline' width={30} height={30} />
        </IconButton>
    </Tooltip>
)}