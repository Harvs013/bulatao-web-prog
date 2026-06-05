import { useRef } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { BarChart } from '@mui/x-charts/BarChart';
import { Gauge } from '@mui/x-charts/Gauge';
import { PieChart } from '@mui/x-charts/PieChart';

import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'title', headerName: 'Title', width: 180 },
  { field: 'type', headerName: 'Type', width: 140 },
  { field: 'released', headerName: 'Released', width: 120 },
  { field: 'streams', headerName: 'Streams', width: 140 },
  { field: 'certifications', headerName: 'Certifications', width: 200 },
];

const rows = [
  { id: 1, title: 'SQUARE ONE', type: 'Single Album', released: '2016', streams: '500M+', certifications: 'Platinum KR' },
  { id: 2, title: 'KILL THIS LOVE', type: 'Mini Album', released: '2019', streams: '727M', certifications: 'Gold US' },
  { id: 3, title: 'HOW YOU LIKE THAT', type: 'Digital Single', released: '2020', streams: '820M', certifications: 'Platinum US' },
  { id: 4, title: 'THE ALBUM', type: '1st Full Album', released: '2020', streams: '1B+', certifications: '2× Platinum KR' },
  { id: 5, title: 'PRETTY SAVAGE', type: 'Album Track', released: '2020', streams: '1B+', certifications: 'RIAA Gold' },
  { id: 6, title: 'BORN PINK', type: '2nd Full Album', released: '2022', streams: '900M+', certifications: 'Platinum US/KR' },
  { id: 7, title: 'JUMP', type: 'Digital Single', released: '2024', streams: '200M+', certifications: 'Gold KR' },
  { id: 8, title: 'DEADLINE', type: '3rd Mini Album', released: '2025', streams: '150M+', certifications: 'Platinum KR' },
];

