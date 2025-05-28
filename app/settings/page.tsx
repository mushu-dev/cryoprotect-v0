import { Save, User, Lock, Bell, Database, Monitor, Cloud } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-slate-400 mt-1">Manage your account and application preferences</p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-1">
          <div className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
            <div className="p-4 border-b border-slate-800">
              <h3 className="font-medium text-white">Settings</h3>
            </div>
            <div className="p-2">
              <button className="w-full text-left px-3 py-2 rounded-md bg-slate-800 text-white flex items-center gap-2">
                <User size={18} />
                Account
              </button>
              <button className="w-full text-left px-3 py-2 rounded-md text-slate-400 hover:bg-slate-800 hover:text-white flex items-center gap-2 mt-1">
                <Lock size={18} />
                Security
              </button>
              <button className="w-full text-left px-3 py-2 rounded-md text-slate-400 hover:bg-slate-800 hover:text-white flex items-center gap-2 mt-1">
                <Bell size={18} />
                Notifications
              </button>
              <button className="w-full text-left px-3 py-2 rounded-md text-slate-400 hover:bg-slate-800 hover:text-white flex items-center gap-2 mt-1">
                <Database size={18} />
                Data Management
              </button>
              <button className="w-full text-left px-3 py-2 rounded-md text-slate-400 hover:bg-slate-800 hover:text-white flex items-center gap-2 mt-1">
                <Monitor size={18} />
                Display
              </button>
              <button className="w-full text-left px-3 py-2 rounded-md text-slate-400 hover:bg-slate-800 hover:text-white flex items-center gap-2 mt-1">
                <Cloud size={18} />
                API Access
              </button>
            </div>
          </div>
        </div>

        <div className="col-span-3">
          <div className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
            <div className="p-4 border-b border-slate-800">
              <h3 className="font-medium text-white">Account Settings</h3>
            </div>
            <div className="p-6">
              <div className="grid gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    defaultValue="Dr. Alex Johnson"
                    className="w-full bg-slate-800 border border-slate-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    defaultValue="alex.johnson@research.org"
                    className="w-full bg-slate-800 border border-slate-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Institution</label>
                  <input
                    type="text"
                    defaultValue="Advanced Cryobiology Research Institute"
                    className="w-full bg-slate-800 border border-slate-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Research Focus</label>
                  <textarea
                    defaultValue="Developing novel cryoprotectant compounds with reduced toxicity for preservation of biological materials."
                    className="w-full bg-slate-800 border border-slate-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent h-24"
                  />
                </div>

                <div className="flex justify-end">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
                    <Save size={18} />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
