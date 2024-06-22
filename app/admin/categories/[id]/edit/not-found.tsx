import Link from 'next/link';
import { FaceFrownIcon } from '@heroicons/react/24/outline';
 
export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2">
      <FaceFrownIcon className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>No se pudo encontrar la categoría indicada.</p>
      <Link
        href="/admin/categories"
        className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      >
        Go Back
      </Link>
    </div>
  );
}