import { useState } from 'react';

import { useTrainStore } from '../stores/trainStore';

import { Button } from './ui/button';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const FilterSidebar = () => {
  const { filterTrains, sortTrains, clearFilters } = useTrainStore();

  const [priceRange, setPriceRange] = useState([0, 150]);
  const [departureTime, setDepartureTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [trainClass, setTrainClass] = useState('');
  const [sortBy, setSortBy] = useState('departure');

  const handleFilter = () => {
    filterTrains({
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      departureTime,
      arrivalTime,
      trainClass,
    });
  };

  const handleSort = (value) => {
    setSortBy(value);
    sortTrains(value);
  };

  const handleClearFilters = () => {
    setPriceRange([0, 150]);
    setDepartureTime('');
    setArrivalTime('');
    setTrainClass('');
    setSortBy('departure');
    clearFilters();
  };

  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>Sort By</h3>
        <Select value={sortBy} onValueChange={handleSort}>
          <SelectTrigger className='w-full mt-2'>
            <SelectValue placeholder='Sort by' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value='price-asc'>Price: Low to High</SelectItem>
              <SelectItem value='price-desc'>Price: High to Low</SelectItem>
              <SelectItem value='departure'>Departure Time</SelectItem>
              <SelectItem value='arrival'>Arrival Time</SelectItem>
              <SelectItem value='duration'>Duration</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className='space-y-4'>
        <h3 className='text-lg font-medium'>Filters</h3>

        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <Label>Price Range (£)</Label>
            <span className='text-sm'>
              £{priceRange[0]} - £{priceRange[1]}
            </span>
          </div>
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={150}
            step={5}
            className='py-3'
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='departureTime'>Departure After</Label>
          <Input
            id='departureTime'
            type='time'
            value={departureTime}
            onChange={(e) => setDepartureTime(e.target.value)}
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='arrivalTime'>Arrival Before</Label>
          <Input
            id='arrivalTime'
            type='time'
            value={arrivalTime}
            onChange={(e) => setArrivalTime(e.target.value)}
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='class'>Class</Label>
          <Select value={trainClass} onValueChange={setTrainClass}>
            <SelectTrigger id='class' className='w-full'>
              <SelectValue placeholder='Select class' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='any'>Any Class</SelectItem>
              <SelectItem value='First Class'>First Class</SelectItem>
              <SelectItem value='Standard Class'>Standard Class</SelectItem>
              <SelectItem value='First Class Sleeper'>
                First Class Sleeper
              </SelectItem>
              <SelectItem value='Standard Sleeper'>Standard Sleeper</SelectItem>
              <SelectItem value='Seated Coach'>Seated Coach</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='flex flex-col gap-2 pt-2'>
          <Button onClick={handleFilter}>Apply Filters</Button>
          <Button variant='outline' onClick={handleClearFilters}>
            Clear Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
