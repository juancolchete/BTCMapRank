"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Search, TrendingUp, Globe, Users } from "lucide-react"

// Mock data based on research findings
const countryData = [
  { rank: 1, name: "India", merchants: 12450, growth: 45.2, flag: "🇮🇳", population: 1380000000, adoptionRate: 0.9 },
  { rank: 2, name: "Nigeria", merchants: 8920, growth: 38.7, flag: "🇳🇬", population: 218000000, adoptionRate: 4.1 },
  { rank: 3, name: "Vietnam", merchants: 7650, growth: 42.1, flag: "🇻🇳", population: 97000000, adoptionRate: 7.9 },
  {
    rank: 4,
    name: "United States",
    merchants: 6890,
    growth: 22.3,
    flag: "🇺🇸",
    population: 331000000,
    adoptionRate: 2.1,
  },
  { rank: 5, name: "Ukraine", merchants: 5420, growth: 51.2, flag: "🇺🇦", population: 44000000, adoptionRate: 12.3 },
  { rank: 6, name: "Indonesia", merchants: 4980, growth: 35.8, flag: "🇮🇩", population: 273000000, adoptionRate: 1.8 },
  { rank: 7, name: "Brazil", merchants: 4120, growth: 28.9, flag: "🇧🇷", population: 215000000, adoptionRate: 1.9 },
  { rank: 8, name: "Philippines", merchants: 3850, growth: 33.4, flag: "🇵🇭", population: 109000000, adoptionRate: 3.5 },
  { rank: 9, name: "Thailand", merchants: 3200, growth: 29.7, flag: "🇹🇭", population: 70000000, adoptionRate: 4.6 },
  { rank: 10, name: "Turkey", merchants: 2890, growth: 31.2, flag: "🇹🇷", population: 84000000, adoptionRate: 3.4 },
]

const organizationData = [
  {
    rank: 1,
    name: "Bitcoin Beach El Salvador",
    merchants: 2450,
    type: "Community",
    country: "El Salvador",
    growth: 67.8,
  },
  { rank: 2, name: "Bitcoin Ekasi", merchants: 1890, type: "Community", country: "South Africa", growth: 52.3 },
  { rank: 3, name: "Bitcoin Lake Guatemala", merchants: 1650, type: "Community", country: "Guatemala", growth: 48.9 },
  {
    rank: 4,
    name: "Bitcoin Jungle Costa Rica",
    merchants: 1420,
    type: "Community",
    country: "Costa Rica",
    growth: 41.2,
  },
  { rank: 5, name: "Bitcoin Berlin", merchants: 980, type: "Community", country: "Germany", growth: 28.7 },
  { rank: 6, name: "Miami Bitcoin", merchants: 850, type: "Community", country: "United States", growth: 35.1 },
  { rank: 7, name: "Bitcoin Amsterdam", merchants: 720, type: "Community", country: "Netherlands", growth: 22.4 },
  { rank: 8, name: "Bitcoin Prague", merchants: 680, type: "Community", country: "Czech Republic", growth: 31.8 },
  { rank: 9, name: "Bitcoin Sydney", merchants: 590, type: "Community", country: "Australia", growth: 26.3 },
  { rank: 10, name: "Bitcoin Tokyo", merchants: 520, type: "Community", country: "Japan", growth: 19.7 },
]

const communityData = [
  {
    rank: 1,
    name: "Bitcoin Beach",
    merchants: 2450,
    location: "El Salvador",
    members: 15000,
    growth: 67.8,
    type: "Circular Economy",
    established: "2019",
  },
  {
    rank: 2,
    name: "Bitcoin Ekasi",
    merchants: 1890,
    location: "South Africa",
    members: 8500,
    growth: 52.3,
    type: "Township Initiative",
    established: "2020",
  },
  {
    rank: 3,
    name: "Bitcoin Lake",
    merchants: 1650,
    location: "Guatemala",
    members: 12000,
    growth: 48.9,
    type: "Tourism Hub",
    established: "2021",
  },
  {
    rank: 4,
    name: "Bitcoin Jungle",
    merchants: 1420,
    location: "Costa Rica",
    members: 9800,
    growth: 41.2,
    type: "Eco Community",
    established: "2021",
  },
  {
    rank: 5,
    name: "Bitcoin Berlin",
    merchants: 980,
    location: "Germany",
    members: 6500,
    growth: 28.7,
    type: "Urban Network",
    established: "2018",
  },
  {
    rank: 6,
    name: "Miami Bitcoin",
    merchants: 850,
    location: "United States",
    members: 11200,
    growth: 35.1,
    type: "City Initiative",
    established: "2020",
  },
  {
    rank: 7,
    name: "Bitcoin Amsterdam",
    merchants: 720,
    location: "Netherlands",
    members: 4800,
    growth: 22.4,
    type: "Merchant Network",
    established: "2019",
  },
  {
    rank: 8,
    name: "Bitcoin Prague",
    merchants: 680,
    location: "Czech Republic",
    members: 5200,
    growth: 31.8,
    type: "Tech Community",
    established: "2020",
  },
  {
    rank: 9,
    name: "Bitcoin Sydney",
    merchants: 590,
    location: "Australia",
    members: 3900,
    growth: 26.3,
    type: "Meetup Network",
    established: "2019",
  },
  {
    rank: 10,
    name: "Bitcoin Tokyo",
    merchants: 520,
    location: "Japan",
    members: 7100,
    growth: 19.7,
    type: "Business Alliance",
    established: "2018",
  },
]

