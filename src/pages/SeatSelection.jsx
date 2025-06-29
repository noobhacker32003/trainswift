import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useTrainStore } from '../stores/trainStore';

import SeatMap from '../components/SeatMap';

import { Button } from '../components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';

import { format } from 'date-fns';
import { ArrowLeft, ArrowRight, Calendar, Info, Train } from 'lucide-react';

const SeatSelection = () => {
  const { trainId, date } = useParams();
  const navigate = useNavigate();
  const { getTrainById } = useTrainStore();

  const [train, setTrain] = useState(null);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    const trainData = getTrainById(trainId);
    if (!trainData) {
      navigate('/');
      return;
    }

    setTrain(trainData);
    if (trainData.classes && trainData.classes.length > 0) {
      setSelectedClass(trainData.classes[0]);
    }
  }, [trainId, getTrainById, navigate]);

  const handleSeatSelection = (seats) => {
    setSelectedSeats(seats);
  };

  const handleProceedToBooking = () => {
    if (selectedSeats.length === 0) return;

    navigate(
      `/booking/${trainId}/${date}/${selectedSeats.join(
        ','
      )}?class=${encodeURIComponent(selectedClass)}`
    );
  };

  if (!train) {
    return null;
  }

  return (
    <div className='container mx-auto px-4 py-12 md:py-24 lg:py-32'>
      <div className='flex flex-col gap-6'>
        <div className='flex items-center'>
          <Button variant='ghost' className='mr-2' onClick={() => navigate(-1)}>
            <ArrowLeft className='h-4 w-4 mr-1' /> Back
          </Button>
        </div>

        <h2 className='text-2xl font-bold'>Select Your Seats</h2>

        <Card>
          <CardHeader>
            <CardTitle className='flex items-center'>
              <Train className='h-5 w-5 mr-2 text-primary' />
              {train.name} ({train.number})
            </CardTitle>
            <CardDescription>
              <div className='flex items-center mt-2'>
                <Calendar className='h-4 w-4 mr-1 text-muted-foreground' />
                <span>{format(new Date(date), 'PPP')}</span>
                <span className='mx-2'>•</span>
                <span>
                  {train.from} to {train.to}
                </span>
                <span className='mx-2'>•</span>
                <span>
                  {train.departure} - {train.arrival}
                </span>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className='mb-6'>
              <Info className='h-4 w-4' />
              <AlertTitle>Please note</AlertTitle>
              <AlertDescription>
                Select your preferred class and choose your seats. Seats can
                only be booked if they are available.
              </AlertDescription>
            </Alert>

            <Tabs
              defaultValue={train.classes[0]}
              value={selectedClass}
              onValueChange={setSelectedClass}
              className='mt-2'
            >
              <TabsList className='mb-6'>
                {train.classes.map((cls) => (
                  <TabsTrigger key={cls} value={cls}>
                    {cls}
                  </TabsTrigger>
                ))}
              </TabsList>

              {train.classes.map((cls) => (
                <TabsContent key={cls} value={cls}>
                  <SeatMap
                    trainClass={cls}
                    availableSeats={train.seats[cls]}
                    onSeatSelection={handleSeatSelection}
                  />
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
          <CardFooter className='flex justify-between border-t p-6'>
            <Button variant='outline' onClick={() => navigate(-1)}>
              Back
            </Button>
            <Button
              onClick={handleProceedToBooking}
              disabled={selectedSeats.length === 0}
            >
              Proceed to Booking
              <ArrowRight className='ml-2 h-4 w-4' />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SeatSelection;