const btnBase = {
  fontWeight: 700,
  fontSize: '11px',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  borderRadius: '20px',
  padding: '0 18px',
  cursor: 'pointer',
  height: '30px',
  lineHeight: 1,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const ReportsPage = () => {
  const printRef = useRef(null);

  const generateReport = () => {
    console.log('Export clicked');
  };

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const printWindow = window.open('', '_blank', 'width=1200,height=900');
    if (!printWindow) return;

    const exportDate = new Intl.DateTimeFormat('en-US', {
      dateStyle: 'long',
      timeStyle: 'short',
    }).format(new Date());

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>BLACKPINK Reports</title>
          <style>
            @page { size: A4; margin: 16mm; }
            * { box-sizing: border-box; }
            body {
              margin: 0;
              font-family: Arial, Helvetica, sans-serif;
              background: #18181b;
              color: #f4f4f5;
            }
            .shell { padding: 28px; }
            .header {
              display: flex;
              align-items: flex-start;
              justify-content: space-between;
              margin-bottom: 28px;
              padding-bottom: 16px;
              border-bottom: 2px solid #f472b6;
            }
            .header-left .eyebrow {
              font-size: 10px;
              font-weight: 600;
              letter-spacing: 0.28em;
              text-transform: uppercase;
              color: #71717a;
              margin: 0 0 4px;
            }
            .header-left h1 {
              margin: 0 0 6px;
              font-size: 26px;
              font-weight: 700;
              color: #f4f4f5;
              text-shadow: 0 0 14px #f472b6;
              letter-spacing: 0.05em;
              text-transform: uppercase;
            }
            .header-left p {
              margin: 0;
              font-size: 12px;
              color: #a1a1aa;
              line-height: 1.6;
            }
            .header-right {
              text-align: right;
              font-size: 11px;
              color: #71717a;
              white-space: nowrap;
              margin-left: 24px;
            }
            .header-right .date-label {
              font-size: 10px;
              letter-spacing: 0.2em;
              text-transform: uppercase;
              color: #52525b;
              margin-bottom: 4px;
            }
            .header-right .date-value {
              font-size: 13px;
              font-weight: 600;
              color: #f9a8d4;
            }
            .section-label {
              font-size: 10px;
              font-weight: 600;
              letter-spacing: 0.28em;
              text-transform: uppercase;
              color: #71717a;
              margin: 0 0 12px;
            }
            .stat-row { display: flex; gap: 12px; margin-bottom: 20px; }
            .stat-card {
              flex: 1;
              background: #27272a;
              border-radius: 16px;
              padding: 14px 18px;
              border: 1px solid #3f3f46;
            }
            .stat-card .stat-label {
              font-size: 10px;
              font-weight: 600;
              letter-spacing: 0.2em;
              text-transform: uppercase;
              color: #f9a8d4;
              margin-bottom: 4px;
            }
            .stat-card .stat-value {
              font-size: 26px;
              font-weight: 700;
              color: #f4f4f5;
            }
            .stat-card .stat-sub {
              font-size: 10px;
              color: #71717a;
              margin-top: 2px;
            }
            .chart-section {
              border-top: 2px solid #f472b6;
              border-bottom: 2px solid #f472b6;
              padding: 16px 0;
              margin-bottom: 16px;
              break-inside: avoid;
              page-break-inside: avoid;
            }
            .card {
              background: #27272a;
              border-radius: 20px;
              border: 2px solid #27272a;
              padding: 18px 20px;
              break-inside: avoid;
              page-break-inside: avoid;
            }
            .card-title {
              font-size: 11px;
              font-weight: 600;
              letter-spacing: 0.24em;
              text-transform: uppercase;
              color: #71717a;
              margin: 0 0 4px;
            }
            .card-desc {
              font-size: 12px;
              color: #71717a;
              margin: 0 0 14px;
              line-height: 1.5;
            }
            .two-col { display: flex; gap: 14px; margin-top: 14px; }
            .two-col .card { flex: 1; }
            .gauge-wrap {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              min-height: 160px;
              gap: 8px;
            }
            .gauge-circle {
              width: 100px;
              height: 100px;
              border-radius: 50%;
              border: 10px solid #3f3f46;
              border-top-color: #f472b6;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .gauge-value { font-size: 22px; font-weight: 700; color: #f4f4f5; }
            .gauge-sublabel { font-size: 11px; color: #71717a; letter-spacing: 0.15em; text-transform: uppercase; }
            table { width: 100%; border-collapse: collapse; font-size: 12px; margin-top: 8px; }
            thead tr { border-bottom: 1px solid #3f3f46; }
            th {
              padding: 8px 12px;
              text-align: left;
              font-size: 10px;
              font-weight: 600;
              letter-spacing: 0.2em;
              text-transform: uppercase;
              color: #71717a;
            }
            td { padding: 8px 12px; color: #d4d4d8; border-bottom: 0.5px solid #3f3f46; }
            tr:last-child td { border-bottom: none; }
            tr:hover td { background: #3f3f46; }
            .footer {
              margin-top: 28px;
              padding-top: 12px;
              border-top: 1px solid #3f3f46;
              display: flex;
              justify-content: space-between;
              font-size: 10px;
              color: #52525b;
              letter-spacing: 0.1em;
            }
          </style>
        </head>
        <body>
          <main class="shell">
            <header class="header">
              <div class="header-left">
                <p class="eyebrow">YG Entertainment</p>
                <h1>BLACKPINK — Analytics Report</h1>
                <p>Discography performance, Spotify stream analytics, fan base distribution, and award overview.</p>
              </div>
              <div class="header-right">
                <div class="date-label">Prepared on</div>
                <div class="date-value">${exportDate}</div>
              </div>
            </header>

            <p class="section-label">Overview</p>
            <div class="stat-row">
              <div class="stat-card">
                <div class="stat-label">Members</div>
                <div class="stat-value">4</div>
                <div class="stat-sub">Jisoo · Jennie · Rosé · Lisa</div>
              </div>
              <div class="stat-card">
                <div class="stat-label">Top Streams</div>
                <div class="stat-value">1B+</div>
                <div class="stat-sub">Pretty Savage</div>
              </div>
              <div class="stat-card">
                <div class="stat-label">Awards</div>
                <div class="stat-value">40+</div>
                <div class="stat-sub">Golden Disc, AAA & more</div>
              </div>
              <div class="stat-card">
                <div class="stat-label">Active Since</div>
                <div class="stat-value">2016</div>
                <div class="stat-sub">Debut 2016.08.08</div>
              </div>
            </div>

            <div class="chart-section">
              <div class="card">
                <p class="card-title">Spotify Stream Performance by Song</p>
                <p class="card-desc">Top streamed BLACKPINK tracks on Spotify as of 2025.</p>
                <table>
                  <thead>
                    <tr><th>Song</th><th>Streams</th><th>Album</th><th>Year</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Pretty Savage</td><td>1B+</td><td>THE ALBUM</td><td>2020</td></tr>
                    <tr><td>How You Like That</td><td>820M</td><td>Digital Single</td><td>2020</td></tr>
                    <tr><td>Kill This Love</td><td>727M</td><td>Kill This Love EP</td><td>2019</td></tr>
                    <tr><td>DDU-DU DDU-DU</td><td>680M</td><td>Square Up</td><td>2018</td></tr>
                    <tr><td>Pink Venom</td><td>540M</td><td>Born Pink</td><td>2022</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="two-col">
              <div class="card">
                <p class="card-title">Fan Base by Region</p>
                <p class="card-desc">Global BLACKPINK fanbase distribution (BLINKS).</p>
                <table>
                  <thead>
                    <tr><th>Region</th><th>Share</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Asia</td><td>35%</td></tr>
                    <tr><td>Americas</td><td>28%</td></tr>
                    <tr><td>Europe</td><td>22%</td></tr>
                    <tr><td>Others</td><td>15%</td></tr>
                  </tbody>
                </table>
              </div>
              <div class="card">
                <p class="card-title">Global Popularity Score</p>
                <p class="card-desc">Based on streams, awards, and social media reach.</p>
                <div class="gauge-wrap">
                  <div class="gauge-circle">
                    <span class="gauge-value">94%</span>
                  </div>
                  <span class="gauge-sublabel">Global Reach Index</span>
                </div>
              </div>
            </div>

            <div class="chart-section" style="margin-top:16px;">
              <div class="card">
                <p class="card-title">Discography</p>
                <table>
                  <thead>
                    <tr><th>ID</th><th>Title</th><th>Type</th><th>Released</th><th>Streams</th><th>Certifications</th></tr>
                  </thead>
                  <tbody>
                    ${rows.map(r => `
                      <tr>
                        <td>${r.id}</td>
                        <td>${r.title}</td>
                        <td>${r.type}</td>
                        <td>${r.released}</td>
                        <td>${r.streams}</td>
                        <td>${r.certifications}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>

            <footer class="footer">
              <span>YG ENTERTAINMENT — BLACKPINK — CONFIDENTIAL</span>
              <span>Generated ${exportDate}</span>
            </footer>
          </main>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <Box sx={{ bgcolor: '#18181b', minHeight: '100vh', p: 3 }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', md: 'center' }}
        spacing={15}
        sx={{ mb: 4 }}
      >
        <Box>
          <Typography sx={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#f472b6', mb: 0.5 }}>
            YG Entertainment
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#f4f4f5', textShadow: '0 0 18px #f472b6', letterSpacing: '0.05em' }}>
            BLACKPINK REPORTS
          </Typography>
          <Typography variant="body1" sx={{ color: '#a1a1aa', mt: 0.5 }}>
            Discography performance, Spotify stream analytics, fan base distribution, and award overview.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap alignItems="center">
          <button
            onClick={generateReport}
            style={{
              ...btnBase,
              background: '#f472b6',
              color: '#18181b',
              border: 'none',
              padding: '6px 18px',
              height: '40px',
            }}
          >
            Export
          </button>
          <button
            onClick={handlePrint}
            style={{
              ...btnBase,
              background: 'transparent',
              color: '#f472b6',
              fontWeight: 600,
              border: '1px solid #f472b6',
              padding: '6px 18px',
              height: '40px',
            }}
          >
            Print
          </button>
          <button
            style={{
              ...btnBase,
              background: 'transparent',
              color: '#71717a',
              fontWeight: 600,
              border: '1px solid #3f3f46',
              padding: '6px 18px',
              height: '40px',
            }}
          >
            Filter
          </button>
        </Stack>
      </Stack>

      <Stack ref={printRef} spacing={3}>

        {/* Bar Chart */}
        <Box sx={{ borderTop: '2px solid #f472b6', borderBottom: '2px solid #f472b6', py: 3 }}>
          <Card sx={{ bgcolor: '#27272a', borderRadius: '24px', border: '2px solid #27272a' }}>
            <CardContent>
              <Typography sx={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#fbfbff', mb: 1 }}>
                Spotify Stream Performance by Song
              </Typography>
              <Typography variant="body2" sx={{ color: '#8e8e96', mb: 3 }}>
                Comparing streams of top BLACKPINK tracks — Pretty Savage leads at 1B+ streams.
              </Typography>
              <BarChart
                series={[
                  { data: [100, 82, 73, 68, 54], label: 'Streams (×10M)', color: '#f472b6' },
                  { data: [95, 78, 70, 65, 50], label: 'Peak Chart', color: '#e879f9' },
                ]}
                height={300}
                xAxis={[{
                  data: ['Pretty Savage', 'HYLT', 'Kill This Love', 'DDU-DU', 'Pink Venom'],
                  scaleType: 'band',
                  label: 'Songs',
                  tickLabelStyle: { fill: '#a1a1aa', fontSize: 11 },
                  labelStyle: { fill: '#71717a', fontSize: 11 },
                }]}
                yAxis={[{ tickLabelStyle: { fill: '#a1a1aa', fontSize: 11 } }]}
                sx={{
                  '& .MuiChartsAxis-line': { stroke: '#3f3f46' },
                  '& .MuiChartsAxis-tick': { stroke: '#3f3f46' },
                  '& .MuiChartsLegend-label': { fill: '#a1a1aa', fontSize: '12px' },
                }}
              />
            </CardContent>
          </Card>
        </Box>

        {/* Pie + Gauge */}
        <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3}>
          <Box sx={{ borderTop: '2px solid #f472b6', borderBottom: '2px solid #f472b6', py: 3, flex: 1 }}>
            <Card sx={{ bgcolor: '#27272a', borderRadius: '24px', border: '2px solid #27272a', height: '100%' }}>
              <CardContent>
                <Typography sx={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#f472b6', mb: 1 }}>
                  Fan Base by Region
                </Typography>
                <Typography variant="body2" sx={{ color: '#f4f4f8', mb: 3 }}>
                  Global distribution of BLINKS (BLACKPINK fan base) across regions.
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <PieChart
                    series={[{
                      data: [
                        { id: 0, value: 35, label: 'Asia', color: '#f472b6' },
                        { id: 1, value: 28, label: 'Americas', color: '#e879f9' },
                        { id: 2, value: 22, label: 'Europe', color: '#c026d3' },
                        { id: 3, value: 15, label: 'Others', color: '#a21caf' },
                      ],
                      innerRadius: 40,
                      outerRadius: 90,
                    }]}
                    width={280}
                    height={280}
                    sx={{ '& .MuiChartsLegend-label': { fill: '#a1a1aa', fontSize: '12px' } }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ borderTop: '2px solid #f472b6', borderBottom: '2px solid #f472b6', py: 3, flex: 1 }}>
            <Card sx={{ bgcolor: '#27272a', borderRadius: '24px', border: '2px solid #27272a', height: '100%' }}>
              <CardContent>
                <Typography sx={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#f472b6', mb: 1 }}>
                  Global Popularity Score
                </Typography>
                <Typography variant="body2" sx={{ color: '#fafaff', mb: 3 }}>
                  Composite score based on Spotify streams, Billboard rankings, social media reach, and award wins.
                </Typography>
                <Box sx={{ minHeight: 220, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Gauge
                    width={180}
                    height={180}
                    value={94}
                    sx={{
                      '& .MuiGauge-valueArc': { fill: '#f472b6' },
                      '& .MuiGauge-referenceArc': { fill: '#3f3f46' },
                      '& .MuiGauge-valueText': { fill: '#f4f4f5', fontSize: '16px', fontWeight: 700 },
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Stack>

        {/* Discography DataGrid */}
        <Box sx={{ borderTop: '2px solid #f472b6', borderBottom: '2px solid #f472b6', py: 3 }}>
          <Card sx={{ bgcolor: '#27272a', borderRadius: '24px', border: '2px solid #27272a' }}>
            <CardContent>
              <Typography sx={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#f472b6', mb: 2 }}>
                Discography
              </Typography>
              <DataGrid
                rows={rows}
                columns={columns}
                experimentalFeatures={{ newEditingApi: true }}
                initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
                sx={{
                  border: 'none',
                  bgcolor: '#27272a',
                  color: '#d4d4d8',
                  '& .MuiDataGrid-columnHeaderTitle': { fontSize: '10px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#71717a' },
                  '& .MuiDataGrid-columnHeaders': { borderBottom: '1px solid #3f3f46' },
                  '& .MuiDataGrid-row:hover': { bgcolor: '#3f3f46' },
                  '& .MuiDataGrid-cell': { borderBottom: '0.5px solid #3f3f46' },
                  '& .MuiDataGrid-footerContainer': { borderTop: '1px solid #3f3f46' },
                  '& .MuiCheckbox-root': { color: '#71717a', '&.Mui-checked': { color: '#f472b6' } },
                  '& .MuiTablePagination-root': { color: '#a1a1aa' },
                }}
              />
            </CardContent>
          </Card>
        </Box>

      </Stack>
    </Box>
  );
};

export default ReportsPage;
