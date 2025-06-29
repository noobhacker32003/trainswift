import { Car, LeafyGreen, Train } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Legend } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

// Sample data for CO2 emissions comparison between train and car
const emissionsData = [
  { distance: '50km', train: 1.5, car: 8.5 },
  { distance: '100km', train: 3, car: 17 },
  { distance: '150km', train: 4.5, car: 25.5 },
  { distance: '200km', train: 6, car: 34 },
  { distance: '250km', train: 7.5, car: 42.5 },
  { distance: '300km', train: 9, car: 51 },
];

const dataWithSavings = emissionsData.map((item) => ({
  ...item,
  saved: item.car - item.train,
}));

const chartConfig = {
  train: {
    label: 'Train',
    color: 'hsl(var(--chart-2))',
  },
  car: {
    label: 'Car',
    color: 'hsl(var(--chart-1))',
  },
  saved: {
    label: 'CO₂ Saved',
    color: 'hsl(var(--chart-3))',
  },
};

const EmissionsChart = () => {
  const totalSavings = dataWithSavings.reduce(
    (acc, curr) => acc + curr.saved,
    0
  );
  const averageSavings = (totalSavings / dataWithSavings.length).toFixed(1);

  const averageCarEmissions =
    dataWithSavings.reduce((acc, curr) => acc + curr.car, 0) /
    dataWithSavings.length;
  const averageTrainEmissions =
    dataWithSavings.reduce((acc, curr) => acc + curr.train, 0) /
    dataWithSavings.length;
  const percentageReduction = (
    ((averageCarEmissions - averageTrainEmissions) / averageCarEmissions) *
    100
  ).toFixed(0);

  return (
    <section className='container mx-auto px-4 py-12'>
      <div className='text-center max-w-3xl mx-auto mb-12'>
        <h2 className='text-3xl font-bold mb-4'>You are making an impact</h2>
        <p className='text-muted-foreground'>
          Choosing train travel significantly reduces your CO₂ emissions
          compared to driving
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>CO₂ Emissions Comparison</CardTitle>
          <CardDescription>
            Train vs Car CO₂ emissions (kg) by journey distance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart
              data={dataWithSavings}
              margin={{
                left: 12,
                right: 12,
                top: 12,
                bottom: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey='distance'
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                unit=' kg'
              />
              <ChartTooltip
                content={<ChartTooltipContent indicator='line' />}
              />
              <Legend />
              <Area
                dataKey='car'
                type='monotone'
                fill={chartConfig.car.color}
                fillOpacity={0.4}
                stroke={chartConfig.car.color}
              />
              <Area
                dataKey='train'
                type='monotone'
                fill={chartConfig.train.color}
                fillOpacity={0.4}
                stroke={chartConfig.train.color}
              />
              <Area
                dataKey='saved'
                type='monotone'
                fill={chartConfig.saved.color}
                fillOpacity={0.4}
                stroke={chartConfig.saved.color}
                strokeDasharray='3 3'
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <div className='flex w-full flex-col md:flex-row items-start gap-4 text-sm'>
            <div className='grid gap-2 flex-1'>
              <div className='flex items-center gap-2 font-medium leading-none'>
                <LeafyGreen className='h-4 w-4 shrink-0 text-green-600' />
                By choosing the train, you save an average of {
                  averageSavings
                }{' '}
                kg of CO₂ per journey
              </div>
              <div className='flex items-center gap-2 mt-4 leading-none text-muted-foreground'>
                That's a {percentageReduction}% reduction in emissions compared
                to driving
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4 md:gap-8'>
              <div className='flex flex-col items-center justify-center p-3 bg-primary/5 rounded-lg'>
                <Train className='h-6 w-6 text-primary mb-2' />
                <span className='text-xs text-muted-foreground mb-1'>
                  Train
                </span>
                <span className='font-bold text-primary'>
                  {averageTrainEmissions.toFixed(1)} kg CO₂
                </span>
              </div>
              <div className='flex flex-col items-center justify-center p-3 bg-primary/5 rounded-lg'>
                <Car className='h-6 w-6 text-primary mb-2' />
                <span className='text-xs text-muted-foreground mb-1'>Car</span>
                <span className='font-bold text-primary'>
                  {averageCarEmissions.toFixed(1)} kg CO₂
                </span>
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
};

export default EmissionsChart;
