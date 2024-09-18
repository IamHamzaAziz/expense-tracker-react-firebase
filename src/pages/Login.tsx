import React, { useState, useContext } from 'react'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { auth, googleProvider } from '@/config/firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '@/context/UserContext';

const Login = () => {
  const { toast } = useToast()
  const navigate = useNavigate()
  const { setUserId } = useContext(UserContext)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        variant: "destructive",
        title: "Invalid email address"
      })
      return
    }

    try {
      setLoading(true)
      const res = await signInWithEmailAndPassword(auth, email, password)
      setUserId(res.user.uid)
      setLoading(false)
      navigate('/')
    } catch (error: any) {
      if (error.code === "auth/invalid-credential") {
        toast({
          variant: "destructive",
          title: "Invalid email or password"
        })
        setLoading(false)
        return
      }

      console.log(error)
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider)
      setUserId(res.user.uid)
      navigate('/')
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Unable to Login"
      })
      return
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-md shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login to Expensy</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              type="email"
              id="email"
              required
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
              required
              className="mt-1 w-full"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              {
                !loading ? "Login" : "Logging in..."
              }
            </Button>
          </div>
        </form>
        <div className="my-6 text-center text-gray-500">OR</div>

        <Button
          className="w-full bg-red-600 hover:bg-red-700 text-white space-x-2"
          onClick={handleGoogleLogin}
        >
          Login with Google
        </Button>

        <p className="text-sm text-muted-foreground mt-5 text-center">
          Don't have an account yet?<br />Create one <Link to={'/signup'} className='text-blue-700 underline po'>here</Link>
        </p>
      </div>

      <Toaster />
    </div>
  )
}

export default Login