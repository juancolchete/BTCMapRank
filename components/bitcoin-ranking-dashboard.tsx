"use client"

import { Button } from "@/components/ui/button"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Search, Globe, Expand, BarChart3, Check, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

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
  const [selectedItems, setSelectedItems] = useState<any[]>([])
  const [showComparison, setShowComparison] = useState(false)

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <CardHeader>
              <CardTitle>Top Country</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {githubCountryData.length > 0
                  ? `🏆 ${githubCountryData[0].name}`
                  : isLoading
                    ? "Loading..."
                    : `${countryData[0].flag} ${countryData[0].name}`}
              </div>
              <p className="text-xs text-muted-foreground">
                {githubCountryData.length > 0
                  ? `${githubCountryData[0].merchantCount.toLocaleString()} merchants`
                  : isLoading
                    ? "Fetching data..."
                    : `${countryData[0].merchants.toLocaleString()} merchants`}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {activeTab === "global"
                  ? "Global Dominance"
                  : activeTab === "organizations"
                    ? "Organizations"
                    : activeTab === "countries"
                      ? "Country Dominance"
                      : "Communities"}
                {(activeTab === "global" || activeTab === "countries") && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Expand className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh]">
                      <DialogHeader>
                        <DialogTitle>
                          {activeTab === "global" ? "Global Dominance" : "Country Dominance"} - Full Screen
                        </DialogTitle>
                      </DialogHeader>
                      <div className="w-full h-[70vh] flex items-center justify-center">
                        <div className="w-full max-w-2xl space-y-6">
                          <div className="text-lg font-medium text-center text-muted-foreground">
                            Merchant Count Distribution
                          </div>
                          <div className="relative">
                            <div className="w-full bg-gray-200 rounded-full h-16 relative overflow-hidden">
                              {(() => {
                                const data = activeTab === "global" ? githubRankingData : githubCountryData
                                const first = data[0]?.merchantCount || 0
                                const second = data[1]?.merchantCount || 0
                                const total = first + second
                                const firstPercentage = total > 0 ? (first / total) * 100 : 50
                                const secondPercentage = total > 0 ? (second / total) * 100 : 50

                                return (
                                  <>
                                    <div
                                      className="bg-orange-600 h-16 absolute left-0 top-0 transition-all duration-500 flex items-center justify-center"
                                      style={{ width: `${firstPercentage}%` }}
                                    >
                                      <span
                                        className="text-white text-xl font-bold px-2"
                                        style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.7)" }}
                                      >
                                        {firstPercentage.toFixed(1)}%
                                      </span>
                                    </div>
                                    <div
                                      className="bg-orange-400 h-16 absolute top-0 transition-all duration-500 flex items-center justify-center"
                                      style={{
                                        left: `${firstPercentage}%`,
                                        width: `${secondPercentage}%`,
                                      }}
                                    >
                                      <span
                                        className="text-white text-xl font-bold px-2"
                                        style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.7)" }}
                                      >
                                        {secondPercentage.toFixed(1)}%
                                      </span>
                                    </div>
                                  </>
                                )
                              })()}
                            </div>
                            <div className="flex justify-between mt-4">
                              <div className="text-lg font-medium text-orange-600 flex-1 mr-4">
                                #{1}{" "}
                                {activeTab === "global"
                                  ? githubRankingData[0]?.url_alias
                                  : githubCountryData[0]?.name || "First"}
                                <div className="text-sm text-muted-foreground">
                                  {(
                                    (activeTab === "global"
                                      ? githubRankingData[0]?.merchantCount
                                      : githubCountryData[0]?.merchantCount) || 0
                                  ).toLocaleString()}{" "}
                                  merchants
                                </div>
                              </div>
                              <div className="text-lg font-medium text-orange-400 flex-1 ml-4 text-right">
                                #{2}{" "}
                                {activeTab === "global"
                                  ? githubRankingData[1]?.url_alias
                                  : githubCountryData[1]?.name || "Second"}
                                <div className="text-sm text-muted-foreground">
                                  {(
                                    (activeTab === "global"
                                      ? githubRankingData[1]?.merchantCount
                                      : githubCountryData[1]?.merchantCount) || 0
                                  ).toLocaleString()}{" "}
                                  merchants
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-orange-600">
                              {(() => {
                                const data = activeTab === "global" ? githubRankingData : githubCountryData
                                const first = data[0]?.merchantCount || 0
                                const second = data[1]?.merchantCount || 1
                                return ((first / second) * 100).toFixed(1)
                              })()}%
                            </div>
                            <div className="text-sm text-muted-foreground">dominance ratio</div>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {(activeTab === "global" && githubRankingData.length >= 2) ||
              (activeTab === "countries" && githubCountryData.length >= 2) ? (
                <div className="space-y-3">
                  <div className="text-sm font-medium text-center text-muted-foreground">
                    Merchant Count Distribution
                  </div>
                  <div className="relative">
                    <div className="w-full bg-gray-200 rounded-full h-8 relative overflow-hidden">
                      {(() => {
                        const data = activeTab === "global" ? githubRankingData : githubCountryData
                        const first = data[0]?.merchantCount || 0
                        const second = data[1]?.merchantCount || 0
                        const total = first + second
                        const firstPercentage = total > 0 ? (first / total) * 100 : 50
                        const secondPercentage = total > 0 ? (second / total) * 100 : 50

                        return (
                          <>
                            {/* First place segment */}
                            <div
                              className="bg-orange-600 h-8 absolute left-0 top-0 transition-all duration-500 flex items-center justify-center"
                              style={{ width: `${firstPercentage}%` }}
                            >
                              <span
                                className="text-white text-sm font-bold px-1"
                                style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
                              >
                                {firstPercentage.toFixed(1)}%
                              </span>
                            </div>
                            {/* Second place segment */}
                            <div
                              className="bg-orange-400 h-8 absolute top-0 transition-all duration-500 flex items-center justify-center"
                              style={{
                                left: `${firstPercentage}%`,
                                width: `${secondPercentage}%`,
                              }}
                            >
                              <span
                                className="text-white text-sm font-bold px-1"
                                style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
                              >
                                {secondPercentage.toFixed(1)}%
                              </span>
                            </div>
                          </>
                        )
                      })()}
                    </div>

                    {/* Labels below the bar */}
                    <div className="flex justify-between mt-2">
                      <div className="text-sm font-medium text-orange-600 flex-1 mr-2">
                        #{1}{" "}
                        {activeTab === "global"
                          ? githubRankingData[0]?.url_alias
                          : githubCountryData[0]?.name || "First"}
                        <div className="text-xs text-muted-foreground">
                          {(
                            (activeTab === "global"
                              ? githubRankingData[0]?.merchantCount
                              : githubCountryData[0]?.merchantCount) || 0
                          ).toLocaleString()}{" "}
                          merchants
                        </div>
                      </div>
                      <div className="text-sm font-medium text-orange-400 flex-1 ml-2 text-right">
                        #{2}{" "}
                        {activeTab === "global"
                          ? githubRankingData[1]?.url_alias
                          : githubCountryData[1]?.name || "Second"}
                        <div className="text-xs text-muted-foreground">
                          {(
                            (activeTab === "global"
                              ? githubRankingData[1]?.merchantCount
                              : githubCountryData[1]?.merchantCount) || 0
                          ).toLocaleString()}{" "}
                          merchants
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-600">
                      {(() => {
                        const data = activeTab === "global" ? githubRankingData : githubCountryData
                        const first = data[0]?.merchantCount || 0
                        const second = data[1]?.merchantCount || 1
                        return ((first / second) * 100).toFixed(1)
                      })()}%
                    </div>
                    <div className="text-xs text-muted-foreground">dominance ratio</div>
                  </div>
                </div>
              ) : (activeTab === "global" && githubRankingData.length === 1) ||
                (activeTab === "countries" && githubCountryData.length === 1) ? (
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">100%</div>
                  <p className="text-xs text-muted-foreground">
                    {activeTab === "global" ? githubRankingData[0]?.url_alias : githubCountryData[0]?.name || "Top"}
                    leads
                  </p>
                </div>
              ) : (activeTab === "global" || activeTab === "countries") &&
                (isLoading ||
                  (activeTab === "global" ? githubRankingData.length === 0 : githubCountryData.length === 0)) ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-600"></div>
                  <span className="text-sm">Loading...</span>
                </div>
              ) : (
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
              )}

              {activeTab !== "global" && activeTab !== "countries" && (
                <p className="text-xs text-muted-foreground">
                  {activeTab === "organizations"
                    ? githubOrgData.length > 0
                      ? "Active organizations"
                      : "Loading organizations..."
                    : githubCommunityData.length > 0
                      ? "Active communities"
                      : "Loading communities..."}
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Top Countries by Merchant Count
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Expand className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh]">
                    <DialogHeader>
                      <DialogTitle>Top Countries by Merchant Count - Full Screen</DialogTitle>
                    </DialogHeader>
                    <div className="w-full h-[70vh]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            dataKey="name"
                            tick={{ fontSize: 12 }}
                            angle={-45}
                            textAnchor="end"
                            height={60}
                            interval={0}
                          />
                          <YAxis />
                          <Tooltip
                            formatter={(value: any, name: any, props: any) => [value.toLocaleString(), "Merchants"]}
                            labelFormatter={(label: any, payload: any) => {
                              if (payload && payload[0]) {
                                return `${payload[0].payload.flag} ${payload[0].payload.name}`
                              }
                              return label
                            }}
                          />
                          <Bar
                            dataKey="merchants"
                            shape={({ payload, ...props }) => {
                              if (!payload) return null
                              const { x, y, width, height } = props
                              return (
                                <g>
                                  {/* Background bar with flag pattern */}
                                  <rect
                                    x={x}
                                    y={y}
                                    width={width}
                                    height={height}
                                    fill="url(#flagPattern)"
                                    stroke="#ea580c"
                                    strokeWidth={2}
                                  />
                                  {/* Flag emoji repeated as pattern */}
                                  <text
                                    x={x + width / 2}
                                    y={y + height / 2}
                                    textAnchor="middle"
                                    fontSize={Math.min(width / 2, height / 3, 20)}
                                    fill="white"
                                    textShadow="1px 1px 2px rgba(0,0,0,0.8)"
                                  >
                                    {payload.flag}
                                  </text>
                                </g>
                              )
                            }}
                          />
                          <defs>
                            <pattern id="flagPattern" patternUnits="userSpaceOnUse" width="40" height="40">
                              <rect width="40" height="40" fill="#ea580c" opacity="0.3" />
                            </pattern>
                          </defs>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={false} axisLine={false} />
                  <YAxis />
                  <Tooltip
                    formatter={(value: any, name: any, props: any) => [value.toLocaleString(), "Merchants"]}
                    labelFormatter={(label: any, payload: any) => {
                      if (payload && payload[0]) {
                        return `${payload[0].payload.flag} ${payload[0].payload.name}`
                      }
                      return label
                    }}
                  />
                  <Bar
                    dataKey="merchants"
                    shape={({ payload, ...props }) => {
                      if (!payload) return null
                      const { x, y, width, height } = props
                      return (
                        <g>
                          {/* Background bar with flag pattern */}
                          <rect
                            x={x}
                            y={y}
                            width={width}
                            height={height}
                            fill="url(#flagPatternLarge)"
                            stroke="#ea580c"
                            strokeWidth={3}
                          />
                          {/* Flag emoji repeated as pattern */}
                          <text
                            x={x + width / 2}
                            y={y + height / 2}
                            textAnchor="middle"
                            fontSize={Math.min(width / 3, height / 4, 32)}
                            fill="white"
                            textShadow="2px 2px 4px rgba(0,0,0,0.8)"
                          >
                            {payload.flag}
                          </text>
                        </g>
                      )
                    }}
                  />
                  <defs>
                    <pattern id="flagPatternLarge" patternUnits="userSpaceOnUse" width="60" height="60">
                      <rect width="60" height="60" fill="#ea580c" opacity="0.3" />
                    </pattern>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Organization Distribution
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Expand className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh]">
                    <DialogHeader>
                      <DialogTitle>Organization Distribution - Full Screen</DialogTitle>
                    </DialogHeader>
                    <div className="w-full h-[70vh]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={organizationChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={150}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {organizationChartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value: any) => [value.toLocaleString(), "Merchants"]} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={organizationChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {organizationChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => [value.toLocaleString(), "Merchants"]} />
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
            <TabsTrigger value="countries">Countries</TabsTrigger>
            <TabsTrigger value="organizations">Organizations</TabsTrigger>
            <TabsTrigger value="communities">Communities</TabsTrigger>
            <TabsTrigger value="global">Global</TabsTrigger>
          </TabsList>

          <TabsContent value="countries" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Button
                  variant={showComparison ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowComparison(!showComparison)}
                  className="bg-orange-600 hover:bg-orange-700 text-white"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Compare ({selectedItems.length})
                </Button>
                {selectedItems.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={() => setSelectedItems([])}>
                    Clear Selection
                  </Button>
                )}
              </div>
            </div>

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
                {filteredGithubCountries.map((country) => {
                  const isSelected = selectedItems.some((selected) => selected.name === country.name)

                  return (
                    <Card
                      key={country.rank}
                      className={`hover:bg-muted/50 transition-colors cursor-pointer ${
                        isSelected ? "ring-2 ring-orange-500 bg-orange-50" : ""
                      }`}
                      onClick={(e) => {
                        if (e.ctrlKey || e.metaKey) {
                          if (country.url_alias) {
                            window.open(`https://btcmap.org/country/${country.url_alias}`, "_blank")
                          }
                        } else {
                          if (isSelected) {
                            setSelectedItems((prev) => prev.filter((selected) => selected.name !== country.name))
                          } else {
                            setSelectedItems((prev) => [...prev, { ...country, type: "country" }])
                          }
                        }
                      }}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Badge variant="outline" className="text-lg px-3 py-1">
                              #{country.rank}
                            </Badge>
                            {isSelected && (
                              <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
                                <Check className="h-3 w-3 text-white" />
                              </div>
                            )}
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">{countryFlagMap[country.name] || "🏳️"}</span>
                              <div>
                                <h3 className="font-semibold text-lg">{country.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                  Population: {(country.population || 0).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-orange-600">
                              {(country.merchantCount || 0).toLocaleString()}
                            </div>
                            <div className="text-sm text-muted-foreground">merchants</div>
                            <div className="text-sm font-medium text-orange-600">
                              {(((country.merchantCount / country.population) * 1000) / 10).toFixed(5)}%
                            </div>
                            {country.url_alias && (
                              <Badge variant="secondary" className="mt-1 text-xs">
                                View on BTCMap (Ctrl+Click)
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="organizations" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Button
                  variant={showComparison ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowComparison(!showComparison)}
                  className="bg-orange-600 hover:bg-orange-700 text-white"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Compare ({selectedItems.length})
                </Button>
                {selectedItems.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={() => setSelectedItems([])}>
                    Clear Selection
                  </Button>
                )}
              </div>
            </div>

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
                {filteredGithubOrgs.map((org) => {
                  const isSelected = selectedItems.some((selected) => selected.name === org.name)

                  return (
                    <Card
                      key={org.rank}
                      className={`hover:bg-muted/50 transition-colors cursor-pointer ${
                        isSelected ? "ring-2 ring-orange-500 bg-orange-50" : ""
                      }`}
                      onClick={(e) => {
                        if (e.ctrlKey || e.metaKey) {
                          if (org.name) {
                            window.open(`https://btcmap.org/communities/${encodeURIComponent(org.name)}`, "_blank")
                          }
                        } else {
                          if (isSelected) {
                            setSelectedItems((prev) => prev.filter((selected) => selected.name !== org.name))
                          } else {
                            setSelectedItems((prev) => [...prev, { ...org, type: "organization" }])
                          }
                        }
                      }}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Badge variant="outline" className="text-lg px-3 py-1">
                              #{org.rank}
                            </Badge>
                            {isSelected && (
                              <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
                                <Check className="h-3 w-3 text-white" />
                              </div>
                            )}
                            <div>
                              <h3 className="font-semibold text-lg">{org.name}</h3>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-orange-600">
                              {(org.merchantCount || 0).toLocaleString()}
                            </div>
                            <div className="text-sm text-muted-foreground">merchants</div>
                            <Badge variant="secondary" className="mt-1 text-xs">
                              View on BTCMap (Ctrl+Click)
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="communities" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Button
                  variant={showComparison ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowComparison(!showComparison)}
                  className="bg-orange-600 hover:bg-orange-700 text-white"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Compare ({selectedItems.length})
                </Button>
                {selectedItems.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={() => setSelectedItems([])}>
                    Clear Selection
                  </Button>
                )}
              </div>
            </div>

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

                <div className="grid gap-4">
                  {filteredGithubCommunities.map((community) => {
                    const isSelected = selectedItems.some((selected) => selected.name === community.name)

                    return (
                      <Card
                        key={community.rank}
                        className={`hover:bg-muted/50 transition-colors cursor-pointer ${
                          isSelected ? "ring-2 ring-orange-500 bg-orange-50" : ""
                        }`}
                        onClick={(e) => {
                          if (e.ctrlKey || e.metaKey) {
                            if (community.url_alias) {
                              window.open(`https://btcmap.org/community/${community.url_alias}`, "_blank")
                            }
                          } else {
                            if (isSelected) {
                              setSelectedItems((prev) => prev.filter((selected) => selected.name !== community.name))
                            } else {
                              setSelectedItems((prev) => [...prev, { ...community, type: "community" }])
                            }
                          }
                        }}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <Badge variant="outline" className="text-lg px-3 py-1">
                                #{community.rank}
                              </Badge>
                              {isSelected && (
                                <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
                                  <Check className="h-3 w-3 text-white" />
                                </div>
                              )}
                              <div>
                                <h3 className="font-semibold text-lg">{community.name}</h3>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-orange-600">
                                {(community.merchantCount || 0).toLocaleString()}
                              </div>
                              <div className="text-sm text-muted-foreground">merchants</div>
                              {community.url_alias && (
                                <Badge variant="secondary" className="mt-1 text-xs">
                                  View on BTCMap (Ctrl+Click)
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="global" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Button
                  variant={showComparison ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowComparison(!showComparison)}
                  className="bg-orange-600 hover:bg-orange-700 text-white"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Compare ({selectedItems.length})
                </Button>
                {selectedItems.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={() => setSelectedItems([])}>
                    Clear Selection
                  </Button>
                )}
              </div>
            </div>

            {isLoading && (
              <div className="text-center py-8">
                <div className="text-lg">Loading global ranking data...</div>
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
                {filteredGlobal.map((item, index) => {
                  const isSelected = selectedItems.some((selected) => selected.url_alias === item.url_alias)

                  return (
                    <Card
                      key={index}
                      className={`hover:bg-muted/50 transition-colors cursor-pointer ${
                        isSelected ? "ring-2 ring-orange-500 bg-orange-50" : ""
                      }`}
                      onClick={() => {
                        if (isSelected) {
                          setSelectedItems((prev) => prev.filter((selected) => selected.url_alias !== item.url_alias))
                        } else {
                          setSelectedItems((prev) => [...prev, { ...item, type: "global" }])
                        }
                      }}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Badge variant="outline" className="text-lg px-3 py-1">
                              #{index + 1}
                            </Badge>
                            {isSelected && (
                              <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
                                <Check className="h-3 w-3 text-white" />
                              </div>
                            )}
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
                  )
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {showComparison && selectedItems.length > 0 && (
        <div className="fixed bottom-6 right-6 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-md z-50">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-lg">Compare Rankings</h3>
            <Button variant="ghost" size="sm" onClick={() => setShowComparison(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto">
            {selectedItems.map((item, index) => (
              <div
                key={`${item.type}-${item.name || item.url_alias}`}
                className="flex items-center justify-between p-2 bg-orange-50 rounded"
              >
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    #{item.rank || index + 1}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {item.type}
                  </Badge>
                  <span className="font-medium text-sm">{item.name || item.url_alias}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-orange-600">
                    {(item.merchantCount || 0).toLocaleString()}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setSelectedItems((prev) =>
                        prev.filter((selected) => selected.name !== item.name && selected.url_alias !== item.url_alias),
                      )
                    }
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {selectedItems.length > 1 && (
            <div className="mt-3 pt-3 border-t">
              <div className="text-xs text-muted-foreground">
                Difference:{" "}
                {Math.abs(
                  (selectedItems[0]?.merchantCount || 0) - (selectedItems[1]?.merchantCount || 0),
                ).toLocaleString()}{" "}
                merchants
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
