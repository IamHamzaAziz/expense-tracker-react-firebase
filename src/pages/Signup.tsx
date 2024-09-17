import React from 'react'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

const Signup = () => {
  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle Signup logic
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
              required
              className="mt-1 w-full"
              placeholder="Enter your email"
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
            />
          </div>
          <div>
            <label htmlFor="re-password" className="block text-sm font-medium text-gray-700">
              Re Password
            </label>
            <Input
              type="password"
              id="re-password"
              required
              className="mt-1 w-full"
              placeholder="Re Enter your password"
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
    </div>
  )
}

export default Signup