'use strict';

// create javascript flow outline in comments

// global variables

let allBusMallProducts = [];
let maxProductVotes = 25;



// Dom References

let productContainer = document.getElementById('product-container');
let productOne = document.getElementById('product-one');
let productTwo = document.getElementById('product-two');
let productThree = document.getElementById('product-three');

let showResultsButton = document.getElementById('show-results-button');
let resultsList = document.getElementById('results-list');

// Constructor

function BusProduct(name, fileExtension = 'jpg') {
  this.name = name;
  this.views = 0;
  this.votes = 0;
  this.photo = `img/${name}.${fileExtension}`;

  // global variable/container array.push(this) THIS is the item being created - the individual objects
  allBusMallProducts.push(this);
}

new BusProduct('bag');
new BusProduct('banana');
new BusProduct('bathroom');
new BusProduct('boots');
new BusProduct('breakfast');
new BusProduct('bubblegum');
new BusProduct('chair');
new BusProduct('cthulhu');
new BusProduct('dog-duck');
new BusProduct('dragon');
new BusProduct('dragon');
new BusProduct('pen');
new BusProduct('pet-sweep');
new BusProduct('scissors');
new BusProduct('scissors');
new BusProduct('shark');
new BusProduct('sweep', 'png');
new BusProduct('tauntaun');
new BusProduct('unicorn');
new BusProduct('water-can');
new BusProduct('wine-glass');
console.log(allBusMallProducts);



// Helper Functions/Executable Code

// random image/array selector generation. credit W3Resources
function getRandomProduct(){
  return Math.floor(Math.random() * allBusMallProducts.length);

}

function renderBusMallProducts (){

  let productOneIndex = getRandomProduct();
  let productTwoIndex = getRandomProduct();
  let productThreeIndex = getRandomProduct();

  while(productOneIndex === productTwoIndex){
    productTwoIndex = getRandomProduct();
  }

  while(productTwoIndex === productThreeIndex || productOneIndex === productThreeIndex ){
    productThreeIndex = getRandomProduct();
  }
  console.log(productOneIndex, productTwoIndex, productThreeIndex);

  productOne.src = allBusMallProducts[productOneIndex].photo;
  productOne.alt = allBusMallProducts[productOneIndex].name;
  allBusMallProducts[productOneIndex].views++;

  productTwo.src = allBusMallProducts[productTwoIndex].photo;
  productTwo.alt = allBusMallProducts[productTwoIndex].name;
  allBusMallProducts[productTwoIndex].views++;

  productThree.src = allBusMallProducts[productThreeIndex].photo;
  productThree.alt = allBusMallProducts[productThreeIndex].name;
  allBusMallProducts[productThreeIndex].views++;
}

renderBusMallProducts();

// ** RECORD VOTES Event Handler
function handleVoteClick(event) {
  maxProductVotes--;

  let productVoteByImage = event.target.alt;

  for(let i = 0; i < allBusMallProducts.length; i++) {
    if(productVoteByImage === allBusMallProducts[i].name){
      allBusMallProducts[i].votes++;
    }
  }
  // render again here to get 3 new image choices
  renderBusMallProducts();

  // stop clicks after all rounds
  if(maxProductVotes === 0){
    productContainer.removeEventListener('click', handleVoteClick);

  }

}

// make button available
// declare variable for area being targeted before creating loop. append to new element li
function handleShowResults(){
  if(maxProductVotes === 0){
    for(let i = 0; i < allBusMallProducts.length; i++){
      let listElement = document.createElement('li');
      listElement.textContent = `${allBusMallProducts[i].name} was shown ${allBusMallProducts[i].views} times and voted for ${allBusMallProducts[i].votes} times.`;
      resultsList.appendChild(listElement);
    }
  }
}


// Event Handlers
// **ADD HANDLE EVENT HERE WITH ADD AND REMOVE EVENTS FOR CLICK AND TRACK CLICKS***

// Event Listeners

productContainer.addEventListener('click', handleVoteClick);
showResultsButton.addEventListener('click', handleShowResults);
