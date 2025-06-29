import { Link } from 'react-router-dom';

import SearchForm from '../components/SearchForm';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import {
  Train,
  Calendar,
  Clock,
  CreditCard,
  Award,
  Headphones,
} from 'lucide-react';

import trainImage from '../assets/train.svg';
import EmissionsChart from '@/components/EmissionChart';

const HomePage = () => {
  return (
    <div className='flex flex-col gap-12 pb-12'>
      {/* Hero Section */}
      <section className='bg-primary/5 border-b'>
        <div className='container mx-auto px-4 py-12 md:py-24'>
          <div className='grid gap-12 lg:grid-cols-2 lg:gap-12 items-center'>
            <div className='space-y-4'>
              <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold'>
                Book Your Train Journey with Ease
              </h1>
              <p className='text-lg md:text-xl text-muted-foreground'>
                Find and book the best train tickets across the UK at the best
                prices.
              </p>
              <div className='flex gap-4 pt-4'>
                <Button asChild size='lg'>
                  <a href='#search'>Book Now</a>
                </Button>
                <Button variant='outline' size='lg'>
                  <Link to='/my-bookings'>My Bookings</Link>
                </Button>
              </div>
            </div>
            <div>
              <img src={trainImage} alt='Train journey' className='' />
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section
        id='search'
        className='container mx-auto px-4 -mt-4 scroll-mt-24'
      >
        <SearchForm className='shadow-md' />
      </section>

      {/* Features Section */}
      <section className='container mx-auto px-4 py-12'>
        <div className='text-center max-w-3xl mx-auto mb-12'>
          <h2 className='text-3xl font-bold mb-4'>Why Choose TrainSwift?</h2>
          <p className='text-muted-foreground'>
            The fastest and easiest way to book train tickets in the UK. We
            offer the best prices and a seamless booking experience.
          </p>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <Card>
            <CardContent className='pt-6'>
              <div className='flex flex-col items-center text-center space-y-3'>
                <div className='p-3 bg-primary/10 rounded-full'>
                  <Train className='h-6 w-6 text-primary' />
                </div>
                <h3 className='text-lg font-semibold'>Fast Booking</h3>
                <p className='text-muted-foreground'>
                  Book your train tickets in minutes with our simple and
                  intuitive interface.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='pt-6'>
              <div className='flex flex-col items-center text-center space-y-3'>
                <div className='p-3 bg-primary/10 rounded-full'>
                  <Calendar className='h-6 w-6 text-primary' />
                </div>
                <h3 className='text-lg font-semibold'>Flexible Dates</h3>
                <p className='text-muted-foreground'>
                  Choose from a wide range of dates and times to suit your
                  travel plans.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='pt-6'>
              <div className='flex flex-col items-center text-center space-y-3'>
                <div className='p-3 bg-primary/10 rounded-full'>
                  <CreditCard className='h-6 w-6 text-primary' />
                </div>
                <h3 className='text-lg font-semibold'>Secure Payment</h3>
                <p className='text-muted-foreground'>
                  Your payment is secure with our trusted payment gateway.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='pt-6'>
              <div className='flex flex-col items-center text-center space-y-3'>
                <div className='p-3 bg-primary/10 rounded-full'>
                  <Clock className='h-6 w-6 text-primary' />
                </div>
                <h3 className='text-lg font-semibold'>Real-time Updates</h3>
                <p className='text-muted-foreground'>
                  Get real-time updates on your train journey status.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='pt-6'>
              <div className='flex flex-col items-center text-center space-y-3'>
                <div className='p-3 bg-primary/10 rounded-full'>
                  <Award className='h-6 w-6 text-primary' />
                </div>
                <h3 className='text-lg font-semibold'>Best Prices</h3>
                <p className='text-muted-foreground'>
                  We offer the best prices on train tickets across the UK.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='pt-6'>
              <div className='flex flex-col items-center text-center space-y-3'>
                <div className='p-3 bg-primary/10 rounded-full'>
                  <Headphones className='h-6 w-6 text-primary' />
                </div>
                <h3 className='text-lg font-semibold'>24/7 Support</h3>
                <p className='text-muted-foreground'>
                  Our customer support team is available 24/7 to help you with
                  your booking.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Popular Routes Section */}
      <section className='container mx-auto px-4 py-12'>
        <div className='text-center max-w-3xl mx-auto mb-12'>
          <h2 className='text-3xl font-bold mb-4'>Popular Routes</h2>
          <p className='text-muted-foreground'>
            Discover our most popular train routes across the UK
          </p>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {[
            {
              from: 'London',
              to: 'Edinburgh',
              price: '£78.50',
              duration: '4h 45m',
            },
            {
              from: 'London',
              to: 'Manchester',
              price: '£42.99',
              duration: '2h 05m',
            },
            {
              from: 'London',
              to: 'Birmingham',
              price: '£25.99',
              duration: '1h 30m',
            },
            {
              from: 'Manchester',
              to: 'Leeds',
              price: '£14.50',
              duration: '0h 50m',
            },
            {
              from: 'Edinburgh',
              to: 'Glasgow',
              price: '£16.75',
              duration: '0h 45m',
            },
            {
              from: 'London',
              to: 'Brighton',
              price: '£18.75',
              duration: '1h 20m',
            },
          ].map((route, index) => (
            <Card key={index}>
              <CardContent className='p-6'>
                <div className='flex flex-col space-y-4'>
                  <div className='flex justify-between items-center'>
                    <div className='space-y-1'>
                      <div className='text-sm text-muted-foreground'>From</div>
                      <div className='font-semibold'>{route.from}</div>
                    </div>
                    <div className='text-center px-4'>
                      <Train className='h-5 w-5 mx-auto text-muted-foreground' />
                      <div className='text-xs mt-1'>{route.duration}</div>
                    </div>
                    <div className='space-y-1 text-right'>
                      <div className='text-sm text-muted-foreground'>To</div>
                      <div className='font-semibold'>{route.to}</div>
                    </div>
                  </div>
                  <div className='flex justify-between items-center pt-2'>
                    <div className='font-bold text-primary'>{route.price}</div>
                    <Button variant='outline' size='sm' asChild>
                      <Link to='#'>Book Now</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Emission Chart Section */}
      <EmissionsChart />

      {/* CTA Section */}
      <section className='bg-primary/5 border-y'>
        <div className='container mx-auto px-4 py-12 md:py-24'>
          <div className='text-center max-w-3xl mx-auto'>
            <h2 className='text-3xl font-bold mb-4'>
              Ready to Start Your Journey?
            </h2>
            <p className='text-lg text-muted-foreground mb-8'>
              Book your train tickets now and enjoy a comfortable journey across
              the UK.
            </p>
            <Button size='lg' asChild>
              <a href='#search'>Search Trains</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
