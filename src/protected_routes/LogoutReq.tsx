import React, { useEffect, useContext, useState } from 'react'
import { UserContext } from '@/context/UserContext'
import { auth } from '@/config/firebase'
import { onAuthStateChanged } from 'firebase/auth'

const LogoutReq = ({ children }: { children: React.ReactNode }) => {
    const { userId, setUserId } = useContext(UserContext)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid)
            } else {
                setUserId('')
            }
            setLoading(false)
        })

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [])

    if (loading) {
        return (
            <div className='container mx-auto px-4 py-8'>
                <div className="text-center">
                    <p className="text-xl">Loading...</p>
                </div>
            </div>
        )
    }

    return (
        !userId ? children : (
            <div className='container mx-auto px-4 py-8'>
                <div className="text-center mb-8">
                    <p className="text-xl text-muted-foreground">
                        You are logged in
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Please logout to access this page
                    </p>
                </div>
            </div>
        )
    )
}

export default LogoutReq