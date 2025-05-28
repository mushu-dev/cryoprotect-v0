import { FileText, Download, Share2 } from "lucide-react"

export default function ReportsPage() {
  const reports = [
    {
      id: 1,
      title: "Monthly Cryoprotectant Discovery Summary",
      date: "May 2025",
      type: "Research Summary",
      pages: 12,
    },
    {
      id: 2,
      title: "Efficacy Analysis of Novel Compounds",
      date: "April 2025",
      type: "Analysis Report",
      pages: 24,
    },
    {
      id: 3,
      title: "Toxicity Profiles for Experimental Mixtures",
      date: "April 2025",
      type: "Safety Report",
      pages: 18,
    },
    {
      id: 4,
      title: "Quarterly Research Progress",
      date: "Q1 2025",
      type: "Progress Report",
      pages: 32,
    },
    {
      id: 5,
      title: "AI Prediction Accuracy Assessment",
      date: "March 2025",
      type: "Technical Report",
      pages: 15,
    },
  ]

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Research Reports</h1>
          <p className="text-slate-400 mt-1">Access and manage all research documentation</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
          <FileText size={18} />
          Generate New Report
        </button>
      </div>

      <div className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-800 bg-slate-800/50 text-sm font-medium text-slate-400">
          <div className="col-span-5">Title</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-1">Pages</div>
          <div className="col-span-2">Actions</div>
        </div>

        {reports.map((report) => (
          <div
            key={report.id}
            className="grid grid-cols-12 gap-4 p-4 border-b border-slate-800 items-center hover:bg-slate-800/30 transition-colors"
          >
            <div className="col-span-5 font-medium text-white">{report.title}</div>
            <div className="col-span-2 text-slate-400">{report.date}</div>
            <div className="col-span-2 text-slate-400">{report.type}</div>
            <div className="col-span-1 text-slate-400">{report.pages}</div>
            <div className="col-span-2 flex gap-2">
              <button className="p-1.5 rounded-md hover:bg-slate-700 text-slate-400 hover:text-white">
                <Download size={18} />
              </button>
              <button className="p-1.5 rounded-md hover:bg-slate-700 text-slate-400 hover:text-white">
                <Share2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
