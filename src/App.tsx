import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LoadingScreen } from './components/layout/LoadingScreen';
import { CustomCursor } from './components/common/CustomCursor';
import { HomePage } from './pages/HomePage';

export const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const handleLoadingComplete = () => {
    setIsLoaded(true);
  };

  return (
    <BrowserRouter>
      {/* Loading Screen: 2700ms 000-100 counter, rotating words in Instrument Serif, blue progress bar */}
      <LoadingScreen onComplete={handleLoadingComplete} />

      {/* Subtle dual Custom Cursor (desktop only, disabled on touch & reduced-motion) */}
      <CustomCursor />

      <div className="min-h-screen bg-bg text-text flex flex-col font-sans selection:bg-[#89AACC]/20 selection:text-text">
        {/* Floating Pill Navbar with Active Spy */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 w-full">
          <Routes>
            <Route path="/" element={<HomePage isLoaded={isLoaded} />} />
          </Routes>
        </main>

        {/* Upgraded Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
