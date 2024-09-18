import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon, DollarSignIcon } from "lucide-react"
import { auth, db } from "@/config/firebase"
import { useEffect, useContext, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { UserContext } from "@/context/UserContext"
import { collection, getDocs, query, where } from "firebase/firestore"

interface Item {
  id: string,
  title: string,
  amount: number,
  type: 'income' | 'expense',
  user: string,
}


export default function Home() {

  const { userId, setUserId } = useContext(UserContext)
  const [totalIncome, setTotalIncome] = useState<number>(0)
  const [totalExpenses, setTotalExpenses] = useState<number>(0)
  const [totalAmount, setTotalAmount] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)


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

  useEffect(() => {
    if (userId) {
      fetchStats()
    }
  }, [userId])

  async function fetchStats() {
    setLoading(true)
    const transactionsCollection = collection(db, 'transactions')
    const q = query(transactionsCollection, where('user', '==', userId))

    const snapshot = await getDocs(q)
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    })) as Item[]

    // Calculate total incomes, expenses, and combined total
    let income = 0
    let expenses = 0

    data.forEach(transaction => {
      if (transaction.type === 'income') {
        income += transaction.amount
      } else if (transaction.type === 'expense') {
        expenses += transaction.amount
      }
    })

    setTotalIncome(income)
    setTotalExpenses(expenses)
    setTotalAmount(income - expenses) // Net total
    setLoading(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <p className="text-xl text-muted-foreground">
          Here's a quick overview of your finances
        </p>
      </div>
      <div className="space-y-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium text-white">
              Total Amount
            </CardTitle>
            <DollarSignIcon className="h-6 w-6 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">
              {
                loading ? 'Loading...' : `$${totalAmount}`
              }
            </div>
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
            <div className="text-3xl font-bold text-white">
              {
                loading ? 'Loading...' : `$${totalIncome}`
              }
            </div>
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
            <div className="text-3xl font-bold text-white">
              {
                loading ? 'Loading...' : `$${totalExpenses}`
              }
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}