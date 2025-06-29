import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTrainStore } from '../stores/trainStore';

import { Button } from './ui/button';
import { Label } from './ui/label';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';
import { Card, CardContent } from './ui/card';

import { format } from 'date-fns';

import { CalendarIcon } from 'lucide-react';

import { ukStations } from '../data/train';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command';

import { cn } from '../lib/utils';

const SearchForm = ({ className }) => {
  const navigate = useNavigate();
  const { searchTrains } = useTrainStore();

  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState(new Date());
  const [errors, setErrors] = useState({});

  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);
  const [openDate, setOpenDate] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!from) newErrors.from = 'Origin station is required';
    if (!to) newErrors.to = 'Destination station is required';
    if (!date) newErrors.date = 'Travel date is required';
    if (from === to) newErrors.to = 'Destination cannot be the same as origin';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    searchTrains(from, to, format(date, 'yyyy-MM-dd'));
    navigate('/search-results');
  };

  return (
    <Card className={cn('w-full', className)}>
      <CardContent className='p-6'>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            <div className='space-y-2'>
              <Label htmlFor='from'>From</Label>
              <Popover open={openFrom} onOpenChange={setOpenFrom}>
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    role='combobox'
                    aria-expanded={openFrom}
                    className='w-full justify-between'
                  >
                    {from ? from : 'Select origin station...'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-full p-0'>
                  <Command>
                    <CommandInput placeholder='Search station...' />
                    <CommandList>
                      <CommandEmpty>No station found.</CommandEmpty>
                      <CommandGroup className='max-h-64 overflow-auto'>
                        {ukStations.map((station) => (
                          <CommandItem
                            key={station}
                            value={station}
                            onSelect={(currentValue) => {
                              setFrom(currentValue);
                              setOpenFrom(false);
                              setErrors({ ...errors, from: undefined });
                            }}
                          >
                            {station}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              {errors.from && (
                <p className='text-xs text-destructive'>{errors.from}</p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='to'>To</Label>
              <Popover open={openTo} onOpenChange={setOpenTo}>
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    role='combobox'
                    aria-expanded={openTo}
                    className='w-full justify-between'
                  >
                    {to ? to : 'Select destination station...'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-full p-0'>
                  <Command>
                    <CommandInput placeholder='Search station...' />
                    <CommandList>
                      <CommandEmpty>No station found.</CommandEmpty>
                      <CommandGroup className='max-h-64 overflow-auto'>
                        {ukStations.map((station) => (
                          <CommandItem
                            key={station}
                            value={station}
                            onSelect={(currentValue) => {
                              setTo(currentValue);
                              setOpenTo(false);
                              setErrors({ ...errors, to: undefined });
                            }}
                          >
                            {station}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              {errors.to && (
                <p className='text-xs text-destructive'>{errors.to}</p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='date'>Date</Label>
              <Popover open={openDate} onOpenChange={setOpenDate}>
                <PopoverTrigger asChild>
                  <Button
                    id='date'
                    variant='outline'
                    className='w-full justify-start text-left font-normal'
                  >
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {date ? format(date, 'PPP') : <span>Select date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0'>
                  <Calendar
                    mode='single'
                    selected={date}
                    onSelect={(newDate) => {
                      setDate(newDate);
                      setOpenDate(false);
                      setErrors({ ...errors, date: undefined });
                    }}
                    initialFocus
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                  />
                </PopoverContent>
              </Popover>
              {errors.date && (
                <p className='text-xs text-destructive'>{errors.date}</p>
              )}
            </div>

            <div className='flex items-end'>
              <Button type='submit' className='w-full'>
                Search Trains
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SearchForm;
