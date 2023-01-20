import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// @mui
import { Box, Card, Container, TablePagination } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getBookslist } from '../../redux/slices/book';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useTabs from '../../hooks/useTabs';

import useSettings from '../../hooks/useSettings';
import useTable, { getComparator } from '../../hooks/useTable';
// _mock_
import { _userList } from '../../_mock';
// components
import Page from '../../components/Page';
// sections
import BookCard from '../../sections/@Lmsapp/book/bookCard';

const selectedEventSelector = (state) => {
  const { books } = state.book;
  if (books != null) {
    return books;
  }
  return null;
};

export default function UserList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookslist());
  }, [dispatch]);

  const booksData = useSelector(selectedEventSelector);

  const {
    page,

    rowsPerPage,

    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const { themeStretch } = useSettings();

  return (
    <Page title="Book: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
          }}
        >
          {booksData.map((book) => {
            return <BookCard key={book._id} book={book} />;
          })}
        </Box>

        <Card>
          <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={50}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            />
          </Box>
        </Card>
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
