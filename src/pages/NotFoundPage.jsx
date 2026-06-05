import React from 'react';
import Button from '../components/Button';
import logoblackpink from '../assets/logoblackpink.png';

function NotFoundPage() {
  return (
    <div className="flex w-full flex-col gap-6">
      {/* Top Section */}
      <section className="border-y-2 border-zinc-900 bg-zinc-700 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            404 Error
          </p>

          <div className="flex justify-center mb-4">
            <img
              src={logoblackpink}
              alt="Blackpink Logo"
              className="w-32 h-32 object-contain"
            />
          </div>

          <h1 className="text-3xl font-bold text-pink-300 sm:text-4xl">
            Page Not Found
          </h1>

          <p className="mt-3 text-sm text-zinc-300">
            The link you followed might be broken, or the page may have been removed.
          </p>

          <p className="mt-2 font-bold text-xs text-pink-300">
            TRY GOING BACK OR RETURN HOME
          </p>
        </div>
      </section>

      {/* Bottom Section */}
      <section className="border-y-2 border-zinc-900 bg-zinc-700 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <Button to="/articles">Back to Articles</Button>
            <Button to="/">Go Home</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default NotFoundPage;