const globalRankingData = [
  { rank: 1, name: "India", type: "Country", merchants: 12450, growth: 45.2, flag: "🇮🇳", category: "Country" },
  { rank: 2, name: "Nigeria", type: "Country", merchants: 8920, growth: 38.7, flag: "🇳🇬", category: "Country" },
  { rank: 3, name: "Vietnam", type: "Country", merchants: 7650, growth: 42.1, flag: "🇻🇳", category: "Country" },
  { rank: 4, name: "United States", type: "Country", merchants: 6890, growth: 22.3, flag: "🇺🇸", category: "Country" },
  { rank: 5, name: "Ukraine", type: "Country", merchants: 5420, growth: 51.2, flag: "🇺🇦", category: "Country" },
  { rank: 6, name: "Indonesia", type: "Country", merchants: 4980, growth: 35.8, flag: "🇮🇩", category: "Country" },
  { rank: 7, name: "Brazil", type: "Country", merchants: 4120, growth: 28.9, flag: "🇧🇷", category: "Country" },
  { rank: 8, name: "Philippines", type: "Country", merchants: 3850, growth: 33.4, flag: "🇵🇭", category: "Country" },
  { rank: 9, name: "Thailand", type: "Country", merchants: 3200, growth: 29.7, flag: "🇹🇭", category: "Country" },
  {
    rank: 10,
    name: "Bitcoin Beach El Salvador",
    type: "Organization",
    merchants: 2450,
    growth: 67.8,
    flag: "🏢",
    category: "Organization",
  },
  { rank: 11, name: "Turkey", type: "Country", merchants: 2890, growth: 31.2, flag: "🇹🇷", category: "Country" },
  {
    rank: 12,
    name: "Bitcoin Ekasi",
    type: "Organization",
    merchants: 1890,
    growth: 52.3,
    flag: "🏢",
    category: "Organization",
  },
]

const chartData = countryData.slice(0, 6).map((country) => ({
  name: country.name,
  merchants: country.merchants,
  growth: country.growth,
}))

const pieData = [
  { name: "Asia", value: 35, color: "var(--chart-1)" },
  { name: "Americas", value: 28, color: "var(--chart-2)" },
  { name: "Europe", value: 22, color: "var(--chart-3)" },
  { name: "Africa", value: 12, color: "var(--chart-4)" },
  { name: "Oceania", value: 3, color: "var(--chart-5)" },
]

interface GitHubRankingItem {
  url_alias: string
  merchantCount: number
}

interface GitHubCountryItem {
  name: string
  merchantCount: number
  population: number
}

interface GitHubOrgItem {
  name: string
  merchantCount: number
}

interface GitHubCommunityItem {
  name: string
  merchantCount: number
}

