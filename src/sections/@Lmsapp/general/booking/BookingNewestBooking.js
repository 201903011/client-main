import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { useRef } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Stack, Avatar, Typography, Paper, CardHeader } from '@mui/material';
// utils
import { fDateTime } from '../../../../utils/formatTime';
// _mock_
import { _bookingNew } from '../../../../_mock';
// components
import Label from '../../../../components/Label';
import Image from '../../../../components/Image';
import Iconify from '../../../../components/Iconify';
import { CarouselArrows } from '../../../../components/carousel';
// sections
import BookCard from '../../book/bookCard';

// ----------------------------------------------------------------------

export default function BookingNewestBooking() {
  const theme = useTheme();
  const carouselRef = useRef(null);
  const bookData = [
    {
      _id: '632164fae49adfa2051e6b02',
      book_detail: [
        {
          _id: '6426fbe7f62a87ae95da8e2f',
          title: 'Basic Electrical Engineering',
          isbn: '9780074515860',
          publishedYear: '1985',
          author: 'Dhogal, P. S.',
          price: '1,100.00',
          publisher: 'Tata McGraw-Hill Publishing Company Limited, New Delhi',
          pages: 'xiv, 257 p.',
          entry_date: '15-May-05',
          image_url:
            'https://nicebooksimages.b-cdn.net/images/508711c92037e2113bc24264f0d3fdeddc9cf074?width=240&quality=90&optimizer=image',
        },
      ],
      accession_books_list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      available_books: [8, 9, 10, 2, 3, 7, 4, 5, 6, 5],
    },
    {
      _id: '632164fae49adfa2051e6b03',
      book_detail: [
        {
          _id: '6426fbe7f62a87ae95da8e30',
          title: 'Basic Electrical Eng V2',
          isbn: '0-07-451587-X',
          publishedYear: '2009',
          author: 'Dhotre, I. A.',
          price: '1,750.00',
          publisher: 'Technical Publications, Pune',
          pages: null,
          entry_date: '05-Feb-15',
          image_url:
            'https://nicebooksimages.b-cdn.net/images/83a40d03f4c90bb495a5f979740d39e25688d045?width=240&quality=90&optimizer=image',
        },
      ],
      accession_books_list: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 8081, 8113, 11976, 11977, 11978, 11979, 11980],
      available_books: [
        11, 12, 13, 14, 15, 16, 20, 8081, 8113, 11976, 11977, 11978, 11979, 11980, 17, 12, 12, 12, 12, 18,
      ],
    },
    {
      _id: '632164fae49adfa2051e6b04',
      book_detail: [
        {
          _id: '6426fbe7f62a87ae95da8e31',
          title: 'Basic Electrical Engineering',
          isbn: '9780074516324',
          publishedYear: '1990',
          author: 'Mittle, V. N.',
          price: '390.00',
          publisher: 'Tata McGraw-Hill Publishing Company Limited, Delhi',
          pages: 'xxi, 697 p.',
          entry_date: '16-May-05',
          image_url:
            'https://nicebooksimages.b-cdn.net/images/6f1ad351379cc16e28c9b6de22156463c790657b?width=240&quality=90&optimizer=image',
        },
      ],
      accession_books_list: [21, 22, 23, 24, 1988, 1989, 1990, 3537, 3538, 3539, 3732, 3733, 4011, 4012],
      available_books: [21, 22, 23, 24, 1988, 1989, 1990, 3537, 3538, 3539, 3732, 3733, 4011, 4012],
    },
    {
      _id: '632164fae49adfa2051e6b05',
      book_detail: [
        {
          _id: '6426fbe7f62a87ae95da8e32',
          title: 'Management Information Systems --2006 publication.',
          isbn: '9780070402676',
          publishedYear: '2000',
          author: 'Davis, Gordon B. & Olson, Margrethe H.',
          price: '390.00',
          publisher: 'Tata McGraw-Hill Publishing Company Limited, New Delhi',
          pages: 'IX, 693 p.',
          entry_date: '15-May-05',
          image_url:
            'https://nicebooksimages.b-cdn.net/images/f3aec395682a7a8f923082b2415cedbf3e0ed8b9?width=240&quality=90&optimizer=image',
        },
      ],
      accession_books_list: [25, 26],
      available_books: [25, 26, 26],
    },
    {
      _id: '632164fae49adfa2051e6b06',
      book_detail: [
        {
          _id: '6426fbe7f62a87ae95da8e33',
          title: 'Power System Engineering',
          isbn: '9780070647916',
          publishedYear: '1994',
          author: 'Nagrath, I. J. & Kothari, D. P.',
          price: '550.00',
          publisher: 'Tata McGraw-Hill Publishing Company Limited, New Delhi',
          pages: 'xv, 838 p.',
          entry_date: '15-May-05',
          image_url:
            'https://nicebooksimages.b-cdn.net/images/e38ebd7e0e7d2763f0840984386432c05e0914c9?width=240&quality=90&optimizer=image',
        },
      ],
      accession_books_list: [27, 28],
      available_books: [27, 28],
    },
    {
      _id: '632164fae49adfa2051e6b07',
      book_detail: [
        {
          _id: '6426fbe7f62a87ae95da8e34',
          title: 'Finite Element Method',
          isbn: '9780070996946',
          publishedYear: '1979',
          author: 'Zienkiewicz, O. C.',
          price: '365.00',
          publisher: 'Tata Mcgraw Hill, New Delhi',
          pages: 'xiv, 257 p.',
          entry_date: '16-May-05',
          image_url:
            'https://nicebooksimages.b-cdn.net/images/f8cd38a2f649edb2c94e9f616cf6f8c620333bad?width=240&quality=90&optimizer=image',
        },
      ],
      accession_books_list: [29, 30, 1489, 1490, 1491, 1836],
      available_books: [29, 30, 1489, 1490, 1491, 1836],
    },
    {
      _id: '632164fae49adfa2051e6b08',
      book_detail: [
        {
          _id: '6426fbe7f62a87ae95da8e35',
          title: "Schaum's outline of theory and problems of basic electrical engineering",
          isbn: '9780070584037',
          publishedYear: '2004',
          author: 'Cathey, Jimmie J. & Nasar, Syed A.',
          price: '370.00',
          publisher: 'Tata McGraw-Hill Publishing Company Limited, New Delhi',
          pages: 'viii, 335 p.',
          entry_date: '16-May-05',
          image_url: 'https://leadershiftinsights.com/wp-content/uploads/2019/07/no-book-cover-available.jpg',
        },
      ],
      accession_books_list: [31, 32, 778, 779, 2071, 2072, 2074, 2075],
      available_books: [31, 32, 778, 779, 2071, 2072, 2074, 2075],
    },
    {
      _id: '632164fae49adfa2051e6b09',
      book_detail: [
        {
          _id: '6426fbe7f62a87ae95da8e36',
          title: 'Introduction to Radar Systems',
          isbn: '9780070445338',
          publishedYear: '2004',
          author: 'Skolnik, Merrill I.',
          price: '0.00',
          publisher: 'Tata McGraw-Hill Publishing Company Limited, New Delhi',
          pages: 'xii, 772 p.',
          entry_date: '31-Jan-11',
          image_url:
            'https://nicebooksimages.b-cdn.net/images/1596ed1d0840569e7f21aba14849826b26a9c93d?width=240&quality=90&optimizer=image',
        },
      ],
      accession_books_list: [
        33, 34, 3311, 3312, 3385, 3386, 3387, 3388, 3389, 8971, 8972, 8973, 8974, 8975, 8976, 8977, 8978,
      ],
      available_books: [
        33, 34, 3311, 3312, 3385, 3386, 3387, 3388, 3389, 8971, 8972, 8973, 8974, 8975, 8976, 8977, 8978,
      ],
    },
    {
      _id: '632164fae49adfa2051e6b0a',
      book_detail: [
        {
          _id: '6426fbe7f62a87ae95da8e37',
          title: 'Communication Networks',
          isbn: '9780070595019',
          publishedYear: '2004',
          author: 'Leon-Garcia, Alberto & Widjaja, Indra',
          price: '4,750.00',
          publisher: 'Tata McGraw-Hill Publishing Company Limited, New Delhi',
          pages: 'xxvii, 900 p.',
          entry_date: '29-Nov-10',
          image_url:
            'https://nicebooksimages.b-cdn.net/images/256cf3689424fe321021111864a9a4e02286c1d4?width=240&quality=90&optimizer=image',
        },
      ],
      accession_books_list: [
        35, 36, 3445, 6136, 6137, 6138, 9481, 9482, 9483, 9484, 9485, 9486, 9487, 9488, 9489, 9490,
      ],
      available_books: [35, 36, 3445, 6136, 6137, 6138, 9481, 9482, 9483, 9484, 9485, 9486, 9487, 9488, 9489, 9490],
    },
    {
      _id: '632164fae49adfa2051e6b0b',
      book_detail: [
        {
          _id: '6426fbe7f62a87ae95da8e38',
          title: 'Fundamental of Electric Circuits (International Edition)',
          isbn: '9780070584945',
          publishedYear: '2003',
          author: 'Alexander, Charles K. & Sadiku, Matthew N. O.',
          price: '0.00',
          publisher: 'Tata McGraw-Hill Publishing Company Limited, New Delhi',
          pages: 'xviii, 694 p.',
          entry_date: '29-Aug-18',
          image_url:
            'https://nicebooksimages.b-cdn.net/images/5703758bbb7691d1c9f6f6fb0d5f68c3718edd6a?width=240&quality=90&optimizer=image',
        },
      ],
      accession_books_list: [37, 1088, 10885],
      available_books: [37, 1088, 10885],
    },
    {
      _id: '632164fae49adfa2051e6b0c',
      book_detail: [
        {
          _id: '6426fbe7f62a87ae95da8e39',
          title: 'Unix Concepts and Applications',
          isbn: '9780070635463',
          publishedYear: '2003',
          author: 'Das, Sumitabha',
          price: '2,200.00',
          publisher: 'Tata McGraw-Hill Publishing Company Limited, New Delhi',
          pages: 'xxiii, 671 p.',
          entry_date: '20-Sep-05',
          image_url:
            'https://nicebooksimages.b-cdn.net/images/a7cd889a7e1d56e305fe1955f28f02c498c8fcf3?width=240&quality=90&optimizer=image',
        },
      ],
      accession_books_list: [
        38, 3084, 3085, 3086, 3087, 3088, 3089, 3090, 3091, 3092, 3093, 3094, 3095, 4187, 4188, 4189, 4190, 4191, 4192,
        4193, 4194,
      ],
      available_books: [
        38, 3084, 3085, 3086, 3087, 3088, 3089, 3090, 3091, 3092, 3093, 3094, 3095, 4187, 4188, 4189, 4190, 4191, 4192,
        4193, 4194,
      ],
    },
    {
      _id: '632164fae49adfa2051e6b0d',
      book_detail: [
        {
          _id: '6426fbe7f62a87ae95da8e3a',
          title: 'Internet : an introduction',
          isbn: '0074632227',
          publishedYear: '1999',
          author: 'CIStems',
          price: '384.00',
          publisher: 'Tata McGraw-Hill Publishing Company Limited, New Delhi',
          pages: '129 p.',
          entry_date: '21-Jun-05',
          image_url: 'https://leadershiftinsights.com/wp-content/uploads/2019/07/no-book-cover-available.jpg',
        },
      ],
      accession_books_list: [39, 3801, 3802, 3803, 3804],
      available_books: [39, 3801, 3802, 3803, 3804],
    },
    {
      _id: '632164fae49adfa2051e6b0e',
      book_detail: [
        {
          _id: '6426fbe7f62a87ae95da8e3b',
          title: 'Modern Digital Electronics',
          isbn: '9780070494923',
          publishedYear: '2003',
          author: 'Jain, R. P.',
          price: '1,325.00',
          publisher: 'Tata McGraw-Hill Publishing Company Limited, New Delhi',
          pages: 'xxiv, 611 p.',
          entry_date: '08-Aug-08',
          image_url:
            'https://nicebooksimages.b-cdn.net/images/671ff4102fc0c0059f8e09c03f5ec07c406b30a7?width=240&quality=90&optimizer=image',
        },
      ],
      accession_books_list: [
        40, 41, 2874, 2875, 2876, 2877, 2878, 2879, 2880, 2881, 2882, 2883, 4920, 4921, 4922, 4923, 4924, 4925, 4926,
        4927, 4928, 4929, 7544, 7545, 7546, 7547, 7548, 7549, 7550, 7551, 7552, 7553, 7554, 7555, 7556, 7557, 7558,
        7559, 7560, 7561, 7562, 7563, 7564,
      ],
      available_books: [
        40, 41, 2874, 2875, 2876, 2877, 2878, 2879, 2880, 2881, 2882, 2883, 4920, 4921, 4922, 4923, 4924, 4925, 4926,
        4927, 4928, 4929, 7544, 7545, 7546, 7547, 7548, 7549, 7550, 7551, 7552, 7553, 7554, 7555, 7556, 7557, 7558,
        7559, 7560, 7561, 7562, 7563, 7564,
      ],
    },
    {
      _id: '632164fae49adfa2051e6b0f',
      book_detail: [
        {
          _id: '6426fbe7f62a87ae95da8e3c',
          title: 'High Voltage Engineering',
          isbn: '9780070494640',
          publishedYear: '2004',
          author: 'Naidu, M. S. & Kamaraju, V.',
          price: '390.00',
          publisher: 'Tata McGraw-Hill Publishing Company Limited, New Delhi',
          pages: 'xii, 462 p.',
          entry_date: '15-May-05',
          image_url:
            'https://nicebooksimages.b-cdn.net/images/38adf2b925c1f5f217ee5576efb75df21f5444df?width=240&quality=90&optimizer=image',
        },
      ],
      accession_books_list: [42, 43],
      available_books: [42, 43],
    },
    {
      _id: '632164fae49adfa2051e6b10',
      book_detail: [
        {
          _id: '6426fbe7f62a87ae95da8e3d',
          title: 'Design of Transformers',
          isbn: '9780070436404',
          publishedYear: '2002',
          author: 'Dasgupta, Indrajit',
          price: '495.00',
          publisher: 'Tata McGraw-Hill Publishing Company Limited, New Delhi',
          pages: 'xxvii, 537 p.',
          entry_date: '15-May-05',
          image_url:
            'https://nicebooksimages.b-cdn.net/images/42c506e79b88d7d5789930ccf841c8d32d431fa7?width=240&quality=90&optimizer=image',
        },
      ],
      accession_books_list: [44],
      available_books: [44],
    },
    {
      _id: '632164fae49adfa2051e6b11',
      book_detail: [
        {
          _id: '6426fbe7f62a87ae95da8e3e',
          title: "Theory and Problems of Differential Equations (Schaum's Outline Series)",
          isbn: '9780070587199',
          publishedYear: ' 2004',
          author: 'Bronson, Richard',
          price: '450.00',
          publisher: 'Tata McGraw-Hill Publishing Company Limited, New Delhi',
          pages: 'x, 358 p.',
          entry_date: '15-May-05',
          image_url: 'https://leadershiftinsights.com/wp-content/uploads/2019/07/no-book-cover-available.jpg',
        },
      ],
      accession_books_list: [45, 46, 47, 1549, 1550],
      available_books: [45, 46, 47, 1549, 1550],
    },
    {
      _id: '632164fae49adfa2051e6b12',
      book_detail: [
        {
          _id: '6426fbe7f62a87ae95da8e3f',
          title: 'Numerical Methods',
          isbn: '0074633112',
          publishedYear: '1999',
          author: 'Balagurusamy, E.',
          price: '585.00',
          publisher: 'Tata McGraw-Hill Publishing Company Limited, New Delhi',
          pages: 'xvi, 608 p.',
          entry_date: '16-May-05',
          image_url:
            'https://nicebooksimages.b-cdn.net/images/514942464e25b55541f266b3680aa403b8ec345b?width=240&quality=90&optimizer=image',
        },
      ],
      accession_books_list: [48, 49, 975, 976, 977, 1822, 1823, 1824],
      available_books: [48, 49, 975, 976, 977, 1822, 1823, 1824, 1824],
    },
    {
      _id: '632164fae49adfa2051e6b13',
      book_detail: [
        {
          _id: '6426fbe7f62a87ae95da8e40',
          title: 'Elements Of Discrete Mathematics',
          isbn: '9780070434769',
          publishedYear: '2000',
          author: 'Liu, C. L.',
          price: '900.00',
          publisher: 'Tata McGraw-Hill Publishing Company Limited, Delhi',
          pages: 'xiv, 433 p.',
          entry_date: '18-Jun-05',
          image_url:
            'https://nicebooksimages.b-cdn.net/images/1d79afdc6b38d7cb1191b6eca20218aec4ca0c96?width=240&quality=90&optimizer=image',
        },
      ],
      accession_books_list: [
        50, 51, 957, 958, 959, 960, 1034, 1484, 1485, 1486, 1487, 1488, 1965, 1966, 1967, 1968, 1969,
      ],
      available_books: [50, 51, 957, 958, 959, 960, 1034, 1484, 1485, 1486, 1487, 1488, 1965, 1966, 1967, 1968, 1969],
    },
    {
      _id: '632164fae49adfa2051e6b14',
      book_detail: [
        {
          _id: '6426fbe7f62a87ae95da8e41',
          title: 'Before The Brand',
          isbn: '9780070532854',
          publishedYear: '2004',
          author: 'Temes, Lloyd & Schultz, Mitchel E.',
          price: '750.00',
          publisher: 'Tata McGraw-Hill Publishing Company Limited, New Delhi',
          pages: 'vi, 178 p.',
          entry_date: '21-Jun-05',
          image_url:
            'https://nicebooksimages.b-cdn.net/images/703db77c16e955266c365894abf7046852224c01?width=240&quality=90&optimizer=image',
        },
      ],
      accession_books_list: [52, 53, 54, 55, 776, 777, 1018, 1136, 3815, 3816, 3817, 3818, 3819],
      available_books: [52, 53, 54, 55, 776, 777, 1018, 1136, 3815, 3816, 3817, 3818, 3819],
    },
    {
      _id: '632164fae49adfa2051e6b15',
      book_detail: [
        {
          _id: '6426fbe7f62a87ae95da8e42',
          title: 'Discrete Mathematics',
          isbn: '9780070601741',
          publishedYear: '1997',
          author: 'Lipschutz, Seymour & Lipson, Marc Lars',
          price: '225.00',
          publisher: 'Tata McGraw-Hill Publishing Company Limited, New Delhi',
          pages: null,
          entry_date: '31-May-11',
          image_url:
            'https://nicebooksimages.b-cdn.net/images/8b4392525df730d40c3e2ac9697eb27a2f8d2676?width=240&quality=90&optimizer=image',
        },
      ],
      accession_books_list: [56, 57, 58, 59, 1478, 1479, 1480, 6107],
      available_books: [56, 57, 58, 59, 1478, 1479, 1480, 6107],
    },
  ];

  const settings = {
    dots: false,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: theme.breakpoints.values.md,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Box sx={{ py: 2 }}>
      <CardHeader
        title="Newest Books"
        subheader="20 Books"
        action={
          <CarouselArrows
            customIcon={'ic:round-keyboard-arrow-right'}
            onNext={handleNext}
            onPrevious={handlePrevious}
            sx={{ '& .arrow': { width: 28, height: 28, p: 0 } }}
          />
        }
        sx={{
          p: 0,
          mb: 3,
          '& .MuiCardHeader-action': { alignSelf: 'center' },
        }}
      />

      <Slider ref={carouselRef} {...settings}>
        {bookData.map((book) => {
          console.log(book.book_detail[0]);
          return <BookingItem key={book._id} book={book.book_detail[0]} />;
        })}
      </Slider>
    </Box>
  );
}

