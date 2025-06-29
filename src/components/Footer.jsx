import { Link } from 'react-router-dom';

import logo from '../assets/logo.svg';

const Footer = () => {
  return (
    <footer className='border-t bg-background'>
      <div className='container mx-auto px-4 py-8 md:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4'>
          <div className='space-y-3'>
            <img src={logo} className='h-10 md:h-11' alt='TrainSwift logo' />

            <p className='text-sm text-muted-foreground'>
              The fastest way to book train tickets in the UK.
            </p>
          </div>
          <div className='space-y-3'>
            <h3 className='text-sm font-medium'>Company</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link
                  to='#'
                  className='text-muted-foreground hover:text-foreground'
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  to='#'
                  className='text-muted-foreground hover:text-foreground'
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to='#'
                  className='text-muted-foreground hover:text-foreground'
                >
                  Press
                </Link>
              </li>
              <li>
                <Link
                  to='#'
                  className='text-muted-foreground hover:text-foreground'
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div className='space-y-3'>
            <h3 className='text-sm font-medium'>Help & Support</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link
                  to='#'
                  className='text-muted-foreground hover:text-foreground'
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to='#'
                  className='text-muted-foreground hover:text-foreground'
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to='#'
                  className='text-muted-foreground hover:text-foreground'
                >
                  Ticket Information
                </Link>
              </li>
              <li>
                <Link
                  to='#'
                  className='text-muted-foreground hover:text-foreground'
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
          <div className='space-y-3'>
            <h3 className='text-sm font-medium'>Legal</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link
                  to='#'
                  className='text-muted-foreground hover:text-foreground'
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to='#'
                  className='text-muted-foreground hover:text-foreground'
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to='#'
                  className='text-muted-foreground hover:text-foreground'
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className='mt-8 border-t pt-6'>
          <p className='text-center text-xs text-muted-foreground'>
            &copy; {new Date().getFullYear()} TrainSwift Inc. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
