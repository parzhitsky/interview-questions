import { randomUUID } from "crypto"
import { EventEmitter } from "events"

type LogIndicator = '🔵' | '🟢' | '🟡' | '🔴'

function log(level: 'info' | 'warn', id: string, indicator: LogIndicator, message: string): void {
  console[level](`${id}:`, indicator, message)
}

function random(max = 1, min = 0): number {
  return Math.random() * (max - min) + min
}

class Plane {
  readonly id = randomUUID()

  takeOff(): void {}
}

interface Handler<Data> {
  (this: unknown, data: Data): void
}

class Publisher<Data> extends EventEmitter {
  protected readonly handlers = new Set<Handler<Data>>()

  addHandler(handler: Handler<Data>): void {
    this.handlers.add(handler)
  }

  broadcast(data: Data): void {
    for (const handler of this.handlers) {
      handler(data)
    }
  }
}

class Hangar {
  protected readonly communications = new Publisher<Plane>()

  onNewPlane(handler: Handler<Plane>): void {
    this.communications.addHandler(handler)
  }

  createPlane(): void {
    const plane = new Plane()

    log('info', plane.id, '🟡', 'plane pending')

    this.communications.broadcast(plane)
  }
}

class Runway {
  readonly id = randomUUID()
  protected readonly communications = new Publisher<null>()

  acceptPlane(plane: Plane): void {
    setTimeout(() => {
      plane.takeOff()
      log('info', plane.id, '🔵', `plane took off from runway ${this.id}`)
      this.communications.broadcast(null)
    }, random(500, 2000))
  }

  onFree(handler: Handler<null>): void {
    this.communications.addHandler(handler)
  }
}

/** @ignore Implementation is shamelessly copy-pasted from another module */
class Queue<Item> {
  private readonly items: Item[] = []
  private nextIndex = 0

  get count(): number {
    return this.items.length - this.nextIndex
  }

  enqueue(item: Item): void {
    this.items.push(item)
  }

  peakNext(): Item | undefined {
    return this.items[this.nextIndex]
  }

  dequeue(): Item | undefined {
    const item = this.peakNext()

    if (this.nextIndex < this.items.length) {
      this.nextIndex += 1
    }

    return item
  }
}

class RunwayQueue {
  protected readonly freeRunways = new Queue<Runway>()
  protected readonly maxRunwaysCount: number = 2
  protected runwaysCount = 0

  protected createRunway(): Runway {
    const runway = new Runway()

    runway.onFree(() => {
      this.freeRunways.enqueue(runway)
    })

    this.runwaysCount += 1

    log('info', runway.id, '🟢', `runway created (total runways: ${this.runwaysCount})`)

    return runway
  }

  getFree(): Runway | null {
    if (this.freeRunways.count > 0) {
      const runway = this.freeRunways.dequeue()!

      return runway
    }

    if (this.runwaysCount < this.maxRunwaysCount) {
      return this.createRunway()
    }

    return null
  }
}

class ControlTower {
  protected readonly hangars = new Set<Hangar>()
  protected readonly runways = new RunwayQueue()

  protected handlePlane(plane: Plane): void {
    const runway = this.runways.getFree()

    if (runway == null) {
      log('warn', plane.id, '🔴', 'plane rejected: no free runways available')
    } else {
      runway.acceptPlane(plane)
    }
  }

  addHangar(hangar: Hangar): void {
    hangar.onNewPlane((plane) => {
      this.handlePlane(plane)
    })

    this.hangars.add(hangar)
  }
}

const tower = new ControlTower()
const hangar = new Hangar()

tower.addHangar(hangar)

// interval
setImmediate(function tick() {
  hangar.createPlane()

  setTimeout(tick, random(500, 1000))
})
