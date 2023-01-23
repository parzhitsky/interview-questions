export {}

interface Vehicle {
  run(): void
}

class VehiclePickup implements Vehicle {
  run(): void {
    console.log('VehiclePickup is running')
  }
}

class VehicleSedan implements Vehicle {
  run(): void {
    console.log('VehicleSedan is running')
  }
}

interface VehiclePark {
  createVehicle(): Vehicle
}

class VehicleParkPickup implements VehiclePark {
  createVehicle(): VehiclePickup {
    return new VehiclePickup()
  }
}

class VehicleParkSedan implements VehiclePark {
  createVehicle(): VehicleSedan {
    return new VehicleSedan()
  }
}

function useVehiclePark(park: VehiclePark): void {
  const vehicle = park.createVehicle()

  vehicle.run()
}

useVehiclePark(new VehicleParkPickup())
useVehiclePark(new VehicleParkSedan())
