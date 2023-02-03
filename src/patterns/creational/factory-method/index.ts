export {}

abstract class Vehicle {
  readonly brand = this.constructor.name
  abstract readonly slogan: string
}

class Honda extends Vehicle {
  readonly slogan = 'The power of dreams'
}

class Toyota extends Vehicle {
  readonly slogan = "Let's go places" // 😒🤦‍♀️
}

interface VehicleFactory<V extends Vehicle = Vehicle> {
  createVehicle(): V
}

class VehicleFactoryHonda implements VehicleFactory<Honda> {
  createVehicle(): Honda {
    return new Honda()
  }
}

class VehicleFactoryToyota implements VehicleFactory<Toyota> {
  createVehicle(): Toyota {
    return new Toyota()
  }
}

class VehicleSalon {
  private readonly stock = new Set<Vehicle>()

  constructor(public readonly name: string) {}

  orderVehicles<V extends Vehicle>(count: number, factory: VehicleFactory<V>): V[] {
    const vehicles = Array.from({ length: count }, () => factory.createVehicle())

    return vehicles
  }

  addToStock<V extends Vehicle>(vehicles: V[]): void {
    for (const vehicle of vehicles) {
      this.stock.add(vehicle)
    }
  }

  *[Symbol.iterator](): IterableIterator<Vehicle> {
    yield* this.stock
  }
}

const salon = new VehicleSalon('My vehicle salon')
const hondas = salon.orderVehicles(5, new VehicleFactoryHonda())
const toyotas = salon.orderVehicles(3, new VehicleFactoryToyota())

salon.addToStock([ ...hondas, ...toyotas ])

console.log(`Salon "${salon.name}" has these vehicles:`)

for (const vehicle of salon) {
  console.log(`\t${vehicle.brand}: ${vehicle.slogan}`)
}
