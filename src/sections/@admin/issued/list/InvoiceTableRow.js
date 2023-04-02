import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Checkbox, TableRow, TableCell, Typography, Stack, Link, MenuItem } from '@mui/material';
// utils
import { fDate, fDateCustom, fDateCustomISO, fDateDifference } from '../../../../utils/formatTime';
import createAvatar from '../../../../utils/createAvatar';
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/Label';
import Avatar from '../../../../components/Avatar';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';

// ----------------------------------------------------------------------

InvoiceTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool,
  onSelectRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

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

export default function InvoiceTableRow({ row, selected, onSelectRow, onViewRow, onEditRow, onDeleteRow }) {
  const theme = useTheme();

  const { sent, invoiceNumber, createDate, dueDate, status, invoiceTo, totalPrice } = row;

  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };
  console.log(row);

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={row.student_info.name} color={createAvatar(row.student_info.name).color} sx={{ mr: 2 }}>
          {createAvatar(row.student_info.name).name}
        </Avatar>

        <Stack>
          <Typography variant="subtitle2" noWrap>
            {row.student_info.name}
          </Typography>

          <Link noWrap variant="body2" onClick={onViewRow} sx={{ color: 'text.disabled', cursor: 'pointer' }}>
            {row.student_info.email}
          </Link>
        </Stack>
      </TableCell>

      <TableCell align="center">{fDate(row.payment_info.payed_on)}</TableCell>

      <TableCell align="center">{row.student_info.phone_number}</TableCell>

      <TableCell align="center">{row.payment_info.transaction_id}</TableCell>

      <TableCell align="center" sx={{ textTransform: 'capitalize' }}>
        {row.payment_info.amount}
      </TableCell>

      {/* <TableCell align="left">
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={
            (status === 'paid' && 'success') ||
            (status === 'unpaid' && 'warning') ||
            (status === 'overdue' && 'error') ||
            'default'
          }
          sx={{ textTransform: 'capitalize' }}
        >
          paid
        </Label>
      </TableCell> */}

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  // onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{}}
              >
                <Iconify icon={'eva:printer-fill'} />
                Print
              </MenuItem>

              <MenuItem
                onClick={() => {
                  onViewRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:eye-fill'} />
                View
              </MenuItem>

              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:download-outline'} />
                Download
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
