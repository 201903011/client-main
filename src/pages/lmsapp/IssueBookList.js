import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// @mui
import { Box, Card, Container, Pagination, Input, Button } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getBookslist, getIssueBookslist } from '../../redux/slices/book';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useTabs from '../../hooks/useTabs';
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
import useTable, { getComparator } from '../../hooks/useTable';
// _mock_
import { _userList } from '../../_mock';
// components
import Page from '../../components/Page';
// sections
import BookCard from '../../sections/@Lmsapp/book/bookCard';
import Searchbar from '../../layouts/dashboard/header/Searchbar';
import IssueBookCard from '../../sections/@Lmsapp/book/issuedBookCard';

const selectedEventSelector = (state) => {
  const { issuedData } = state.book;
  if (issuedData != null) {
    return issuedData;
  }
  return null;
};

export default function IssueBookList() {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const issueBooksData = useSelector(selectedEventSelector);

  const { isAuthenticated, isInitialized, isLibrarian, user } = useAuth();

  useEffect(() => {
    const accessToken = window.localStorage.getItem('accessToken');
    dispatch(getIssueBookslist(user._id.toString(), accessToken.toString()));
  }, [dispatch]);

  const { themeStretch } = useSettings();

  return (
    <Page title="User: IssuedBooks">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        {/* <Box height={30} /> */}
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
          {issueBooksData.map((book) => {
            console.log(book);

            return <IssueBookCard key={book._id} book={book} />;
          })}

          {console.log('data is')}
          {console.log(issueBooksData[0])}
        </Box>
        <Box height={30} />
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------
