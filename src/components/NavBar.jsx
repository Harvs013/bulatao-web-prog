import { NavLink, Link } from 'react-router-dom';
import logoblackpink from "../assets/logoblackpink.png";
import Button from './Button';

const links = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Articles', to: '/articles' },
];

const navLinkClassName = ({ isActive }) =>
    [
        'rounded-full border-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition',
        isActive
            ? 'border-zinc-900 bg-pink-500 text-zinc-50'
            : 'border-transparent text-zinc-500 hover:border-zinc-900 hover:bg-pink-300 hover:text-zinc-900',
    ].join(' ');

const NavBar = () => {
    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-zinc-900 bg-black backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">

                {/* Logo */}
                <NavLink to="/" className="flex items-center gap-3">
                    <img src={logoblackpink} alt="Logo" className="h-12 w-auto" />
                </NavLink>

                {/* Navigation Links */}
                <nav className="hidden items-center gap-2 md:flex">
                    {links.map(link => (
                        <NavLink key={link.to} to={link.to} className={navLinkClassName}>
                            {link.label}
                        </NavLink>
                    ))}
                </nav>

                {/* 🔥 ACCESS POINT (NEW) */}
                <div className="flex items-center gap-2">
                    <Button to="/auth/signin" variant="secondary">
                        Sign In
                    </Button>
                    <Button to="/auth/signup" variant="primary">
                        Sign Up
                    </Button>
                </div>

            </div>
        </header>
    );
};

export default NavBar;