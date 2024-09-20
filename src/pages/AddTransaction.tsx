import React, { useState, useEffect } from 'react'
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
import { db } from '@/config/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';

const AddTransaction = () => {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("");
    const [loading, setLoading] = useState(false)

    const [user, setUser] = useState("")

    const { toast } = useToast()

    const handleTypeSelect = (type: string) => {
        setType(type);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user.uid)
            }
        })

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true)
        e.preventDefault();

        if (!title || !amount || !type) {
            toast({
                variant: "destructive",
                title: "Fill all fields"
            })
            setLoading(false)
            return
        }

        try {
            const transCollection = collection(db, 'transactions');

            await addDoc(transCollection, {
                title: title,
                amount: Number(amount),
                type: type,
                user: user
            })

            setLoading(false)

            toast({
                variant: 'default',
                title: "Transaction added successfully."
            })

        } catch (error) {
            toast({
                variant: 'destructive',
                title: "Unable to add transaction"
            })
            setLoading(false)
            console.error(error)
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-lg bg-white p-8 rounded-md shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">Add Transaction</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Title of Transaction
                        </label>
                        <Input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter transaction title"
                            className="mt-1 w-full"
                        />
                    </div>

                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                            Amount
                        </label>
                        <Input
                            id="amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount"
                            className="mt-1 w-full"
                        />
                    </div>

                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                            Transaction Type
                        </label>
                        <Select onValueChange={handleTypeSelect}>
                            <SelectTrigger className="w-full mt-1">
                                <SelectValue placeholder="Select transaction type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem
                                        value="income"
                                    >
                                        Income
                                    </SelectItem>
                                    <SelectItem
                                        value="expense"
                                    >
                                        Expense
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {
                        loading ? (
                            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                                Adding Transaction...
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                                Add Transaction
                            </Button>
                        )
                    }
                </form>
            </div>

            <Toaster />
        </div>
    )
}

export default AddTransaction