import { useState } from 'react';

import { Button } from './ui/button';

import { cn } from '../lib/utils';

const SeatMap = ({ trainClass, availableSeats, onSeatSelection }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const rows = Math.ceil(
    availableSeats.total / (trainClass.includes('First') ? 3 : 4)
  );
  const seatsPerRow = trainClass.includes('First') ? 3 : 4;

  // Generate all seat numbers
  const totalSeats = [];
  for (let i = 1; i <= availableSeats.total; i++) {
    totalSeats.push(i);
  }

  // Randomly mark some seats as unavailable based on available/total ratio
  const unavailableCount = availableSeats.total - availableSeats.available;
  const unavailableSeats = new Set();

  while (unavailableSeats.size < unavailableCount) {
    const randomSeat = Math.floor(Math.random() * availableSeats.total) + 1;
    unavailableSeats.add(randomSeat);
  }

  const toggleSeat = (seatNumber) => {
    if (unavailableSeats.has(seatNumber)) return;

    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const confirmSelection = () => {
    if (selectedSeats.length > 0) {
      onSeatSelection(selectedSeats);
    }
  };

  return (
    <div className='flex flex-col items-center gap-6'>
      <div className='w-full max-w-md border rounded-md p-6'>
        <h3 className='text-center font-medium text-lg mb-6'>{trainClass}</h3>

        <div className='grid grid-cols-2 gap-4 mb-6'>
          <div className='flex items-center gap-2'>
            <div className='w-6 h-6 bg-muted-foreground/20 rounded-md'></div>
            <span className='text-sm'>Available</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-6 h-6 bg-muted-foreground/60 rounded-md'></div>
            <span className='text-sm'>Unavailable</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-6 h-6 bg-primary rounded-md'></div>
            <span className='text-sm'>Selected</span>
          </div>
        </div>

        <div className='flex justify-center mb-6'>
          <div className='bg-muted p-2 rounded text-center w-full max-w-xs'>
            Front of Train
          </div>
        </div>

        <div className='grid gap-4'>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div key={rowIndex} className='flex justify-center gap-4'>
              {Array.from({ length: seatsPerRow }).map((_, seatIndex) => {
                const seatNumber = rowIndex * seatsPerRow + seatIndex + 1;
                if (seatNumber > availableSeats.total) return null;

                const isUnavailable = unavailableSeats.has(seatNumber);
                const isSelected = selectedSeats.includes(seatNumber);

                return (
                  <button
                    key={seatIndex}
                    className={cn(
                      'w-10 h-10 flex items-center justify-center rounded-md transition-colors',
                      isUnavailable
                        ? 'bg-muted-foreground/60 cursor-not-allowed'
                        : isSelected
                        ? 'bg-primary text-white'
                        : 'bg-muted-foreground/20 hover:bg-muted-foreground/30'
                    )}
                    onClick={() => toggleSeat(seatNumber)}
                    disabled={isUnavailable}
                  >
                    {seatNumber}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className='flex justify-center mt-6'>
          <div className='bg-muted p-2 rounded text-center w-full max-w-xs'>
            Back of Train
          </div>
        </div>
      </div>

      <div className='flex gap-2 items-center justify-between w-full max-w-md'>
        <div>
          <p className='text-sm text-muted-foreground'>
            Price per seat:{' '}
            <span className='font-medium'>
              £{availableSeats.price.toFixed(2)}
            </span>
          </p>
          <p className='text-sm font-medium'>
            Total: £{(selectedSeats.length * availableSeats.price).toFixed(2)}
          </p>
        </div>
        <Button
          onClick={confirmSelection}
          disabled={selectedSeats.length === 0}
        >
          {selectedSeats.length === 0
            ? 'Select Seats'
            : `Confirm ${selectedSeats.length} ${
                selectedSeats.length === 1 ? 'Seat' : 'Seats'
              }`}
        </Button>
      </div>
    </div>
  );
};

export default SeatMap;
