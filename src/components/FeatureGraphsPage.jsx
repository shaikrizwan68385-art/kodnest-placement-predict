import React from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ScatterChart, Scatter, ZAxis
} from 'recharts';
import { Users, CheckCircle, XCircle, TrendingUp, Code2, GraduationCap } from 'lucide-react';
import { INITIAL_STUDENTS } from '../data/studentsData';

export default function FeatureGraphsPage() {
  // Aggregate KPI stats
  const total = INITIAL_STUDENTS.length;
  const placed = INITIAL_STUDENTS.filter((s) => s.status === 'Placed').length;
  const notPlaced = total - placed;
  const placementRate = ((placed / total) * 100).toFixed(1);
  const avgDsa = (INITIAL_STUDENTS.reduce((sum, s) => sum + s.dsa, 0) / total).toFixed(1);
  const avgDegree = (INITIAL_STUDENTS.reduce((sum, s) => sum + s.degree, 0) / total).toFixed(1);

  // Pie chart data
  const pieData = [
    { name: 'Placed', value: placed, color: '#10b981' },
    { name: 'Not Placed', value: notPlaced, color: '#ef4444' },
  ];

  // Grouped Bar chart data: Placed vs Not Placed averages
  const placedStudents = INITIAL_STUDENTS.filter((s) => s.status === 'Placed');
  const notPlacedStudents = INITIAL_STUDENTS.filter((s) => s.status === 'Not Placed');

  const calcMean = (arr, key) => (arr.reduce((sum, s) => sum + s[key], 0) / (arr.length || 1)).toFixed(1);

  const featureCompareData = [
    { feature: 'Degree %', Placed: calcMean(placedStudents, 'degree'), NotPlaced: calcMean(notPlacedStudents, 'degree') },
    { feature: 'DSA Score', Placed: calcMean(placedStudents, 'dsa'), NotPlaced: calcMean(notPlacedStudents, 'dsa') },
    { feature: 'Coding', Placed: calcMean(placedStudents, 'coding'), NotPlaced: calcMean(notPlacedStudents, 'coding') },
    { feature: 'Aptitude', Placed: calcMean(placedStudents, 'aptitude'), NotPlaced: calcMean(notPlacedStudents, 'aptitude') },
    { feature: 'Mock IV', Placed: calcMean(placedStudents, 'mock'), NotPlaced: calcMean(notPlacedStudents, 'mock') },
    { feature: 'Comm.', Placed: calcMean(placedStudents, 'comm'), NotPlaced: calcMean(notPlacedStudents, 'comm') },
  ];

  // Histogram bins for Aptitude Score
  const aptitudeBins = [
    { range: '20-35', count: INITIAL_STUDENTS.filter((s) => s.aptitude >= 20 && s.aptitude < 35).length },
    { range: '35-50', count: INITIAL_STUDENTS.filter((s) => s.aptitude >= 35 && s.aptitude < 50).length },
    { range: '50-65', count: INITIAL_STUDENTS.filter((s) => s.aptitude >= 50 && s.aptitude < 65).length },
    { range: '65-80', count: INITIAL_STUDENTS.filter((s) => s.aptitude >= 65 && s.aptitude < 80).length },
    { range: '80-100', count: INITIAL_STUDENTS.filter((s) => s.aptitude >= 80).length },
  ];

  // Scatter plot data sample
  const scatterSample = INITIAL_STUDENTS.slice(0, 150).map((s) => ({
    x: s.dsa,
    y: s.degree,
    status: s.status,
  }));

  const scatterPlaced = scatterSample.filter((s) => s.status === 'Placed');
  const scatterNotPlaced = scatterSample.filter((s) => s.status === 'Not Placed');

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-slate-900/90 via-cyan-950/30 to-slate-900/90 border border-slate-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
        <h2 className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-cyan-400 via-indigo-300 to-violet-400 bg-clip-text text-transparent">
          Feature Graphs & Student Analytics
        </h2>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          Comprehensive data distribution, placement correlations, and key performance metric breakdowns.
        </p>
      </div>

      {/* Top Stat Summary Cards (Horizontal Grid) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Students */}
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 shadow-lg hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Students</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-extrabold text-slate-100">{total.toLocaleString()}</div>
          <div className="text-[10px] text-slate-500 mt-1">Candidate count</div>
        </div>

        {/* Placed */}
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 shadow-lg hover:border-emerald-500/30 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Placed</span>
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-400">{placed.toLocaleString()}</div>
          <div className="text-[10px] text-slate-500 mt-1">Confirmed offers</div>
        </div>

        {/* Not Placed */}
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 shadow-lg hover:border-rose-500/30 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Not Placed</span>
            <XCircle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-extrabold text-rose-400">{notPlaced.toLocaleString()}</div>
          <div className="text-[10px] text-slate-500 mt-1">Improvement required</div>
        </div>

        {/* Placement Rate */}
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 shadow-lg hover:border-violet-500/30 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Placement Rate</span>
            <TrendingUp className="w-4 h-4 text-violet-400" />
          </div>
          <div className="text-2xl font-extrabold text-violet-400">{placementRate}%</div>
          <div className="text-[10px] text-slate-500 mt-1">Success ratio</div>
        </div>
      </div>

      {/* Chart Grid Section 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Donut / Pie Chart */}
        <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-100 text-base mb-1">
              Placement Status Distribution
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Overall proportion of placed versus non-placed candidates
            </p>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Grouped Bar Chart: Average Features */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
          <h3 className="font-bold text-slate-100 text-base mb-1">
            Average Skill Feature Comparison
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Comparison of mean scores between Placed and Not Placed cohorts
          </p>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={featureCompareData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="feature" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
                <Legend />
                <Bar dataKey="Placed" fill="#10b981" radius={[6, 6, 0, 0]} />
                <Bar dataKey="NotPlaced" name="Not Placed" fill="#ef4444" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Chart Grid Section 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Histogram / Bar Distribution */}
        <div className="lg:col-span-6 bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
          <h3 className="font-bold text-slate-100 text-base mb-1">
            Aptitude Score Distribution
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Candidate frequency across standardized aptitude ranges
          </p>
          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={aptitudeBins} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="range" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="count" name="Students" fill="#06b6d4" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Scatter Plot: DSA vs Degree % */}
        <div className="lg:col-span-6 bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
          <h3 className="font-bold text-slate-100 text-base mb-1">
            DSA Score vs. Degree Percentage
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            2D Correlation plot highlighting placement clusters (sample of 150)
          </p>
          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis type="number" dataKey="x" name="DSA Score" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} domain={[0, 100]} />
                <YAxis type="number" dataKey="y" name="Degree %" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} domain={[40, 100]} />
                <ZAxis range={[50, 50]} />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
                <Legend />
                <Scatter name="Placed" data={scatterPlaced} fill="#10b981" />
                <Scatter name="Not Placed" data={scatterNotPlaced} fill="#ef4444" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
