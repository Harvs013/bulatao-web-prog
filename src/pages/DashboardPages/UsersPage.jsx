import { useState, useMemo, useEffect } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid } from '@mui/x-data-grid';
import { fetchUsers, createUser, updateUser } from '../../service/userService';

const roles = ['admin', 'editor', 'viewer'];
const genders = ['male', 'female', 'other'];

const blankForm = {
  firstName: '',
  lastName: '',
  age: '',
  gender: '',
  contactNumber: '',
  email: '',
  role: 'editor',
  username: '',
  password: '',
  address: '',
  isActive: true,
};

const labelize = (value) =>
  value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '';

const UsersPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState('');

  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // ── Load users from API ──
  const loadUsers = async () => {
    try {
      setLoading(true);
      setApiError('');
      const { data } = await fetchUsers();
      setUsers(
        data.users.map((user, index) => ({
          id: Number(user.id) || index + 1,
          firstName: String(user.firstName ?? '').trim(),
          lastName: String(user.lastName ?? '').trim(),
          age: String(user.age ?? '').trim(),
          gender: genders.includes(String(user.gender ?? '').trim().toLowerCase())
            ? String(user.gender ?? '').trim().toLowerCase()
            : '',
          contactNumber: String(user.contactNumber ?? '').trim(),
          email: String(user.email ?? '').trim().toLowerCase(),
          role: roles.includes(String(user.type ?? '').trim().toLowerCase())
  ? String(user.type ?? '').trim().toLowerCase()
  : 'editor',
          username: String(user.username ?? '').trim().toLowerCase(),
          password: String(user.password ?? ''),
          address: String(user.address ?? '').trim(),
          isActive: typeof user.isActive === 'boolean' ? user.isActive : true,
        }))
      );
    } catch (error) {
      console.error('Error fetching users:', error);
      setApiError('Unable to load users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // ── Filtered rows ──
  const filteredUsers = useMemo(() => {
    const q = search.trim().toLowerCase();
    return users.filter((user) => {
      const matchesSearch =
        !q ||
        user.firstName.toLowerCase().includes(q) ||
        user.lastName.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q) ||
        user.username.toLowerCase().includes(q);

      const matchesRole = !filterRole || user.role === filterRole;
      const matchesGender = !filterGender || user.gender === filterGender;
      const matchesStatus =
        filterStatus === ''
          ? true
          : filterStatus === 'active'
          ? user.isActive
          : !user.isActive;

      return matchesSearch && matchesRole && matchesGender && matchesStatus;
    });
  }, [users, search, filterRole, filterGender, filterStatus]);

  const resetForm = () => {
    setForm({ ...blankForm });
    setErrors({});
  };

  const handleOpen = () => {
    setIsEditing(false);
    setForm({ ...blankForm });
    setErrors({});
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setEditUserId(null);
    setShowPassword(false);
    resetForm();
  };

  const handleEdit = (id) => {
    const userToEdit = users.find((user) => user.id === id);
    setForm({ ...userToEdit, password: '' }); // clear password on edit
    setEditUserId(id);
    setIsEditing(true);
    setOpen(true);
  };

  const handleChange = ({ target: { name, value, checked, type } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // ── Validation ──
  const validate = () => {
    const nextErrors = {};
    const email = form.email.trim().toLowerCase();
    const username = form.username.trim().toLowerCase();

    [
      ['firstName', 'First name'],
      ['lastName', 'Last name'],
      ['age', 'Age'],
      ['gender', 'Gender'],
      ['contactNumber', 'Contact number'],
      ['email', 'Email'],
      ['role', 'Role'],
      ['username', 'Username'],
      ['address', 'Address'],
    ].forEach(([key, label]) => {
      if (!String(form[key]).trim()) {
        nextErrors[key] = `${label} is required.`;
      }
    });

    // Password required only when adding
    if (!isEditing && !form.password.trim()) {
      nextErrors.password = 'Password is required.';
    }

    if (!nextErrors.age && !/^\d+$/.test(form.age.trim())) {
      nextErrors.age = 'Age must be a number only.';
    }

    if (!nextErrors.contactNumber && !/^\d{11}$/.test(form.contactNumber.trim())) {
      nextErrors.contactNumber = 'Contact number must be exactly 11 digits.';
    }

    if (!nextErrors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (
      !nextErrors.email &&
      users.some((user) => user.id !== editUserId && user.email === email)
    ) {
      nextErrors.email = 'Email address already exists.';
    }

    if (form.password && form.password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters.';
    }

    if (!nextErrors.username && /\s/.test(form.username)) {
      nextErrors.username = 'Username must not contain spaces.';
    }

    if (
      !nextErrors.username &&
      users.some((user) => user.id !== editUserId && user.username === username)
    ) {
      nextErrors.username = 'Username already exists.';
    }

    return nextErrors;
  };

  // ── Save (create or update) ──
  const handleSaveUser = async (event) => {
  event.preventDefault();
  const nextErrors = validate();
  if (Object.keys(nextErrors).length) {
    setErrors(nextErrors);
    return;
  }

  try {
    if (isEditing) {
      const updatedUser = { ...form, type: form.role }; // ← map role to type
      if (!updatedUser.password) delete updatedUser.password;
      await updateUser(editUserId, updatedUser);
    } else {
      await createUser({ ...form, type: form.role }); // ← map role to type
    }
    await loadUsers();
  } catch (error) {
      console.error('Error saving user:', error);
      setApiError(
        error.response?.data?.message || 'Error saving user. Please try again.'
      );
      return;
    }

    handleClose();
  };

  // ── Toggle active status ──
  const handleToggleActive = async (id, isActive) => {
    try {
      await updateUser(id, { isActive: !isActive });
      await loadUsers(); // reload from API after toggle
    } catch (error) {
      console.error('Error toggling user status:', error);
      setApiError('Error updating user status. Please try again.');
    }
  };

  const fieldProps = (name, label, extra = {}) => ({
    name,
    label,
    value: form[name],
    onChange: handleChange,
    error: Boolean(errors[name]),
    helperText: errors[name],
    fullWidth: true,
    ...extra,
  });

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      bgcolor: '#27272a',
      borderRadius: '12px',
      color: '#f4f4f5',
      '& fieldset': { borderColor: '#3f3f46' },
      '&:hover fieldset': { borderColor: '#f472b6' },
      '&.Mui-focused fieldset': { borderColor: '#f472b6' },
    },
    '& .MuiInputLabel-root': { color: '#71717a' },
    '& .MuiInputLabel-root.Mui-focused': { color: '#f472b6' },
    '& .MuiFormHelperText-root': { color: '#f87171' },
    '& .MuiSelect-icon': { color: '#71717a' },
    '& .MuiInputBase-input': { color: '#f4f4f5' },
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 60 },
    {
      field: 'fullName',
      headerName: 'Full Name',
      flex: 1,
      minWidth: 140,
      valueGetter: (_, row) => `${row.firstName} ${row.lastName}`.trim(),
    },
    { field: 'username', headerName: 'Username', minWidth: 120, flex: 1 },
    { field: 'age', headerName: 'Age', width: 70, hide: isMobile },
    {
      field: 'gender',
      headerName: 'Gender',
      width: 90,
      valueGetter: (_, row) => labelize(row.gender),
    },
    { field: 'contactNumber', headerName: 'Contact', minWidth: 130 },
    { field: 'email', headerName: 'Email', flex: 1.2, minWidth: 180 },
    {
      field: 'role',
      headerName: 'Role',
      width: 90,
      valueGetter: (_, row) => labelize(row.role),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
      sortable: false,
      renderCell: ({ row }) => (
        <Chip
          size="small"
          label={row.isActive ? 'Active' : 'Inactive'}
          sx={{
            bgcolor: row.isActive ? 'rgba(244,114,182,0.15)' : '#3f3f46',
            color: row.isActive ? '#f472b6' : '#71717a',
            border: row.isActive ? '1px solid #f472b6' : '1px solid #3f3f46',
            fontWeight: 600,
            fontSize: '10px',
            letterSpacing: '0.1em',
          }}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 160,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1} alignItems="center" sx={{ height: '100%' }}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => handleEdit(row.id)}
            sx={{
              color: '#f472b6',
              borderColor: '#f472b6',
              borderRadius: '10px',
              fontSize: '11px',
              '&:hover': { borderColor: '#f9a8d4', color: '#f9a8d4' },
            }}
          >
            Edit
          </Button>
          <Switch
            checked={row.isActive}
            onChange={() => handleToggleActive(row.id, row.isActive)}
            size="small"
            sx={{
              '& .MuiSwitch-switchBase.Mui-checked': { color: '#f472b6' },
              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                backgroundColor: '#f472b6',
              },
            }}
          />
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ bgcolor: '#18181b', minHeight: '100vh', p: { xs: 2, sm: 3 }, width: '100%', maxWidth: '100%', overflow: 'hidden', boxSizing: 'border-box' }}>

      {/* Page heading */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Box>
          <Typography sx={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#71717a', mb: 0.5 }}>
            YG Entertainment
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#f4f4f5', textShadow: '0 0 18px #f472b6', letterSpacing: '0.05em' }}>
            USERS
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{
            bgcolor: '#f472b6',
            color: '#18181b',
            fontWeight: 700,
            fontSize: '11px',
            letterSpacing: '0.2em',
            borderRadius: '20px',
            width: { xs: '100%', sm: 'auto' },
            '&:hover': { bgcolor: '#f9a8d4' },
          }}
        >
          Add User
        </Button>
      </Box>

      {apiError ? (
        <Alert
          severity="error"
          onClose={() => setApiError('')}
          sx={{ mb: 2, bgcolor: '#27272a', color: '#f87171', border: '1px solid #f87171' }}
        >
          {apiError}
        </Alert>
      ) : null}

      {/* Search + Filter bar */}
      <Box sx={{ borderTop: '2px solid #f472b6', borderBottom: '2px solid #f472b6', py: 3, mb: 3 }}>
        <Typography sx={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#71717a', mb: 2 }}>
          Search & Filter
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} flexWrap="wrap">
          <TextField
            placeholder="Search by name, email, or username…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="small"
            sx={{ flex: 2, minWidth: 220, ...inputSx }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#71717a', fontSize: 18 }} />
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            select
            label="Role"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            size="small"
            sx={{ flex: 1, minWidth: 130, ...inputSx }}
          >
            <MenuItem value="">All Roles</MenuItem>
            {roles.map((r) => (
              <MenuItem key={r} value={r}>{labelize(r)}</MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Gender"
            value={filterGender}
            onChange={(e) => setFilterGender(e.target.value)}
            size="small"
            sx={{ flex: 1, minWidth: 130, ...inputSx }}
          >
            <MenuItem value="">All Genders</MenuItem>
            {genders.map((g) => (
              <MenuItem key={g} value={g}>{labelize(g)}</MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            size="small"
            sx={{ flex: 1, minWidth: 130, ...inputSx }}
          >
            <MenuItem value="">All Status</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </TextField>
          {(search || filterRole || filterGender || filterStatus) && (
            <Button
              onClick={() => { setSearch(''); setFilterRole(''); setFilterGender(''); setFilterStatus(''); }}
              sx={{ color: '#71717a', fontSize: '11px', letterSpacing: '0.15em', '&:hover': { color: '#f472b6' } }}
            >
              Clear
            </Button>
          )}
        </Stack>
      </Box>

      {/* Table */}
      <Paper sx={{ bgcolor: '#27272a', borderRadius: '24px', border: '2px solid #27272a', p: { xs: 1, sm: 2 }, width: '100%', overflow: 'auto' }}>
        {!loading && !filteredUsers.length ? (
          <Alert severity="info" sx={{ bgcolor: '#27272a', color: '#a1a1aa', border: '1px solid #3f3f46' }}>
            No users match your search or filters.
          </Alert>
        ) : (
          <Box sx={{ height: { xs: 460, sm: 520 }, width: '100%', minWidth: 0 }}>
            <DataGrid
              rows={filteredUsers}
              columns={columns}
              loading={loading}
              getRowId={(row) => row.id}
              disableRowSelectionOnClick
              pageSizeOptions={[10, 20, 50]}
              initialState={{ pagination: { paginationModel: { pageSize: 10, page: 0 } } }}
              sx={{
                border: 'none',
                bgcolor: '#27272a',
                color: '#d4d4d8',
                '& .MuiDataGrid-columnHeaderTitle': { fontSize: '10px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#71717a' },
                '& .MuiDataGrid-columnHeaders': { borderBottom: '1px solid #3f3f46' },
                '& .MuiDataGrid-row:hover': { bgcolor: '#3f3f46' },
                '& .MuiDataGrid-row.Mui-selected': { bgcolor: 'rgba(244,114,182,0.1)', '&:hover': { bgcolor: 'rgba(244,114,182,0.15)' } },
                '& .MuiDataGrid-cell': { borderBottom: '0.5px solid #3f3f46', outline: 'none' },
                '& .MuiDataGrid-columnHeader': { outline: 'none' },
                '& .MuiDataGrid-footerContainer': { borderTop: '1px solid #3f3f46' },
                '& .MuiCheckbox-root': { color: '#71717a', '&.Mui-checked': { color: '#f472b6' } },
                '& .MuiDataGrid-selectedRowCount': { color: '#f9a8d4' },
                '& .MuiTablePagination-root': { color: '#a1a1aa' },
                '& .MuiTablePagination-actions button': { color: '#a1a1aa', '&:hover': { color: '#f472b6' } },
                '& .MuiDataGrid-sortIcon': { color: '#f472b6' },
              }}
            />
          </Box>
        )}
      </Paper>

      {/* Modal */}
      <Dialog
        open={open}
        onClose={handleClose}
        keepMounted
        fullWidth
        fullScreen={isMobile}
        maxWidth="md"
        PaperProps={{
          sx: {
            bgcolor: '#18181b',
            borderRadius: '28px',
            border: '1px solid rgba(244,114,182,0.25)',
            boxShadow: '0 0 40px rgba(244,114,182,0.18)',
            overflow: 'hidden',
          },
        }}
      >
        <Box component="form" onSubmit={handleSaveUser}>

          <DialogTitle
            sx={{
              px: 3,
              py: 2.5,
              borderBottom: '1px solid #27272a',
              background: 'linear-gradient(to right, rgba(244,114,182,0.12), transparent)',
            }}
          >
            <Typography sx={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#f472b6' }}>
              YG Entertainment
            </Typography>
            <Typography sx={{ color: '#f4f4f5', fontSize: '22px', fontWeight: 700, mt: 0.5 }}>
              {isEditing ? 'Edit User' : 'Add User'}
            </Typography>
          </DialogTitle>

          <DialogContent
            dividers
            sx={{ px: { xs: 2, sm: 3 }, py: 3, borderColor: '#27272a', bgcolor: '#18181b' }}
          >
            <Stack spacing={2} sx={{ pt: 1 }}>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('firstName', 'First Name')} sx={inputSx} />
                <TextField {...fieldProps('lastName', 'Last Name')} sx={inputSx} />
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('age', 'Age')} sx={inputSx} />
                <TextField {...fieldProps('gender', 'Gender', { select: true })} sx={inputSx}>
                  {genders.map((gender) => (
                    <MenuItem key={gender} value={gender}>{labelize(gender)}</MenuItem>
                  ))}
                </TextField>
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('contactNumber', 'Contact Number')} sx={inputSx} />
                <TextField {...fieldProps('email', 'Email')} sx={inputSx} />
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('role', 'Role', { select: true })} sx={inputSx}>
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>{labelize(role)}</MenuItem>
                  ))}
                </TextField>
                <TextField {...fieldProps('username', 'Username')} sx={inputSx} />
              </Stack>

              <TextField
                {...fieldProps('password', 'Password', {
                  type: showPassword ? 'text' : 'password',
                  helperText: errors.password || (isEditing ? 'Leave blank to keep current password.' : ''),
                  slotProps: {
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword((p) => !p)}
                            onMouseDown={(e) => e.preventDefault()}
                            sx={{ color: '#71717a' }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  },
                })}
                sx={inputSx}
              />

              <TextField
                {...fieldProps('address', 'Address', { multiline: true, rows: 3 })}
                sx={inputSx}
              />

              <FormControlLabel
                control={
                  <Switch
                    name="isActive"
                    checked={form.isActive}
                    onChange={handleChange}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': { color: '#f472b6' },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#f472b6' },
                    }}
                  />
                }
                label={
                  <Typography sx={{ color: '#a1a1aa', fontSize: '13px' }}>
                    {form.isActive ? 'User status: Active' : 'User status: Inactive'}
                  </Typography>
                }
              />

            </Stack>
          </DialogContent>

          <DialogActions sx={{ px: 3, py: 2, borderTop: '1px solid #27272a', bgcolor: '#18181b' }}>
            <Button onClick={handleClose} sx={{ color: '#a1a1aa' }}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: '#f472b6',
                color: '#18181b',
                fontWeight: 700,
                borderRadius: '14px',
                px: 3,
                '&:hover': { bgcolor: '#f9a8d4' },
              }}
            >
              {isEditing ? 'Save Changes' : 'Add'}
            </Button>
          </DialogActions>

        </Box>
      </Dialog>

    </Box>
  );
};

export default UsersPage;