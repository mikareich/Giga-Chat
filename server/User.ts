export default class User {
  name: string
  socketID: string
  lastTypingTime: number

  constructor(name: string, socketID: string) {
    this.name = name
    this.socketID = socketID
    this.lastTypingTime = 0
  }
}
