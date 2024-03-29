import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Box, Grid, Card, Button, Avatar, Typography } from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------

// ProfileFollowers.propTypes = {
//   subjects: PropTypes.array,
// };

export default function ProfileFollowers({ subjects }) {
  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Subjects
      </Typography>

      <Grid container spacing={3}>
        {subjects.map((subject) => (
          <Grid key={subject.id} item xs={12} md={4}>
            <FollowerCard subject={subject} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

// ----------------------------------------------------------------------

FollowerCard.propTypes = {
  follower: PropTypes.object,
};

function FollowerCard({ subject }) {
  const { name, teacher, isNotified } = subject;

  const [toggle, setToogle] = useState(isNotified);

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      {/* <Avatar alt={name} src={avatarUrl} sx={{ width: 48, height: 48 }} /> */}
      <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
        <Typography variant="subtitle2" noWrap>
          {name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Iconify icon={'mdi:teacher'} sx={{ width: 16, height: 16, mr: 0.5, flexShrink: 0 }} />
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {teacher}
          </Typography>
        </Box>
      </Box>
      <Button
        size="small"
        onClick={() => setToogle(!toggle)}
        variant={toggle ? 'text' : 'outlined'}
        color={toggle ? 'primary' : 'inherit'}
        startIcon={toggle && <Iconify icon={'eva:checkmark-fill'} />}
      >
        {toggle ? 'Notified' : 'Notify'}
      </Button>
    </Card>
  );
}
