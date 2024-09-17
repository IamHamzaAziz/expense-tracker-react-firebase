import * as React from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <nav className="bg-background border-b w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <span className="text-2xl font-bold text-primary">
                            Expensy
                        </span>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <span
                                className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                            >
                                Add Transaction
                            </span>
                            <span
                                className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                            >
                                View All Transactions
                            </span>
                            <Button>Login</Button>
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
                                    <span className="w-full">
                                        Add Transaction
                                    </span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span className="w-full">
                                        View All Transactions
                                    </span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Button className="w-full">Login</Button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </nav>
    )
}