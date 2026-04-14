import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

const BlogLayout = lazy(() => import('./blog/BlogLayout').then(m => ({ default: m.BlogLayout })));
const BlogHome = lazy(() => import('./blog/pages/BlogHome').then(m => ({ default: m.BlogHome })));
const BlogArticle = lazy(() => import('./blog/pages/BlogArticle').then(m => ({ default: m.BlogArticle })));
const BlogArchives = lazy(() => import('./blog/pages/BlogArchives').then(m => ({ default: m.BlogArchives })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/about',
    element: (
      <Suspense fallback={<div className="min-h-screen bg-[#0e0e10]" />}>
        <About />
      </Suspense>
    ),
  },
  {
    path: '/blog',
    element: (
      <Suspense fallback={<div className="min-h-screen bg-[#0e0e10]" />}>
        <BlogLayout />
      </Suspense>
    ),
    children: [
      { index: true, element: <Suspense fallback={null}><BlogHome /></Suspense> },
      { path: ':slug', element: <Suspense fallback={null}><BlogArticle /></Suspense> },
      { path: 'archives', element: <Suspense fallback={null}><BlogArchives /></Suspense> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
