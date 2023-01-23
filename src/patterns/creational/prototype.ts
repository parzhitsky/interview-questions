export {}

interface Human {
  sex: string
}

interface Person extends Human {
  name: string
}

const humanPrototype: Human = {
  sex: 'male',
};

const person: Person = Object.create(humanPrototype, {
  name: {
    value: 'Steve',
  },
})

function _describeProperty<Obj extends object, Key extends (keyof Obj) & string>(obj: Obj, key: Key): void {
  console.log(`The object's '.${key}' property has value: "${obj[key]}" (a ${typeof obj[key]})`)

  if (obj.hasOwnProperty(key)) {
    console.log(`The value of '.${key}' is taken from the object itself`)
  } else {
    console.log(`The value of '.${key}' is taken from a prototype of the object`)
  }
}

_describeProperty(person, 'name')
_describeProperty(person, 'sex')
