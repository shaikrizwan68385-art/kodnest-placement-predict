import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { INITIAL_STUDENTS } from '../data/studentsData';

export default function AllStudentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 15;

  // Filter students based on search term & status dropdown
  const filteredStudents = useMemo(() => {
    return INITIAL_STUDENTS.filter((student) => {
      const matchesSearch =
        student.id.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
        student.gender.toLowerCase().includes(searchTerm.toLowerCase().trim());
      const matchesStatus =
        statusFilter === 'All' || student.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  // Pagination logic
  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / rowsPerPage));
  const paginatedStudents = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredStudents.slice(start, start + rowsPerPage);
  }, [filteredStudents, currentPage]);

  const handleDownloadCSV = () => {
    const headers = [
      'Student ID', 'Age', 'Gender', 'Degree %', 'DSA Score',
      'Aptitude Score', 'Communication Score', 'Coding Score',
      'Mock Interview Score', 'Attendance %', 'Projects',
      'Internship', 'Hackathon', 'Placement Status'
    ];

    const rows = filteredStudents.map((s) => [
      s.id, s.age, s.gender, s.degree, s.dsa,
      s.aptitude, s.comm, s.coding,
      s.mock, s.attendance, s.projects,
      s.internship, s.hackathon, s.status
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `KodNest_Students_Export_${statusFilter}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900/90 via-emerald-950/30 to-slate-900/90 border border-slate-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
        <h2 className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
          Student Data Directory
        </h2>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          Search, filter, and inspect raw unscaled candidate academic metrics and placement evaluation states.
        </p>
      </div>

      {/* Main Card Container */}
      <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm space-y-6">
        
        {/* Top Filters Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search Student ID (e.g. KN0042)..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 transition-all placeholder:text-slate-500"
              />
            </div>

            {/* Status Dropdown Filter */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-slate-400 hidden sm:block" />
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full sm:w-44 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 transition-all cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Placed">Placed Only</option>
                <option value="Not Placed">Not Placed Only</option>
              </select>
            </div>
          </div>

          {/* Showing Indicator & Export Button */}
          <div className="flex items-center gap-4 self-end md:self-auto">
            <div className="text-xs text-slate-400">
              Showing <span className="font-bold text-slate-200">{filteredStudents.length}</span> of{' '}
              <span className="font-bold text-slate-200">{INITIAL_STUDENTS.length}</span> students
            </div>

            <button
              onClick={handleDownloadCSV}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Data Table Container */}
        <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950/50">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/90 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3.5 px-4">Student ID</th>
                <th className="py-3.5 px-4">Age</th>
                <th className="py-3.5 px-4">Gender</th>
                <th className="py-3.5 px-4">Degree %</th>
                <th className="py-3.5 px-4">DSA Score</th>
                <th className="py-3.5 px-4">Aptitude</th>
                <th className="py-3.5 px-4">Coding</th>
                <th className="py-3.5 px-4">Mock IV</th>
                <th className="py-3.5 px-4">Attendance</th>
                <th className="py-3.5 px-4">Projects</th>
                <th className="py-3.5 px-4">Internship</th>
                <th className="py-3.5 px-4">Placement Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {paginatedStudents.length > 0 ? (
                paginatedStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-900/60 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-semibold text-cyan-300">
                      {student.id}
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">{student.age}</td>
                    <td className="py-3.5 px-4 text-slate-300">{student.gender}</td>
                    <td className="py-3.5 px-4 font-medium text-slate-200">{student.degree}%</td>
                    <td className="py-3.5 px-4 font-semibold text-violet-300">{student.dsa}</td>
                    <td className="py-3.5 px-4 text-slate-300">{student.aptitude}</td>
                    <td className="py-3.5 px-4 text-slate-300">{student.coding}</td>
                    <td className="py-3.5 px-4 text-slate-300">{student.mock}</td>
                    <td className="py-3.5 px-4 text-slate-300">{student.attendance}%</td>
                    <td className="py-3.5 px-4 text-slate-300">{student.projects}</td>
                    <td className="py-3.5 px-4 text-slate-300">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${student.internship === 'Yes' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'bg-slate-800 text-slate-400'}`}>
                        {student.internship}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {student.status === 'Placed' ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          Placed
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30">
                          Not Placed
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={12} className="py-12 text-center text-slate-500 text-xs">
                    No matching student records found for "{searchTerm}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Bottom Pagination Controls */}
        <div className="flex items-center justify-between pt-2">
          <div className="text-xs text-slate-500">
            Page <span className="font-bold text-slate-300">{currentPage}</span> of{' '}
            <span className="font-bold text-slate-300">{totalPages}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200 disabled:opacity-30 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200 disabled:opacity-30 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
