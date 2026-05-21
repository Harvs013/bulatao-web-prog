import React from 'react';
import { Box, Card, CardContent, Typography, Stack } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';

const ReportsPage = () => {
  const chartSetting = {
    yAxis: [
      {
        label: 'Sales ($)',
      },
    ],
    width: 500,
    height: 300,
    slotProps: {
      legend: { hidden: true },
    },
  };

  const dataset = [
    {
      month: 'Jan',
      sales: 4000,
      revenue: 2400,
    },
    {
      month: 'Feb',
      sales: 3000,
      revenue: 1398,
    },
    {
      month: 'Mar',
      sales: 2000,
      revenue: 9800,
    },
    {
      month: 'Apr',
      sales: 2780,
      revenue: 3908,
    },
    {
      month: 'May',
      sales: 1890,
      revenue: 4800,
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
        Reports
      </Typography>

      <Stack spacing={3}>
        {/* Bar Chart Card */}
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Monthly Sales
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <BarChart
                dataset={dataset}
                xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                series={[
                  { dataKey: 'sales', label: 'Sales' },
                  { dataKey: 'revenue', label: 'Revenue' },
                ]}
                {...chartSetting}
              />
            </Box>
          </CardContent>
        </Card>

        {/* Line Chart Card */}
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Revenue Trend
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <LineChart
                dataset={dataset}
                xAxis={[{ scaleType: 'point', dataKey: 'month' }]}
                series={[{ dataKey: 'revenue', label: 'Revenue ($)' }]}
                {...chartSetting}
              />
            </Box>
          </CardContent>
        </Card>

        {/* Pie Chart Card */}
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Sales Distribution
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 10, label: 'Product A' },
                      { id: 1, value: 15, label: 'Product B' },
                      { id: 2, value: 20, label: 'Product C' },
                      { id: 3, value: 25, label: 'Product D' },
                    ],
                  },
                ]}
                width={500}
                height={300}
              />
            </Box>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};

export default ReportsPage;
