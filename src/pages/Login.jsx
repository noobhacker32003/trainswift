import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuthStore } from '../stores/authStore';

import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';

import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const success = login(email, password);

    if (success) {
      toast.success('Login successful', {
        description: 'Welcome back to TrainSwift!',
      });
      navigate('/');
    } else {
      toast.error('Login failed', {
        description: 'Invalid email or password. Please try again.',
      });
    }
  };

  return (
    <div className='container mx-auto flex items-center justify-center min-h-[calc(100vh-16rem)] py-12 md:py-24 lg:py-32 px-4'>
      <Card className='w-full max-w-md'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl font-bold'>Login</CardTitle>
          <CardDescription>
            Enter your email and password to login to your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='yourname@example.com'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors({ ...errors, email: undefined });
                }}
              />
              {errors.email && (
                <p className='text-xs text-destructive'>{errors.email}</p>
              )}
            </div>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <Label htmlFor='password'>Password</Label>
                <Link to='#' className='text-xs text-primary hover:underline'>
                  Forgot password?
                </Link>
              </div>
              <Input
                id='password'
                placeholder='*********'
                type='password'
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors({ ...errors, password: undefined });
                }}
              />
              {errors.password && (
                <p className='text-xs text-destructive'>{errors.password}</p>
              )}
            </div>
          </CardContent>
          <CardFooter className='flex flex-col'>
            <Button type='submit' className='w-full'>
              Login
            </Button>
            <p className='mt-4 text-center text-sm text-muted-foreground'>
              Don't have an account?{' '}
              <Link to='/signup' className='text-primary hover:underline'>
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
