class Order{
    constructor({current_location,destination, price, sender}){
        this.id = Math.floor(Math.random()*1000000)
        this.current_location = current_location
        this.destination = destination
        this.price = price
        this.sender = sender
        this.status = "pending"
        this.driver = null

    }
}

module.exports = Order