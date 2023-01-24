import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import { Link as RouterLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import { paramCase } from 'change-case';
import { PATH_DASHBOARD } from 'routes/paths';

type CategoryMoreMenuProps = {
  onDelete: VoidFunction;
  categoryId: string | number;
};

export default function CategoryMoreMenu({
  onDelete,
  categoryId,
}: CategoryMoreMenuProps) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={onDelete} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="حذف" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem
          component={RouterLink}
          to={`${PATH_DASHBOARD.categories.admin}/${paramCase(categoryId.toString())}/edit`}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="تحديث" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

      
      </Menu>
    </>
  );
}
