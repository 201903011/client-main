import sumBy from 'lodash/sumBy';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import moment from 'moment/moment';
import { differenceInBusinessDays } from 'date-fns';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Tab,
  Tabs,
  Card,
  Table,
  Stack,
  Switch,
  Button,
  Tooltip,
  Divider,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  TablePagination,
  FormControlLabel,
} from '@mui/material';
// routes
import { PATH_APP } from '../../routes/paths';
// hooks
import useTabs from '../../hooks/useTabs';
import useSettings from '../../hooks/useSettings';
import useTable, { getComparator, emptyRows } from '../../hooks/useTable';
// _mock_
import { _invoices } from '../../_mock';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { TableEmptyRows, TableHeadCustom, TableNoData, TableSelectedActions } from '../../components/table';
// sections
import InvoiceAnalytic from '../../sections/@admin/issued/InvoiceAnalytic';
import { InvoiceTableRow, InvoiceTableToolbar } from '../../sections/@admin/issued/list';
// utils
import { fDate, fDateCustom, fDateDifference } from '../../utils/formatTime';

// ----------------------------------------------------------------------

const SERVICE_OPTIONS = ['all', 'First Year', 'Comps', 'IT', 'EXTC'];

const TABLE_HEAD = [
  { id: 'name', label: 'Name', align: 'center' },
  { id: 'payDate', label: 'Pay Date', align: 'center' },
  { id: 'phomeNo', label: 'Phone NO', align: 'center' },
  { id: 'transactionid', label: 'Transaction ID', align: 'center', width: 80 },
  { id: 'amount', label: 'Amount', align: 'center', width: 80 },
  // { id: 'status', label: 'Status', align: 'left' },
  { id: '' },
];

// ----------------------------------------------------------------------

// {
//   "payment_info": {
//       "payed_on": "1970-01-20T10:28:16.710Z",
//       "invoice_link": "https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xSmxvTEtTSVhEMGo2dVRaKMeR4KAGMgaNyMNSWZ06LBYk1KZBD2gCLhDalJ2QumxF9IQpDSPC3VoCkdKtJdIhlgmzYpw6Z3odH91b",
//       "amount": 1,
//       "transaction_id": "ch_3MnczCSIXD0j6uTZ1p3o7KMM"
//   },
//   "student_info": {
//       "email": "student12@gmail.com",
//       "name": "Vinod Vaman Bhat",
//       "phone_number": "1234567890",
//       "profile_picture": "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202209/Kalyani_Priyadarshan_Sesham_Mi_2_1200x768.jpeg?VersionId=UFbcMRzaLOnmEZNOimGKKLLmEty8T3LR&size=690:388"
//   }
// }

