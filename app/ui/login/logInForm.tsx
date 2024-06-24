'use client'

import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/lib/actions';

export  function Login (){
  const [errorMessage, dispatch] = useFormState(authenticate,undefined);
  const { pending } = useFormStatus();
  
  return (
    <div className="flex justify-center items-center  bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form className="space-y-6" action={dispatch}>
          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              minLength={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-gray-900 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            aria-disabled={pending}
          >
            Log in
          </button>
        
         <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
         {errorMessage && (
          <>
            <p className="text-sm text-red-500">{errorMessage}</p>
          </>
         )}
      </div>
        </form>
      </div>
    </div>
  );
};