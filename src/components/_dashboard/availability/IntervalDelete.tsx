import { Icon } from '@iconify/react';
// @mui
import { IconButton, Tooltip } from '@mui/material';
// redux
import { useDispatch } from '../../../redux/store';
import { deleteInterval } from '../../../redux/slices/availability';

// ---------------------------------------------------------------------

type IntervalDeleteProps = {
    dayId: string;
    intervalIndex: string;
    onRemoveInterval: (dayId: string, intervalIndex: string) => void 
}

export default function IntervalDelete({ dayId , intervalIndex, onRemoveInterval }: IntervalDeleteProps) {
 const dispatch = useDispatch();
 const handleDelete = () => onRemoveInterval(dayId, intervalIndex);
    
return (
    <Tooltip title="خذف الاتاحة">
        <IconButton onClick={handleDelete}>
        <Icon icon='eva:trash-2-outline' width={20} height={20} />
        </IconButton>
    </Tooltip>
)}
