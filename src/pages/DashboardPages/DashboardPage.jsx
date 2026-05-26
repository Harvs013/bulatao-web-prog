import React from 'react';
import { useLocation } from 'react-router-dom';

import { BarChart } from '@mui/x-charts/BarChart';
import { Gauge } from '@mui/x-charts/Gauge';
import { PieChart } from '@mui/x-charts/PieChart';

import { DataGrid } from '@mui/x-data-grid';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Typography, Card, CardContent, createTheme, ThemeProvider } from '@mui/material';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const darkPinkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: { default: '#18181b', paper: '#27272a' },
    primary: { main: '#f472b6' },
    text: { primary: '#f4f4f5', secondary: '#a1a1aa' },
    divider: '#3f3f46',
  },
  shape: { borderRadius: 16 },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: '#27272a',
          border: '2px solid #27272a',
          borderRadius: '24px',
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          background: '#27272a',
          border: '2px solid #3f3f46',
          borderRadius: '24px',
          color: '#d4d4d8',
          '& .MuiDataGrid-columnHeaders': { background: '#27272a', borderBottom: '1px solid #3f3f46' },
          '& .MuiDataGrid-columnHeaderTitle': { fontSize: '10px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#71717a' },
          '& .MuiDataGrid-row:hover': { background: '#3f3f46' },
          '& .MuiDataGrid-cell': { borderBottom: '0.5px solid #3f3f46' },
          '& .MuiDataGrid-footerContainer': { borderTop: '1px solid #3f3f46' },
          '& .MuiCheckbox-root': { color: '#71717a', '&.Mui-checked': { color: '#f472b6' } },
          '& .MuiDataGrid-selectedRowCount': { color: '#f9a8d4' },
          '& .MuiTablePagination-root': { color: '#a1a1aa' },
        },
      },
    },
  },
});

// ── Members table ─────────────────────────────────────────────────────────────
const memberColumns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'stageName', headerName: 'Stage Name', width: 140 },
  { field: 'fullName', headerName: 'Full Name', width: 180 },
  { field: 'nationality', headerName: 'Nationality', width: 130 },
  { field: 'role', headerName: 'Role', width: 200 },
  { field: 'soloDebut', headerName: 'Solo Debut', width: 130 },
];

const memberRows = [
  { id: 1, stageName: 'Jisoo', fullName: 'Kim Ji-soo', nationality: 'Korean', role: 'Vocalist, Visual', soloDebut: '2023' },
  { id: 2, stageName: 'Jennie', fullName: 'Jennie Kim', nationality: 'Korean', role: 'Rapper, Vocalist', soloDebut: '2018' },
  { id: 3, stageName: 'Rosé', fullName: 'Park Chae-young', nationality: 'Korean-NZ', role: 'Vocalist, Dancer', soloDebut: '2021' },
  { id: 4, stageName: 'Lisa', fullName: 'Lalisa Manobal', nationality: 'Thai', role: 'Rapper, Dancer, Visual', soloDebut: '2021' },
];

// ── Section wrapper ───────────────────────────────────────────────────────────
const Section = ({ label, children, sx = {} }) => (
  <Box
    sx={{
      borderTop: '2px solid #f472b6',
      borderBottom: '2px solid #f472b6',
      py: { xs: 3, sm: 4 },
      mb: 3,
      ...sx,
    }}
  >
    {label && (
      <Typography
        sx={{
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: '#71717a',
          mb: 2,
        }}
      >
        {label}
      </Typography>
    )}
    {children}
  </Box>
);

// ── Stat card ─────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, sub }) => (
  <Card>
    <CardContent>
      <Typography sx={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#f9a8d4', mb: 1 }}>
        {label}
      </Typography>
      <Typography sx={{ fontSize: '2rem', fontWeight: 700, color: '#f4f4f5' }}>
        {value}
      </Typography>
      {sub && (
        <Typography sx={{ fontSize: '11px', color: '#71717a', mt: 0.5, letterSpacing: '0.1em' }}>
          {sub}
        </Typography>
      )}
    </CardContent>
  </Card>
);

