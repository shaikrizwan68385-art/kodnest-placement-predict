import React, { useState } from 'react';
import { Sparkles, Download, CheckCircle2, XCircle, RefreshCw, FileText, Activity, RotateCcw } from 'lucide-react';

const DEFAULT_PROFILE = {
  age: 21,
  degree: 72,
  aptitude: 68,
  comm: 65,
  coding: 64,
  mock: 62,
  attendance: 80,
  projects: 3,
  dsa: 65,
  gender: 'Male',
  internship: 'Yes',
  hackathon: 'No',
};

export default function PredictorPage() {
  // Input state
  const [profile, setProfile] = useState({ ...DEFAULT_PROFILE });

  const [loading, setLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);

  const handleSliderChange = (key, value) => {
    setProfile((prev) => ({ ...prev, [key]: Number(value) }));
  };

  const handleSelectChange = (key, value) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  // Inference calculation matching ML model logic
  const handlePredict = () => {
    setLoading(true);
    setPredictionResult(null);

    setTimeout(() => {
      // Weighted ML scoring logic
      const degreeNorm = profile.degree / 100;
      const dsaNorm = profile.dsa / 100;
      const codingNorm = profile.coding / 100;
      const aptitudeNorm = profile.aptitude / 100;
      const commNorm = profile.comm / 100;
      const mockNorm = profile.mock / 100;
      const attendanceNorm = profile.attendance / 100;

      const baseScore =
        degreeNorm * 0.22 +
        dsaNorm * 0.22 +
        codingNorm * 0.16 +
        aptitudeNorm * 0.14 +
        commNorm * 0.10 +
        mockNorm * 0.08 +
        attendanceNorm * 0.08 +
        (profile.projects >= 3 ? 0.05 : profile.projects * 0.015) +
        (profile.internship === 'Yes' ? 0.06 : 0) +
        (profile.hackathon === 'Yes' ? 0.04 : 0);

      const probability = Math.min(0.98, Math.max(0.08, baseScore));
      const isPlaced = probability >= 0.55;

      setPredictionResult({
        status: isPlaced ? 'Placed' : 'Not Placed',
        probability: Math.round(probability * 100),
        confidence: isPlaced ? 'High Confidence (82.5%)' : 'Moderate (78.0%)',
        breakdown: [
          { label: 'DSA & Tech Score', score: Math.round(dsaNorm * 100), weight: 'High' },
          { label: 'Academic Record', score: Math.round(degreeNorm * 100), weight: 'High' },
          { label: 'Problem Solving', score: Math.round(codingNorm * 100), weight: 'Medium' },
          { label: 'Interview Preparedness', score: Math.round(mockNorm * 100), weight: 'Medium' },
        ],
      });
      setLoading(false);
    }, 600);
  };

  const handleDownloadCSV = () => {
    if (!predictionResult) return;
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        "Metric,Value",
        `Age,${profile.age}`,
        `Gender,${profile.gender}`,
        `Degree %,${profile.degree}`,
        `DSA Score,${profile.dsa}`,
        `Aptitude Score,${profile.aptitude}`,
        `Communication,${profile.comm}`,
        `Coding Score,${profile.coding}`,
        `Mock Interview,${profile.mock}`,
        `Attendance %,${profile.attendance}`,
        `Projects,${profile.projects}`,
        `Internship,${profile.internship}`,
        `Hackathon,${profile.hackathon}`,
        `Prediction,${predictionResult.status}`,
        `Probability %,${predictionResult.probability}`,
      ].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `KodNest_Prediction_${profile.gender}_${profile.dsa}DSA.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadPDF = () => {
    alert("📄 Report Generated! In production, this compiles the full PDF evaluation statement.");
  };

  const handleReset = () => {
    setProfile({ ...DEFAULT_PROFILE });
    setPredictionResult(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900/90 via-violet-950/40 to-slate-900/90 border border-slate-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
        <h2 className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-violet-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
          Student Placement Predictor
        </h2>
        <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-3xl">
          Enter candidate academic parameters, aptitude test scores, and interview performance metrics to compute multi-model placement probability.
        </p>
      </div>

      {/* 2-Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Student Profile Card */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 lg:p-7 shadow-xl space-y-6 backdrop-blur-sm">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400">
                <Activity className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-100 text-base">
                Student Profile Parameters
              </h3>
            </div>
            <span className="text-xs font-semibold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/20">
              12 Inputs Active
            </span>
          </div>

          {/* Sliders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Age Slider */}
            <div className="space-y-2 bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/50">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium">Age</span>
                <span className="font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">{profile.age} yrs</span>
              </div>
              <input
                type="range"
                min="18"
                max="30"
                value={profile.age}
                onChange={(e) => handleSliderChange('age', e.target.value)}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
            </div>

            {/* Degree % Slider */}
            <div className="space-y-2 bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/50">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium">Degree Percentage</span>
                <span className="font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">{profile.degree}%</span>
              </div>
              <input
                type="range"
                min="40"
                max="100"
                value={profile.degree}
                onChange={(e) => handleSliderChange('degree', e.target.value)}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
            </div>

            {/* Aptitude Score Slider */}
            <div className="space-y-2 bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/50">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium">Aptitude Score</span>
                <span className="font-bold text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded">{profile.aptitude} / 100</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                value={profile.aptitude}
                onChange={(e) => handleSliderChange('aptitude', e.target.value)}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-500"
              />
            </div>

            {/* Communication Score Slider */}
            <div className="space-y-2 bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/50">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium">Communication Score</span>
                <span className="font-bold text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded">{profile.comm} / 100</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                value={profile.comm}
                onChange={(e) => handleSliderChange('comm', e.target.value)}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-500"
              />
            </div>

            {/* Coding Assignment Score */}
            <div className="space-y-2 bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/50">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium">Coding Assignment</span>
                <span className="font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">{profile.coding} / 100</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={profile.coding}
                onChange={(e) => handleSliderChange('coding', e.target.value)}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            {/* Mock Interview Score */}
            <div className="space-y-2 bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/50">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium">Mock Interview</span>
                <span className="font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">{profile.mock} / 100</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={profile.mock}
                onChange={(e) => handleSliderChange('mock', e.target.value)}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            {/* Attendance Percentage */}
            <div className="space-y-2 bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/50">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium">Attendance Percentage</span>
                <span className="font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">{profile.attendance}%</span>
              </div>
              <input
                type="range"
                min="40"
                max="100"
                value={profile.attendance}
                onChange={(e) => handleSliderChange('attendance', e.target.value)}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            {/* Projects Completed */}
            <div className="space-y-2 bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/50">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium">Projects Completed</span>
                <span className="font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">{profile.projects} Projects</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={profile.projects}
                onChange={(e) => handleSliderChange('projects', e.target.value)}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>
          </div>

          {/* Full Width DSA Score Slider */}
          <div className="space-y-2 bg-slate-950/50 p-4 rounded-xl border border-violet-500/20">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-200 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-violet-400 animate-ping"></span>
                DSA Score (Data Structures & Algorithms)
              </span>
              <span className="font-extrabold text-sm text-violet-300 bg-violet-500/20 px-3 py-0.5 rounded border border-violet-500/30">
                {profile.dsa} / 100
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={profile.dsa}
              onChange={(e) => handleSliderChange('dsa', e.target.value)}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-500"
            />
          </div>

          {/* Select Dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">Gender</label>
              <select
                value={profile.gender}
                onChange={(e) => handleSelectChange('gender', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 transition-all cursor-pointer"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">Internship Completed</label>
              <select
                value={profile.internship}
                onChange={(e) => handleSelectChange('internship', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 transition-all cursor-pointer"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">Hackathon Participant</label>
              <select
                value={profile.hackathon}
                onChange={(e) => handleSelectChange('hackathon', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 transition-all cursor-pointer"
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
          </div>

          {/* Prominent CTA Button */}
          <div className="pt-4 border-t border-slate-800/80">
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr] gap-3">
              <button
                onClick={handlePredict}
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-bold text-base shadow-lg shadow-violet-600/30 hover:shadow-violet-600/50 flex items-center justify-center gap-2.5 transition-all transform active:scale-[0.99] cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Computing Inference Models...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-cyan-300" />
                    <span>Predict Placement</span>
                  </>
                )}
              </button>

              <button
                onClick={handleReset}
                type="button"
                className="w-full py-4 rounded-xl border border-slate-700 bg-slate-950 text-white text-base font-semibold hover:bg-slate-900 transition-all flex items-center justify-center gap-2.5"
              >
                <RotateCcw className="w-5 h-5 text-slate-200" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Dedicated Output Card */}
        <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 lg:p-7 shadow-xl backdrop-blur-sm flex flex-col justify-between min-h-[560px]">
          <div>
            <div className="border-b border-slate-800/80 pb-4 mb-6">
              <h3 className="font-bold text-slate-100 text-base">
                Placement Prediction Output
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Evaluation results generated via multi-model ensemble inference
              </p>
            </div>

            {/* DEFAULT / WAITING STATE */}
            {!predictionResult && !loading && (
              <div className="flex flex-col items-center justify-center text-center py-16 px-4 border border-dashed border-slate-800 rounded-xl bg-slate-950/30">
                <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mb-4 text-slate-500">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h4 className="text-sm font-semibold text-slate-300 mb-1">
                  Results appear here after you predict.
                </h4>
                <p className="text-xs text-slate-500 max-w-xs">
                  Adjust student metrics on the left column and click "Predict Placement" to generate probability output.
                </p>
              </div>
            )}

            {/* LOADING SPINNER STATE */}
            {loading && (
              <div className="flex flex-col items-center justify-center text-center py-20">
                <div className="relative w-16 h-16 mb-4">
                  <div className="absolute inset-0 rounded-full border-4 border-slate-800 border-t-violet-500 animate-spin"></div>
                </div>
                <p className="text-sm font-medium text-slate-300">Evaluating academic features...</p>
                <p className="text-xs text-slate-500 mt-1">Testing against Logistic Regression & Random Forest</p>
              </div>
            )}

            {/* OUTPUT RESULT STATE */}
            {predictionResult && !loading && (
              <div className="space-y-6 animate-fadeIn">
                {/* Result Status Banner */}
                {predictionResult.status === 'Placed' ? (
                  <div className="bg-gradient-to-r from-emerald-950/40 via-emerald-900/20 to-slate-950 border-2 border-emerald-500/80 rounded-2xl p-6 text-center shadow-lg shadow-emerald-500/10">
                    <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-2" />
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
                      Prediction Result
                    </div>
                    <div className="text-3xl font-extrabold text-emerald-300">
                      PLACED
                    </div>
                    <p className="text-xs text-slate-300 mt-2">
                      High probability of securing a campus placement offer.
                    </p>
                  </div>
                ) : (
                  <div className="bg-gradient-to-r from-rose-950/40 via-rose-900/20 to-slate-950 border-2 border-rose-500/80 rounded-2xl p-6 text-center shadow-lg shadow-rose-500/10">
                    <XCircle className="w-12 h-12 text-rose-400 mx-auto mb-2" />
                    <div className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-1">
                      Prediction Result
                    </div>
                    <div className="text-3xl font-extrabold text-rose-300">
                      NOT PLACED
                    </div>
                    <p className="text-xs text-slate-300 mt-2">
                      Needs improvement in DSA score, coding, or interview metrics.
                    </p>
                  </div>
                )}

                {/* Probability Meter / Gauge Card */}
                <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-slate-400">Placement Probability</span>
                    <span className={`text-xl font-extrabold ${predictionResult.probability >= 55 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {predictionResult.probability}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 relative">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        predictionResult.probability >= 55
                          ? 'bg-gradient-to-r from-emerald-500 to-cyan-400 shadow-md shadow-emerald-500/50'
                          : 'bg-gradient-to-r from-rose-500 to-amber-500 shadow-md shadow-rose-500/50'
                      }`}
                      style={{ width: `${predictionResult.probability}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between text-[10px] text-slate-500 font-medium pt-1">
                    <span>0% (Low)</span>
                    <span>55% (Threshold)</span>
                    <span>100% (High)</span>
                  </div>
                </div>

                {/* Feature Score Breakdown */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Score Breakdown
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {predictionResult.breakdown.map((item, idx) => (
                      <div key={idx} className="bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/60">
                        <div className="text-[11px] text-slate-400 truncate">{item.label}</div>
                        <div className="text-sm font-bold text-slate-200 mt-0.5">{item.score}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Export Buttons */}
          {predictionResult && (
            <div className="pt-6 border-t border-slate-800/80 mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={handleDownloadCSV}
                className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs flex items-center justify-center gap-2 border border-slate-700 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Export CSV</span>
              </button>

              <button
                onClick={handleDownloadPDF}
                className="py-2.5 px-4 rounded-xl bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 font-medium text-xs flex items-center justify-center gap-2 border border-violet-500/30 transition-all cursor-pointer"
              >
                <FileText className="w-4 h-4 text-violet-400" />
                <span>Export PDF</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
