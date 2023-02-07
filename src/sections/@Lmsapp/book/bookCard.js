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

BookCard.propTypes = {
  book: PropTypes.object.isRequired,
};
// const book = {
//   _id: '632164fae49adfa2051e6b02',
//   bookdetail: [
//     {
//       _id: '63c5697615ce2fc98b6ad82e',
//       title: 'Basic Electrical Engineering',
//       isbn: '9780074515860',
//       publishedYear: '1985',
//       author: 'Dhogal, P. S.',
//       price: '1,100.00',
//       publisher: 'Tata McGraw-Hill Publishing Company Limited, New Delhi',
//       pages: 'xiv, 257 p.',
//       entry_date: '15-May-05',
//       image_url:
//         'https://nicebooksimages.b-cdn.net/images/508711c92037e2113bc24264f0d3fdeddc9cf074?width=240&quality=90&optimizer=image',
//     },
//   ],
//   accession_books_list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
//   available_books: [2, 3, 4, 6, 7, 8, 9, 10],
// };
export default function BookCard({ book }) {
  return (
    <Card sx={{ textAlign: 'left' }}>
      <CardMedia component="img" height="250" sx={{ objectFit: 'contain' }} image={book.book_detail[0].image_url} />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {book.book_detail[0].title}
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <Typography variant="body2" color="text.primary">
            Publisher
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {book.book_detail[0].publisher}
          </Typography>
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <Typography variant="body2" color="text.primary">
            Author
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {book.book_detail[0].author}
          </Typography>
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <Typography variant="body2" color="text.primary">
            Pages
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {book.book_detail[0].pages}
          </Typography>
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <Typography variant="body2" color="text.primary">
            ISBN
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {book.book_detail[0].isbn}
          </Typography>
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <Typography variant="body2" color="text.primary">
            Available books
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {book.available_books.length}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        {book.available_books.length !== 0 ? (
          <Button size="small">Notify</Button>
        ) : (
          <Typography variant="body2" color="text.secondary">
            not available
          </Typography>
        )}

        <Button size="small">View details</Button>
      </CardActions>
    </Card>
  );
}
