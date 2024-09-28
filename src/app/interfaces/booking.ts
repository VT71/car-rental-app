import { Car } from './car';
import { RentalLocation } from './rental-location';

export interface Booking {
  id: number;
  userId: string;
  carId: number;
  car: Car;
  pickUpDateTime: string;
  dropOffDateTime: string;
  pickUpLocationId: number;
  pickUpLocation: RentalLocation;
  dropOffLocationId: number;
  dropOffLocation: RentalLocation;
  status: number;
}
