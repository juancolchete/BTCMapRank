"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Search, Globe, Expand, BarChart3, ExternalLink } from "lucide-react"

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

  // Simplified data fetching effects
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Fetch country data
        const countryResponse = await fetch(
          "https://raw.githubusercontent.com/UAIBIT/BTCMapRank/refs/heads/main/rankingCountry.json",
        )
        if (countryResponse.ok) {
          const countryData = await countryResponse.json()
          if (Array.isArray(countryData)) {
            setGithubCountryData(countryData)
          }
        }

        // Fetch organization data
        const orgResponse = await fetch(
          "https://raw.githubusercontent.com/UAIBIT/BTCMapRank/refs/heads/main/rankingOrgs.json",
        )
        if (orgResponse.ok) {
          const orgData = await orgResponse.json()
          if (Array.isArray(orgData)) {
            setGithubOrgData(orgData)
          }
        }

        // Fetch community data
        const communityResponse = await fetch(
          "https://raw.githubusercontent.com/UAIBIT/BTCMapRank/refs/heads/main/rankingCommunity.json",
        )
        if (communityResponse.ok) {
          const communityData = await communityResponse.json()
          if (Array.isArray(communityData)) {
            setGithubCommunityData(communityData)
          }
        }

        // Fetch global ranking data
        const globalResponse = await fetch(
          "https://raw.githubusercontent.com/UAIBIT/BTCMapRank/refs/heads/main/ranking.json",
        )
        if (globalResponse.ok) {
          const globalData = await globalResponse.json()
          if (Array.isArray(globalData)) {
            setGithubRankingData(globalData)
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const organizationChartData =
    githubOrgData.length > 0
      ? (() => {
          const top4Orgs = githubOrgData.slice(0, 4)
          const remainingOrgs = githubOrgData.slice(4)
          const otherTotal = remainingOrgs.reduce((sum, org) => sum + org.merchantCount, 0)

          const chartData = top4Orgs.map((org, index) => ({
            name: org.name.length > 15 ? org.name.substring(0, 15) + "..." : org.name,
            value: org.merchantCount,
            color: `hsl(${25 + index * 45}, 70%, 50%)`,
          }))

          if (otherTotal > 0) {
            chartData.push({
              name: "Other",
              value: otherTotal,
              color: "#94a3b8",
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
      }
      if (url) {
        window.open(url, "_blank")
      }
    })
  }

  const addToComparison = (item: any, itemType: string) => {
    const itemWithType = { ...item, type: itemType }
    setSelectedItems((prev) => {
      if (prev.length >= 5) return prev
      const exists = prev.some(
        (selected) => selected.merchantCount === itemWithType.merchantCount && selected.type === itemWithType.type,
      )
      if (exists) return prev
      return [...prev, itemWithType]
    })
  }

  const removeFromComparison = (item: ComparisonItem) => {
    setSelectedItems((prev) =>
      prev.filter((selected) => selected.merchantCount !== item.merchantCount || selected.type !== item.type),
    )
  }

  const isItemSelected = (item: any, itemType: string) => {
    return selectedItems.some((selected) => selected.merchantCount === item.merchantCount && selected.type === itemType)
  }

  const handleItemClick = (item: any, itemType: string, event: React.MouseEvent) => {
    if (event.ctrlKey || event.metaKey) {
      let url = ""
      if (itemType === "country" && item.url_alias) {
        url = `https://btcmap.org/country/${item.url_alias}`
      } else if (itemType === "organization" && item.name) {
        url = `https://btcmap.org/communities/${encodeURIComponent(item.name)}`
      } else if (itemType === "community" && item.url_alias) {
        url = `https://btcmap.org/community/${item.url_alias}`
      }
      if (url) {
        window.open(url, "_blank")
      }
    } else {
      if (isItemSelected(item, itemType)) {
        removeFromComparison({ ...item, type: itemType })
      } else {
        addToComparison(item, itemType)
      }
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="py-8 px-4 md:px-6" style={{ backgroundColor: "#1e293b", color: "#ffffff" }}>
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

          <Card>
            <CardHeader>
              <CardTitle>{activeTab === "organizations" ? "Organizations" : "Communities"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {activeTab === "organizations"
                  ? githubOrgData.length || "Loading..."
                  : githubCommunityData.length || "Loading..."}
              </div>
              <p className="text-xs text-muted-foreground">
                {activeTab === "organizations" ? "Total organizations" : "Total communities"}
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
                  <BarChart data={githubCountryData.slice(0, 5)} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={false} axisLine={false} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="merchantCount" fill="#ea580c" />
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
                    <Pie
                      data={organizationChartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                    >
                      {organizationChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
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
                <Card
                  key={index}
                  className={`hover:bg-muted/50 transition-colors cursor-pointer ${
                    isItemSelected(country, "country") ? "ring-2 ring-orange-500 bg-orange-50" : ""
                  }`}
                  onClick={(e) => handleItemClick(country, "country", e)}
                >
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
                          {country.url_alias && (
                            <Badge variant="secondary" className="text-xs mt-1">
                              View on BTCMap
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-orange-600">
                          {(country.merchantCount || 0).toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">merchants</div>
                        {isItemSelected(country, "country") && (
                          <div className="text-xs text-orange-600 mt-1">✓ Selected</div>
                        )}
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
                <Card
                  key={index}
                  className={`hover:bg-muted/50 transition-colors cursor-pointer ${
                    isItemSelected(org, "organization") ? "ring-2 ring-orange-500 bg-orange-50" : ""
                  }`}
                  onClick={(e) => handleItemClick(org, "organization", e)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className="text-lg px-3 py-1">
                          #{index + 1}
                        </Badge>
                        <div>
                          <h3 className="font-semibold text-lg">{org.name}</h3>
                          <Badge variant="secondary" className="text-xs mt-1">
                            View on BTCMap
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-orange-600">
                          {(org.merchantCount || 0).toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">merchants</div>
                        {isItemSelected(org, "organization") && (
                          <div className="text-xs text-orange-600 mt-1">✓ Selected</div>
                        )}
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
                  <Card
                    key={index}
                    className={`hover:bg-muted/50 transition-colors cursor-pointer ${
                      isItemSelected(community, "community") ? "ring-2 ring-orange-500 bg-orange-50" : ""
                    }`}
                    onClick={(e) => handleItemClick(community, "community", e)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Badge variant="outline" className="text-lg px-3 py-1">
                            #{index + 1}
                          </Badge>
                          <div>
                            <h3 className="font-semibold text-lg">{community.name}</h3>
                            {community.url_alias && (
                              <Badge variant="secondary" className="text-xs mt-1">
                                View on BTCMap
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-orange-600">
                            {(community.merchantCount || 0).toLocaleString()}
                          </div>
                          <div className="text-sm text-muted-foreground">merchants</div>
                          {isItemSelected(community, "community") && (
                            <div className="text-xs text-orange-600 mt-1">✓ Selected</div>
                          )}
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
                <Card
                  key={index}
                  className={`hover:bg-muted/50 transition-colors cursor-pointer ${
                    isItemSelected(item, "global") ? "ring-2 ring-orange-500 bg-orange-50" : ""
                  }`}
                  onClick={(e) => handleItemClick(item, "global", e)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className="text-lg px-3 py-1">
                          #{index + 1}
                        </Badge>
                        <div>
                          <h3 className="font-semibold text-lg">{item.url_alias || "Unknown Location"}</h3>
                          {item.url_alias && (
                            <Badge variant="secondary" className="text-xs mt-1">
                              View on BTCMap
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-orange-600">
                          {(item.merchantCount || 0).toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">merchants</div>
                        {isItemSelected(item, "global") && (
                          <div className="text-xs text-orange-600 mt-1">✓ Selected</div>
                        )}
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
                ×
              </Button>
            </div>
            <div className="space-y-2">
              {selectedItems.map((item, index) => (
                <div
                  key={`${item.type}-${index}-${item.merchantCount}`}
                  className="flex items-center justify-between p-2 bg-orange-50 rounded text-sm"
                >
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <Badge variant="outline" className="text-xs flex-shrink-0">
                      {item.type}
                    </Badge>
                    <span className="truncate">
                      {"name" in item && item.name
                        ? item.name
                        : "url_alias" in item && item.url_alias
                          ? item.url_alias
                          : "Unknown"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="font-medium text-orange-600">{item.merchantCount.toLocaleString()}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromComparison(item)}
                      className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                    >
                      ×
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t">
              <Button onClick={handleViewOnBTCMap} variant="outline" size="sm" className="w-full bg-transparent">
                <ExternalLink className="h-4 w-4 mr-2" />
                View All on BTCMap
              </Button>
            </div>
          </div>
        )}

        {/* Full Screen Chart Modal */}
        {fullScreenChart && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">
                  {fullScreenChart === "countries" ? "Top Countries by Merchant Count" : "Organization Distribution"}
                </h2>
                <Button variant="ghost" onClick={() => setFullScreenChart(null)}>
                  ×
                </Button>
              </div>
              <div className="w-full">
                {fullScreenChart === "countries" ? (
                  <ResponsiveContainer width="100%" height={500}>
                    <BarChart
                      data={githubCountryData.slice(0, 10)}
                      margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Bar dataKey="merchantCount" fill="#ea580c" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <ResponsiveContainer width="100%" height={500}>
                    <PieChart>
                      <Pie
                        data={organizationChartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                      >
                        {organizationChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
