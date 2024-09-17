import React, { useState } from 'react'
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button';

const AddTransaction = () => {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle transaction logic here
        const transaction = {
            title,
            amount: parseInt(amount),
            type,
        };
        console.log(transaction); // Use this data as needed
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-lg bg-white p-8 rounded-md shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">Add Transaction</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title input */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Title of Transaction
                        </label>
                        <Input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            placeholder="Enter transaction title"
                            className="mt-1 w-full"
                        />
                    </div>

                    {/* Amount input */}
                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                            Amount
                        </label>
                        <Input
                            id="amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                            placeholder="Enter amount"
                            className="mt-1 w-full"
                        />
                    </div>

                    {/* Category Select */}
                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                            Transaction Type
                        </label>
                        <Select>
                            <SelectTrigger className="w-full mt-1">
                                <SelectValue placeholder="Select transaction type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="income" className='cursor-pointer' onClick={() => setType("income")}>Income</SelectItem>
                                    <SelectItem value="expense" className='cursor-pointer' onClick={() => setType("expense")}>Expense</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                        Add Transaction
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default AddTransaction