import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { loginUser } from '../../service/userService';

const inputClasses =
  'mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-pink-400 focus:bg-zinc-700';

const actionButtonClassName =
  'w-full rounded-xl py-3 text-[11px] tracking-[0.2em]';

const SignInPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: '' });
    setApiError('');
  };

  const validate = () => {
    const newErrors = {};
    if (!form.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email address.';
    }
    if (!form.password) {
      newErrors.password = 'Password is required.';
    } else if (form.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      const { data } = await loginUser({ email: form.email, password: form.password });

     
      if (data.type === 'viewer') {
        setApiError('Viewer accounts do not have dashboard access.');
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('firstName', data.firstName);
      localStorage.setItem('type', data.type);

      navigate('/dashboard', {
        state: { firstName: data.firstName, type: data.type },
      });
    } catch (err) {
      setApiError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
        Log In
      </h1>

      <p className="mt-3 text-sm leading-6 text-zinc-400">
        Access your account to explore our exclusive collection.
      </p>

      {/* API error */}
      {apiError && (
        <div className="mt-4 rounded-xl border border-red-500 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {apiError}
        </div>
      )}

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        {/* EMAIL */}
        <div>
          <label className="text-sm font-medium text-zinc-300">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="email@sample.com"
            autoComplete="email"
            className={inputClasses}
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-400">{errors.email}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <label className="text-sm font-medium text-zinc-300">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="*********"
            autoComplete="current-password"
            className={inputClasses}
            value={form.password}
            onChange={handleChange}
          />
          <p className="mt-2 text-xs leading-5 text-zinc-500">
            Must be at least 8 characters.
          </p>
          {errors.password && (
            <p className="mt-1 text-xs text-red-400">{errors.password}</p>
          )}
        </div>

        {/* REMEMBER + FORGOT */}
        <div className="flex items-center justify-between gap-4 text-sm">
          <label className="flex items-center gap-2 text-zinc-400">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-zinc-600 accent-pink-400"
            />
            <span>Remember me</span>
          </label>
          <button
            type="button"
            className="font-medium text-zinc-400 transition hover:text-pink-400"
          >
            Forgot Password?
          </button>
        </div>

        {/* LOGIN BUTTON */}
        <Button
          type="submit"
          variant="primary"
          disabled={loading}
          className={actionButtonClassName}
        >
          {loading ? 'Logging in…' : 'Log In'}
        </Button>

        {/* SOCIAL BUTTONS */}
        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <Button type="button" variant="secondary" className={actionButtonClassName}>
            Log In with Google
          </Button>
          <Button type="button" variant="secondary" className={actionButtonClassName}>
            Log In with Apple
          </Button>
        </div>
      </form>

      <div className="mt-8 border-t border-zinc-700 pt-6 text-sm text-zinc-400">
        No account yet?{' '}
        <Link
          to="/auth/signup"
          className="font-semibold text-pink-400 transition hover:text-pink-300"
        >
          Sign Up
        </Link>
      </div>
    </>
  );
};

export default SignInPage;