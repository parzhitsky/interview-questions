import { Person } from "./person"
import { SmartHome } from "./smart-home"

const person = new Person()
const home = new SmartHome()

person.prependListener('awake', () => console.log(':: event: awake'))
person.prependListener('sleepy', () => console.log(':: event: sleepy'))
person.prependListener('coffee', () => console.log(':: event: coffee'))

person.on('awake', () => {
  home.setWorkingLighting()
})

person.on('sleepy', () => {
  home.setRelaxingLighting()

  person.once('coffee', () => {
    home.returnToLastScene()
  })
})

setTimeout(() => {
  person.emit('awake')

  setTimeout(() => {
    person.emit('sleepy')

    setTimeout(() => {
      person.emit('coffee')
  
      setTimeout(() => {
        person.emit('sleepy')
      }, 1500)
    }, 500)
  }, 3000)
}, 1000)
