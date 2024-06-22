'use client';
 
import { useEffect } from 'react';
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
 
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h1 className="text-2xl font-bold py-4">Algo salió mal :(</h1>
      <button
        className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        onClick={
          () => reset()
        }
      >
        Reintentar
      </button>
    </main>
  );
}