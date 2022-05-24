'use strict';

// create javascript flow outline in comments

// global variables

let allBusMallProducts = [];
let maxProductVotes = 25;



// Dom References

let productContainer = document.getElementById('productContainer');
let productOne = document.getElementById('productOne');
let productTwo = document.getElementById('productTwo');
let productThree = document.getElementById('productThree');

//let viewResultsButton = document.getElementById('view-results-button');
let resultsList = document.getElementById('resultsList');

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
// ** BUILD FUNCTION THAT TRACK VIEWS OF INDIVIDUAL OBJECTS
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

// ** RECORD VOTES
function handleVoteClick(event) {
  maxProductVotes--;

  let productVoteByImage = event.target.alt;

  for (let i = 0; i < allBusMallProducts.length; i++) {
    if(productVoteByImage === allBusMallProducts[i].name) {
      allBusMallProducts[i].votes++;
    }
  }
  // render again here?
  renderBusMallProducts();

  if(maxProductVotes === 0){
    productContainer.removeEventListener('click', handleVoteClick);
  }
}

function handleViewResults(){
  if(maxProductVotes === 0) {
    for (let i = 0; i < allBusMallProducts.length; i++){
      let ulElement = document.createElement('ul');
      ulElement.textContent = `${allBusMallProducts[i].name} was shown ${allBusMallProducts[i].views} times and voted for ${allBusMallProducts[i].votes} times.`;
      resultsList.appendChild(ulElement);
    }
  }
}

handleViewResults();

// Event Handlers
// **ADD HANDLE EVENT HERE WITH ADD AND REMOVE EVENTS FOR CLICK AND TRACK CLICKS***

// Event Listeners
// ** ADD EVENT LISTENER FOR VOTE CLICKS

productContainer.addEventListener('click', handleVoteClick);
resultsList.addEventListener('click', handleViewResults);
