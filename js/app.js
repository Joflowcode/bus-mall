'use strict';

// create javascript flow outline in comments

// global variables

let allBusMallProducts = [];
let clickVotes = 25;


// Dom References

let productContainer = document.getElementById('productContainer');
let productOne = document.getElementById('productOne');
let productTwo = document.getElementById('productTwo');
let productThree = document.getElementById('productThree');

// Constructor

function BusProduct(name, fileExtension = 'jpg') {
  this.name = name;
  this.views = 0;
  this.votes = 0;
  this.photo = `img/${name}.${fileExtension}`;

  // global variable/container array.push(this) THIS is the item being created - the individual objects
  allBusMallProducts.push(this);
}


// Helper Functions/Executable Code



// random image/array selector generation. credit W3Resources

function getRandomProduct(){
  return Math.floor(Math.random() * BusProduct.length);

}

function renderBusMallProducts (){
  let itemOne = getRandomProduct();
  let itemTwo = getRandomProduct();
  let itemThree = getRandomProduct();
}


//new BusProduct('bag');
//new BusProduct('banana');
//new BusProduct('bathroom');
//new BusProduct('boots');
// new BusProduct('breakfast');
// console.log(BusProduct);

// Event Handlers

// Event Listeners
