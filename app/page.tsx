import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MicroscopeIcon as Molecule,
  Brain,
  Zap,
  Target,
  Users,
  BarChart3,
  ArrowRight,
  Sparkles,
  Shield,
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/90 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Molecule className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  CryoProtect
                </h1>
                <p className="text-sm text-gray-600">AI-Powered Research Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/molecules">
                <Button variant="outline">Explore Molecules</Button>
              </Link>
              <Link href="/discovery">
                <Button>
                  <Brain className="w-4 h-4 mr-2" />
                  AI Discovery
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <Badge variant="outline" className="mb-6 bg-blue-50 text-blue-700 border-blue-200">
            <Sparkles className="w-4 h-4 mr-2" />
            Revolutionary AI Research Platform
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Transform Cryoprotectant
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Research with AI
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover, analyze, and optimize cryoprotectant molecules using cutting-edge artificial intelligence.
            Accelerate your research with intelligent insights and predictive analytics.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Link href="/molecules">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
                <Molecule className="w-5 h-5 mr-2" />
                Explore Database
              </Button>
            </Link>
            <Link href="/discovery">
              <Button size="lg" variant="outline">
                <Brain className="w-5 h-5 mr-2" />
                AI Discovery
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Research Tools</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to accelerate cryoprotectant research and discovery
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI-Powered Analysis</h3>
                <p className="text-gray-600 mb-4">
                  Advanced machine learning algorithms predict molecular properties and success rates
                </p>
                <Link href="/predictions">
                  <Button variant="ghost" className="p-0">
                    Learn more <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-purple-200 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Molecule className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Molecular Database</h3>
                <p className="text-gray-600 mb-4">
                  Comprehensive database of cryoprotectant molecules with detailed properties
                </p>
                <Link href="/molecules">
                  <Button variant="ghost" className="p-0">
                    Explore database <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-green-200 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Advanced Analytics</h3>
                <p className="text-gray-600 mb-4">
                  Visualize trends, patterns, and relationships in your research data
                </p>
                <Link href="/analytics">
                  <Button variant="ghost" className="p-0">
                    View analytics <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-yellow-200 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Smart Discovery</h3>
                <p className="text-gray-600 mb-4">
                  AI-guided discovery of novel cryoprotectant compounds and combinations
                </p>
                <Link href="/discovery">
                  <Button variant="ghost" className="p-0">
                    Start discovery <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-red-200 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Safety Analysis</h3>
                <p className="text-gray-600 mb-4">Comprehensive toxicity and safety profiling for all compounds</p>
                <Link href="/safety">
                  <Button variant="ghost" className="p-0">
                    Safety tools <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-indigo-200 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Team Collaboration</h3>
                <p className="text-gray-600 mb-4">Share research, collaborate on projects, and track team progress</p>
                <Link href="/teams">
                  <Button variant="ghost" className="p-0">
                    Team features <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-gray-600">Molecules Analyzed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">95%</div>
              <div className="text-gray-600">Prediction Accuracy</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-gray-600">Research Teams</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-600 mb-2">24/7</div>
              <div className="text-gray-600">AI Analysis</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Transform Your Research?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join leading researchers using AI to accelerate cryoprotectant discovery
          </p>
          <Link href="/molecules">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
              <Zap className="w-5 h-5 mr-2" />
              Start Exploring
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Molecule className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-gray-900">CryoProtect</span>
            </div>
            <div className="text-sm text-gray-600">© 2024 CryoProtect. Advancing cryoprotectant research with AI.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
