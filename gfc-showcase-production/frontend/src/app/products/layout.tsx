import Link from 'next/link';

export const metadata = {
  title: 'All Products | GFC Showcase',
  description: 'Browse all GFC products - ceiling fans, air coolers, and washing machines',
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/90 to-transparent backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-2xl text-black"
              style={{ background: 'linear-gradient(135deg, rgb(186, 118, 58) 0%, rgb(250, 248, 179) 50%, rgb(193, 128, 64) 100%)' }}>
              G
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-lg">GFC</span>
              <span className="text-xs text-gray-400 block -mt-1">Pakistan</span>
            </div>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/experience/fans" className="hover:text-gfc-300 transition-colors text-sm sm:text-base">Fans</Link>
            <Link href="/experience/coolers" className="hover:text-gfc-300 transition-colors text-sm sm:text-base">Coolers</Link>
            <Link href="/experience/washing-machines" className="hover:text-gfc-300 transition-colors text-sm sm:text-base">Washers</Link>
            <Link href="/" className="border border-white/20 text-white px-4 py-2 rounded-lg font-semibold hover:bg-white/5 transition-all text-sm sm:text-base">
              Home
            </Link>
          </div>
        </div>
      </nav>
      
      <main className="pt-24">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">© 2026 GFC Pakistan. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-500 hover:text-gfc-500 transition-colors">Home</Link>
            <a href="https://www.gfcfans.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gfc-500 transition-colors">Official Site</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