function DashboardPage() {
  return (
    <ThemeProvider theme={darkPinkTheme}>
      <Box sx={{ color: '#f4f4f5', pb: 6 }}>

        {/* Page Heading */}
        <Box sx={{ pt: 2, pb: 2 }}>
          <Typography sx={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#71717a', mb: 0.5 }}>
            YG ENTERTAINMENT
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#f4f4f5', textShadow: '0 0 18px #f472b6', letterSpacing: '0.05em' }}>
            BLACKPINK DASHBOARD
          </Typography>
          <Typography sx={{ fontSize: '13px', color: '#a1a1aa', mt: 1 }}>
            MAKE PEOPLE JUMP! WITH OUR MUSIC — Debut 2016.08.08
          </Typography>
        </Box>

        {/* Summary Stats */}
        <Section label="Overview">
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <StatCard label="Members" value="4" sub="Jisoo · Jennie · Rosé · Lisa" />
            <StatCard label="Spotify Streams" value="1B+" sub="Pretty Savage" />
            <StatCard label="Awards" value="40+" sub="Golden Disc, AAA & more" />
            <StatCard label="Active Since" value="2016" sub="YG Entertainment" />
          </Box>
        </Section>

        {/* Spotify Streams Gauge */}
        <Section label="Spotify Top Songs — Stream Performance">
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
              <Gauge
                width={120}
                height={120}
                value={100}
                sx={{
                  '& .MuiGauge-valueArc': { fill: '#f472b6' },
                  '& .MuiGauge-referenceArc': { fill: '#3f3f46' },
                  '& .MuiGauge-valueText': { fill: '#f4f4f5', fontSize: '13px', fontWeight: 700 },
                }}
              />
              <Typography sx={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#f9a8d4' }}>
                Pretty Savage
              </Typography>
              <Typography sx={{ fontSize: '11px', color: '#71717a' }}>1B streams</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
              <Gauge
                width={120}
                height={120}
                value={82}
                sx={{
                  '& .MuiGauge-valueArc': { fill: '#e879f9' },
                  '& .MuiGauge-referenceArc': { fill: '#3f3f46' },
                  '& .MuiGauge-valueText': { fill: '#f4f4f5', fontSize: '13px', fontWeight: 700 },
                }}
              />
              <Typography sx={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#f9a8d4' }}>
                How You Like That
              </Typography>
              <Typography sx={{ fontSize: '11px', color: '#71717a' }}>820M streams</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
              <Gauge
                width={120}
                height={120}
                value={73}
                sx={{
                  '& .MuiGauge-valueArc': { fill: '#c026d3' },
                  '& .MuiGauge-referenceArc': { fill: '#3f3f46' },
                  '& .MuiGauge-valueText': { fill: '#f4f4f5', fontSize: '13px', fontWeight: 700 },
                }}
              />
              <Typography sx={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#f9a8d4' }}>
                Kill This Love
              </Typography>
              <Typography sx={{ fontSize: '11px', color: '#71717a' }}>727M streams</Typography>
            </Box>
          </Box>
        </Section>

        {/* Analytics */}
        <Section label="Analytics">
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
            <Box sx={{ bgcolor: '#27272a', borderRadius: '24px', border: '2px solid #27272a', p: 2, flex: 1 }}>
              <Typography sx={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#71717a', mb: 1 }}>
                Album Sales by Quarter (2024)
              </Typography>
              <BarChart
                series={[
                  { data: [35, 44, 24, 34], label: 'Born Pink', color: '#f472b6' },
                  { data: [51, 6, 49, 30], label: 'JUMP', color: '#e879f9' },
                ]}
                height={260}
                xAxis={[{
                  data: ['Q1', 'Q2', 'Q3', 'Q4'],
                  scaleType: 'band',
                  label: 'Quarters',
                  tickLabelStyle: { fill: '#a1a1aa', fontSize: 12 },
                  labelStyle: { fill: '#71717a', fontSize: 11 },
                }]}
                yAxis={[{ tickLabelStyle: { fill: '#a1a1aa', fontSize: 11 } }]}
                sx={{
                  '& .MuiChartsAxis-line': { stroke: '#3f3f46' },
                  '& .MuiChartsAxis-tick': { stroke: '#3f3f46' },
                  '& .MuiChartsLegend-label': { fill: '#a1a1aa', fontSize: '12px' },
                }}
              />
            </Box>

            <Box sx={{ bgcolor: '#27272a', borderRadius: '24px', border: '2px solid #27272a', p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Typography sx={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#71717a', mb: 1, alignSelf: 'flex-start' }}>
                Fan Base by Region
              </Typography>
              <PieChart
                series={[{
                  data: [
                    { id: 0, value: 35, label: 'Asia', color: '#f472b6' },
                    { id: 1, value: 28, label: 'Americas', color: '#e879f9' },
                    { id: 2, value: 22, label: 'Europe', color: '#c026d3' },
                    { id: 3, value: 15, label: 'Others', color: '#a21caf' },
                  ],
                  innerRadius: 40,
                  outerRadius: 80,
                }]}
                width={260}
                height={200}
                sx={{ '& .MuiChartsLegend-label': { fill: '#a1a1aa', fontSize: '12px' } }}
              />
            </Box>
          </Stack>
        </Section>

        {/* Members Table */}
        <Section label="Members Overview">
          <Box sx={{ height: 300, width: '100%' }}>
            <DataGrid
              rows={memberRows}
              columns={memberColumns}
              initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
              pageSizeOptions={[5]}
              disableRowSelectionOnClick
            />
          </Box>
        </Section>

        {/* Location Map */}
        <Section label="Location — YG Entertainment HQ">
          <Box sx={{ bgcolor: '#27272a', borderRadius: '24px', border: '2px solid #27272a', overflow: 'hidden' }}>
            <Box sx={{ px: 3, py: 1.5, borderBottom: '1px solid #3f3f46', display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#f472b6', boxShadow: '0 0 6px #f472b6' }} />
              <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#f4f4f5' }}>
                YG Entertainment - Seoul HQ
              </Typography>
              <Typography sx={{ fontSize: '11px', color: '#71717a', fontFamily: 'monospace', ml: 1 }}>
                37.5497° N, 126.9136° E
              </Typography>
            </Box>
            <Box sx={{ height: 460, width: '100%' }}>
              <MapContainer
                center={[37.5497, 126.9136]}
                zoom={15}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; OpenStreetMap contributors'
                />
                <Marker position={[37.5497, 126.9136]}>
                  <Popup>
                    <strong>YG Entertainment - Seoul HQ</strong>
                    <br />
                    7 Huiujeong-ro 1-gil, Mapo-gu, Seoul
                  </Popup>
                </Marker>
              </MapContainer>
            </Box>
          </Box>
        </Section>

      </Box>
    </ThemeProvider>
  );
}

export default DashboardPage;