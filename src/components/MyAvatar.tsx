// hooks
import useAuth from '../hooks/useAuth';
//
import { MAvatar } from './@material-extend';
import { MAvatarProps } from './@material-extend/MAvatar';
import createAvatar from '../utils/createAvatar';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }: MAvatarProps) {
  const { myProfile } = useSelector((state: RootState) => state.user);
  return (
    <MAvatar
      src={myProfile?.profileImageUrl}
      alt={myProfile?.displayName}
      color={myProfile?.profileImageUrl ? 'default' : createAvatar(myProfile?.displayName).color}
      {...other}
    >
      {createAvatar(myProfile?.displayName).name}
    </MAvatar>
  );
}
