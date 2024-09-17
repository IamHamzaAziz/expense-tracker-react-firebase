import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon, DollarSignIcon } from "lucide-react"

export default function Home() {
  // This would typically come from your authentication context or state management
  const userName = "Hamza"

  // These values would typically come from your API or state management
  const totalBalance = 5000
  const totalExpenses = 2000
  const totalIncome = 7000

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">
          Hello, {userName}
        </h1>
        <p className="text-xl text-muted-foreground">
          Here's a quick overview of your finances today.
        </p>
      </div>
      <div className="space-y-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium text-white">
              Total Balance
            </CardTitle>
            <DollarSignIcon className="h-6 w-6 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">${totalBalance.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-red-500 to-red-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium text-white">
              Total Expenses
            </CardTitle>
            <ArrowDownIcon className="h-6 w-6 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">${totalExpenses.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-green-500 to-green-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium text-white">
              Total Income
            </CardTitle>
            <ArrowUpIcon className="h-6 w-6 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">${totalIncome.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}