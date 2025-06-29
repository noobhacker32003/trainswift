import { Link } from 'react-router-dom';

import { Button } from '../components/ui/button';

import { AlertTriangle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className='container mx-auto flex items-center justify-center min-h-[calc(100vh-16rem)] py-12 md:py-24 lg:py-32'>
      <div className='text-center space-y-5'>
        <div className='flex justify-center'>
          <AlertTriangle className='h-24 w-24 text-muted-foreground' />
        </div>
        <h1 className='text-4xl font-bold'>404</h1>
        <h2 className='text-2xl font-semibold'>Page Not Found</h2>
        <p className='text-muted-foreground mx-auto'>
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button asChild>
          <Link to='/'>Go Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
