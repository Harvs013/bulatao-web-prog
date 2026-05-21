import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 200,
    editable: true,
  },
  {
    field: 'department',
    headerName: 'Department',
    width: 150,
    editable: true,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, email: 'jon@example.com', department: 'Sales' },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, email: 'cersei@example.com', department: 'Marketing' },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, email: 'jaime@example.com', department: 'IT' },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16, email: 'arya@example.com', department: 'HR' },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 28, email: 'daenerys@example.com', department: 'Operations' },
  { id: 6, lastName: 'Melisandre', firstName: 'R', age: 150, email: 'melisandre@example.com', department: 'Consulting' },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44, email: 'ferrara@example.com', department: 'Finance' },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, email: 'rossini@example.com', department: 'Sales' },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65, email: 'harvey@example.com', department: 'IT' },
];

const UsersPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
        Users Management
      </Typography>

      <Card>
        <CardContent>
          <Box sx={{ height: 600, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              disableSelectionOnClick
              experimentalFeatures={{ newEditingApi: true }}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UsersPage;
