import { createBrowserRouter, Outlet, ScrollRestoration } from 'react-router'
import { SiteProvider } from '@/components/layout/Site'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Preloader } from '@/components/layout/Preloader'
import Home from '@/routes/Home'

function RootLayout() {
  return (
    <SiteProvider>
      <a href="#main" className="skip">Pular para o conteúdo</a>
      <Preloader />
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </SiteProvider>
  )
}

// Home is eager (LCP path); every other route is a lazy chunk (SITE_ARCHITECTURE → Sitemap).
export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    HydrateFallback: () => null,
    children: [
      { index: true, element: <Home /> },
      { path: 'projetos', lazy: async () => ({ Component: (await import('@/routes/Projects')).default }) },
      { path: 'projetos/:slug', lazy: async () => ({ Component: (await import('@/routes/Project')).default }) },
      { path: 'estudio', lazy: async () => ({ Component: (await import('@/routes/Studio')).default }) },
      { path: 'contato', lazy: async () => ({ Component: (await import('@/routes/Pages')).Contact }) },
      { path: 'creditos', lazy: async () => ({ Component: (await import('@/routes/Pages')).Credits }) },
      { path: 'privacidade', lazy: async () => ({ Component: (await import('@/routes/Pages')).Privacy }) },
      { path: '*', lazy: async () => ({ Component: (await import('@/routes/NotFound')).default }) },
    ],
  },
])
