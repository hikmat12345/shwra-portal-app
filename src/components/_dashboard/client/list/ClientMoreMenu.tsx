import * as Sentry from '@sentry/react';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
//
import { IconButton, Menu, MenuItem } from '@mui/material';
// redux
import { useDispatch } from '../../../../redux/store';
import { manageClientStatus } from '../../../../redux/slices/client';

// ----------------------------------------------------------------------

type ClientMoreMenuProps = {
  clientId: string;
  statusList: any;
};

export default function ClientMoreMenu({ clientId, statusList }: ClientMoreMenuProps) {
  // redux
  const dispatch = useDispatch();

  const [selectedActionId, setSelectedActionId] = useState(1);

  function changeClientStatus({ statusId }: { statusId: string }) {
    try {
      dispatch(
        manageClientStatus({
          clientId,
          statusId: String(statusId)
        })
      );
    } catch (e) {
      Sentry.captureException(e);
    }
  }

  //--------------------------------------------------------------------
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = async (event: React.MouseEvent<HTMLElement>, index: number) => {
    setSelectedActionId(index);

    changeClientStatus({
      statusId: String(index)
    });

    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        onClick={handleClickListItem}
      >
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox'
        }}
      >
        {statusList.map((action: any) => (
          <MenuItem
            key={action.id}
            disabled={action === 0}
            selected={action === selectedActionId}
            onClick={(event) => handleMenuItemClick(event, action.id)}
          >
            {action.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
