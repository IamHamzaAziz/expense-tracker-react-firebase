import React from 'react'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { UserContext } from '@/context/UserContext';
import { auth } from '@/config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const { toast } = useToast()

  const navigate = useNavigate()

  const { setUserId } = React.useContext(UserContext)

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email || !password || !password2) {
      toast({
        variant: "destructive",
        title: "Fill all fields"
      })

      return
    }

    if (password!== password2) {
      toast({
        variant: "destructive",
        title: "Passwords do not match"
      })
      return
    }

    if (password.length < 6) {
      toast({
        variant: "destructive",
        title: "Password must be at least 6 characters long"
      })
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        variant: "destructive",
        title: "Invalid email address"
      })
      return
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password)
      const res = await signInWithEmailAndPassword(auth, email, password)
      setUserId(res.user.uid)
      
      navigate('/')
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        toast({
          variant: "destructive",
          title: "Email already in use"
        })
        return
      }

      toast({
        variant: "destructive",
        title: "Unable to Signup"
      })
      console.log(error)
    }
  };

  const handleGoogleSignup = () => {
    // Handle Signup with Google logic
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-md shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Signup to Expensy</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              type="email"
              id="email"
              className="mt-1 w-full"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              type="password"
              id="password"
              className="mt-1 w-full"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="re-password" className="block text-sm font-medium text-gray-700">
              Re Password
            </label>
            <Input
              type="password"
              id="re-password"
              className="mt-1 w-full"
              placeholder="Re Enter your password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Signup
            </Button>
          </div>
        </form>
        <div className="my-6 text-center text-gray-500">OR</div>
        <Button
          className="w-full bg-red-600 hover:bg-red-700 text-white"
          onClick={handleGoogleSignup}
        >
          Signup with Google
        </Button>
        <p className="text-sm text-muted-foreground mt-5 text-center">
          Already have an account?<br />Then login <Link to={'/login'} className='text-blue-700 underline po'>here</Link>
        </p>
      </div>
      
      <Toaster />
    </div>
  )
}

export default Signup