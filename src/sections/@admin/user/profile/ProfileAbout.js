import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Card, Typography, CardHeader, Stack } from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------

const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

// ----------------------------------------------------------------------

ProfileAbout.propTypes = {
  profile: PropTypes.object,
};

export default function ProfileAbout({ profile }) {
  const { address, quote, email } = profile;

  return (
    <Card>
      <CardHeader title="About" />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="body2">{quote}</Typography>

        <Stack direction="row">
          <IconStyle icon={'eva:pin-fill'} />
          <Typography variant="body2">
            Live at &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {address}
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={'eva:email-fill'} />
          <Typography variant="body2">{email}</Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={'material-symbols:phone-enabled-sharp'} />
          <Typography variant="body2">
            <Link component="span" variant="subtitle2" color="text.primary">
              {profile.phone_number}
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={'wpf:books'} />
          <Typography variant="body2">
            Librarian at &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              XIE
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
