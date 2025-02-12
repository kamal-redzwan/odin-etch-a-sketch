const drawMode = document.querySelector('#drawMode').value;

// to track when user is in drawing mode
let isDrawing = false;

function createGrid() {
  const gridContainer = document.querySelector('.grid-container');
  const gridSize = parseInt(document.querySelector('#grid-size').value);

  //clear any existing grid
  gridContainer.innerHTML = '';

  const containerSize = 640;
  const pixelSize = containerSize / gridSize;

  const totalPixels = gridSize * gridSize;

  for (let i = 0; i < totalPixels; i++) {
    // create pixel div
    const pixel = document.createElement('div');

    // add pixel class
    pixel.className = 'pixel';

    // add pixel sizing
    pixel.style.width = `${pixelSize}px`;
    pixel.style.height = `${pixelSize}px`;

    // add event listener for the drawing modes
    pixel.addEventListener('mousedown', handleMouseDown); //Start drawing when hover
    pixel.addEventListener('mouseover', handleMouseOver); //Continue drawing
    pixel.addEventListener('click', handleMouseClick); //Toggle drawing when clicked

    // append pixels to the container
    gridContainer.appendChild(pixel);
  }
}

//// Rather than squares being the same color throughout the grid, randomize the squares’ RGB values with each interaction.

// make a function so that it return a randomize color - prefer RGB value

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// handle initial mouse press
function handleMouseDown(e) {
  // only activate when in hover draw mode
  if (drawMode === 'hover') {
    isDrawing = true;
    draw(e); // start drawing
  }
}

// handle mouse movement over pixels
function handleMouseOver(e) {
  // only draw if in hover mode
  if (drawMode === 'hover') {
    draw(e);
  }
}

// handle click event for toggle click mode
function handleMouseClick(e) {
  if (drawMode === 'click') {
    draw(e);
  }
}

function draw(e) {
  if (!isDrawing) return; // only draw when mouse is pressed
  const colorMode = document.querySelector('#colorMode').value;

  if (colorMode === 'selected-color') {
    const color = document.querySelector('#color-picker').value;
    e.target.style.backgroundColor = color;
  } else if (colorMode === 'random-color') {
    e.target.style.backgroundColor = getRandomColor();
  }
}

// stop drawing when mouse is released
function stopDrawing() {
  isDrawing = false;
}

function clearGrid() {
  const pixels = document.querySelectorAll('.pixel');
  pixels.forEach((pixel) => (pixel.style.backgroundColor = ''));
}

// add global event listener
document
  .querySelector('.grid-container')
  .addEventListener('mouseleave', stopDrawing); // stop drawing when mouse leave the the grid
document.addEventListener('mouseup', stopDrawing); // stop drawing when mouse is released anywhere
