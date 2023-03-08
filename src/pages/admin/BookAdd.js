import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Link as RouterLink } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import DatePicker from '@mui/lab/DatePicker';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  Container,
  Pagination,
  Input,
  Button,
  FormControl,
  InputLabel,
  FormHelperText,
  Stack,
  TextField,
  MenuItem,
  Link,
  Alert,
  IconButton,
  InputAdornment,
} from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getBookslist, getCustomBookslist } from '../../redux/slices/book';
// routes
import { PATH_AUTH } from '../../routes/paths';
// hooks
import useTabs from '../../hooks/useTabs';
import useAuth from '../../hooks/useAuth';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import useSettings from '../../hooks/useSettings';
import useTable, { getComparator } from '../../hooks/useTable';
// _mock_
import { _userList } from '../../_mock';
// components
import Page from '../../components/Page';
import { RHFSelect, FormProvider, RHFTextField, RHFCheckbox } from '../../components/hook-form';
import Iconify from '../../components/Iconify';

// sections
import BookCard from '../../sections/@Lmsapp/book/bookCard';
import Searchbar from '../../layouts/dashboard/header/Searchbar';
// import CustomForm from '../../sections/@admin/book/CustomForm';
import InvoiceNewEditForm from '../../sections/@dashboard/invoice/new-edit-form';

const selectedEventSelector = (state) => {
  const { books } = state.book;
  if (books != null) {
    return books;
  }
  return null;
};

export default function BookAdd() {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const booksData = useSelector(selectedEventSelector);

  const handleChangepag = (event, value) => {
    console.log(value);
    setPage(value);
    dispatch(getBookslist(value));
  };

  useEffect(() => {
    dispatch(getBookslist(page));
  }, [dispatch]);

  const { themeStretch } = useSettings();

  const isMountedRef = useIsMountedRef();

  const defaultValues = {
    bookname: '',
    author: '',
    isbn: 9874,

    remeber: true,
  };

  const methods = useForm({
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      console.log(data);
      dispatch(getCustomBookslist(data.bookname, data.author, data.isbn));
    } catch (error) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.response.statusText });
      }
    }
  };

  return (
    <Page title="Book: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        {/* <Box height={30} /> */}

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <RHFTextField name="firstName" label="First name" />
              <RHFTextField name="midName" label="Middle name" />
              <RHFTextField name="lastName" label="Last name" />
            </Stack>

            <RHFTextField name="email" label="Email address" />

            <RHFTextField name="phone" type="number" label="Phone no" />

            <RHFTextField name="address" type="text" label="Address" />

            <RHFTextField name="grno" label="XIE ID" />

            <RHFTextField name="password" label="Password" type={'password'} />

            <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
              Register
            </LoadingButton>
          </Stack>
        </FormProvider>

        <Box height={30} />

        <Box height={30} />
        {/* <Box
          sx={{
            width: 300,
            height: 300,
            
          }}
        /> */}

        {/* <Card>
          <Box sx={{ position: 'relative' }}>
            <Pagination count={196} page={page} onChange={handleChangepag} />
          </Box>
        </Card> */}

        {/* <Box sx={{ position: 'relative' }}>
          <Pagination count={196} page={page} onChange={handleChangepag} />
        </Box> */}
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

function applySortFilter({ tableData, comparator, filterName, filterStatus, filterRole }) {
  const stabilizedThis = tableData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    tableData = tableData.filter((item) => item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1);
  }

  if (filterStatus !== 'all') {
    tableData = tableData.filter((item) => item.status === filterStatus);
  }

  if (filterRole !== 'all') {
    tableData = tableData.filter((item) => item.role === filterRole);
  }

  return tableData;
}
