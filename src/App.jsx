import React, { useState } from 'react';
import Navbar from './components/Navbar';
import PredictorPage from './components/PredictorPage';
import FeatureGraphsPage from './components/FeatureGraphsPage';
import AllStudentsPage from './components/AllStudentsPage';
import PlacementIntelligencePage from './components/PlacementIntelligencePage';

export default function App() {
  const [activeTab, setActiveTab] = useState('predict');

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans antialiased">
      {/* 1. TOP NAVIGATION / HEADER */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'predict' && <PredictorPage />}
        {activeTab === 'features' && <FeatureGraphsPage />}
        {activeTab === 'students' && <AllStudentsPage />}
        {activeTab === 'intelligence' && <PlacementIntelligencePage />}
      </main>

      {/* Clean Modern Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">KodNest</span>
            <span>· Student Placement Prediction System v2.4</span>
          </div>
          <div>
            Built with React, Tailwind CSS, Recharts & ML Ensemble
          </div>
        </div>
      </footer>
    </div>
  );
}