// const vad =
// {
//   "_id": "632164fae49adfa2051e6b02",
//   "book_detail": [
//       {
//           "_id": "6426fbe7f62a87ae95da8e2f",
//           "title": "Basic Electrical Engineering",
//           "isbn": "9780074515860",
//           "publishedYear": "1985",
//           "author": "Dhogal, P. S.",
//           "price": "1,100.00",
//           "publisher": "Tata McGraw-Hill Publishing Company Limited, New Delhi",
//           "pages": "xiv, 257 p.",
//           "entry_date": "15-May-05",
//           "image_url": "https://nicebooksimages.b-cdn.net/images/508711c92037e2113bc24264f0d3fdeddc9cf074?width=240&quality=90&optimizer=image"
//       }
//   ],
//   "accession_books_list": [
//
//   ],
//   "available_books": []
//
// }
// ----------------------------------------------------------------------

// BookingItem.propTypes = {
//   item: PropTypes.shape({
//     image_url: PropTypes.string,
//     bookdAt: PropTypes.instanceOf(Date),
//     cover: PropTypes.string,
//     name: PropTypes.string,
//     person: PropTypes.string,
//     roomNumber: PropTypes.string,
//     roomType: PropTypes.string,
//   }),
// };

function BookingItem({ book }) {
  console.log(book.title);
  return (
    <Paper sx={{ mx: 1.5, borderRadius: 2, bgcolor: 'background.neutral' }}>
      <Stack spacing={2.5} sx={{ p: 3, pb: 2.5 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={book.title} src={book.image_url} />
          <div>
            <Typography variant="subtitle2">{book.title}</Typography>
            <Typography variant="caption" sx={{ color: 'text.disabled', mt: 0.5, display: 'block' }}>
              {book.publishedYear}
            </Typography>
          </div>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={3} sx={{ color: 'text.secondary' }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Iconify icon={'ic:round-vpn-key'} width={16} height={16} />
            <Typography variant="caption">ISBN {book.isbn}</Typography>
          </Stack>

          {/* <Stack direction="row" alignItems="center" spacing={1}>
            <Iconify icon={'eva:people-fill'} width={16} height={16} />
            <Typography variant="caption"> Person</Typography>
          </Stack> */}
        </Stack>
      </Stack>

      <Box sx={{ p: 1, position: 'relative' }}>
        <Label
          variant="filled"
          color={'info'}
          sx={{
            right: 16,
            zIndex: 9,
            bottom: 16,
            position: 'absolute',
            textTransform: 'capitalize',
          }}
        >
          {book.pages}
        </Label>
        <Image src={book.image_url} ratio="1/1" sx={{ borderRadius: 1.5 }} />
      </Box>
    </Paper>
  );
}
