'use strict';

/**
 *@class List
 * Takes in an array and turns that in to a list Class
 */
class List {
  /**
   *@constructor
   * Creates a list item giving it a default length of 0 and a data of blank object
   */
  constructor() {
    this.length = 0;
    this.data = {};
  }
  /**
   * reindex sorts and reduces data
   * reindex then sets the data and length properties to the new sorted data 
   */
  reindex() {
    let data = Object.keys(this.data).sort().reduce((acc,val,idx) => {
      acc[idx] = this.data[val];
      return acc;
    },{});

    this.length = Object.keys(data).length;
    this.data = data;
  }
  /**
 * push adds an item to the end of the data object
 * @param item  - the item to add to list 
 * @returns - the new updated length
 */
  push(item) {
    if ( arguments.length === 1 ) {
      this.data[this.length++] = item;
    }
    return this.length;
  }
  /**
   * pop removes an item from the end of the class object
   * @return - the removed item
   */
  pop() {
    if ( ! this.length ) { return undefined; }
    let item = this.data[this.length - 1];
    delete this.data[this.length - 1];
    this.length--;
    return item;
  }
  /**
   * shift removes an item from the begining of the list object
   * @return - the removed item
   */
  shift() {
    if ( ! this.data[0] ) { return undefined; }
    let item = this.data[0];
    delete this.data[0];
    this.reindex();
    return item;
  }

  /**
   * unshift takes in an item then sets it's key to -1 so that it can be reindexed to the begining of the object
   * @param item - item to be added to the begining of the object
   */
  unshift(item) {
    this.data[-1] = item;
    this.reindex();
    return this.length;
  }

  /**
   * forEach iterates over each item in the list and preforms a callback function on it
   * @param {function} callback 
   */
  forEach(callback) {
    if ( this.length ) {
      for (let i = 0; i <= this.length - 1; i++) {
        callback(this[i], i);
      }
    }
  }

  /**
   * map iterates over each item in the class preforming the callback function on it
   * it then pushes each of the new items on to a new List and returns that list as result
   * @param {function} callback 
   * @returns - result 
   */
  map(callback) {
    if ( ! this.length ) { return undefined; }
    let result = new List();
    for (let i = 0; i <= this.length - 1; i++) {
      result.push(callback(this.data[i], i));
    }
    return result;
  }
  /**
   * filter checks to see if the callback function return is true. If it is then it pushes the item on to a new list and returns it.
   * @param {function} callback
   */
  filter(callback) {
    if ( ! this.length ) { return undefined; }
    let result = new List();
    for (let i = 0; i <= this.length - 1; i++) {
      if (callback(this.data[i])) {
        result.push(this.data[i]);
      }
    }
    return result;
  }
  /**
   * reduce iterates over the list and performs a callback on each item, then adding it to the provided state.
   * @param {function} callback 
   * @param {*} state 
   * @returns a reduced object as state.
   */
  reduce(callback, state) {
    if ( ! this.length ) { return undefined; }
    for (let i = 0; i <= this.length - 1; i++) {
      state = callback(state,this.data[i], i);
    }
    return state;
  }

}

module.exports = List;
