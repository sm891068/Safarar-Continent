// Coordinate-based world map system

class WorldMap {
  constructor() {
    this.areas = {};
    this.worldSize = { width: 1000, height: 1000 }; // Size of the world
  }

  // Add new area at specified coordinates
  addArea(x, y, areaName) {
    if (!this.isCoordinateValid(x, y)) {
      throw new Error(`Invalid coordinates: (${x}, ${y})`);
    }
    this.areas[`${x},${y}`] = areaName;
  }

  // Validate coordinates
  isCoordinateValid(x, y) {
    return x >= 0 && x < this.worldSize.width && y >= 0 && y < this.worldSize.height;
  }

  // Get area by coordinates
  getArea(x, y) {
    return this.areas[`${x},${y}`] || null;
  }

  // Display minimap
  displayMinimap() {
    console.log('Minimap:');
    for (let y = 0; y < this.worldSize.height; y += 100) {
      let row = '';
      for (let x = 0; x < this.worldSize.width; x += 100) {
        row += this.getArea(x, y) ? 'A级' : ' . ';
      }
      console.log(row);
    }
  }

  // Navigate to destination using waypoints
  navigateTo(x, y) {
    if (!this.isCoordinateValid(x, y)) {
      throw new Error(`Invalid destination coordinates: (${x}, ${y})`);
    }
    console.log(`Navigating to (${x}, ${y})...`);
  }
}

// Example usage:
const map = new WorldMap();
map.addArea(100, 200, 'Forest');
map.addArea(300, 400, 'Desert');
map.displayMinimap();
map.navigateTo(100, 200);