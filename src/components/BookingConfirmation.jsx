import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';

import { Calendar, Clock, MapPin, Train, Users } from 'lucide-react';

import { format } from 'date-fns';

const BookingConfirmation = ({ booking }) => {
  const navigate = useNavigate();

  return (
    <Card className='max-w-3xl mx-auto '>
      <CardHeader className='bg-primary text-primary-foreground'>
        <CardTitle className='flex items-center justify-between'>
          <span>Booking Confirmed!</span>
          <span className='text-sm'>Booking ID: {booking.id}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className='p-6 space-y-6'>
        <div className='flex flex-col space-y-4'>
          <div className='flex items-center space-x-2'>
            <Train className='h-5 w-5 text-muted-foreground' />
            <div className='text-lg font-medium'>
              {booking.train.name} ({booking.train.number})
            </div>
          </div>

          <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
            <div className='space-y-1'>
              <div className='text-sm text-muted-foreground'>Departure</div>
              <div className='font-medium'>{booking.train.departure}</div>
              <div className='flex items-center'>
                <MapPin className='h-4 w-4 mr-1 text-muted-foreground' />
                <span>{booking.train.from}</span>
              </div>
            </div>

            <div className='space-y-1'>
              <div className='text-sm text-muted-foreground'>Arrival</div>
              <div className='font-medium'>{booking.train.arrival}</div>
              <div className='flex items-center'>
                <MapPin className='h-4 w-4 mr-1 text-muted-foreground' />
                <span>{booking.train.to}</span>
              </div>
            </div>
          </div>

          <div className='flex flex-col md:flex-row justify-between gap-4 pt-2'>
            <div className='flex items-center'>
              <Calendar className='h-4 w-4 mr-2 text-muted-foreground' />
              <span>{format(new Date(booking.date), 'PPP')}</span>
            </div>

            <div className='flex items-center'>
              <Clock className='h-4 w-4 mr-2 text-muted-foreground' />
              <span>Duration: {booking.train.duration}</span>
            </div>

            <div className='flex items-center'>
              <Users className='h-4 w-4 mr-2 text-muted-foreground' />
              <span>{booking.passengers.length} Passengers</span>
            </div>
          </div>
        </div>

        <div className='border-t pt-4'>
          <h3 className='font-medium mb-3'>Passenger Details</h3>
          <div className='space-y-3'>
            {booking.passengers.map((passenger, index) => (
              <div
                key={index}
                className='flex flex-col md:flex-row md:items-center justify-between gap-1 py-2 border-b last:border-b-0'
              >
                <div className='font-medium'>{passenger.name}</div>
                <div className='flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-sm'>
                  <span>Seat {passenger.seat}</span>
                  <span>{passenger.age} years</span>
                  <span>{passenger.gender}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='border-t pt-4'>
          <h3 className='font-medium mb-3'>Fare Summary</h3>
          <div className='space-y-2'>
            <div className='flex justify-between'>
              <span>
                Base fare ({booking.passengers.length}{' '}
                {booking.passengers.length === 1 ? 'passenger' : 'passengers'})
              </span>
              <span>£{(booking.totalPrice * 0.8).toFixed(2)}</span>
            </div>
            <div className='flex justify-between'>
              <span>Taxes & fees</span>
              <span>£{(booking.totalPrice * 0.2).toFixed(2)}</span>
            </div>
            <div className='flex justify-between font-medium text-lg pt-2 border-t'>
              <span>Total</span>
              <span>£{booking.totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex flex-col sm:flex-row gap-2 bg-muted/50 p-6'>
        <Button
          variant='outline'
          className='w-full sm:w-auto'
          onClick={() => {
            toast.success('Ticket Downloaded', {
              description: 'Your e-ticket has been sent to your email.',
            });
          }}
        >
          Download Ticket
        </Button>
        <Button
          variant='default'
          className='w-full sm:w-auto'
          onClick={() => navigate('/my-bookings')}
        >
          View All Bookings
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookingConfirmation;
