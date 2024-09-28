import { Make } from './make';
import { Booking } from './booking';

export interface Car {
  id: number;
  makeId: number;
  make: Make;
  model: string;
  description: string;
  dayPrice: number;
  pictureUrl: string;
  deposit: number;
  seats: number;
  doors: number;
  transmissionType: number;
  powerHp: number;
  rangeKm: number;
  available: boolean;
  bookings: Booking[];
}
