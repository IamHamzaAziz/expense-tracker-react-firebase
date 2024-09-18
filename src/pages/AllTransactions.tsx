import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowUpIcon, ArrowDown } from 'lucide-react'
import { useState, useEffect, useContext } from 'react'
import { db } from '@/config/firebase'
import { getDocs, collection, query, where } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { UserContext } from '@/context/UserContext'
import { auth } from '@/config/firebase'

interface Item {
    id: string,
    title: string,
    amount: number,
    type: string,
    user: string
}

function AllTransactions() {
    const [transactions, setTransactions] = useState<Item[]>([])

    const { userId, setUserId } = useContext(UserContext)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid)
            } else {
                setUserId('')
            }
        })

        fetchTransactions()
    }, [])

    async function fetchTransactions() {
        const transactionsCollection = collection(db, 'transactions')

        const q = query(transactionsCollection, where('user', '==', userId))

        const snapshot = await getDocs(q)
        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        })) as Item[]

        setTransactions(data)
    }

    return (
        <div className='container mx-auto px-4 py-8'>
            <div className="text-center mb-8">
                <p className="text-xl text-muted-foreground">
                    Here is the list of all your transactions
                </p>
            </div>

            {
                transactions.length === 0 ? (
                    <div className="text-center text-xl text-muted-foreground">
                        No transactions found
                    </div>
                ) : (
                    <div className="space-y-6">
                        {
                            transactions.map(transaction => {
                                const { id, title, amount, type } = transaction

                                if (type === 'income') {
                                    return (
                                        <Card className="bg-gradient-to-r from-green-500 to-green-700" key={id}>
                                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                                <CardTitle className="text-lg font-medium text-white">
                                                    {title}
                                                </CardTitle>
                                                <ArrowDown className="h-6 w-6 text-white" />
                                            </CardHeader>
                                            <CardContent>
                                                <div className="text-xl font-bold text-white">${amount.toString()}</div>
                                            </CardContent>
                                        </Card>
                                    )
                                }
                                else {
                                    return (
                                        <Card className="bg-gradient-to-r from-red-500 to-red-700" key={id}>
                                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                                <CardTitle className="text-lg font-medium text-white">
                                                    { title }
                                                </CardTitle>
                                                <ArrowUpIcon className="h-6 w-6 text-white" />
                                            </CardHeader>
                                            <CardContent>
                                                <div className="text-xl font-bold text-white">${amount.toString()}</div>
                                            </CardContent>
                                        </Card>
                                    )
                                }
                            })
                        }
                    </div>
                )
            }

            {/* <div className="space-y-6">
                <Card className="bg-gradient-to-r from-green-500 to-green-700">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg font-medium text-white">
                            August 2024 Pay - Income
                        </CardTitle>
                        <ArrowDown className="h-6 w-6 text-white" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-bold text-white">$2000</div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-red-500 to-red-700">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg font-medium text-white">
                            August 2024 Pay - Income
                        </CardTitle>
                        <ArrowUpIcon className="h-6 w-6 text-white" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-bold text-white">$2000</div>
                    </CardContent>
                </Card>

            </div> */}
        </div>
    )
}

export default AllTransactions