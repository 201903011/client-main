import sumBy from 'lodash/sumBy';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import moment from 'moment/moment';
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
import InvoiceAnalytic from '../../sections/@Lmsapp/issued/InvoiceAnalytic';
import { InvoiceTableRow, InvoiceTableToolbar } from '../../sections/@Lmsapp/issued/list';

// ----------------------------------------------------------------------

const SERVICE_OPTIONS = ['all', 'First Year', 'Comps', 'IT', 'EXTC'];

const TABLE_HEAD = [
  { id: 'accessionNumber', label: 'Book', align: 'left' },
  { id: 'issueDate', label: 'Issue Date', align: 'left' },
  { id: 'dueDate', label: 'Due Date', align: 'left' },
  { id: 'returnDate', label: 'Return Date', align: 'center', width: 140 },
  { id: 'fine', label: 'Fine', align: 'center', width: 140 },
  { id: 'status', label: 'Status', align: 'left' },
  { id: '' },
];

// ----------------------------------------------------------------------

// {
//   "_id": "640c383947166ea3b54ac597",
//   "accession_number": 18,
//   "student_id": "63db3b261f1b94e1eabe8bbb",
//   "issued_on": "11/03/2023",
//   "return_by": "18/03/2023",
//   "returned_on": null,
//   "returned_to": null,
//   "__v": 0
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
      _id: '640c383947166ea3b54ac597',
      accession_number: 18,
      student_id: '63db3b261f1b94e1eabe8bbb',
      issued_on: '11/03/2023',
      return_by: '18/03/2023',
      returned_on: null,
      returned_to: null,
      __v: 0,
    },
    {
      _id: '640c3c54f4cd114a30eee04a',
      accession_number: 1245,
      student_id: '63db3b261f1b94e1eabe8bbb',
      issued_on: '11/03/2023',
      return_by: '18/03/2023',
      returned_on: '2023-03-12T04:54:44.544Z',
      returned_to: '63dfa7370c0497cc25ed3ff8',
      __v: 0,
    },
    {
      _id: '640d5b3ab5cc39335840a35c',
      accession_number: 1245,
      student_id: '63db3b261f1b94e1eabe8bbb',
      issued_on: '12/03/2023',
      return_by: '19/03/2023',
      returned_on: '2023-03-12T05:28:56.682Z',
      returned_to: '63dfa7370c0497cc25ed3ff8',
      __v: 0,
    },
    {
      _id: '640d5bdab5cc39335840a3a0',
      accession_number: 1245,
      student_id: '63db3b261f1b94e1eabe8bbb',
      issued_on: '12/03/2023',
      return_by: '19/03/2023',
      returned_on: null,
      returned_to: null,
      __v: 0,
    },
    {
      _id: '640d5be4b5cc39335840a3ab',
      accession_number: 1245,
      student_id: '63db3b261f1b94e1eabe8bbb',
      issued_on: '12/03/2023',
      return_by: '19/03/2023',
      returned_on: null,
      returned_to: null,
      __v: 0,
    },
    {
      _id: '640d5beab5cc39335840a3b6',
      accession_number: 1245,
      student_id: '63db3b261f1b94e1eabe8bbb',
      issued_on: '12/03/2023',
      return_by: '19/03/2023',
      returned_on: null,
      returned_to: null,
      __v: 0,
    },
    {
      _id: '640d5c33b5cc39335840a3ee',
      accession_number: 1245,
      student_id: '63db3b261f1b94e1eabe8bbb',
      issued_on: '12/03/2023',
      return_by: '19/03/2023',
      returned_on: null,
      returned_to: null,
      __v: 0,
    },
    {
      _id: '640d5c9eb5cc39335840a41d',
      accession_number: 182,
      student_id: '63db3b261f1b94e1eabe8bbb',
      issued_on: '12/03/2023',
      return_by: '19/03/2023',
      returned_on: '2023-03-12T05:03:07.816Z',
      returned_to: '63dfa7370c0497cc25ed3ff8',
      __v: 0,
    },
    {
      _id: '640d5de7b5cc39335840a467',
      accession_number: 182,
      student_id: '63db3b261f1b94e1eabe8bbb',
      issued_on: '12/03/2023',
      return_by: '19/03/2023',
      returned_on: null,
      returned_to: null,
      __v: 0,
    },
    {
      _id: '640d5debb5cc39335840a472',
      accession_number: 1,
      student_id: '63db3b261f1b94e1eabe8bbb',
      issued_on: '12/03/2023',
      return_by: '19/03/2023',
      returned_on: '2023-03-12T05:29:06.602Z',
      returned_to: '63dfa7370c0497cc25ed3ff8',
      __v: 0,
    },
    {
      _id: '640d5df1b5cc39335840a47d',
      accession_number: 4,
      student_id: '63db3b261f1b94e1eabe8bbb',
      issued_on: '12/03/2023',
      return_by: '19/03/2023',
      returned_on: '2023-03-12T05:09:41.071Z',
      returned_to: '63dfa7370c0497cc25ed3ff8',
      __v: 0,
    },
    {
      _id: '640d5dfab5cc39335840a488',
      accession_number: 5,
      student_id: '63db3b261f1b94e1eabe8bbb',
      issued_on: '12/03/2023',
      return_by: '19/03/2023',
      returned_on: '2023-03-12T05:30:09.835Z',
      returned_to: '63dfa7370c0497cc25ed3ff8',
      __v: 0,
    },
    {
      _id: '640d5dffb5cc39335840a493',
      accession_number: 6,
      student_id: '63db3b261f1b94e1eabe8bbb',
      issued_on: '12/03/2023',
      return_by: '19/03/2023',
      returned_on: '2023-03-12T05:09:51.092Z',
      returned_to: '63dfa7370c0497cc25ed3ff8',
      __v: 0,
    },
    {
      _id: '640d5f53b5cc39335840a4b6',
      accession_number: 1245,
      student_id: '63db3b261f1b94e1eabe8bbb',
      issued_on: '12/03/2023',
      return_by: '19/03/2023',
      returned_on: null,
      returned_to: null,
      __v: 0,
    },
    {
      _id: '640d5fe2b5cc39335840a4d5',
      accession_number: 1,
      student_id: '63db3b261f1b94e1eabe8bbb',
      issued_on: '12/03/2023',
      return_by: '19/03/2023',
      returned_on: null,
      returned_to: null,
      __v: 0,
    },
    {
      _id: '640d6018b5cc39335840a4f4',
      accession_number: 17,
      student_id: '63db3b261f1b94e1eabe8bbb',
      issued_on: '12/03/2023',
      return_by: '19/03/2023',
      returned_on: '2023-03-12T05:21:57.873Z',
      returned_to: '63dfa7370c0497cc25ed3ff8',
      __v: 0,
    },
    {
      _id: '640d601fb5cc39335840a4ff',
      accession_number: 19,
      student_id: '63db3b261f1b94e1eabe8bbb',
      issued_on: '12/03/2023',
      return_by: '19/03/2023',
      returned_on: null,
      returned_to: null,
      __v: 0,
    },
    {
      _id: '640d6024b5cc39335840a50a',
      accession_number: 26,
      student_id: '63db3b261f1b94e1eabe8bbb',
      issued_on: '12/03/2023',
      return_by: '19/03/2023',
      returned_on: '2023-03-12T05:21:44.426Z',
      returned_to: '63dfa7370c0497cc25ed3ff8',
      __v: 0,
    },
    {
      _id: '640d7350b5cc39335840a557',
      accession_number: 1245,
      student_id: '63db3b261f1b94e1eabe8bbb',
      issued_on: '12/03/2023',
      return_by: '19/03/2023',
      returned_on: null,
      returned_to: null,
      __v: 0,
    },
    {
      _id: '640d82e3b5cc39335840a6e5',
      accession_number: 1,
      student_id: '63db3b261f1b94e1eabe8bbb',
      issued_on: '12/03/2023',
      return_by: '19/03/2023',
      returned_on: null,
      returned_to: null,
      __v: 0,
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
    { value: 'Issued', label: 'Issued', color: 'success', count: getLengthByStatus('paid') },
    { value: 'Return', label: 'Return', color: 'warning', count: getLengthByStatus('unpaid') },
    { value: 'Overdue', label: 'Overdue', color: 'error', count: getLengthByStatus('overdue') },
  ];

  return (
    <Page title="User: Issued Books">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Invoice List"
          links={[
            { name: 'Dashboard', href: PATH_APP.root },
            { name: 'Invoices', href: PATH_APP.user.issued },
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

        <Card sx={{ mb: 5 }}>
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
                total={getLengthByStatus('paid')}
                percent={getPercentByStatus('paid')}
                price={getTotalPriceByStatus('paid')}
                icon="eva:checkmark-circle-2-fill"
                color={theme.palette.success.main}
              />
              <InvoiceAnalytic
                title="Return"
                total={getLengthByStatus('unpaid')}
                percent={getPercentByStatus('unpaid')}
                price={getTotalPriceByStatus('unpaid')}
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
        </Card>

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
                      key={row.id}
                      row={row}
                      selected={selected.includes(row.id)}
                      onSelectRow={() => onSelectRow(row.id)}
                      onViewRow={() => handleViewRow(row.id)}
                      onEditRow={() => handleEditRow(row.id)}
                      onDeleteRow={() => handleDeleteRow(row.id)}
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
      (item) => item.accession_number.toString().toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  if (filterStatus !== 'all') {
    tableData = tableData.filter((item) => item.status === filterStatus);
  }

  if (filterService !== 'all') {
    tableData = tableData.filter((item) => item.items.some((c) => c.service === filterService));
  }

  if (filterStartDate && filterEndDate) {
    tableData = tableData.filter(
      (item) =>
        (new Date(moment(item.issued_on, 'DD/MM/YYYY').toDate().toISOString()).getTime() >= filterStartDate.getTime() &&
          new Date(moment(item.issued_on, 'DD/MM/YYYY').toDate().toISOString()).getTime() <= filterEndDate.getTime()) ||
        (new Date(moment(item.issued_on, 'DD/MM/YYYY').toDate().toISOString()).getTime() ===
          filterStartDate.getTime() &&
          new Date(moment(item.issued_on, 'DD/MM/YYYY').toDate().toISOString()).getTime() === filterEndDate.getTime())
    );
  }

  return tableData;
}
