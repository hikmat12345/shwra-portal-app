import { Icon } from '@iconify/react';
// @mui
import { IconButton, Tooltip } from '@mui/material';
// ---------------------------------------------------------------------

type IntervalCreateProps = {
    dayId: string;
    onCreateInterval: (dayId: string) => void
}

export default function IntervalCreate({ dayId , onCreateInterval }: IntervalCreateProps) {
 
  const handleCreate = () => onCreateInterval(dayId);

return (
    <Tooltip title="انشاء الاتاحة">
        <IconButton onClick={handleCreate}>
           <Icon icon='eva:plus-outline' width={30} height={30} />
        </IconButton>
    </Tooltip>
)}