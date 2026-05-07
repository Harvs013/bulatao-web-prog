import { Outlet } from 'react-router-dom';
import blackpinkcover from '../../assets/blackpinkcover.jpg';

const AuthLayout = () => {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:block border-r-2 border-zinc-900 bg-pink-300">
        <img 
          src={blackpinkcover} 
          alt="BLACKPINK" 
          className="h-full w-full object-contain border-2 border-zinc-900 p-4"
        />
      </div>
      <div className="flex items-center justify-center bg-zinc-900 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;