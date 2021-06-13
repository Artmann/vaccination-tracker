import React, { FormEvent, ReactElement, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useHistory } from 'react-router';

import 'react-datepicker/dist/react-datepicker.css';

interface FormProps {
  isSubmitting: boolean;
  onSubmit: (numberOfDoses: number, dateTime: Date) => void;
}

export function Form({ onSubmit }: FormProps): ReactElement {
  const [ numberOfDoses, setNumberOfDoses ] = useState(500);
  const [ dateTime, setDateTime ] = useState(new Date());

  const history = useHistory();

  const cancelHandler = (e: FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();

    history.push('/');
  };
  const changeNumberOfDosesHandler = (e: FormEvent<HTMLInputElement>): void => {
    const value = parseInt(e.currentTarget.value, 10);

    if (isNaN(value)) {
      return;
    }

    setNumberOfDoses(
      Math.min(Math.max(1, value), 10000)
    );
  };
  const dateChangeHandler = (date: Date): void => {
    setDateTime(date);
  }
  const submitHandler = (e: FormEvent): void => {
    e.preventDefault();

    onSubmit(numberOfDoses, dateTime);
  }

  return (
    <form onSubmit={ submitHandler } className="px-4 md:px-0">

      <div className="mb-8">
        <label
          className="block mb-4 font-semibold"
          htmlFor="dateTime"
        >
          When was the doses administered?
        </label>

        <DatePicker
          className="border border-gray-300 w-96 px-4 py-2 mb-4"
          dateFormat="yyyy/MM/dd HH:mm:ss"
          id="dateTime"
          onChange={ dateChangeHandler }
          selected={ dateTime }
          placeholderText="2020-12-01 23:00:00"

          showTimeSelect
        />

      </div>

      <div className="mb-8">
        <label
          className="block mb-4 font-semibold"
          htmlFor="numberOfDoses"
        >
          How many doses where administered?
        </label>

        <input
          className="border border-gray-300 w-32 px-4 py-2 mb-4"
          id="numberOfDoses"
          max="10000"
          min="1"
          onChange={ changeNumberOfDosesHandler }
          placeholder="500"
          type="number"
          value={ numberOfDoses }
        />
      </div>

      <div className="mb-8 flex justify-end">
        <button
          className="block cursor-pointer mx-2 bg-white text-center px-6 py-2 shadow-md text-sm"
          onClick={ cancelHandler }
        >
          Cancel
        </button>

        <button
          className="block cursor-pointer mx-2 bg-purplish-blue text-white 6ext-center px-4 py-2 shadow-md text-sm border border-gray-300"
        >
          Save Report
        </button>
      </div>

    </form>
  );
}
