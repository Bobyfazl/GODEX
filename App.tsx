
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { Providers, useLenis } from './app/providers';
import { AuthProvider } from './context/AuthContext';

// Eager Load Critical Pages
import { Home } from './components/Home';
import { FeaturesPage } from './pages/FeaturesPage';
import { FeatureDetailPage } from './pages/FeatureDetailPage';
import { UseCasesPage } from './pages/UseCasesPage';
import { UseCaseDetailPage } from './pages/UseCaseDetailPage';
import { CreatorProfilePage } from './pages/CreatorProfilePage';
import { DemoSection } from './components/DemoSection';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { AuthPage } from './pages/AuthPage';
import { ConsolePage } from './pages/ConsolePage';
import { PricingPage } from './pages/PricingPage'; // NEW IMPORT
import { PlanDetailPage } from './pages/PlanDetailPage';

const { HashRouter: Router, Routes, Route, useLocation } = ReactRouterDOM as any;

const LayoutContent: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const location = useLocation();
  const lenis = useLenis();

  // Determine if we are on the Auth page to conditionally hide Navbar/Footer
  const isAuthPage = location.pathname === '/auth';

  React.useEffect(() => {
    // Check if there is a hash or query param indicating a specific section
    // If so, do NOT force scroll to top, let the page specific logic handle it
    if (location.search.includes('section=')) return;

    if (lenis) {
        lenis.scrollTo(0, { immediate: true });
    } else {
        window.scrollTo(0, 0);
    }
  }, [location.pathname, location.search, lenis]);
  
  return (
    <div className="min-h-[100dvh] w-full relative overflow-x-hidden text-slate-900 dark:text-white font-['Vazirmatn'] selection:bg-indigo-500/30">
      <div className="relative z-10 flex flex-col min-h-[100dvh]">
        
        {!isAuthPage && <Navbar />}
        
        {/* Main Content Area */}
        <main 
            key={location.pathname} 
            className="flex-1"
        >
            {children}
            {!isAuthPage && <Footer />}
        </main>

        {!isAuthPage && <BackToTop />}
      </div>
    </div>
  );
};

const DemoPageWrapper: React.FC = () => (
  <div className="pt-24">
    <DemoSection />
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
        <Providers>
            <AuthProvider>
                <LayoutContent>
                    <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/features" element={<FeaturesPage />} />
                    <Route path="/features/:id" element={<FeatureDetailPage />} />
                    <Route path="/use-cases" element={<UseCasesPage />} />
                    <Route path="/use-cases/:id" element={<UseCaseDetailPage />} />
                    <Route path="/demo" element={<DemoPageWrapper />} />
                    <Route path="/pricing" element={<PricingPage />} /> {/* NEW MAIN PRICING ROUTE */}
                    <Route path="/pricing/:id" element={<PlanDetailPage />} />
                    <Route path="/about" element={<CreatorProfilePage />} />
                    <Route path="/privacy" element={<PrivacyPage />} />
                    <Route path="/terms" element={<TermsPage />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/console" element={<ConsolePage />} />
                    </Routes>
                </LayoutContent>
            </AuthProvider>
        </Providers>
    </Router>
  );
};

export default App;
