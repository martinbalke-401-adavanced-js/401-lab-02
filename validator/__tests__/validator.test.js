'use strict';

const faker = require('faker');
const Validator = require('../validator.js');




let str = 'yes';
let num = 1;
let arr = ['a'];
let obj = { x: 'y' };
let func = () => {};
let bool = false;

const schema = {
  fields: {
    id: { type: 'string', required: true },
    name: { type: 'string', required: true },
    age: { type: 'number' },
    children: { type: 'array', valueType: 'string' },
  },
};

describe('Validator module performs basic validation of', () => {
  it('strings', () => {
    expect(Validator.isString(str)).toBeTruthy();
    expect(Validator.isString(num)).toBeFalsy();
    expect(Validator.isString(arr)).toBeFalsy();
    expect(Validator.isString(obj)).toBeFalsy();
    expect(Validator.isString(func)).toBeFalsy();
    expect(Validator.isString(bool)).toBeFalsy();
  });

  it('numbers', () => {
    expect(Validator.isNumber(str)).toBeFalsy();
    expect(Validator.isNumber(num)).toBeTruthy();
    expect(Validator.isNumber(arr)).toBeFalsy();
    expect(Validator.isNumber(obj)).toBeFalsy();
    expect(Validator.isNumber(func)).toBeFalsy();
    expect(Validator.isNumber(bool)).toBeFalsy();
  });

  it('arrays', () => {
    expect(Validator.isArray(str)).toBeFalsy();
    expect(Validator.isArray(num)).toBeFalsy();
    expect(Validator.isArray(arr)).toBeTruthy();
    expect(Validator.isArray(obj)).toBeFalsy();
    expect(Validator.isArray(func)).toBeFalsy();
    expect(Validator.isArray(bool)).toBeFalsy();
  });

  it('arrays of type', () => {
    let numArray = [1, 2, 3];
    let strArray = ['a', 'b', 'c'];

    expect(Validator.isArray(str)).toBeFalsy();
    expect(Validator.isArray(num)).toBeFalsy();
    expect(Validator.isArray(obj)).toBeFalsy();
    expect(Validator.isArray(func)).toBeFalsy();
    expect(Validator.isArray(bool)).toBeFalsy();
    expect(Validator.isArray(arr)).toBeTruthy();
    expect(Validator.isArray(numArray, 'number')).toBeTruthy();
    expect(Validator.isArray(numArray, 'string')).toBeFalsy();
    expect(Validator.isArray(strArray, 'string')).toBeTruthy();
    expect(Validator.isArray(strArray, 'number')).toBeFalsy();
  });

  it('objects', () => {
    expect(Validator.isObject(str)).toBeFalsy();
    expect(Validator.isObject(num)).toBeFalsy();
    expect(Validator.isObject(arr)).toBeFalsy();
    expect(Validator.isObject(obj)).toBeTruthy();
    expect(Validator.isObject(func)).toBeFalsy();
    expect(Validator.isObject(bool)).toBeFalsy();
  });

  it('booleans', () => {
    expect(Validator.isBoolean(str)).toBeFalsy();
    expect(Validator.isBoolean(num)).toBeFalsy();
    expect(Validator.isBoolean(arr)).toBeFalsy();
    expect(Validator.isBoolean(obj)).toBeFalsy();
    expect(Validator.isBoolean(func)).toBeFalsy();
    expect(Validator.isBoolean(bool)).toBeTruthy();
  });

  it('functions', () => {
    expect(Validator.isFunction(str)).toBeFalsy();
    expect(Validator.isFunction(num)).toBeFalsy();
    expect(Validator.isFunction(arr)).toBeFalsy();
    expect(Validator.isFunction(obj)).toBeFalsy();
    expect(Validator.isFunction(func)).toBeTruthy();
    expect(Validator.isFunction(bool)).toBeFalsy();
  });
});

describe('Validator module evaluates a basic schema', () => {
  it('isValid() validates a good record', () => {
    // Go through the schema and fill in perfect values for every field
    var testRecord = {};
    for (var field in schema.fields) {
      switch (schema.fields[field].type) {
      case 'boolean':
        testRecord[field] = faker.random.boolean();
        break;
      case 'number':
        testRecord[field] = faker.random.number();
        break;
      case 'string':
        testRecord[field] = faker.random.word();
        break;
      case 'array':
        testRecord[field] = [];
        testRecord[field].push(faker.random.arrayElement());
        testRecord[field].push(faker.random.arrayElement());
        break;
      default:
        null;
      }
    }

    expect(Validator.isValid(schema, testRecord)).toBeTruthy();
  });

  it('isValid() returns undefined on type mismatch', () => {
    // Go through the schema and fill in incorrect values for every field
    var testRecord = {};
    for (var field in schema.fields) {
      switch (schema.fields[field].type) {
      case 'boolean':
        testRecord[field] = faker.random.number();
        break;
      case 'number':
        testRecord[field] = faker.random.word();
        break;
      case 'string':
        testRecord[field] = faker.random.number();
        break;
      default:
        null;
      }
    }
    expect(Validator.isValid(schema, testRecord)).toBeFalsy();
  });

  it('isValid() returns undefined with missing requirements', () => {
    // Go through the schema and fill in perfect values for every field
    var testRecord = {};
    for (var field in schema.fields) {
      if (schema.fields[field].required) {
        testRecord[field] = null;
      }
    }
    expect(Validator.isValid(schema, testRecord)).toBeFalsy();
  });
});
