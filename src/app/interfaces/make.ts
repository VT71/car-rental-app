import { Car } from "./car"

export interface Make {
    id: number,
    name: string,
    cars: Car[]
}
