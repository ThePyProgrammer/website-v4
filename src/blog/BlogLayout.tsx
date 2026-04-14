import { Outlet } from 'react-router-dom';
import { AnimatePresence, LayoutGroup } from 'framer-motion';
import { BlogHeader } from './BlogHeader';
import { BlogFooter } from './BlogFooter';
import './blog.css';

export function BlogLayout() {
  return (
    <div className="blog min-h-screen w-full bg-[#0e0e10] text-[#f9f5f8] font-body">
      <BlogHeader />
      <main className="pt-16 min-h-screen w-full">
        <LayoutGroup>
          <AnimatePresence mode="wait">
            <Outlet />
          </AnimatePresence>
        </LayoutGroup>
      </main>
      <BlogFooter />
    </div>
  );
}
