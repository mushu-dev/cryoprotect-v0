import { FileText, Plus, Filter, SortDesc, Clock, User, ArrowRight, Copy } from "lucide-react"

export default function ProtocolsPage() {
  const protocols = [
    {
      id: 1,
      title: "Standard Cryopreservation Protocol",
      category: "Preservation",
      steps: 12,
      lastUpdated: "May 18, 2025",
      author: "Dr. Alex Johnson",
      usageCount: 87,
    },
    {
      id: 2,
      title: "Vitrification for Cell Suspensions",
      category: "Vitrification",
      steps: 18,
      lastUpdated: "May 5, 2025",
      author: "Dr. Sarah Chen",
      usageCount: 64,
    },
    {
      id: 3,
      title: "Low Toxicity Slow Cooling Method",
      category: "Slow Cooling",
      steps: 15,
      lastUpdated: "April 28, 2025",
      author: "Dr. Michael Brown",
      usageCount: 42,
    },
    {
      id: 4,
      title: "Rapid Thawing Procedure",
      category: "Thawing",
      steps: 8,
      lastUpdated: "May 12, 2025",
      author: "Dr. Lisa Wong",
      usageCount: 93,
    },
    {
      id: 5,
      title: "Tissue Sample Preparation",
      category: "Preparation",
      steps: 22,
      lastUpdated: "April 15, 2025",
      author: "Dr. James Miller",
      usageCount: 56,
    },
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Preservation":
        return "bg-blue-600/20 text-blue-400"
      case "Vitrification":
        return "bg-green-600/20 text-green-400"
      case "Slow Cooling":
        return "bg-purple-600/20 text-purple-400"
      case "Thawing":
        return "bg-orange-600/20 text-orange-400"
      case "Preparation":
        return "bg-cyan-600/20 text-cyan-400"
      default:
        return "bg-slate-600/20 text-slate-400"
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Protocols</h1>
          <p className="text-slate-400 mt-1">Standardized procedures for cryopreservation research</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
          <Plus size={18} />
          New Protocol
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
          <Filter size={18} />
          Filter
        </button>
        <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
          <SortDesc size={18} />
          Sort
        </button>
        <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
          <Clock size={18} />
          Recent
        </button>
        <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
          <User size={18} />
          Author
        </button>
      </div>

      <div className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
        {protocols.map((protocol) => (
          <div key={protocol.id} className="p-4 border-b border-slate-800 hover:bg-slate-800/30 transition-colors">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-slate-800 p-2 rounded-md">
                  <FileText size={24} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">{protocol.title}</h3>
                  <div className="flex items-center gap-4 mt-1 text-sm">
                    <span className={`px-2 py-0.5 rounded-md text-xs ${getCategoryColor(protocol.category)}`}>
                      {protocol.category}
                    </span>
                    <span className="text-slate-400">{protocol.steps} Steps</span>
                    <span className="text-slate-400">Updated {protocol.lastUpdated}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm text-slate-300">{protocol.author}</div>
                  <div className="text-xs text-slate-400">Used {protocol.usageCount} times</div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 rounded-md hover:bg-slate-700 text-slate-400 hover:text-white">
                    <Copy size={18} />
                  </button>
                  <button className="p-2 rounded-md hover:bg-slate-700 text-slate-400 hover:text-white">
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
