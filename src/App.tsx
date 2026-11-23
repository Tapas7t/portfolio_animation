import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CustomCursor } from './components/common/CustomCursor';
import { HomePage } from './pages/HomePage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      {/* Subtle dual Custom Cursor (desktop only, disabled on touch & reduced-motion) */}
      <CustomCursor />

      <div className="min-h-screen bg-bg text-text flex flex-col font-sans selection:bg-[#89AACC]/20 selection:text-text">
        {/* Floating Pill Navbar with Active Spy */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 w-full">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>

        {/* Upgraded Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
