"use client"

import { Button } from "@/components/ui/button"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie } from "recharts"
import { Search, Globe, Expand, BarChart3, X, ExternalLink } from "lucide-react"

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
  url_alias?: string
}

interface GitHubOrgItem {
  name: string
  merchantCount: number
}

interface GitHubCommunityItem {
  name: string
  merchantCount: number
  url_alias?: string
}

interface GitHubRankingItemWithType extends GitHubRankingItem {
  type: "global"
}

interface GitHubCountryItemWithType extends GitHubCountryItem {
  type: "country"
}

interface GitHubOrgItemWithType extends GitHubOrgItem {
  type: "organization"
}

interface GitHubCommunityItemWithType extends GitHubCommunityItem {
  type: "community"
}

type ComparisonItem =
  | GitHubRankingItemWithType
  | GitHubCountryItemWithType
  | GitHubOrgItemWithType
  | GitHubCommunityItemWithType

export default function BitcoinRankingDashboard() {
  const [activeTab, setActiveTab] = useState("countries")
  const [githubRankingData, setGithubRankingData] = useState<GitHubRankingItem[]>([])
  const [githubCountryData, setGithubCountryData] = useState<GitHubCountryItem[]>([])
  const [githubOrgData, setGithubOrgData] = useState<GitHubOrgItem[]>([])
  const [githubCommunityData, setGithubCommunityData] = useState<GitHubCommunityItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedItems, setSelectedItems] = useState<ComparisonItem[]>([])
  const [showComparison, setShowComparison] = useState(false)
  const [fullScreenChart, setFullScreenChart] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("merchants")

  const countryFlagMap: { [key: string]: string } = {
    India: "🇮🇳",
    Nigeria: "🇳🇬",
    Vietnam: "🇻🇳",
    "United States": "🇺🇸",
    "United States of America": "🇺🇸",
    USA: "🇺🇸",
    Ukraine: "🇺🇦",
    Indonesia: "🇮🇩",
    Brazil: "🇧🇷",
    Philippines: "🇵🇭",
    Thailand: "🇹🇭",
    Turkey: "🇹🇷",
    Germany: "🇩🇪",
    "United Kingdom": "🇬🇧",
    France: "🇫🇷",
    Canada: "🇨🇦",
    Australia: "🇦🇺",
    Japan: "🇯🇵",
    "South Korea": "🇰🇷",
    Mexico: "🇲🇽",
    Argentina: "🇦🇷",
    "South Africa": "🇿🇦",
    "El Salvador": "🇸🇻",
    Czechia: "🇨🇿",
  }

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
  }, []) // Removed activeTab dependency so it loads on mount

  useEffect(() => {
    const fetchOrgRanking = async () => {
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
  }, []) // Removed activeTab dependency so it loads on component mount

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

  const chartData =
    githubCountryData.length > 0
      ? githubCountryData.slice(0, 5).map((country) => ({
          name: country.name,
          flag: countryFlagMap[country.name] || "🏳️",
          merchants: country.merchantCount,
          growth: 0, // Growth data not available in GitHub API
        }))
      : countryData.slice(0, 5).map((country) => ({
          name: country.name,
          flag: country.flag,
          merchants: country.merchants,
          growth: country.growth,
        }))

  const organizationChartData =
    githubOrgData.length > 0
      ? (() => {
          const top4Orgs = githubOrgData.slice(0, 4)
          const remainingOrgs = githubOrgData.slice(4)
          const otherTotal = remainingOrgs.reduce((sum, org) => sum + org.merchantCount, 0)

          const chartData = top4Orgs.map((org, index) => ({
            name: org.name.length > 15 ? org.name.substring(0, 15) + "..." : org.name,
            value: org.merchantCount,
            color: `hsl(${25 + index * 45}, 70%, 50%)`, // Orange-based color palette
          }))

          if (otherTotal > 0) {
            chartData.push({
              name: "Other",
              value: otherTotal,
              color: "#94a3b8", // Gray color for "Other"
            })
          }

          return chartData
        })()
      : [
          { name: "Bitcoin Beach", value: 2450, color: "#ea580c" },
          { name: "Bitcoin Ekasi", value: 1890, color: "#f97316" },
          { name: "Bitcoin Lake", value: 1650, color: "#fb923c" },
          { name: "Bitcoin Jungle", value: 1420, color: "#fdba74" },
          { name: "Other", value: 980, color: "#94a3b8" },
        ]

  const handleViewOnBTCMap = () => {
    selectedItems.forEach((item) => {
      let url = ""
      if (item.type === "country" && "url_alias" in item && item.url_alias) {
        url = `https://btcmap.org/country/${item.url_alias}`
      } else if (item.type === "organization" && "name" in item && item.name) {
        url = `https://btcmap.org/communities/${encodeURIComponent(item.name)}`
      } else if (item.type === "community" && "url_alias" in item && item.url_alias) {
        url = `https://btcmap.org/community/${item.url_alias}`
      } else if ("url_alias" in item && item.url_alias) {
        url = `https://btcmap.org/community/${item.url_alias}`
      }
      if (url) {
        window.open(url, "_blank")
      }
    })
  }

  const removeFromComparison = (item: ComparisonItem) => {
    setSelectedItems((prev) =>
      prev.filter((selected) => {
        if ("url_alias" in selected && "url_alias" in item && selected.url_alias && item.url_alias) {
          return selected.url_alias !== item.url_alias
        }
        if (selected.type !== "global" && item.type !== "global") {
          const selectedWithName = selected as
            | GitHubCountryItemWithType
            | GitHubOrgItemWithType
            | GitHubCommunityItemWithType
          const itemWithName = item as GitHubCountryItemWithType | GitHubOrgItemWithType | GitHubCommunityItemWithType
          if (selectedWithName.name && itemWithName.name) {
            return selectedWithName.name !== itemWithName.name
          }
        }
        return true
      }),
    )
  }

  const addToComparison = (item: any, itemType: string) => {
    const itemWithType = { ...item, type: itemType }
    setSelectedItems((prev) => {
      if (prev.length >= 5) return prev
      const exists = prev.some((selected) => {
        if ("url_alias" in selected && "url_alias" in itemWithType) {
          return selected.url_alias === itemWithType.url_alias
        }
        return selected.name === itemWithType.name
      })
      if (exists) return prev
      return [...prev, itemWithType]
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Total Merchants Card */}
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
                    : "12,450"}
              </div>
              <p className="text-xs text-muted-foreground">
                {githubRankingData.length > 0 ? "Top ranked location" : "Leading country"}
              </p>
            </CardContent>
          </Card>

          {/* Top Country Card */}
          <Card>
            <CardHeader>
              <CardTitle>Top Country</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {githubCountryData.length > 0
                  ? `🏆 ${githubCountryData[0].name}`
                  : isLoading
                    ? "Loading..."
                    : "🇮🇳 India"}
              </div>
              <p className="text-xs text-muted-foreground">
                {githubCountryData.length > 0
                  ? `${githubCountryData[0].merchantCount.toLocaleString()} merchants`
                  : isLoading
                    ? "Fetching data..."
                    : "12,450 merchants"}
              </p>
            </CardContent>
          </Card>

          {/* Dynamic Card */}
          <Card>
            <CardHeader>
              <CardTitle>
                {activeTab === "global"
                  ? "Global Dominance"
                  : activeTab === "organizations"
                    ? "Organizations"
                    : activeTab === "countries"
                      ? "Country Dominance"
                      : "Communities"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {activeTab === "organizations" ? (
                  githubOrgData.length > 0 ? (
                    githubOrgData.length
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-600"></div>
                      <span className="text-sm">Loading...</span>
                    </div>
                  )
                ) : githubCommunityData.length > 0 ? (
                  githubCommunityData.length
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-600"></div>
                    <span className="text-sm">Loading...</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {activeTab === "organizations"
                  ? githubOrgData.length > 0
                    ? "Active organizations"
                    : "Loading organizations..."
                  : githubCommunityData.length > 0
                    ? "Active communities"
                    : "Loading communities..."}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-sm sm:text-base">Top Countries by Merchant Count</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setFullScreenChart("countries")}
                  className="h-8 w-8 p-0 flex-shrink-0"
                >
                  <Expand className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full overflow-x-auto">
                <ResponsiveContainer width="100%" height={300} minWidth={300}>
                  <BarChart data={[]} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={false} axisLine={false} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="merchants" fill="#ea580c" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-sm sm:text-base">Organization Distribution</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setFullScreenChart("organizations")}
                  className="h-8 w-8 p-0 flex-shrink-0"
                >
                  <Expand className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full flex justify-center">
                <ResponsiveContainer width="100%" height={300} minWidth={250}>
                  <PieChart>
                    <Pie data={[]} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value" />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 md:w-80"
              />
            </div>
          </div>

          {selectedItems.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-2 w-full">
              <Button
                onClick={() => setShowComparison(!showComparison)}
                variant="outline"
                size="sm"
                className="w-full sm:w-auto"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Compare ({selectedItems.length})
              </Button>
              <Button
                onClick={handleViewOnBTCMap}
                variant="outline"
                size="sm"
                className="w-full sm:w-auto bg-transparent"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View on BTCMap
              </Button>
            </div>
          )}
        </div>

        {/* Rankings Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto p-1">
            <TabsTrigger value="countries" className="text-xs sm:text-sm py-2">
              Countries
            </TabsTrigger>
            <TabsTrigger value="organizations" className="text-xs sm:text-sm py-2">
              Organizations
            </TabsTrigger>
            <TabsTrigger value="communities" className="text-xs sm:text-sm py-2">
              Communities
            </TabsTrigger>
            <TabsTrigger value="global" className="text-xs sm:text-sm py-2">
              Global
            </TabsTrigger>
          </TabsList>

          <TabsContent value="countries" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {githubCountryData.map((country, index) => (
                <Card key={index} className="hover:bg-muted/50 transition-colors cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className="text-lg px-3 py-1">
                          #{index + 1}
                        </Badge>
                        <div>
                          <h3 className="font-semibold text-lg">{country.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Population: {(country.population || 0).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-orange-600">
                          {(country.merchantCount || 0).toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">merchants</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="organizations" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {githubOrgData.map((org, index) => (
                <Card key={index} className="hover:bg-muted/50 transition-colors cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className="text-lg px-3 py-1">
                          #{index + 1}
                        </Badge>
                        <div>
                          <h3 className="font-semibold text-lg">{org.name}</h3>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-orange-600">
                          {(org.merchantCount || 0).toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">merchants</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="communities" className="space-y-4">
            <div className="space-y-4">
              <Card className="bg-orange-50 border-orange-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg text-orange-800">Total Community Merchants</h3>
                      <p className="text-sm text-orange-600">Combined across all communities</p>
                    </div>
                    <div className="text-3xl font-bold text-orange-600">
                      {githubCommunityData
                        .reduce((sum, community) => sum + (community.merchantCount || 0), 0)
                        .toLocaleString()}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {githubCommunityData.map((community, index) => (
                  <Card key={index} className="hover:bg-muted/50 transition-colors cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Badge variant="outline" className="text-lg px-3 py-1">
                            #{index + 1}
                          </Badge>
                          <div>
                            <h3 className="font-semibold text-lg">{community.name}</h3>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-orange-600">
                            {(community.merchantCount || 0).toLocaleString()}
                          </div>
                          <div className="text-sm text-muted-foreground">merchants</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="global" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {githubRankingData.map((item, index) => (
                <Card key={index} className="hover:bg-muted/50 transition-colors cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className="text-lg px-3 py-1">
                          #{index + 1}
                        </Badge>
                        <div>
                          <h3 className="font-semibold text-lg">{item.url_alias || "Unknown Location"}</h3>
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
            </div>
          </TabsContent>
        </Tabs>

        {/* Floating Comparison Component */}
        {showComparison && selectedItems.length > 0 && (
          <div className="fixed bottom-4 left-2 right-2 sm:left-auto sm:right-4 sm:w-96 bg-white dark:bg-gray-800 border rounded-lg shadow-lg p-3 sm:p-4 z-50 max-h-80 overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-base sm:text-lg">Compare Rankings</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowComparison(false)} className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2 sm:space-y-3">
              {selectedItems.map((item, index) => (
                <div
                  key={`${item.type}-${item.name || ("url_alias" in item ? item.url_alias : "")}`}
                  className="flex items-center justify-between p-2 bg-orange-50 rounded text-sm"
                >
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <Badge variant="outline" className="text-xs flex-shrink-0">
                      #{index + 1}
                    </Badge>
                    <Badge variant="secondary" className="text-xs flex-shrink-0">
                      {item.type}
                    </Badge>
                    <span className="truncate text-xs sm:text-sm">
                      {item.name || ("url_alias" in item ? item.url_alias : "")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs sm:text-sm font-medium">{item.merchantCount?.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
