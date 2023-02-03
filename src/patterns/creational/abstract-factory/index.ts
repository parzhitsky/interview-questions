export {}

namespace OutfitPart {
  export const enum Type {
    Top = 'Top',
    Bottom = 'Bottom',
    Shoes = 'Shoes',
  }
}

abstract class OutfitPart {
  readonly name = this.constructor.name
}

abstract class Outfit {
  abstract createTop(): OutfitPart

  abstract createBottom(): OutfitPart

  abstract createShoes(): OutfitPart
}

class Smoking extends OutfitPart {}

class Pants extends OutfitPart {}

class LeatherShoes extends OutfitPart {}

class OutfitFancy extends Outfit {
  createTop(): Smoking {
    return new Smoking()
  }

  createBottom(): Pants {
    return new Pants()
  }

  createShoes(): LeatherShoes {
    return new LeatherShoes()
  }
}

class TShirt extends OutfitPart {}

class Jeans extends OutfitPart {}

class Sneakers extends OutfitPart {}

class OutfitCasual extends Outfit {
  createTop(): TShirt {
    return new TShirt()
  }

  createBottom(): Jeans {
    return new Jeans()
  }

  createShoes(): Sneakers {
    return new Sneakers()
  }
}

class Person {
  tryOutfit(outfit: Outfit): void {
    const top = outfit.createTop()
    const bottom = outfit.createBottom()
    const shoes = outfit.createShoes()

    console.log(`Trying outfit with ${top.name}, ${bottom.name}, and ${shoes.name} ...`)
    console.log('Looks good!')
  }
}

const person = new Person()

person.tryOutfit(new OutfitFancy())
person.tryOutfit(new OutfitCasual())
