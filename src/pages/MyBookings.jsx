import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '../stores/authStore';
import { useBookingStore } from '../stores/bookingStore';

import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';

import { format } from 'date-fns';
import { Calendar, Clock, MapPin, Train, Users, X } from 'lucide-react';

import { toast } from 'sonner';

const MyBookings = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { getUserBookings, cancelBooking } = useBookingStore();

  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  useEffect(() => {
    if (user) {
      const userBookings = getUserBookings(user.id);
      setBookings(userBookings);
    }
  }, [user, getUserBookings]);

  const upcomingBookings = bookings.filter(
    (booking) =>
      booking.status !== 'cancelled' && new Date(booking.date) >= new Date()
  );

  const pastBookings = bookings.filter(
    (booking) =>
      booking.status !== 'cancelled' && new Date(booking.date) < new Date()
  );

  const cancelledBookings = bookings.filter(
    (booking) => booking.status === 'cancelled'
  );

  const handleCancelBooking = (bookingId) => {
    cancelBooking(bookingId);
    setCancelDialogOpen(false);

    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.id === bookingId ? { ...booking, status: 'cancelled' } : booking
      )
    );

    toast.error('Booking Cancelled', {
      description: 'Your booking has been successfully cancelled.',
    });
  };

  if (bookings.length === 0) {
    return (
      <div className='container mx-auto px-4 py-12'>
        <h1 className='text-2xl font-bold mb-8'>My Bookings</h1>
        <Card>
          <CardContent className='flex flex-col items-center justify-center py-12'>
            <div className='text-center'>
              <h2 className='text-xl font-semibold'>No bookings found</h2>
              <p className='text-muted-foreground mb-5 mt-2'>
                You don't have any bookings yet. Start by searching for a train.
              </p>
              <Button onClick={() => navigate('/')}>Search Trains</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-12 md:py-24 lg:py-32'>
      <h1 className='text-2xl font-bold mb-8'>My Bookings</h1>

      <Tabs defaultValue='upcoming' className='w-full'>
        <TabsList className='grid w-full grid-cols-3 mb-8'>
          <TabsTrigger value='upcoming'>
            Upcoming ({upcomingBookings.length})
          </TabsTrigger>
          <TabsTrigger value='past'>Past ({pastBookings.length})</TabsTrigger>
          <TabsTrigger value='cancelled'>
            Cancelled ({cancelledBookings.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value='upcoming'>
          <div className='grid gap-6'>
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  onCancel={() => {
                    setSelectedBooking(booking);
                    setCancelDialogOpen(true);
                  }}
                  showCancelButton={true}
                />
              ))
            ) : (
              <Card>
                <CardContent className='flex flex-col items-center justify-center py-12'>
                  <div className='text-center space-y-4'>
                    <h2 className='text-xl font-medium'>
                      No upcoming bookings
                    </h2>
                    <p className='text-muted-foreground'>
                      You don't have any upcoming bookings. Start by searching
                      for a train.
                    </p>
                    <Button onClick={() => navigate('/')}>Search Trains</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value='past'>
          <div className='grid gap-6'>
            {pastBookings.length > 0 ? (
              pastBookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  showCancelButton={false}
                />
              ))
            ) : (
              <Card>
                <CardContent className='flex flex-col items-center justify-center py-12'>
                  <div className='text-center space-y-4'>
                    <h2 className='text-xl font-medium'>No past bookings</h2>
                    <p className='text-muted-foreground'>
                      You don't have any past bookings.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value='cancelled'>
          <div className='grid gap-6'>
            {cancelledBookings.length > 0 ? (
              cancelledBookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  showCancelButton={false}
                />
              ))
            ) : (
              <Card>
                <CardContent className='flex flex-col items-center justify-center py-12'>
                  <div className='text-center space-y-4'>
                    <h2 className='text-xl font-medium'>
                      No cancelled bookings
                    </h2>
                    <p className='text-muted-foreground'>
                      You don't have any cancelled bookings.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Booking</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this booking? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => setCancelDialogOpen(false)}
            >
              Keep Booking
            </Button>
            <Button
              variant='destructive'
              onClick={() => handleCancelBooking(selectedBooking.id)}
            >
              Cancel Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const BookingCard = ({ booking, onCancel, showCancelButton }) => {
  return (
    <Card>
      <CardHeader className='pb-2'>
        <div className='flex justify-between items-start'>
          <div>
            <CardTitle className='flex items-center'>
              <Train className='h-5 w-5 mr-2 text-primary' />
              {booking.train.name} ({booking.train.number})
            </CardTitle>
            <CardDescription>Booking ID: {booking.id}</CardDescription>
          </div>
          <Badge
            variant={
              booking.status === 'confirmed'
                ? 'default'
                : booking.status === 'cancelled'
                ? 'destructive'
                : 'outline'
            }
          >
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className='pb-2'>
        <div className='grid gap-4'>
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

          <div className='flex flex-col sm:flex-row justify-between gap-2 pt-2'>
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

          <div className='flex justify-between items-center pt-2'>
            <div>
              <div className='text-sm text-muted-foreground'>Total Price</div>
              <div className='font-medium'>
                £{booking.totalPrice.toFixed(2)}
              </div>
            </div>
            <div>
              <div className='text-sm text-muted-foreground'>Class</div>
              <div className='font-medium'>{booking.trainClass}</div>
            </div>
          </div>
        </div>
      </CardContent>
      {showCancelButton && (
        <CardFooter className='pt-2'>
          <Button variant='destructive' onClick={onCancel}>
            <X className='h-4 w-4 mr-2' />
            Cancel Booking
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default MyBookings;
