import { MessageSquare, FileText, Video, Mail, ExternalLink } from "lucide-react"

export default function HelpPage() {
  const helpCategories = [
    {
      title: "Getting Started",
      description: "Learn the basics of CryoProtect platform",
      icon: <FileText size={24} className="text-blue-500" />,
      links: [
        { title: "Platform Overview", url: "#" },
        { title: "Navigation Guide", url: "#" },
        { title: "Account Setup", url: "#" },
        { title: "First Research Project", url: "#" },
      ],
    },
    {
      title: "Tutorials",
      description: "Step-by-step guides for key features",
      icon: <Video size={24} className="text-green-500" />,
      links: [
        { title: "Molecule Analysis", url: "#" },
        { title: "Creating Mixtures", url: "#" },
        { title: "Running Experiments", url: "#" },
        { title: "Using AI Predictions", url: "#" },
      ],
    },
    {
      title: "FAQs",
      description: "Answers to common questions",
      icon: <MessageSquare size={24} className="text-purple-500" />,
      links: [
        { title: "Data Management", url: "#" },
        { title: "AI Model Accuracy", url: "#" },
        { title: "Collaboration Features", url: "#" },
        { title: "Exporting Results", url: "#" },
      ],
    },
  ]

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Help & Support</h1>
        <p className="text-slate-400 mt-1">Resources and assistance for using the CryoProtect platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {helpCategories.map((category, index) => (
          <div key={index} className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex items-center gap-3">
              {category.icon}
              <div>
                <h3 className="font-medium text-white">{category.title}</h3>
                <p className="text-sm text-slate-400">{category.description}</p>
              </div>
            </div>
            <div className="p-4">
              <ul className="space-y-2">
                {category.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.url} className="text-blue-400 hover:text-blue-300 flex items-center gap-1">
                      {link.title}
                      <ExternalLink size={14} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800">
          <h3 className="font-medium text-white">Contact Support</h3>
        </div>
        <div className="p-6">
          <div className="grid gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Subject</label>
              <input
                type="text"
                placeholder="Brief description of your issue"
                className="w-full bg-slate-800 border border-slate-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Message</label>
              <textarea
                placeholder="Please describe your issue in detail..."
                className="w-full bg-slate-800 border border-slate-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent h-32"
              />
            </div>

            <div className="flex justify-end">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
                <Mail size={18} />
                Submit Support Request
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
