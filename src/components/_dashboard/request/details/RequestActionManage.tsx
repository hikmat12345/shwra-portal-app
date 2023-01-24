import { useState, useEffect } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
// redux
import { RootState, useDispatch, useSelector } from '../../../../redux/store';
import { getRequestActionList } from '../../../../redux/slices/request';

type RequestActionManagePrpos = {
  dropDownText?: string;
  changeRequestStatus: ({ actionId }: { actionId: string }) => void;
  list?: {
    id: number;
    name: string;
  }[];
  buttonDisabled?: boolean;
};

export default function RequestActionManage({
  changeRequestStatus,
  dropDownText,
  list,
  buttonDisabled
}: RequestActionManagePrpos) {
  // redux
  const dispatch = useDispatch();
  const { requestActionList } = useSelector((state: RootState) => state.request);

  const [selectedActionId, setSelectedActionId] = useState(1);
  const [optionsList, setOptionsList] = useState<
    {
      id: number;
      name: string;
    }[]
  >([]);
  useEffect(() => {
    dispatch(getRequestActionList());
  }, [dispatch]);
  useEffect(() => {
    if (list) {
      setOptionsList(list);
    } else {
      setOptionsList(requestActionList);
    }
  }, [requestActionList, list]);
  //--------------------------------------------------------------------
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = async (event: React.MouseEvent<HTMLElement>, index: number) => {
    setSelectedActionId(index);

    changeRequestStatus({
      actionId: String(index)
    });

    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        variant="contained"
        color="error"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClickListItem}
        disabled={buttonDisabled || false}
      >
        {dropDownText || 'اداره الطلبات'}
      </Button>

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
        {optionsList.map((action: any) => (
          <MenuItem
            sx={{ minWidth:'100px' }}
            key={action.id}
            disabled={action === 0}
            selected={action === selectedActionId}
            onClick={(event) => handleMenuItemClick(event, action.id)}
          >
            {action.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
