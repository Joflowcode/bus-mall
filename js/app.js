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

let myChart = document.getElementById('myChart');

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
new BusProduct('pen');
new BusProduct('pet-sweep');
new BusProduct('scissors');
new BusProduct('shark');
new BusProduct('sweep', 'png');
new BusProduct('tauntaun');
new BusProduct('unicorn');
new BusProduct('water-can');
new BusProduct('wine-glass');
console.log(allBusMallProducts);



// Helper Functions/Executable Code

// random image/array selector generation. credit W3Resources and class demo for array method
function getRandomProduct(){
  return Math.floor(Math.random() * allBusMallProducts.length);

}

let productIndexArray = [];
console.log(productIndexArray);

function renderBusMallProducts (){

  while(productIndexArray.length < 6) {
    let randomProduct = getRandomProduct();
    if(!productIndexArray.includes(randomProduct)){
      productIndexArray.push(randomProduct);
    }
  }

  let productOneIndex = productIndexArray.shift();
  let productTwoIndex = productIndexArray.shift();
  let productThreeIndex = productIndexArray.shift();
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

  // stop clicks after all rounds. ADD the new function created for the mychartObject that renders a chart instead of showing list.
  if(maxProductVotes === 0){
    productContainer.removeEventListener('click', handleVoteClick);
    renderProductChart();

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




// research 2d under getContext
// Canvas Element targeting html element



// 1st argument = canvas Element
// 2nd arg = object - 3 properties: type, data, options

// {
// type:
// data:
// options:
//}

//render chart

function renderProductChart(){
  let productName = [];
  let productVotes = [];
  let productViews = [];

  for(let i = 0; i < allBusMallProducts.length; i++){
    productName.push(allBusMallProducts[i].name);
    productVotes.push(allBusMallProducts[i].votes);
    productViews.push(allBusMallProducts[i].views);
  }
  // note - careful with brackets, accidentally broke function section for the object.

  //actual argument I'm working with. want to use the ENTIRE chartjs object as the second argument for, and include the 3 properties). Then change the handle clicks above to show a chart vs the result list.
  const ctx = document.getElementById('myChart').getContext('2d');

  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productName,
      datasets: [{
        label: '# of Votes',
        data: productVotes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      },
      {
        label: '# of views',
        data: productViews,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

}


// Event Handlers
// **ADD HANDLE EVENT HERE WITH ADD AND REMOVE EVENTS FOR CLICK AND TRACK CLICKS***

// Event Listeners

productContainer.addEventListener('click', handleVoteClick);
showResultsButton.addEventListener('click', handleShowResults);
