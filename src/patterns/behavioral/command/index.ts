import { Person } from "./person"
import { SmartHome } from "./smart-home"

const person = new Person()
const home = new SmartHome()

person.on('awake', () => {
  home.setWorkingLighting()
})

person.on('sleepy', () => {
  home.setRelaxingLighting()

  person.once('coffee', () => {
    home.returnToLastScene()
  })
})