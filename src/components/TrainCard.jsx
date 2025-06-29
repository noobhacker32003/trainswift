import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '../stores/authStore';

import {
  ArrowRight,
  Clock,
  PoundSterlingIcon as Pound,
  Train,
} from 'lucide-react';

import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';

import { toast } from 'sonner';

const TrainCard = ({ train, date }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();

  const handleSelectSeats = () => {
    if (!isLoggedIn) {
      toast.info('Login Required', {
        description: 'Please login to book tickets',
      });
      navigate('/login');
      return;
    }

    navigate(`/seat-selection/${train.id}/${date}`);
  };

  const formatTime = (time) => {
    return time;
  };

  return (
    <Card className='overflow-hidden'>
      <CardHeader className='bg-muted py-3'>
        <CardTitle className='flex items-center justify-between'>
          <div className='flex items-center'>
            <Train className='mr-2 h-5 w-5 text-primary' />
            <span>{train.name}</span>
          </div>
          <Badge variant='outline'>{train.number}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className='p-6'>
        <div className='grid gap-6 sm:grid-cols-2'>
          <div className='space-y-2'>
            <div className='text-sm font-medium'>Departure</div>
            <div className='flex items-center'>
              <div className='text-2xl font-bold'>
                {formatTime(train.departure)}
              </div>
              <div className='ml-2 text-sm text-muted-foreground'>
                {train.from}
              </div>
            </div>
          </div>
          <div className='space-y-2'>
            <div className='text-sm font-medium'>Arrival</div>
            <div className='flex items-center'>
              <div className='text-2xl font-bold'>
                {formatTime(train.arrival)}
              </div>
              <div className='ml-2 text-sm text-muted-foreground'>
                {train.to}
              </div>
            </div>
          </div>
        </div>

        <div className='mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0'>
          <div className='flex items-center text-sm'>
            <Clock className='mr-1 h-4 w-4' />
            <span>{train.duration}</span>
            <ArrowRight className='mx-2 h-4 w-4' />
            <span>{train.distance}</span>
          </div>
          <div className='flex items-center text-sm'>
            <div className='mr-2'>Available Classes:</div>
            <div className='flex gap-1'>
              {train.classes.map((cls) => (
                <Badge key={cls} variant='secondary'>
                  {cls}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className='bg-muted/50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4'>
        <div className='flex items-center'>
          <Pound className='mr-1 h-5 w-5 text-primary' />
          <span className='text-2xl font-bold'>{train.price.toFixed(2)}</span>
          <span className='ml-1 text-sm text-muted-foreground'>onwards</span>
        </div>
        <Button onClick={handleSelectSeats}>Select Seats</Button>
      </CardFooter>
    </Card>
  );
};

export default TrainCard;
