import { Booking } from "./booking";

export interface RentalLocation {
  id: number;
  name: string;
  pickUpAvailable: boolean;
  dropOffAvailable: boolean;
  pickUpBookings: Booking[];
  dropOffBoockings: Booking[];
}
