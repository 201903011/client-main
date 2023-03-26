import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Avatar,
  Divider,
  Typography,
  Stack,
  CardHeader,
  IconButton,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import { GridMoreVertIcon } from '@mui/x-data-grid';
// utils
import cssStyles from '../../../utils/cssStyles';
import { fShortenNumber } from '../../../utils/formatNumber';
// components
import Image from '../../../components/Image';
import SocialsButton from '../../../components/SocialsButton';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const OverlayStyle = styled('div')(({ theme }) => ({
  ...cssStyles().bgBlur({ blur: 2, color: theme.palette.primary.darker }),
  top: 0,
  zIndex: 8,
  content: "''",
  width: '100%',
  height: '100%',
  position: 'absolute',
}));

// ----------------------------------------------------------------------

IssueBookCard.propTypes = {
  book: PropTypes.object.isRequired,
};

// {
//   "_id": "640c383947166ea3b54ac597",
//   "accession_number": 18,
//   "student_id": "63db3b261f1b94e1eabe8bbb",
//   "issued_on": "11/03/2023",
//   "return_by": "18/03/2023",
//   "returned_on": null,
//   "returned_to": null,
//   "__v": 0
// },

export default function IssueBookCard({ book }) {
  return (
    <Card sx={{ textAlign: 'left' }}>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {book.accession_number}
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <Typography variant="body2" color="text.primary">
            Accession No
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {book.accession_number}
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <Typography variant="body2" color="text.primary">
            Issued on
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {book.issued_on}
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <Typography variant="body2" color="text.primary">
            Return by
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {book.return_by}
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <Typography variant="body2" color="text.primary">
            Returned on
          </Typography>
          {book.returned_on === null ? (
            <Typography variant="body2" color="text.secondary">
              -
            </Typography>
          ) : (
            <Typography variant="body2" color="text.secondary">
              {book.returned_on}
            </Typography>
          )}
        </Box>
      </CardContent>
      {/* <CardActions>
        {book.available_books.length !== 0 ? (
          <Button size="small">Notify</Button>
        ) : (
          <Typography variant="body2" color="text.secondary">
            not available
          </Typography>
        )}

        <Button size="small">View details</Button>
      </CardActions> */}
    </Card>
  );
}
