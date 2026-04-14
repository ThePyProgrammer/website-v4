import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'articles', path: '/blog/archives' },
  { label: 'ai', path: 'https://ai.prannay.dev', external: true },
];

export function BlogHeader() {
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#0e0e10] z-50 flex justify-between items-center px-8">
      <div className="flex items-center gap-6">
        <Link to="/" className="text-xl font-extrabold text-[#00d4fd] drop-shadow-[0_0_8px_rgba(0,212,253,0.4)] font-headline tracking-tighter uppercase underline underline-offset-4 decoration-2">
          [prannay.dev]
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(({ label, path, external }) => {
            const isActive = !external && location.pathname === path;
            const className = `font-headline tracking-tighter uppercase text-sm transition-all duration-300 px-2 py-1 ${
              isActive
                ? 'text-[#00d4fd] border-b-2 border-[#00d4fd] pb-1'
                : 'text-[#00d4fd]/60 hover:text-[#00d4fd] hover:bg-[#00d4fd]/10'
            }`;
            return external ? (
              <a key={path} href={path} className={className}>[ {label} ]</a>
            ) : (
              <Link key={path} to={path} className={className}>[ {label} ]</Link>
            );
          })}
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden lg:flex items-center bg-[#1f1f22] px-3 py-1 text-[#00d4fd] text-[10px] font-mono">
          SYS_STATUS: OPTIMAL
        </div>
      </div>
    </header>
  );
}
