import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuthStore } from '../stores/authStore';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

import { MenuIcon, X } from 'lucide-react';

import logo from '../assets/logo.svg';

const Navbar = () => {
  const { user, isLoggedIn, logout } = useAuthStore();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background'>
      <div className='container mx-auto flex h-16 items-center justify-between px-4'>
        <div className='flex items-center gap-2'>
          <Link to='/' className='flex items-center'>
            <img src={logo} className='h-10 md:h-11' alt='TrainSwift logo' />
            {/* <span className='text-xl font-bold text-primary'>
              Train<span className='text-foreground'>Swift</span>
            </span> */}
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className='hidden md:flex items-center gap-4'>
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='ghost'
                  className='relative h-8 w-8 rounded-full'
                >
                  <Avatar className='h-8 w-8'>
                    <AvatarFallback>
                      {user?.name
                        ? user.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .toUpperCase()
                        : 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem>
                  <Link to='/my-bookings' className='w-full'>
                    My Bookings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant='ghost' onClick={() => navigate('/login')}>
                Log in
              </Button>
              <Button onClick={() => navigate('/signup')}>Sign up</Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant='ghost'
          size='icon'
          className='md:hidden'
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className='h-6 w-6' />
          ) : (
            <MenuIcon className='h-6 w-6' />
          )}
        </Button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className='fixed inset-0 top-16 z-50 bg-background p-6 md:hidden'>
            <nav className='flex flex-col gap-6'>
              {isLoggedIn && (
                <Link
                  to='/my-bookings'
                  className='text-lg font-medium transition-colors hover:text-primary'
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Bookings
                </Link>
              )}
              {isLoggedIn ? (
                <Button variant='destructive' onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <div className='flex flex-col gap-4'>
                  <Button
                    variant='outline'
                    onClick={() => {
                      navigate('/login');
                      setMobileMenuOpen(false);
                    }}
                  >
                    Log in
                  </Button>
                  <Button
                    onClick={() => {
                      navigate('/signup');
                      setMobileMenuOpen(false);
                    }}
                  >
                    Sign up
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
