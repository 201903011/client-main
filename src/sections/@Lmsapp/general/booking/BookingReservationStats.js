import merge from 'lodash/merge';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Card, CardHeader, Box, TextField } from '@mui/material';
//
import { BaseOptionChart } from '../../../../components/chart';

// ----------------------------------------------------------------------

const CHART_DATA = [
  {
    year: '2022-2023',
    data: [
      { name: 'Issued', data: [76, 42, 29, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
      { name: 'Overdue', data: [80, 55, 34, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    ],
  },
  {
    year: '2021-2022',
    data: [
      { name: 'Issued', data: [76, 42, 29, 41, 27, 138, 117, 86, 63, 69, 91, 48] },
      { name: 'Overdue', data: [80, 55, 34, 114, 80, 130, 15, 28, 55, 69, 91, 48] },
    ],
  },

  {
    year: '2020-2021',
    data: [
      { name: 'Issued', data: [148, 91, 69, 62, 49, 51, 35, 41, 10, 69, 91, 48] },
      { name: 'Overdue', data: [45, 77, 99, 88, 77, 56, 13, 34, 10, 69, 91, 48] },
    ],
  },

  {
    year: '2019-2020',
    data: [
      { name: 'Issued', data: [10, 41, 35, 151, 49, 62, 69, 91, 48, 69, 91, 48] },
      { name: 'Overdue', data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 69, 91, 48] },
    ],
  },
];

export default function BookingReservationStats() {
  const [seriesData, setSeriesData] = useState('2022-2023');

  const handleChangeSeriesData = (event) => {
    setSeriesData(event.target.value);
  };

  const chartOptions = merge(BaseOptionChart(), {
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    tooltip: {
      y: {
        formatter: (val) => `${val}`,
      },
    },
  });

  return (
    <Card>
      <CardHeader
        title="Reservation Stats"
        subheader="(+43% Issued | +12% OverDue) than last year"
        action={
          <TextField
            select
            fullWidth
            value={seriesData}
            SelectProps={{ native: true }}
            onChange={handleChangeSeriesData}
            sx={{
              '& fieldset': { border: '0 !important' },
              '& select': { pl: 1, py: 0.5, pr: '24px !important', typography: 'subtitle2' },
              '& .MuiOutlinedInput-root': { borderRadius: 0.75, bgcolor: 'background.neutral' },
              '& .MuiNativeSelect-icon': { top: 4, right: 0, width: 20, height: 20 },
            }}
          >
            {CHART_DATA.map((option) => (
              <option key={option.year} value={option.year}>
                {option.year}
              </option>
            ))}
          </TextField>
        }
      />

      {CHART_DATA.map((item) => (
        <Box key={item.year} sx={{ mt: 3, mx: 3 }} dir="ltr">
          {item.year === seriesData && (
            <ReactApexChart type="bar" series={item.data} options={chartOptions} height={364} />
          )}
        </Box>
      ))}
    </Card>
  );
}
