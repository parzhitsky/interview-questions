export {}

abstract class Named {
  readonly name = this.constructor.name
}

class OutfitPartTop extends Named {}
class OutfitPartBottom extends Named {}
class OutfitPartShoes extends Named {}

abstract class Outfit extends Named {
  abstract createPartTop(): OutfitPartTop
  abstract createPartBottom(): OutfitPartBottom
  abstract createPartShoes(): OutfitPartShoes
}

class Smoking extends OutfitPartTop {}
class Pants extends OutfitPartBottom {}
class LeatherShoes extends OutfitPartShoes {}

class OutfitFancy extends Outfit {
  createPartTop(): Smoking {
    return new Smoking()
  }

  createPartBottom(): Pants {
    return new Pants()
  }

  createPartShoes(): LeatherShoes {
    return new LeatherShoes()
  }
}

class TShirt extends OutfitPartTop {}
class Jeans extends OutfitPartBottom {}
class Sneakers extends OutfitPartShoes {}

class OutfitCasual extends Outfit {
  createPartTop(): TShirt {
    return new TShirt()
  }

  createPartBottom(): Jeans {
    return new Jeans()
  }

  createPartShoes(): Sneakers {
    return new Sneakers()
  }
}

class Person {
  tryOutfit(outfit: Outfit): void {
    const top = outfit.createPartTop()
    const bottom = outfit.createPartBottom()
    const shoes = outfit.createPartShoes()

    console.log(`Trying outfit with ${top.name}, ${bottom.name}, and ${shoes.name} ...`)
    console.log('Looks good!')
  }
}

const person = new Person()

person.tryOutfit(new OutfitFancy())
person.tryOutfit(new OutfitCasual())
