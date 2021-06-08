import React, { ReactElement } from 'react';

interface PageProps {
  children: ReactElement | ReactElement[] | string;
  title: string;

  headerText?: string;
}

export function Page({ children, headerText, title }: PageProps): ReactElement {
  const HeaderText = (): ReactElement | null => {
    if (!headerText) {
      return null;
    }

    return (
      <p className="text-gray-300 text-sm mt-2">
        { headerText }
      </p>
    );
  }

  return (
    <div className="w-full h-screen overflow-hidden bg-purplish-blue leading-7 pt-2">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-white font-semibold text-lg">
          { title }
        </h1>

        <HeaderText />
      </div>

      <div className="overflow-x-auto h-full bg-white text-gray-700 rounded-t-xl md:rounded-none">
        <div className="container mx-auto px-4 py-8">
          { children }
        </div>
      </div>
    </div>
  );
}
