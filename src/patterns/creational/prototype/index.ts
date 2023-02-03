export {}

type Sex = 'Male' | 'Female'

const humanPrototype = {
  sex: 'Male' as Sex,
  age: 0 as number,
} as const

type HumanPrototype = typeof humanPrototype

interface Human extends HumanPrototype {}

function createHuman(sex: Sex, age?: number): Human {
  const human = {
    ...humanPrototype,
    sex,
  }

  if (age != null) {
    human.age = age
  }

  return human
}

const personPrototype = {
  name: '' as string,
} as const

type PersonPrototype = typeof personPrototype

interface Person extends Human, PersonPrototype {}

function createPerson(name: string, sex: Sex, age?: number): Person {
  const person: Person = {
    ...createHuman(sex, age),
    ...personPrototype,
    name,
  }

  return person
}

function describePerson(person: Person): string {
  return `${person.name}, ${person.sex}, ${person.age} y.o.`
}

console.log(
  describePerson(
    createPerson('Alice', 'Female', 17),
  ),
)

console.log(
  describePerson(
    createPerson('Bob', 'Male', 42),
  ),
)