export default function InvoiceList() {
  const theme = useTheme();

  const { themeStretch } = useSettings();

  const navigate = useNavigate();

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({ defaultOrderBy: 'createDate' });

  console.log(_invoices[0].createDate);
  const [tableData, setTableData] = useState([
    {
      payment_info: {
        payed_on: '1970-01-20T09:48:08.928Z',
        invoice_link:
          'https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xSmxvTEtTSVhEMGo2dVRaKOGWzZ8GMgYZSTv4mt86LBbZj7PnFQv7mHofM83P6gJUbNPy-MF_iiYpkE5DkiDJU98M80xtu5bVvGzB',
        amount: 5,
        transaction_id: 'ch_3MdWc0SIXD0j6uTZ17nU9fz5',
      },
      student_info: {
        email: 'student12@gmail.com',
        name: 'Vinod Vaman Bhat',
        phone_number: '1234567890',
        profile_picture:
          'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202209/Kalyani_Priyadarshan_Sesham_Mi_2_1200x768.jpeg?VersionId=UFbcMRzaLOnmEZNOimGKKLLmEty8T3LR&size=690:388',
      },
    },
    {
      payment_info: {
        payed_on: '1970-01-20T10:00:51.356Z',
        invoice_link:
          'https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xSmxvTEtTSVhEMGo2dVRaKJ3b-58GMgZvZT_KvFo6LBb3B40nh9bV57BJPZQrQPCZwzt1gz5DX2j0GYL6ApJaOFuzLFve1CdeL1Wq',
        amount: 1,
        transaction_id: 'ch_3MgixESIXD0j6uTZ1cMOsk4u',
      },
      student_info: {
        email: 'student12@gmail.com',
        name: 'Vinod Vaman Bhat',
        phone_number: '1234567890',
        profile_picture:
          'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202209/Kalyani_Priyadarshan_Sesham_Mi_2_1200x768.jpeg?VersionId=UFbcMRzaLOnmEZNOimGKKLLmEty8T3LR&size=690:388',
      },
    },
    {
      payment_info: {
        payed_on: '1970-01-20T10:01:23.340Z',
        invoice_link:
          'https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xSmxvTEtTSVhEMGo2dVRaKI3V_Z8GMgZWUslxdac6LBbLI2CqSe-FjJOQnGAxZY1GPquQSykSHvJ-_2m1WvCmbz7ZrtdrnDcton4c',
        amount: 1,
        transaction_id: 'ch_3MgrH6SIXD0j6uTZ0ESaG4xm',
      },
      student_info: {
        email: 'student12@gmail.com',
        name: 'Vinod Vaman Bhat',
        phone_number: '1234567890',
        profile_picture:
          'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202209/Kalyani_Priyadarshan_Sesham_Mi_2_1200x768.jpeg?VersionId=UFbcMRzaLOnmEZNOimGKKLLmEty8T3LR&size=690:388',
      },
    },
    {
      payment_info: {
        payed_on: '1970-01-20T10:01:24.126Z',
        invoice_link:
          'https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xSmxvTEtTSVhEMGo2dVRaKJ_b_Z8GMga5LV6D8gM6LBbviNY5bgxZe-Hko6UDo702v_8IJZmLp4_kX8BXnihzD1SRYFjh3ah3F56-',
        amount: 1,
        transaction_id: 'ch_3MgrTmSIXD0j6uTZ04W1p1mR',
      },
      student_info: {
        email: 'student12@gmail.com',
        name: 'Vinod Vaman Bhat',
        phone_number: '1234567890',
        profile_picture:
          'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202209/Kalyani_Priyadarshan_Sesham_Mi_2_1200x768.jpeg?VersionId=UFbcMRzaLOnmEZNOimGKKLLmEty8T3LR&size=690:388',
      },
    },
    {
      payment_info: {
        payed_on: '1970-01-20T10:01:24.217Z',
        invoice_link:
          'https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xSmxvTEtTSVhEMGo2dVRaKPrb_Z8GMgarusfI_cI6LBak8uLa8ZL0tfyh8PqbhuozOaDle46EkG_qZJYllNKaCVsqMZ-keiHP14qO',
        amount: 1,
        transaction_id: 'ch_3MgrVFSIXD0j6uTZ0kXQTWMu',
      },
      student_info: {
        email: 'student12@gmail.com',
        name: 'Vinod Vaman Bhat',
        phone_number: '1234567890',
        profile_picture:
          'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202209/Kalyani_Priyadarshan_Sesham_Mi_2_1200x768.jpeg?VersionId=UFbcMRzaLOnmEZNOimGKKLLmEty8T3LR&size=690:388',
      },
    },
    {
      payment_info: {
        payed_on: '1970-01-20T10:01:24.320Z',
        invoice_link:
          'https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xSmxvTEtTSVhEMGo2dVRaKOHc_Z8GMgZOX1h9txI6LBZyKNFGEFT9dZnWJA3mUf2FmEQmQiSD3yReDKTgdBC31iMFt4tTM4A2Niyp',
        amount: 1,
        transaction_id: 'ch_3MgrWuSIXD0j6uTZ0IVuY8Ry',
      },
      student_info: {
        email: 'student12@gmail.com',
        name: 'Vinod Vaman Bhat',
        phone_number: '1234567890',
        profile_picture:
          'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202209/Kalyani_Priyadarshan_Sesham_Mi_2_1200x768.jpeg?VersionId=UFbcMRzaLOnmEZNOimGKKLLmEty8T3LR&size=690:388',
      },
    },
    {
      payment_info: {
        payed_on: '1970-01-20T10:01:24.392Z',
        invoice_link:
          'https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xSmxvTEtTSVhEMGo2dVRaKKnd_Z8GMgbmMH9MrDk6LBZhf9pWnRefgzjIyX6oCA2ArcUFyhIi3IZvdeSG2P7c3_penBcRhz8s2STB',
        amount: 1,
        transaction_id: 'ch_3MgrY4SIXD0j6uTZ0kElNFml',
      },
      student_info: {
        email: 'student12@gmail.com',
        name: 'Vinod Vaman Bhat',
        phone_number: '1234567890',
        profile_picture:
          'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202209/Kalyani_Priyadarshan_Sesham_Mi_2_1200x768.jpeg?VersionId=UFbcMRzaLOnmEZNOimGKKLLmEty8T3LR&size=690:388',
      },
    },
    {
      payment_info: {
        payed_on: '1970-01-20T10:01:24.440Z',
        invoice_link:
          'https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xSmxvTEtTSVhEMGo2dVRaKNnd_Z8GMgY4YWKjrDQ6LBYEOZB8yQ3aV89uEEJLbmx8cnr7buLFEaY7st0-wwoh_8hSadS78FQUAKsy',
        amount: 1,
        transaction_id: 'ch_3MgrYqSIXD0j6uTZ0fKXtwc1',
      },
      student_info: {
        email: 'student12@gmail.com',
        name: 'Vinod Vaman Bhat',
        phone_number: '1234567890',
        profile_picture:
          'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202209/Kalyani_Priyadarshan_Sesham_Mi_2_1200x768.jpeg?VersionId=UFbcMRzaLOnmEZNOimGKKLLmEty8T3LR&size=690:388',
      },
    },
    {
      payment_info: {
        payed_on: '1970-01-20T10:01:24.471Z',
        invoice_link:
          'https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xSmxvTEtTSVhEMGo2dVRaKPjd_Z8GMgaAhZJtHv46LBYqA8FwLYxYp9Pq_QZ_8iGdkREWNwN2fBubZYzNju42Xx4aw_IXzbalK3pM',
        amount: 1,
        transaction_id: 'ch_3MgrZLSIXD0j6uTZ1NMyA8OJ',
      },
      student_info: {
        email: 'student12@gmail.com',
        name: 'Vinod Vaman Bhat',
        phone_number: '1234567890',
        profile_picture:
          'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202209/Kalyani_Priyadarshan_Sesham_Mi_2_1200x768.jpeg?VersionId=UFbcMRzaLOnmEZNOimGKKLLmEty8T3LR&size=690:388',
      },
    },
    {
      payment_info: {
        payed_on: '1970-01-20T10:01:24.533Z',
        invoice_link:
          'https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xSmxvTEtTSVhEMGo2dVRaKLbe_Z8GMgbxlz5ugAc6LBb00Yi1V-iZR12eOR_s9KYNZrYqvTv0L9w5WwxvC-doQimsZa-AgGVMjWKi',
        amount: 1,
        transaction_id: 'ch_3MgraLSIXD0j6uTZ0gIfYNHP',
      },
      student_info: {
        email: 'student12@gmail.com',
        name: 'Vinod Vaman Bhat',
        phone_number: '1234567890',
        profile_picture:
          'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202209/Kalyani_Priyadarshan_Sesham_Mi_2_1200x768.jpeg?VersionId=UFbcMRzaLOnmEZNOimGKKLLmEty8T3LR&size=690:388',
      },
    },
    {
      payment_info: {
        payed_on: '1970-01-20T10:28:16.710Z',
        invoice_link:
          'https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xSmxvTEtTSVhEMGo2dVRaKMeR4KAGMgaNyMNSWZ06LBYk1KZBD2gCLhDalJ2QumxF9IQpDSPC3VoCkdKtJdIhlgmzYpw6Z3odH91b',
        amount: 1,
        transaction_id: 'ch_3MnczCSIXD0j6uTZ1p3o7KMM',
      },
      student_info: {
        email: 'student12@gmail.com',
        name: 'Vinod Vaman Bhat',
        phone_number: '1234567890',
        profile_picture:
          'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202209/Kalyani_Priyadarshan_Sesham_Mi_2_1200x768.jpeg?VersionId=UFbcMRzaLOnmEZNOimGKKLLmEty8T3LR&size=690:388',
      },
    },
  ]);

  const [filterName, setFilterName] = useState('');

  const [filterService, setFilterService] = useState('all');

  const [filterStartDate, setFilterStartDate] = useState(null);

  const [filterEndDate, setFilterEndDate] = useState(null);

  const { currentTab: filterStatus, onChangeTab: onFilterStatus } = useTabs('all');

  const handleFilterName = (filterName) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleFilterService = (event) => {
    setFilterService(event.target.value);
  };

  const handleDeleteRow = (id) => {
    const deleteRow = tableData.filter((row) => row.id !== id);
    setSelected([]);
    setTableData(deleteRow);
  };

  const handleDeleteRows = (selected) => {
    const deleteRows = tableData.filter((row) => !selected.includes(row.id));
    setSelected([]);
    setTableData(deleteRows);
  };

  const handleEditRow = (id) => {
    navigate(PATH_APP.invoice.edit(id));
  };

  const handleViewRow = (id) => {
    navigate(PATH_APP.invoice.view(id));
  };

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterService,
    filterStatus,
    filterStartDate,
    filterEndDate,
  });

  const denseHeight = dense ? 56 : 76;

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterStatus) ||
    (!dataFiltered.length && !!filterService) ||
    (!dataFiltered.length && !!filterEndDate) ||
    (!dataFiltered.length && !!filterStartDate);

  const getLengthByStatus = (status) => tableData.filter((item) => item.status === status).length;

  const getTotalPriceByStatus = (status) =>
    sumBy(
      tableData.filter((item) => item.status === status),
      'totalPrice'
    );

  const getPercentByStatus = (status) => (getLengthByStatus(status) / tableData.length) * 100;

  const TABS = [
    { value: 'all', label: 'All', color: 'info', count: tableData.length },
    // { value: 'Issued', label: 'Issued', color: 'success', count: getLengthByStatus('issued') },
    // { value: 'Return', label: 'Return', color: 'warning', count: getLengthByStatus('return') },
    // { value: 'Overdue', label: 'Overdue', color: 'error', count: getLengthByStatus('overdue') },
  ];

  const CalculateStatus = (item) => {
    // if(returnDate != null  ){
    // }
    // const issuedDate = new Date(moment(item.issued_on, 'DD/MM/YYYY').toDate().toISOString());
    // const returnDate = item.returned_on.toISOString().getTime();
    // const dueDate = new Date(moment(item.return_by, 'DD/MM/YYYY').toDate().toISOString());
    // if(differenceInBusinessDays(dueDate,returnDate) > 0 ){
    //   return 'overdue' ;
    // }
    // else{
    //   if(returnDate == null ){
    //   }
    // }
  };

  return (
    <Page title="User: Issued Books">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Payment List"
          links={[
            { name: 'Admin', href: PATH_APP.root },
            { name: 'Payments ', href: PATH_APP.user.issued },
            { name: 'List' },
          ]}
          // action={
          //   <Button
          //     variant="contained"
          //     component={RouterLink}
          //     to={PATH_APP.user.issued}
          //     startIcon={<Iconify icon={'eva:plus-fill'} />}
          //   >
          //     New Invoice
          //   </Button>
          // }
        />

        {/* <Card sx={{ mb: 5 }}>
            <Scrollbar>
              <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
                sx={{ py: 2 }}
              >
                <InvoiceAnalytic
                  title="Total"
                  total={tableData.length}
                  percent={100}
                  price={sumBy(tableData, 'totalPrice')}
                  icon="ic:round-receipt"
                  color={theme.palette.info.main}
                />
                <InvoiceAnalytic
                  title="Issued"
                  total={getLengthByStatus('issued')}
                  percent={getPercentByStatus('issued')}
                  price={getTotalPriceByStatus('issued')}
                  icon="eva:checkmark-circle-2-fill"
                  color={theme.palette.success.main}
                />
                <InvoiceAnalytic
                  title="Return"
                  total={getLengthByStatus('return')}
                  percent={getPercentByStatus('return')}
                  price={getTotalPriceByStatus('return')}
                  icon="eva:clock-fill"
                  color={theme.palette.warning.main}
                />
                <InvoiceAnalytic
                  title="Overdue"
                  total={getLengthByStatus('overdue')}
                  percent={getPercentByStatus('overdue')}
                  price={getTotalPriceByStatus('overdue')}
                  icon="eva:bell-fill"
                  color={theme.palette.error.main}
                />
              </Stack>
            </Scrollbar>
          </Card> */}

        <Card>
          <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            value={filterStatus}
            onChange={onFilterStatus}
            sx={{ px: 2, bgcolor: 'background.neutral' }}
          >
            {TABS.map((tab) => (
              <Tab
                disableRipple
                key={tab.value}
                value={tab.value}
                label={
                  <Stack spacing={1} direction="row" alignItems="center">
                    <div>{tab.label}</div> <Label color={tab.color}> {tab.count} </Label>
                  </Stack>
                }
              />
            ))}
          </Tabs>

          <Divider />

          <InvoiceTableToolbar
            filterName={filterName}
            filterService={filterService}
            filterStartDate={filterStartDate}
            filterEndDate={filterEndDate}
            onFilterName={handleFilterName}
            onFilterService={handleFilterService}
            onFilterStartDate={(newValue) => {
              setFilterStartDate(newValue);
            }}
            onFilterEndDate={(newValue) => {
              setFilterEndDate(newValue);
            }}
            optionsService={SERVICE_OPTIONS}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              {/* {selected.length > 0 && (
                <TableSelectedActions
                  dense={dense}
                  numSelected={selected.length}
                  rowCount={tableData.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                  actions={
                    <Stack spacing={1} direction="row">
                      <Tooltip title="Sent">
                        <IconButton color="primary">
                          <Iconify icon={'ic:round-send'} />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Download">
                        <IconButton color="primary">
                          <Iconify icon={'eva:download-outline'} />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Print">
                        <IconButton color="primary">
                          <Iconify icon={'eva:printer-fill'} />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete">
                        <IconButton color="primary" onClick={() => handleDeleteRows(selected)}>
                          <Iconify icon={'eva:trash-2-outline'} />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  }
                />
              )} */}

              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <InvoiceTableRow
                      key={row.payment_info.transaction_id}
                      row={row}
                      selected={selected.includes(row.payment_info.transaction_id)}
                      onSelectRow={() => onSelectRow(row.payment_info.transaction_id)}
                      onViewRow={() => handleViewRow(row.payment_info.transaction_id)}
                      onEditRow={() => handleEditRow(row.payment_info.transaction_id)}
                      onDeleteRow={() => handleDeleteRow(row.payment_info.transaction_id)}
                    />
                  ))}

                  <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, tableData.length)} />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={dataFiltered.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            />

            <FormControlLabel
              control={<Switch checked={dense} onChange={onChangeDense} />}
              label="Dense"
              sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
            />
          </Box>
        </Card>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

function applySortFilter({
  tableData,
  comparator,
  filterName,
  filterStatus,
  filterService,
  filterStartDate,
  filterEndDate,
}) {
  const stabilizedThis = tableData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    tableData = tableData.filter(
      (item) => item.student_info.email.toString().toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  // if (filterStatus !== 'all') {
  //   tableData = tableData.filter((item) => item.status === filterStatus);
  // }

  if (filterService !== 'all') {
    tableData = tableData.filter((item) => item.items.some((c) => c.service === filterService));
  }

  if (filterStartDate && filterEndDate) {
    tableData = tableData.filter(
      (item) =>
        new Date(item.payment_info.payed_on).getTime() >= filterStartDate.getTime() &&
        new Date(item.payment_info.payed_on).getTime() <= filterEndDate.getTime()
    );
  }

  return tableData;
}
