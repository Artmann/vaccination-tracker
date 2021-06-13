import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

export function EmptyState(): ReactElement {
  return (
    <div className="mx-auto flex flex-col items-center text-center pt-16">
      <h2 className="text-2xl mb-16">
        Welcome to the Vaccination Tracker. 😊
      </h2>

      <div className="text-lg mb-16">
        Get started by adding your first report!
      </div>

      <div className="mb-8">
        <Link
          className="bg-purplish-blue text-white no-underline text-center px-12 py-3 shadow-md cursor-pointer"
          to="/report"
        >
          Add a Report
        </Link>
      </div>
    </div>
  );
}
