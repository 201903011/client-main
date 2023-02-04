// hooks
import useAuth from '../hooks/useAuth';
// utils
import createAvatar from '../utils/createAvatar';
//
import Avatar from './Avatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  const { user } = useAuth();

  return (
    <Avatar
      src={user?.profile_picture}
      alt={user?.displayName}
      color={user?.profile_picture ? 'default' : createAvatar(user?.name).color}
      {...other}
    >
      {createAvatar(user?.displayName).name}
    </Avatar>
  );
}
