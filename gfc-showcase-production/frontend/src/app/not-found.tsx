import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <div className="text-6xl font-black gradient-text mb-4">404</div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-3">This page could not be found</h1>
        <p className="text-gray-400 mb-8">
          The page you are trying to open does not exist or the URL is incorrect.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="gfc-gradient-bg text-black px-6 py-3 rounded-xl font-bold">
            Go Home
          </Link>
          <Link href="/products" className="border border-white/20 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/5 transition-colors">
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}