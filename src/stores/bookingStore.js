import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useBookingStore = create(
  persist(
    (set, get) => ({
      bookings: [],

      addBooking: (booking) => {
        const bookings = get().bookings;
        const newBooking = {
          ...booking,
          id: Date.now().toString(),
          status: 'confirmed',
          bookingDate: new Date().toISOString(),
        };

        set({ bookings: [...bookings, newBooking] });
        return newBooking;
      },

      cancelBooking: (bookingId) => {
        const bookings = get().bookings;
        const updatedBookings = bookings.map((booking) =>
          booking.id === bookingId
            ? { ...booking, status: 'cancelled' }
            : booking
        );

        set({ bookings: updatedBookings });
      },

      getUserBookings: (userId) => {
        const bookings = get().bookings;
        return bookings.filter((booking) => booking.userId === userId);
      },
    }),
    {
      name: 'trainswift-bookings',
    }
  )
);
