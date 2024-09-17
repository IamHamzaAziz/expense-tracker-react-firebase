import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowUpIcon, ArrowDown } from 'lucide-react'

function AllTransactions() {
    return (
        <div className='container mx-auto px-4 py-8'>
            <div className="text-center mb-8">
                <p className="text-xl text-muted-foreground">
                    Here is the list of all your transactions
                </p>
            </div>

            <div className="space-y-6">
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
            
            </div>
        </div>
    )
}

export default AllTransactions