import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTrainStore } from '../stores/trainStore';

import TrainCard from '../components/TrainCard';
import FilterSidebar from '../components/FilterSidebar';
import { Button } from '../components/ui/button';
import SearchForm from '../components/SearchForm';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../components/ui/sheet';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';

import { format } from 'date-fns';
import { AlertCircle, ChevronLeft, Filter } from 'lucide-react';

const SearchResults = () => {
  const navigate = useNavigate();
  const { filteredTrains, searchParams } = useTrainStore();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  useEffect(() => {
    if (!searchParams) {
      navigate('/');
    }
  }, [searchParams, navigate]);

  if (!searchParams) {
    return null;
  }

  return (
    <div className='container mx-auto px-4 py-12 md:py-24 lg:py-32'>
      <div className='flex items-center mb-6'>
        <Button variant='ghost' onClick={() => navigate('/')}>
          <ChevronLeft className='h-4 w-4 mr-1' /> Back
        </Button>
      </div>

      <div className='mb-8'>
        <SearchForm className='mb-6' />
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-lg font-semibold'>
              {searchParams.from} to {searchParams.to}
            </h2>
            <p className='text-sm text-muted-foreground'>
              {format(new Date(searchParams.date), 'PPP')}
            </p>
          </div>

          <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant='outline' className='md:hidden'>
                <Filter className='h-4 w-4 mr-2' /> Filters
              </Button>
            </SheetTrigger>
            <SheetContent className='overflow-auto'>
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className='py-4'>
                <FilterSidebar />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className='grid md:grid-cols-12 gap-6 lg:gap-12'>
        <div className='hidden md:block md:col-span-3 lg:col-span-3'>
          <FilterSidebar />
        </div>

        <div className='md:col-span-9 lg:col-span-9'>
          {filteredTrains.length > 0 ? (
            <div className='grid gap-6'>
              {filteredTrains.map((train) => (
                <TrainCard
                  key={train.id}
                  train={train}
                  date={searchParams.date}
                />
              ))}
            </div>
          ) : (
            <Alert>
              <AlertCircle className='h-4 w-4' />
              <AlertTitle>No trains found</AlertTitle>
              <AlertDescription>
                No trains found for your search criteria. Try different dates or
                stations.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
