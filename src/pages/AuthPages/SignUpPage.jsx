import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { createUser } from '../../service/userService';

const inputClasses =
  'mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-pink-400 focus:bg-zinc-700';

const actionButtonClassName =
  'w-full rounded-xl py-3 text-[11px] tracking-[0.2em]';

const genders = ['male', 'female', 'other'];

const blankForm = {
  firstName: '',
  lastName: '',
  age: '',
  gender: '',
  contactNumber: '',
  email: '',
  username: '',
  password: '',
  address: '',
};

const SignUpPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState(blankForm);
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

    [
      ['firstName', 'First name'],
      ['lastName', 'Last name'],
      ['age', 'Age'],
      ['gender', 'Gender'],
      ['contactNumber', 'Contact number'],
      ['email', 'Email'],
      ['username', 'Username'],
      ['password', 'Password'],
      ['address', 'Address'],
    ].forEach(([key, label]) => {
      if (!String(form[key]).trim()) {
        newErrors[key] = `${label} is required.`;
      }
    });

    if (!newErrors.age && !/^\d+$/.test(form.age.trim())) {
      newErrors.age = 'Age must be a number only.';
    }

    if (!newErrors.contactNumber && !/^\d{11}$/.test(form.contactNumber.trim())) {
      newErrors.contactNumber = 'Contact number must be exactly 11 digits.';
    }

    if (!newErrors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = 'Enter a valid email address.';
    }

    if (!newErrors.password && form.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
    }

    if (!newErrors.username && /\s/.test(form.username)) {
      newErrors.username = 'Username must not contain spaces.';
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
      await createUser({
        ...form,
        type: 'viewer', // public sign-ups are always viewers
      });
      navigate('/auth/signin');
    } catch (err) {
      setApiError(
        err.response?.data?.message || 'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
        Sign Up
      </h1>

      <p className="mt-3 text-sm leading-6 text-zinc-400">
        Create an account to start shopping with us.
      </p>

      {/* API error */}
      {apiError && (
        <div className="mt-4 rounded-xl border border-red-500 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {apiError}
        </div>
      )}

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>

        {/* FIRST + LAST NAME */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="text-sm font-medium text-zinc-300">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="first name"
              autoComplete="given-name"
              className={inputClasses}
              value={form.firstName}
              onChange={handleChange}
            />
            {errors.firstName && (
              <p className="mt-1 text-xs text-red-400">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="text-sm font-medium text-zinc-300">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="last name"
              autoComplete="family-name"
              className={inputClasses}
              value={form.lastName}
              onChange={handleChange}
            />
            {errors.lastName && (
              <p className="mt-1 text-xs text-red-400">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* AGE + GENDER */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="age" className="text-sm font-medium text-zinc-300">
              Age
            </label>
            <input
              id="age"
              type="text"
              placeholder="e.g. 25"
              className={inputClasses}
              value={form.age}
              onChange={handleChange}
            />
            {errors.age && (
              <p className="mt-1 text-xs text-red-400">{errors.age}</p>
            )}
          </div>

          <div>
            <label htmlFor="gender" className="text-sm font-medium text-zinc-300">
              Gender
            </label>
            <select
              id="gender"
              className={inputClasses}
              value={form.gender}
              onChange={handleChange}
            >
              <option value="">Select gender</option>
              {genders.map((g) => (
                <option key={g} value={g}>
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </option>
              ))}
            </select>
            {errors.gender && (
              <p className="mt-1 text-xs text-red-400">{errors.gender}</p>
            )}
          </div>
        </div>

        {/* CONTACT + EMAIL */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="contactNumber" className="text-sm font-medium text-zinc-300">
              Contact Number
            </label>
            <input
              id="contactNumber"
              type="text"
              placeholder="09XXXXXXXXX"
              className={inputClasses}
              value={form.contactNumber}
              onChange={handleChange}
            />
            {errors.contactNumber && (
              <p className="mt-1 text-xs text-red-400">{errors.contactNumber}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="text-sm font-medium text-zinc-300">
              Email
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
        </div>

        {/* USERNAME */}
        <div>
          <label htmlFor="username" className="text-sm font-medium text-zinc-300">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="no spaces allowed"
            autoComplete="username"
            className={inputClasses}
            value={form.username}
            onChange={handleChange}
          />
          {errors.username && (
            <p className="mt-1 text-xs text-red-400">{errors.username}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <label htmlFor="password" className="text-sm font-medium text-zinc-300">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="*********"
            autoComplete="new-password"
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

        {/* ADDRESS */}
        <div>
          <label htmlFor="address" className="text-sm font-medium text-zinc-300">
            Address
          </label>
          <textarea
            id="address"
            placeholder="your full address"
            rows={3}
            className={inputClasses}
            value={form.address}
            onChange={handleChange}
          />
          {errors.address && (
            <p className="mt-1 text-xs text-red-400">{errors.address}</p>
          )}
        </div>

        {/* SUBMIT */}
        <Button
          type="submit"
          variant="primary"
          disabled={loading}
          className={actionButtonClassName}
        >
          {loading ? 'Creating account…' : 'Create Account'}
        </Button>

        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <Button type="button" variant="secondary" className={actionButtonClassName}>
            Sign Up with Google
          </Button>
          <Button type="button" variant="secondary" className={actionButtonClassName}>
            Sign Up with Apple
          </Button>
        </div>
      </form>

      <div className="mt-8 border-t border-zinc-700 pt-6 text-sm text-zinc-400">
        Already have an account?{' '}
        <Link
          to="/auth/signin"
          className="font-semibold text-pink-400 transition hover:text-pink-300"
        >
          Log In
        </Link>
      </div>
    </>
  );
};

export default SignUpPage;