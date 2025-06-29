import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { trainsData } from '../data/train';

export const useTrainStore = create(
  persist(
    (set, get) => ({
      trains: trainsData,
      filteredTrains: [],
      searchParams: null,

      searchTrains: (from, to, date) => {
        const trains = get().trains;
        const filtered = trains.filter(
          (train) =>
            train.from.toLowerCase() === from.toLowerCase() &&
            train.to.toLowerCase() === to.toLowerCase()
        );

        set({
          filteredTrains: filtered,
          searchParams: { from, to, date },
        });

        return filtered;
      },

      getTrainById: (id) => {
        const trains = get().trains;
        return trains.find((train) => train.id === id);
      },

      filterTrains: (filters) => {
        const { minPrice, maxPrice, departureTime, arrivalTime, trainClass } =
          filters;
        const trains = get().filteredTrains.length
          ? get().filteredTrains
          : get().trains;

        const filtered = trains.filter((train) => {
          // Filter by price
          if (minPrice && train.price < minPrice) return false;
          if (maxPrice && train.price > maxPrice) return false;

          // Filter by departure time
          if (departureTime) {
            const [reqHours, reqMinutes] = departureTime.split(':').map(Number);
            const [trainHours, trainMinutes] = train.departure
              .split(':')
              .map(Number);

            if (
              trainHours < reqHours ||
              (trainHours === reqHours && trainMinutes < reqMinutes)
            ) {
              return false;
            }
          }

          // Filter by arrival time
          if (arrivalTime) {
            const [reqHours, reqMinutes] = arrivalTime.split(':').map(Number);
            const [trainHours, trainMinutes] = train.arrival
              .split(':')
              .map(Number);

            if (
              trainHours > reqHours ||
              (trainHours === reqHours && trainMinutes > reqMinutes)
            ) {
              return false;
            }
          }

          // Filter by class
          if (trainClass && !train.classes.includes(trainClass)) {
            return false;
          }

          return true;
        });

        set({ filteredTrains: filtered });
        return filtered;
      },

      sortTrains: (sortBy) => {
        const trains = [...get().filteredTrains];

        if (sortBy === 'price-asc') {
          trains.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-desc') {
          trains.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'departure') {
          trains.sort((a, b) => {
            const [aHours, aMinutes] = a.departure.split(':').map(Number);
            const [bHours, bMinutes] = b.departure.split(':').map(Number);

            const aTime = aHours * 60 + aMinutes;
            const bTime = bHours * 60 + bMinutes;

            return aTime - bTime;
          });
        } else if (sortBy === 'arrival') {
          trains.sort((a, b) => {
            const [aHours, aMinutes] = a.arrival.split(':').map(Number);
            const [bHours, bMinutes] = b.arrival.split(':').map(Number);

            const aTime = aHours * 60 + aMinutes;
            const bTime = bHours * 60 + bMinutes;

            return aTime - bTime;
          });
        } else if (sortBy === 'duration') {
          trains.sort((a, b) => {
            const [aDepartureHours, aDepartureMinutes] = a.departure
              .split(':')
              .map(Number);
            const [aArrivalHours, aArrivalMinutes] = a.arrival
              .split(':')
              .map(Number);

            const [bDepartureHours, bDepartureMinutes] = b.departure
              .split(':')
              .map(Number);
            const [bArrivalHours, bArrivalMinutes] = b.arrival
              .split(':')
              .map(Number);

            const aDuration =
              aArrivalHours * 60 +
              aArrivalMinutes -
              (aDepartureHours * 60 + aDepartureMinutes);
            const bDuration =
              bArrivalHours * 60 +
              bArrivalMinutes -
              (bDepartureHours * 60 + bDepartureMinutes);

            return aDuration - bDuration;
          });
        }

        set({ filteredTrains: trains });
        return trains;
      },

      clearFilters: () => {
        const { from, to, date } = get().searchParams || {};
        if (from && to) {
          get().searchTrains(from, to, date);
        } else {
          set({ filteredTrains: [] });
        }
      },
    }),
    {
      name: 'trainswift-trains',
    }
  )
);
