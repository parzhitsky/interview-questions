import { randomUUID } from "crypto";

export {}

namespace Random {
  export function float(max = 1, min = 0): number {
    return Math.random() * (max - min) + min
  }

  export function int(max?: number, min?: number): number {
    return Math.floor(float(max, min))
  }

  export function key<Obj extends object>(obj: Obj): keyof Obj {
    let last: keyof Obj | undefined

    for (const key in obj) {
      last = key

      if (float() > 0.5) {
        break
      }
    }

    if (last == null) {
      throw new Error('Cannot get random object key: object has no keys')
    }

    return last
  }
}

class Canvas {
  private readonly id = randomUUID()

  constructor(public readonly width: number, public readonly height: number) {}

  putImage(x: number, y: number, image: Buffer): void {
    console.log(`(canvas ${this.id}) Image (${image.byteLength} bytes) put at coordinates x=${x}, y=${y}`)
  }
}

interface Drawable {
  draw(canvas: Canvas): void
}

type Texture = Buffer
type TextureFactory = () => Texture
type TextureFactoryMap = Record<string, TextureFactory>

const treeTypeNameToTextureFactoryMap = ((): TextureFactoryMap => {
  const map = Object.create(null) as TextureFactoryMap

  for (const name of ['oak', 'pine', 'palm']) {
    map[name] = () => Buffer.from(name)
  }

  return map
})()

class TreeType {
  private static readonly instanceCache = new Map<string, TreeType>()

  private static createInstanceAndStoreInCache(name: string, texture: Buffer): TreeType {
    const instance = new TreeType(name, texture)

    this.instanceCache.set(name, instance)

    return instance
  }

  static getOrCreateInstance(name: string, getTexture?: TextureFactory): TreeType {
    let instance = this.instanceCache.get(name)

    if (instance == null) {
      if (getTexture == null) {
        throw new Error(`Cannot get or create instance of tree type "${name}": type "${name}" does not exist, and a texture factory for the new type is not provided`)
      }

      const texture = getTexture()

      instance = this.createInstanceAndStoreInCache(name, texture)
    }


    return instance
  }

  private constructor(public readonly name: string, public readonly texture: Buffer) {}
}

interface Located2D {
  x: number
  y: number
}

class Tree implements Located2D, Drawable {
  x = 0
  y = 0

  constructor(private readonly type: TreeType) {}

  movedAt(x: number, y: number): this {
    this.x = x
    this.y = y

    return this
  }

  draw(canvas: Canvas): void {
    canvas.putImage(this.x, this.y, this.type.texture)
  }
}

class Picture {
  constructor(protected readonly items: Iterable<Drawable>) {}

  draw(canvas: Canvas): void {
    for (const item of this.items) {
      item.draw(canvas)
    }
  }
}

const canvas = new Canvas(500, 300)
const trees = Array.from({ length: 10_000 }, (): Tree => {
  const treeTypeName = Random.key(treeTypeNameToTextureFactoryMap)
  const treeType = TreeType.getOrCreateInstance(treeTypeName, treeTypeNameToTextureFactoryMap[treeTypeName])
  const tree = new Tree(treeType)

  const x = Random.int(canvas.width)
  const y = Random.int(canvas.height)

  return tree.movedAt(x, y)
})

const picture = new Picture(trees)

picture.draw(canvas)
