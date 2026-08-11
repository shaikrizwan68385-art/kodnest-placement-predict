import React, { useState } from 'react';
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import { BrainCircuit, Trophy, Upload, Download, FileSpreadsheet, CheckCircle, Sparkles } from 'lucide-react';
import { MODEL_PERFORMANCE } from '../data/studentsData';

export default function PlacementIntelligencePage() {
  const [activeSubTab, setActiveSubTab] = useState('models');
  const [batchFile, setBatchFile] = useState(null);
  const [batchResults, setBatchResults] = useState(null);

  // Radar chart data structure
  const radarData = [
    { metric: 'Accuracy', ...Object.fromEntries(MODEL_PERFORMANCE.map(m => [m.model, m.accuracy])) },
    { metric: 'Precision', ...Object.fromEntries(MODEL_PERFORMANCE.map(m => [m.model, m.precision])) },
    { metric: 'Recall', ...Object.fromEntries(MODEL_PERFORMANCE.map(m => [m.model, m.recall])) },
    { metric: 'F1 Score', ...Object.fromEntries(MODEL_PERFORMANCE.map(m => [m.model, m.f1])) },
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setBatchFile(file.name);

    setTimeout(() => {
      setBatchResults([
        { id: 'KN_B001', name: 'Aarav Sharma', degree: 78.5, dsa: 82, prediction: 'Placed', prob: 92 },
        { id: 'KN_B002', name: 'Ananya Verma', degree: 62.0, dsa: 45, prediction: 'Not Placed', prob: 38 },
        { id: 'KN_B003', name: 'Rohan Gupta', degree: 81.2, dsa: 74, prediction: 'Placed', prob: 88 },
        { id: 'KN_B004', name: 'Priya Nair', degree: 59.5, dsa: 60, prediction: 'Not Placed', prob: 46 },
        { id: 'KN_B005', name: 'Vikram Singh', degree: 88.0, dsa: 90, prediction: 'Placed', prob: 96 },
      ]);
    }, 500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900/90 via-violet-950/30 to-slate-900/90 border border-slate-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
        <h2 className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-violet-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
          Placement Intelligence & Model Benchmark
        </h2>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          Ensemble model evaluation metrics, multi-dimensional radar comparisons, and batch CSV predictions.
        </p>
      </div>

      {/* Sub Tabs Toggle */}
      <div className="flex items-center gap-2 border-b border-slate-800/80 pb-4">
        <button
          onClick={() => setActiveSubTab('models')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer ${
            activeSubTab === 'models'
              ? 'bg-violet-600/20 text-violet-300 border border-violet-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Trophy className="w-4 h-4 text-violet-400" />
          <span>Model Comparison</span>
        </button>

        <button
          onClick={() => setActiveSubTab('batch')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer ${
            activeSubTab === 'batch'
              ? 'bg-cyan-600/20 text-cyan-300 border border-cyan-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4 text-cyan-400" />
          <span>Batch Predict</span>
        </button>
      </div>

      {/* TAB A: MODEL COMPARISON */}
      {activeSubTab === 'models' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Winner Banner */}
          <div className="bg-gradient-to-r from-violet-950/40 to-slate-900 border border-violet-500/30 rounded-2xl p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center text-violet-300 border border-violet-500/30">
                <Trophy className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="text-xs font-semibold text-violet-300 uppercase tracking-wider">Top Performing Classifier</div>
                <div className="text-lg font-bold text-slate-100">Logistic Regression Classifier</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-400">Peak F1 Score</div>
              <div className="text-xl font-extrabold text-emerald-400">82.05%</div>
            </div>
          </div>

          {/* Model Leaderboard Table */}
          <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
            <h3 className="font-bold text-slate-100 text-base mb-4">6-Model Benchmark Leaderboard</h3>
            <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950/50">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/90 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <th className="py-3 px-4">Model Name</th>
                    <th className="py-3 px-4">Accuracy</th>
                    <th className="py-3 px-4">Precision</th>
                    <th className="py-3 px-4">Recall</th>
                    <th className="py-3 px-4">F1 Score</th>
                    <th className="py-3 px-4">Execution Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-xs">
                  {MODEL_PERFORMANCE.map((m, idx) => (
                    <tr key={idx} className={`hover:bg-slate-900/60 ${m.best ? 'bg-violet-950/20' : ''}`}>
                      <td className="py-3.5 px-4 font-semibold text-slate-200 flex items-center gap-2">
                        {m.best && <span className="text-amber-400 text-xs">🏆</span>}
                        <span>{m.model}</span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300">{m.accuracy.toFixed(1)}%</td>
                      <td className="py-3.5 px-4 text-slate-300">{m.precision.toFixed(1)}%</td>
                      <td className="py-3.5 px-4 text-slate-300">{m.recall.toFixed(1)}%</td>
                      <td className="py-3.5 px-4 font-bold text-emerald-400">{m.f1.toFixed(2)}%</td>
                      <td className="py-3.5 px-4 text-slate-400 font-mono">{m.time}s</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Bar Chart: F1 Score Comparison */}
            <div className="lg:col-span-6 bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
              <h3 className="font-bold text-slate-100 text-base mb-1">F1 Score by Model</h3>
              <p className="text-xs text-slate-400 mb-4">Cross-validation F1 accuracy percentages</p>
              <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={MODEL_PERFORMANCE} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis type="number" domain={[60, 90]} stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                    <YAxis dataKey="model" type="category" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} width={110} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                    <Bar dataKey="f1" name="F1 Score (%)" fill="#7c3aed" radius={[0, 6, 6, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Dark Multi-metric Radar Chart */}
            <div className="lg:col-span-6 bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
              <h3 className="font-bold text-slate-100 text-base mb-1">Multi-metric Radar Benchmark</h3>
              <p className="text-xs text-slate-400 mb-4">Multi-axis comparative performance radar</p>
              <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid stroke="#1e293b" />
                    <PolarAngleAxis dataKey="metric" stroke="#94a3b8" tick={{ fill: '#e2e8f0', fontSize: 11 }} />
                    <PolarRadiusAxis angle={30} domain={[60, 90]} stroke="#475569" tick={{ fill: '#64748b', fontSize: 9 }} />
                    <Radar name="Logistic Reg" dataKey="Logistic Regression" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.2} />
                    <Radar name="SVM" dataKey="SVM" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.15} />
                    <Radar name="Random Forest" dataKey="Random Forest" stroke="#10b981" fill="#10b981" fillOpacity={0.15} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB B: BATCH PREDICT */}
      {activeSubTab === 'batch' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm space-y-4">
            <h3 className="font-bold text-slate-100 text-base">Batch CSV Prediction Uploader</h3>
            <p className="text-xs text-slate-400">
              Upload a bulk CSV file containing student records to compute batch predictions simultaneously.
            </p>

            <div className="border-2 border-dashed border-slate-800 hover:border-cyan-500/50 rounded-2xl p-8 text-center transition-all bg-slate-950/40 relative cursor-pointer">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <Upload className="w-10 h-10 text-cyan-400 mx-auto mb-3" />
              <div className="text-sm font-semibold text-slate-200">
                {batchFile ? `File Selected: ${batchFile}` : 'Drag & drop student CSV file here, or click to browse'}
              </div>
              <div className="text-xs text-slate-500 mt-1">Expected columns: Age, Degree_Percentage, Aptitude_Score, DSA_Score, etc.</div>
            </div>

            {batchResults && (
              <div className="pt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-200">Batch Evaluation Preview (5 Records)</h4>
                  <button className="px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30 flex items-center gap-1.5 cursor-pointer">
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Full Batch CSV</span>
                  </button>
                </div>

                <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950/50">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 bg-slate-900/90 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        <th className="py-3 px-4">Student ID</th>
                        <th className="py-3 px-4">Candidate Name</th>
                        <th className="py-3 px-4">Degree %</th>
                        <th className="py-3 px-4">DSA Score</th>
                        <th className="py-3 px-4">Probability</th>
                        <th className="py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-xs">
                      {batchResults.map((r, idx) => (
                        <tr key={idx}>
                          <td className="py-3 px-4 font-mono text-cyan-400">{r.id}</td>
                          <td className="py-3 px-4 text-slate-200 font-medium">{r.name}</td>
                          <td className="py-3 px-4 text-slate-300">{r.degree}%</td>
                          <td className="py-3 px-4 text-violet-300">{r.dsa}</td>
                          <td className="py-3 px-4 font-bold text-slate-200">{r.prob}%</td>
                          <td className="py-3 px-4">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${r.prediction === 'Placed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'}`}>
                              {r.prediction}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
