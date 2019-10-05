'use strict';
class Vehicle {
  constructor(name, wheels){
    this.name = name;
    this.wheels = wheels;
  }
  drive() {
    return 'Moving Forward';
  }
  stop() {
    return 'Stopping';
  }
}

class Car extends Vehicle {
  constructor(name){
    super(name);
    this.wheels = 4;
  }
}

class Motorcycle extends Vehicle{
  constructor(name) {
    super(name);
    this.wheels = 2;
  }
  wheelie() {
    return 'Wheee!';
  }
}

module.exports = {Car, Motorcycle};