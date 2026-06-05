// src/pages/DashboardPages/DashArticleListPage.jsx
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
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid } from '@mui/x-data-grid';
import {
  fetchArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from '../../service/articleService';

const statuses = ['published', 'draft', 'archived'];
const categories = ['News', 'Update', 'Event', 'Release', 'Interview'];

const blankForm = {
  title: '',
  author: '',
  category: '',
  summary: '',
  body: '',
  image: '',
  status: 'draft',
};

const labelize = (value) =>
  value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '';

const statusColors = {
  published: { bg: 'rgba(244,114,182,0.15)', color: '#f472b6', border: '#f472b6' },
  draft:     { bg: 'rgba(161,161,170,0.15)', color: '#a1a1aa', border: '#52525b' },
  archived:  { bg: 'rgba(63,63,70,0.5)',     color: '#71717a', border: '#3f3f46'  },
};

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

const DashArticleListPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState('');

  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editArticleId, setEditArticleId] = useState(null);
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const loadArticles = async () => {
    try {
      setLoading(true);
      setApiError('');
      const { data } = await fetchArticles();
      setArticles(
        data.map((a, index) => ({
          id: a._id ?? index + 1,
          title:    String(a.title    ?? '').trim(),
          author:   String(a.author   ?? '').trim(),
          category: String(a.category ?? '').trim(),
          summary:  String(a.summary  ?? '').trim(),
          body:     String(a.body     ?? '').trim(),
          image:    String(a.image    ?? '').trim(),
          status:   statuses.includes(a.status) ? a.status : 'draft',
          date:     a.date ? new Date(a.date).toLocaleDateString() : '',
        }))
      );
    } catch (error) {
      console.error('Error fetching articles:', error);
      setApiError('Unable to load articles. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadArticles(); }, []);

  const filteredArticles = useMemo(() => {
    const q = search.trim().toLowerCase();
    return articles.filter((a) => {
      const matchesSearch =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.author.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q);
      const matchesStatus   = !filterStatus   || a.status   === filterStatus;
      const matchesCategory = !filterCategory || a.category === filterCategory;
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [articles, search, filterStatus, filterCategory]);

  const resetForm = () => { setForm({ ...blankForm }); setErrors({}); };

  const handleOpen = () => {
    setIsEditing(false);
    setEditArticleId(null);
    resetForm();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setEditArticleId(null);
    resetForm();
  };

  const handleEdit = (id) => {
    const target = articles.find((a) => a.id === id);
    setForm({ ...blankForm, ...target });
    setEditArticleId(id);
    setIsEditing(true);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteArticle(id);
      await loadArticles();
    } catch (error) {
      console.error('Error deleting article:', error);
      setApiError('Error deleting article. Please try again.');
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const nextErrors = {};
    [
      ['title',    'Title'],
      ['author',   'Author'],
      ['category', 'Category'],
      ['summary',  'Summary'],
      ['body',     'Body'],
      ['status',   'Status'],
    ].forEach(([key, label]) => {
      if (!String(form[key]).trim()) nextErrors[key] = `${label} is required.`;
    });
    return nextErrors;
  };

  const handleSaveArticle = async (e) => {
    e.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) { setErrors(nextErrors); return; }

    try {
      if (isEditing) {
        await updateArticle(editArticleId, form);
      } else {
        await createArticle(form);
      }
      await loadArticles();
    } catch (error) {
      console.error('Error saving article:', error);
      setApiError(error.response?.data?.message || 'Error saving article. Please try again.');
      return;
    }
    handleClose();
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

  const columns = [
    { field: 'title',    headerName: 'Title',    flex: 2, minWidth: 180 },
    { field: 'author',   headerName: 'Author',   flex: 1, minWidth: 120 },
    { field: 'category', headerName: 'Category', minWidth: 120 },
    { field: 'date',     headerName: 'Date',     minWidth: 110 },
    {
      field: 'status',
      headerName: 'Status',
      width: 110,
      sortable: false,
      renderCell: ({ row }) => {
        const s = statusColors[row.status] ?? statusColors.draft;
        return (
          <Chip
            size="small"
            label={labelize(row.status)}
            sx={{
              bgcolor: s.bg,
              color: s.color,
              border: `1px solid ${s.border}`,
              fontWeight: 600,
              fontSize: '10px',
              letterSpacing: '0.1em',
            }}
          />
        );
      },
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
          <Button
            size="small"
            variant="contained"
            onClick={() => handleDelete(row.id)}
            sx={{
              bgcolor: '#3f3f46',
              color: '#f87171',
              borderRadius: '10px',
              fontSize: '11px',
              boxShadow: 'none',
              '&:hover': { bgcolor: '#52525b', boxShadow: 'none' },
            }}
          >
            Delete
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ bgcolor: '#18181b', minHeight: '100vh', p: { xs: 2, sm: 3 }, width: '100%', maxWidth: '100%', overflow: 'hidden', boxSizing: 'border-box' }}>

      {/* Heading */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Box>
          <Typography sx={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#71717a', mb: 0.5 }}>
            YG Entertainment
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#f4f4f5', textShadow: '0 0 18px #f472b6', letterSpacing: '0.05em' }}>
            ARTICLES
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
          Add Article
        </Button>
      </Box>

      {apiError && (
        <Alert
          severity="error"
          onClose={() => setApiError('')}
          sx={{ mb: 2, bgcolor: '#27272a', color: '#f87171', border: '1px solid #f87171' }}
        >
          {apiError}
        </Alert>
      )}

      {/* Search + Filter */}
      <Box sx={{ borderTop: '2px solid #f472b6', borderBottom: '2px solid #f472b6', py: 3, mb: 3 }}>
        <Typography sx={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#71717a', mb: 2 }}>
          Search & Filter
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} flexWrap="wrap">
          <TextField
            placeholder="Search by title, author, or category…"
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
            label="Category"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            size="small"
            sx={{ flex: 1, minWidth: 150, ...inputSx }}
          >
            <MenuItem value="">All Categories</MenuItem>
            {categories.map((c) => (
              <MenuItem key={c} value={c}>{c}</MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            size="small"
            sx={{ flex: 1, minWidth: 140, ...inputSx }}
          >
            <MenuItem value="">All Status</MenuItem>
            {statuses.map((s) => (
              <MenuItem key={s} value={s}>{labelize(s)}</MenuItem>
            ))}
          </TextField>
          {(search || filterStatus || filterCategory) && (
            <Button
              onClick={() => { setSearch(''); setFilterStatus(''); setFilterCategory(''); }}
              sx={{ color: '#71717a', fontSize: '11px', letterSpacing: '0.15em', '&:hover': { color: '#f472b6' } }}
            >
              Clear
            </Button>
          )}
        </Stack>
      </Box>

      {/* Table */}
      <Paper sx={{ bgcolor: '#27272a', borderRadius: '24px', border: '2px solid #27272a', p: { xs: 1, sm: 2 }, width: '100%', overflow: 'auto' }}>
        {!loading && !filteredArticles.length ? (
          <Alert severity="info" sx={{ bgcolor: '#27272a', color: '#a1a1aa', border: '1px solid #3f3f46' }}>
            No articles match your search or filters.
          </Alert>
        ) : (
          <Box sx={{ height: { xs: 460, sm: 520 }, width: '100%', minWidth: 0 }}>
            <DataGrid
              rows={filteredArticles}
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
        <Box component="form" onSubmit={handleSaveArticle}>

          <DialogTitle
            sx={{
              px: 3, py: 2.5,
              borderBottom: '1px solid #27272a',
              background: 'linear-gradient(to right, rgba(244,114,182,0.12), transparent)',
            }}
          >
            <Typography sx={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#f472b6' }}>
              YG Entertainment
            </Typography>
            <Typography sx={{ color: '#f4f4f5', fontSize: '22px', fontWeight: 700, mt: 0.5 }}>
              {isEditing ? 'Edit Article' : 'Add Article'}
            </Typography>
          </DialogTitle>

          <DialogContent dividers sx={{ px: { xs: 2, sm: 3 }, py: 3, borderColor: '#27272a', bgcolor: '#18181b' }}>
            <Stack spacing={2} sx={{ pt: 1 }}>

              <TextField {...fieldProps('title', 'Title')} sx={inputSx} />

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('author', 'Author')} sx={inputSx} />
                <TextField {...fieldProps('category', 'Category', { select: true })} sx={inputSx}>
                  {categories.map((c) => (
                    <MenuItem key={c} value={c}>{c}</MenuItem>
                  ))}
                </TextField>
              </Stack>

              <TextField
                {...fieldProps('summary', 'Summary', { multiline: true, rows: 2 })}
                sx={inputSx}
              />

              <TextField
                {...fieldProps('body', 'Body', { multiline: true, rows: 6 })}
                sx={inputSx}
              />

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('image', 'Image URL (optional)')} sx={inputSx} />
                <TextField {...fieldProps('status', 'Status', { select: true })} sx={inputSx}>
                  {statuses.map((s) => (
                    <MenuItem key={s} value={s}>{labelize(s)}</MenuItem>
                  ))}
                </TextField>
              </Stack>

            </Stack>
          </DialogContent>

          <DialogActions sx={{ px: 3, py: 2, borderTop: '1px solid #27272a', bgcolor: '#18181b' }}>
            <Button onClick={handleClose} sx={{ color: '#a1a1aa' }}>Cancel</Button>
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

export default DashArticleListPage;