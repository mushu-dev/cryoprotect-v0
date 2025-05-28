import { Search, BookOpen, BookMarked, Filter, SortDesc } from "lucide-react"

export default function LiteraturePage() {
  const papers = [
    {
      id: 1,
      title: "Novel Cryoprotectant Compounds for Preservation of Biological Materials",
      authors: "Zhang, J., Smith, A., Kumar, R.",
      journal: "Journal of Cryobiology",
      year: 2024,
      citations: 42,
      relevance: 98,
    },
    {
      id: 2,
      title: "Molecular Mechanisms of Cell Membrane Protection During Cryopreservation",
      authors: "Johnson, M., Williams, P., Garcia, L.",
      journal: "Cryopreservation Science",
      year: 2023,
      citations: 87,
      relevance: 95,
    },
    {
      id: 3,
      title: "Machine Learning Approaches to Predict Cryoprotectant Efficacy",
      authors: "Chen, Y., Patel, S., Nakamura, T.",
      journal: "Computational Biology Reports",
      year: 2024,
      citations: 23,
      relevance: 92,
    },
    {
      id: 4,
      title: "Toxicity Reduction in Next-Generation Cryoprotective Agents",
      authors: "Brown, K., Miller, J., Thompson, R.",
      journal: "Toxicology Research",
      year: 2023,
      citations: 56,
      relevance: 89,
    },
    {
      id: 5,
      title: "Synergistic Effects in Multi-Component Cryoprotectant Solutions",
      authors: "Lee, S., Anderson, C., Khan, M.",
      journal: "Advanced Materials for Cryopreservation",
      year: 2024,
      citations: 31,
      relevance: 87,
    },
  ]

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Literature Database</h1>
          <p className="text-slate-400 mt-1">Access relevant research papers and publications</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
            <Filter size={18} />
            Filter
          </button>
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
            <SortDesc size={18} />
            Sort
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search literature database..."
            className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>
      </div>

      <div className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
        {papers.map((paper) => (
          <div key={paper.id} className="p-4 border-b border-slate-800 hover:bg-slate-800/30 transition-colors">
            <div className="flex justify-between">
              <h3 className="text-lg font-medium text-white">{paper.title}</h3>
              <div className="flex items-center gap-2">
                <span className="bg-blue-600/20 text-blue-400 text-xs px-2 py-1 rounded-md">
                  {paper.relevance}% Relevant
                </span>
                <button className="p-1.5 rounded-md hover:bg-slate-700 text-slate-400 hover:text-white">
                  <BookMarked size={18} />
                </button>
              </div>
            </div>
            <p className="text-slate-400 mt-1">{paper.authors}</p>
            <div className="flex items-center gap-4 mt-2 text-sm">
              <div className="flex items-center gap-1.5">
                <BookOpen size={16} className="text-slate-500" />
                <span className="text-slate-300">{paper.journal}</span>
              </div>
              <div className="text-slate-500">•</div>
              <div className="text-slate-300">{paper.year}</div>
              <div className="text-slate-500">•</div>
              <div className="text-slate-300">{paper.citations} Citations</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
