import { Outlet } from 'react-router-dom';
import { AnimatePresence, LayoutGroup } from 'framer-motion';
import { BlogHeader } from './BlogHeader';
import { BlogSidebar } from './BlogSidebar';
import { BlogFooter } from './BlogFooter';
import './blog.css';

export function BlogLayout() {
  return (
    <div className="blog min-h-screen w-full bg-[#0e0e10] text-[#f9f5f8] font-body">
      <BlogHeader />
      <BlogSidebar />
      <main className="lg:ml-64 pt-16 min-h-screen lg:w-[calc(100%-16rem)] w-full">
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
