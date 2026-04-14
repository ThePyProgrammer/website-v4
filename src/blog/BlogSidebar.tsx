import { Link } from 'react-router-dom';
import { getCategories } from '@/content/blog';
import { getCategoryColor } from './utils/categoryColors';

export function BlogSidebar() {
  const categories = getCategories();

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-[#131315] hidden lg:flex flex-col pt-8 z-40">
      <div className="px-6 mb-8">
        <h2 className="font-headline text-xs font-bold text-[#00d4fd] tracking-widest uppercase">DIRECTORY_LIST</h2>
        <p className="font-headline text-[10px] text-[#00d4fd]/40">/root/categories</p>
      </div>

      <nav className="flex flex-col flex-1">
        {categories.map(cat => {
          const colors = getCategoryColor(cat);
          return (
            <Link
              key={cat}
              to="/blog/archives"
              className={`flex items-center gap-3 text-xs font-medium px-6 py-4 font-headline transition-all active:translate-x-1 duration-150 ${colors.text} opacity-60 hover:opacity-100 hover:bg-[#262528]/50`}
            >
              [{cat}]
            </Link>
          );
        })}
      </nav>

      <div className="p-6">
        <Link
          to="/blog/archives"
          className="block w-full bg-[#00d4fd]/15 text-[#00d4fd] border border-[#00d4fd]/30 py-3 font-headline font-bold text-xs tracking-widest text-center hover:bg-[#00d4fd]/25 hover:shadow-[0_0_15px_rgba(0,212,253,0.2)] transition-all"
        >
          VIEW_ARCHIVES
        </Link>
      </div>
    </aside>
  );
}
