import * as React from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "react-router-dom"

export default function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <nav className="bg-background border-b w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to={'/'} className="text-2xl font-bold text-primary">
                            Expensy
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link to={'/add-transactions'}
                                className="text-muted-foreground hover:text-primary py-2 rounded-md text-sm font-medium cursor-pointer"
                            >
                                Add Transaction
                            </Link>
                            <Link to={'/all-transactions'}
                                className="text-muted-foreground hover:text-primary py-2 rounded-md text-sm font-medium"
                            >
                                View All Transactions
                            </Link>
                            <Link to={'/login'}>
                                <Button className="bg-blue-600 hover:bg-blue-700">Login</Button>
                            </Link>
                            <Link to={'/signup'}>
                                <Button className="bg-green-700 hover:bg-green-800">Signup</Button>
                            </Link>
                        </div>
                    </div>
                    <div className="md:hidden flex items-center">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon" onClick={() => setIsOpen(!isOpen)}>
                                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[200px]">
                                <DropdownMenuItem>
                                    <Link to={'/add-transactions'} className="w-full">
                                        Add Transaction
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link to={'/all-transactions'} className="w-full">
                                        View All Transactions
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link to={'/login'} className="w-full">
                                        <Button className="w-full bg-blue-600 hover:bg-blue-700">Login</Button>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link to={'/signup'} className="w-full">
                                        <Button className="w-full bg-green-700 hover:bg-green-800">Signup</Button>
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </nav>
    )
}