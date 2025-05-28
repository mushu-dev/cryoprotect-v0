import { TestTube, Plus, Filter, SortDesc, Calendar, User, ArrowRight } from "lucide-react"

export default function ExperimentsPage() {
  const experiments = [
    {
      id: 1,
      title: "DMSO Alternative Efficacy Testing",
      status: "In Progress",
      progress: 68,
      startDate: "May 15, 2025",
      endDate: "June 10, 2025",
      researcher: "Dr. Alex Johnson",
      samples: 24,
    },
    {
      id: 2,
      title: "Low Temperature Viability Assessment",
      status: "Completed",
      progress: 100,
      startDate: "April 2, 2025",
      endDate: "May 1, 2025",
      researcher: "Dr. Sarah Chen",
      samples: 36,
    },
    {
      id: 3,
      title: "Toxicity Reduction Protocol Testing",
      status: "Planning",
      progress: 0,
      startDate: "June 1, 2025",
      endDate: "July 15, 2025",
      researcher: "Dr. Michael Brown",
      samples: 18,
    },
    {
      id: 4,
      title: "Cell Membrane Permeability Analysis",
      status: "In Progress",
      progress: 42,
      startDate: "May 8, 2025",
      endDate: "June 5, 2025",
      researcher: "Dr. Lisa Wong",
      samples: 30,
    },
    {
      id: 5,
      title: "Novel Compound Mixture Evaluation",
      status: "Completed",
      progress: 100,
      startDate: "March 20, 2025",
      endDate: "April 25, 2025",
      researcher: "Dr. James Miller",
      samples: 15,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-600/20 text-blue-400"
      case "Completed":
        return "bg-green-600/20 text-green-400"
      case "Planning":
        return "bg-purple-600/20 text-purple-400"
      default:
        return "bg-slate-600/20 text-slate-400"
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Experiments</h1>
          <p className="text-slate-400 mt-1">Track and manage your research experiments</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
          <Plus size={18} />
          New Experiment
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
          <Calendar size={18} />
          Date Range
        </button>
        <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
          <User size={18} />
          Researcher
        </button>
      </div>

      <div className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
        {experiments.map((experiment) => (
          <div key={experiment.id} className="p-4 border-b border-slate-800 hover:bg-slate-800/30 transition-colors">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-slate-800 p-2 rounded-md">
                  <TestTube size={24} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">{experiment.title}</h3>
                  <div className="flex items-center gap-4 mt-1 text-sm">
                    <span className={`px-2 py-0.5 rounded-md text-xs ${getStatusColor(experiment.status)}`}>
                      {experiment.status}
                    </span>
                    <span className="text-slate-400">
                      {experiment.startDate} - {experiment.endDate}
                    </span>
                    <span className="text-slate-400">{experiment.samples} Samples</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-32">
                  <div className="text-xs text-slate-400 mb-1">Progress</div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${experiment.progress}%` }}></div>
                  </div>
                </div>
                <button className="p-2 rounded-md hover:bg-slate-700 text-slate-400 hover:text-white">
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
