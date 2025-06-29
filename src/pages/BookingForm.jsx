import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import { useAuthStore } from '../stores/authStore';
import { useTrainStore } from '../stores/trainStore';
import { useBookingStore } from '../stores/bookingStore';

import BookingConfirmation from '../components/BookingConfirmation';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Separator } from '../components/ui/separator';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '../components/ui/card';

import { format } from 'date-fns';
import { ArrowLeft, Calendar, Clock, Train } from 'lucide-react';

const BookingForm = () => {
  const { trainId, seats, date } = useParams();
  const { search } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { getTrainById } = useTrainStore();
  const { addBooking } = useBookingStore();

  const [train, setTrain] = useState(null);
  const [trainClass, setTrainClass] = useState('');
  const [_, setSeatNumbers] = useState([]);
  const [passengers, setPassengers] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const selectedClass = params.get('class');

    const trainData = getTrainById(trainId);
    if (!trainData) {
      navigate('/');
      return;
    }

    setTrain(trainData);
    setTrainClass(selectedClass || trainData.classes[0]);

    const seatArray = seats.split(',').map(Number);
    setSeatNumbers(seatArray);

    const initialPassengers = seatArray.map((seat) => ({
      name: '',
      age: '',
      gender: '',
      idType: 'passport',
      idNumber: '',
      seat,
    }));

    setPassengers(initialPassengers);

    const pricePerSeat =
      trainData.seats[selectedClass || trainData.classes[0]].price;
    setTotalPrice(pricePerSeat * seatArray.length);
  }, [trainId, seats, search, getTrainById, navigate]);

  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = {
      ...updatedPassengers[index],
      [field]: value,
    };
    setPassengers(updatedPassengers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const bookingData = {
      userId: user.id,
      train,
      trainClass,
      date,
      passengers,
      totalPrice,
    };

    const newBooking = addBooking(bookingData);
    setBooking(newBooking);
  };

  if (booking) {
    return (
      <div className='py-12 md:py-24 lg:py-32'>
        <BookingConfirmation booking={booking} />{' '}
      </div>
    );
  }

  if (!train || !trainClass) {
    return null;
  }

  return (
    <div className='container mx-auto px-4 py-12 md:py-24 lg:py-32'>
      <div className='max-w-3xl mx-auto'>
        <div className='flex items-center mb-6'>
          <Button variant='ghost' className='mr-2' onClick={() => navigate(-1)}>
            <ArrowLeft className='h-4 w-4 mr-1' /> Back
          </Button>
        </div>

        <h2 className='text-2xl font-bold mb-6'>Complete Your Booking</h2>

        <Card className='mb-6'>
          <CardHeader>
            <CardTitle className='flex items-center'>
              <Train className='h-5 w-5 mr-2 text-primary' />
              {train.name} ({train.number})
            </CardTitle>
            <CardDescription>
              <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2'>
                <div className='flex items-center'>
                  <Calendar className='h-4 w-4 mr-1 text-muted-foreground' />
                  <span>{format(new Date(date), 'PPP')}</span>{' '}
                </div>
                <span className='hidden sm:inline'>•</span>
                <div>
                  {train.from} to {train.to}
                </div>
                <span className='hidden sm:inline'>•</span>
                <div className='flex items-center'>
                  <Clock className='h-4 w-4 mr-1 text-muted-foreground' />
                  <span>
                    {train.departure} - {train.arrival}
                  </span>
                </div>
              </div>
            </CardDescription>
          </CardHeader>
        </Card>

        <form onSubmit={handleSubmit}>
          <Card className='mb-6'>
            <CardHeader>
              <CardTitle>Passenger Details</CardTitle>
              <CardDescription>
                Enter details for all {passengers.length} passengers
              </CardDescription>
            </CardHeader>
            <CardContent>
              {passengers.map((passenger, index) => (
                <div key={index} className='mb-6 last:mb-0'>
                  <div className='flex items-center justify-between mb-4'>
                    <h3 className='font-medium'>
                      Passenger {index + 1} - Seat {passenger.seat} (
                      {trainClass})
                    </h3>
                    <div className='text-sm text-muted-foreground'>
                      £{train.seats[trainClass].price.toFixed(2)}
                    </div>
                  </div>

                  <div className='grid gap-4 sm:grid-cols-2'>
                    <div className='space-y-2'>
                      <Label htmlFor={`name-${index}`}>Full Name</Label>
                      <Input
                        id={`name-${index}`}
                        value={passenger.name}
                        onChange={(e) =>
                          handlePassengerChange(index, 'name', e.target.value)
                        }
                        required
                      />
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor={`age-${index}`}>Age</Label>
                      <Input
                        id={`age-${index}`}
                        type='number'
                        min='0'
                        max='120'
                        value={passenger.age}
                        onChange={(e) =>
                          handlePassengerChange(index, 'age', e.target.value)
                        }
                        required
                      />
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor={`gender-${index}`}>Gender</Label>
                      <Select
                        value={passenger.gender}
                        onValueChange={(value) =>
                          handlePassengerChange(index, 'gender', value)
                        }
                        required
                      >
                        <SelectTrigger id={`gender-${index}`}>
                          <SelectValue placeholder='Select gender' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='male'>Male</SelectItem>
                          <SelectItem value='female'>Female</SelectItem>
                          <SelectItem value='other'>Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor={`idType-${index}`}>ID Type</Label>
                      <Select
                        value={passenger.idType}
                        onValueChange={(value) =>
                          handlePassengerChange(index, 'idType', value)
                        }
                        required
                      >
                        <SelectTrigger id={`idType-${index}`}>
                          <SelectValue placeholder='Select ID type' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='passport'>Passport</SelectItem>
                          <SelectItem value='driving_license'>
                            Driving License
                          </SelectItem>
                          <SelectItem value='national_id'>
                            National ID
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className='space-y-2 sm:col-span-2'>
                      <Label htmlFor={`idNumber-${index}`}>ID Number</Label>
                      <Input
                        id={`idNumber-${index}`}
                        value={passenger.idNumber}
                        onChange={(e) =>
                          handlePassengerChange(
                            index,
                            'idNumber',
                            e.target.value
                          )
                        }
                        required
                      />
                    </div>
                  </div>

                  {index < passengers.length - 1 && (
                    <Separator className='mt-6' />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className='mb-6'>
            <CardHeader>
              <CardTitle>Fare Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-2'>
                <div className='flex justify-between'>
                  <span>
                    Base fare ({passengers.length}{' '}
                    {passengers.length === 1 ? 'passenger' : 'passengers'})
                  </span>
                  <span>£{(totalPrice * 0.8).toFixed(2)}</span>
                </div>
                <div className='flex justify-between'>
                  <span>Taxes & fees</span>
                  <span>£{(totalPrice * 0.2).toFixed(2)}</span>
                </div>
                <Separator className='my-2' />
                <div className='flex justify-between font-medium text-lg'>
                  <span>Total</span>
                  <span>£{totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type='submit' className='w-full'>
                Confirm and Pay
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
