export {}

abstract class HousePart {}

class Fence extends HousePart {}

class SwimmingPool extends HousePart {}

class Porch extends HousePart {}

class House {
  public fence?: Fence
  public swimmingPool?: SwimmingPool
  public porch?: Porch
}

class HouseBuilder {
  private built = false

  constructor(private readonly house = new House()) {}

  setFence(fence: Fence): this {
    this.house.fence = fence

    return this
  }

  setSwimmingPool(swimmingPool: SwimmingPool): this {
    this.house.swimmingPool = swimmingPool

    return this
  }

  setPorch(porch: Porch): this {
    this.house.porch = porch

    return this
  }

  build(): House {
    if (this.built) {
      throw new Error('Cannot reuse builder')
    }

    this.built = true

    return this.house
  }
}

export const house1: House = new House()
export const house2: House = new HouseBuilder().build()

export const houseWithFence: House = new HouseBuilder()
  .setFence(new Fence())
  .build()

export const houseWithPool: House = new HouseBuilder()
  .setSwimmingPool(new SwimmingPool())
  .build()

export const houseWithPorch: House = new HouseBuilder()
  .setPorch(new Porch())
  .build()

export const houseWithFenceAndPool: House = new HouseBuilder()
  .setFence(new Fence())
  .setSwimmingPool(new SwimmingPool())
  .build()

export const houseWithPoolAndPorch: House = new HouseBuilder()
  .setSwimmingPool(new SwimmingPool())
  .setPorch(new Porch())
  .build()

export const houseWithPorchAndFence: House = new HouseBuilder()
  .setPorch(new Porch())
  .setFence(new Fence())
  .build()

export const houseWithFenceAndPoolAndPorch: House = new HouseBuilder()
  .setFence(new Fence())
  .setSwimmingPool(new SwimmingPool())
  .setPorch(new Porch())
  .build()