export function BitcoinRankingDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("merchants")
  const [activeTab, setActiveTab] = useState("global")
  const [githubRankingData, setGithubRankingData] = useState<GitHubRankingItem[]>([])
  const [githubCountryData, setGithubCountryData] = useState<GitHubCountryItem[]>([])
  const [githubOrgData, setGithubOrgData] = useState<GitHubOrgItem[]>([])
  const [githubCommunityData, setGithubCommunityData] = useState<GitHubCommunityItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGithubRanking = async () => {
      if (activeTab !== "global") return

      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch("https://raw.githubusercontent.com/UAIBIT/BTCMapRank/refs/heads/main/ranking.json")
        if (!response.ok) {
          throw new Error("Failed to fetch ranking data")
        }
        const data = await response.json()

        if (Array.isArray(data)) {
          setGithubRankingData(data)
        } else {
          setError("Invalid data format received")
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchGithubRanking()
  }, [activeTab])

  useEffect(() => {
    const fetchCountryRanking = async () => {
      if (activeTab !== "countries") return

      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/UAIBIT/BTCMapRank/refs/heads/main/rankingCountry.json",
        )
        if (!response.ok) {
          throw new Error("Failed to fetch country ranking data")
        }
        const data = await response.json()

        if (Array.isArray(data)) {
          setGithubCountryData(data)
        } else {
          setError("Invalid country data format received")
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load country data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCountryRanking()
  }, [activeTab])

  useEffect(() => {
    const fetchOrgRanking = async () => {
      if (activeTab !== "organizations") return

      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/UAIBIT/BTCMapRank/refs/heads/main/rankingOrgs.json",
        )
        if (!response.ok) {
          throw new Error("Failed to fetch organizations ranking data")
        }
        const data = await response.json()

        if (Array.isArray(data)) {
          setGithubOrgData(data)
        } else {
          setError("Invalid organizations data format received")
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load organizations data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrgRanking()
  }, [activeTab])

  useEffect(() => {
    const fetchCommunityRanking = async () => {
      if (activeTab !== "communities") return

      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/UAIBIT/BTCMapRank/refs/heads/main/rankingCommunity.json",
        )
        if (!response.ok) {
          throw new Error("Failed to fetch communities ranking data")
        }
        const data = await response.json()

        if (Array.isArray(data)) {
          setGithubCommunityData(data)
        } else {
          setError("Invalid communities data format received")
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load communities data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCommunityRanking()
  }, [activeTab])

  const filteredCountries = countryData.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredOrganizations = organizationData.filter((org) =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredCommunities = communityData.filter((community) =>
    community.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredGlobal = githubRankingData.filter(
    (item) => item && item.url_alias && item.url_alias.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredGithubCountries = githubCountryData
    .filter((country) => country && country.name && country.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .map((country, index) => ({
      ...country,
      rank: index + 1,
      adoptionRate: country.population > 0 ? (country.merchantCount / country.population) * 1000 : 0,
    }))

  const filteredGithubOrgs = githubOrgData
    .filter((org) => org && org.name && org.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .map((org, index) => ({
      ...org,
      rank: index + 1,
    }))

  const filteredGithubCommunities = githubCommunityData
    .filter(
      (community) => community && community.name && community.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .map((community, index) => ({
      ...community,
      rank: index + 1,
    }))

  const totalCommunityMerchants = githubCommunityData.reduce((sum, community) => {
    return sum + (community?.merchantCount || 0)
  }, 0)

  return (
    <div className="min-h-screen bg-background">
      <header
        style={{
          backgroundColor: "#1e293b",
          color: "#ffffff",
        }}
        className="py-8 px-4 md:px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-3">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/white-OkPhpRNZv1Rlu4Nb2ladly9IPYIkcF.png"
              alt="UAIBIT Logo"
              className="h-12 w-auto"
            />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-balance" style={{ color: "#ffffff" }}>
                <span style={{ color: "#ffffff" }}>UAIBIT</span> <span style={{ color: "#f97316" }}>Rank</span>
              </h1>
              <p className="text-lg text-pretty mt-1" style={{ color: "#ffffff" }}>
                Bitcoin merchant adoption rankings based on BTCMAP data
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Merchants</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {githubRankingData.length > 0
                  ? (githubRankingData[0]?.merchantCount || 0).toLocaleString()
                  : isLoading
                    ? "Loading..."
                    : countryData[0].merchants.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                {githubRankingData.length > 0 ? "Top ranked location" : "Leading country"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Growth</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {(countryData.reduce((sum, country) => sum + country.growth, 0) / countryData.length).toFixed(2)}%
              </div>
              <p className="text-xs text-muted-foreground">Year over year</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top Country</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {countryData[0].flag} {countryData[0].name}
              </div>
              <p className="text-xs text-muted-foreground">{countryData[0].merchants.toLocaleString()} merchants</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Communities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{organizationData.length}</div>
              <p className="text-xs text-muted-foreground">Active organizations</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Countries by Merchant Count</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="merchants" fill="#ea580c" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Regional Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search countries or organizations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-80"
            />
          </div>
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="merchants">Merchants</SelectItem>
                <SelectItem value="growth">Growth Rate</SelectItem>
                <SelectItem value="adoption">Adoption Rate</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Rankings Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="global">Global</TabsTrigger>
            <TabsTrigger value="countries">Countries</TabsTrigger>
            <TabsTrigger value="organizations">Organizations</TabsTrigger>
            <TabsTrigger value="communities">Communities</TabsTrigger>
          </TabsList>

          <TabsContent value="global" className="space-y-4">
            {isLoading && (
              <div className="text-center py-8">
                <div className="text-lg">Loading ranking data...</div>
              </div>
            )}

            {error && (
              <div className="text-center py-8">
                <div className="text-red-600">Error: {error}</div>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-2 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
                >
                  Retry
                </button>
              </div>
            )}

            {!isLoading && !error && (
              <div className="grid gap-4">
                {filteredGlobal.map((item, index) => (
                  <Card key={index} className="hover:bg-muted/50 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Badge variant="outline" className="text-lg px-3 py-1">
                            #{index + 1}
                          </Badge>
                          <div>
                            <h3 className="font-semibold text-lg">{item.url_alias || "Unknown Location"}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary">Location</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-orange-600">
                            {(item.merchantCount || 0).toLocaleString()}
                          </div>
                          <div className="text-sm text-muted-foreground">merchants</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {filteredGlobal.length === 0 && !isLoading && !error && (
                  <div className="text-center py-8 text-muted-foreground">
                    {githubRankingData.length === 0 ? "No data available" : `No results found for "${searchTerm}"`}
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="countries" className="space-y-4">
            {isLoading && (
              <div className="text-center py-8">
                <div className="text-lg">Loading country ranking data...</div>
              </div>
            )}

            {error && (
              <div className="text-center py-8">
                <div className="text-red-600">Error: {error}</div>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-2 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
                >
                  Retry
                </button>
              </div>
            )}

            {!isLoading && !error && (
              <div className="grid gap-4">
                {filteredGithubCountries.map((country) => (
                  <Card key={country.rank} className="hover:bg-muted/50 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Badge variant="outline" className="text-lg px-3 py-1">
                            #{country.rank}
                          </Badge>
                          <div>
                            <h3 className="font-semibold text-lg">{country.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              Population: {(country.population / 1000000).toFixed(1)}M
                            </p>
                          </div>
                        </div>
                        <div className="text-right space-y-2">
                          <div className="text-2xl font-bold text-orange-600">
                            {country.merchantCount.toLocaleString()}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium" title="Merchants per 1000 people">
                              {(country.adoptionRate / 10).toFixed(5)}%
                            </span>
                          </div>
                          <Progress value={Math.min((country.adoptionRate / 20) * 100, 100)} className="w-24" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {filteredGithubCountries.length === 0 && !isLoading && !error && (
                  <div className="text-center py-8 text-muted-foreground">
                    {githubCountryData.length === 0
                      ? "No country data available"
                      : `No results found for "${searchTerm}"`}
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="organizations" className="space-y-4">
            {isLoading && (
              <div className="text-center py-8">
                <div className="text-lg">Loading organizations ranking data...</div>
              </div>
            )}

            {error && (
              <div className="text-center py-8">
                <div className="text-red-600">Error: {error}</div>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-2 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
                >
                  Retry
                </button>
              </div>
            )}

            {!isLoading && !error && (
              <div className="grid gap-4">
                {filteredGithubOrgs.map((org) => (
                  <Card key={org.rank} className="hover:bg-muted/50 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Badge variant="outline" className="text-lg px-3 py-1">
                            #{org.rank}
                          </Badge>
                          <div>
                            <h3 className="font-semibold text-lg">{org.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary">Organization</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-orange-600">{org.merchantCount.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">merchants</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {filteredGithubOrgs.length === 0 && !isLoading && !error && (
                  <div className="text-center py-8 text-muted-foreground">
                    {githubOrgData.length === 0
                      ? "No organizations data available"
                      : `No results found for "${searchTerm}"`}
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="communities" className="space-y-4">
            {isLoading && (
              <div className="text-center py-8">
                <div className="text-lg">Loading communities ranking data...</div>
              </div>
            )}

            {error && (
              <div className="text-center py-8">
                <div className="text-red-600">Error: {error}</div>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-2 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
                >
                  Retry
                </button>
              </div>
            )}

            {!isLoading && !error && (
              <div className="space-y-4">
                <Card className="bg-orange-50 border-orange-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg text-orange-800">Total Community Merchants</h3>
                        <p className="text-sm text-orange-600">Sum of all community merchants</p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-orange-600">
                          {totalCommunityMerchants.toLocaleString()}
                        </div>
                        <div className="text-sm text-orange-500">merchants</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid gap-4">
                  {filteredGithubCommunities.map((community) => (
                    <Card key={community.rank} className="hover:bg-muted/50 transition-colors">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Badge variant="outline" className="text-lg px-3 py-1">
                              #{community.rank}
                            </Badge>
                            <div>
                              <h3 className="font-semibold text-lg">{community.name}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="secondary">Community</Badge>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-orange-600">
                              {community.merchantCount.toLocaleString()}
                            </div>
                            <div className="text-sm text-muted-foreground">merchants</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredGithubCommunities.length === 0 && !isLoading && !error && (
                  <div className="text-center py-8 text-muted-foreground">
                    {githubCommunityData.length === 0
                      ? "No communities data available"
                      : `No results found for "${searchTerm}"`}
                  </div>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
