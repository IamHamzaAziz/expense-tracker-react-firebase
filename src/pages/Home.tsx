import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon, DollarSignIcon } from "lucide-react"
import { auth } from "@/config/firebase"
import { useEffect, useContext } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { UserContext } from "@/context/UserContext"


export default function Home() {

  const { setUserId } = useContext(UserContext)


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid)
      } else {
        setUserId('')
      }
    })

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">
          Hello, Hamza
        </h1>
        <p className="text-xl text-muted-foreground">
          Here's a quick overview of your finances
        </p>
      </div>
      <div className="space-y-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium text-white">
              Total Balance
            </CardTitle>
            <DollarSignIcon className="h-6 w-6 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">$7000</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-red-500 to-red-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium text-white">
              Total Expenses
            </CardTitle>
            <ArrowDownIcon className="h-6 w-6 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">$2000</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-green-500 to-green-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium text-white">
              Total Income
            </CardTitle>
            <ArrowUpIcon className="h-6 w-6 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">$5000</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}