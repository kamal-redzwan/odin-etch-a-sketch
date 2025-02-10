function createGrid() {
  const gridContainer = document.querySelector('.grid-container');
  const gridSize = 16;

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

    // append to the container
    gridContainer.appendChild(pixel);
  }
}

createGrid();
