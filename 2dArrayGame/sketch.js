// Backyard Archeology
// Roger Lam
// April 6, 2018

// you are broke.
// one day you go into your backyard and something is sticking out of the ground...
// turns out there are all sorts of things in your backyard, including ancient artifacts and other valuable items

// global variables
let artifactsGrid, dirtGrid;
let cols, rows;
let cellSize;
let bitcoin, portalGun, poop, bomb, lol, juniorChicken, ring;
let death;
let artifactX, artifactY;
let dirtX, dirtY;
let timeNow, timeUntilUncover;
let clickedX, clickedY;
let points;
let mysteryItemPrice, salesSkillsPrice, resetMapPrice, boughtSalesSkills;
let bitcoinPrice, poopPrice, portalGunPrice, juniorChickenPrice, ringPrice;
let state;
let trolled;
let bgMusic, digSound, bitcoinSound, portalGunSound, poopSound, bombSound, lolSound, juniorChickenSound, ringSound, purchaseSound;

// the preload function loads any wanted assets onto the canvas
function preload() {
  bitcoin = loadImage("assets/images/bitcoin.png");
  portalGun = loadImage("assets/images/portalGun.png");
  poop = loadImage("assets/images/poop.png");
  bomb = loadImage("assets/images/bomb.png");
  death = loadImage("assets/images/gameOver.png");
  juniorChicken = loadImage("assets/images/juniorChicken.png");
  ring = loadImage("assets/images/ring.png");
  lol = loadImage("assets/images/lol.png");

  bgMusic = loadSound("assets/music/bgMusic.mp3");

  digSound = loadSound("assets/sounds/dig.ogg");
  bitcoinSound = loadSound("assets/sounds/coinSound.mp3");
  portalGunSound = loadSound("assets/sounds/portalGun.mp3");
  poopSound = loadSound("assets/sounds/poop.mp3");
  bombSound = loadSound("assets/sounds/bomb.mp3");
  juniorChickenSound = loadSound("assets/sounds/juniorChicken.mp3");
  ringSound = loadSound("assets/sounds/coinSound.mp3");

  purchaseSound = loadSound("assets/sounds/purchase.mp3");
  lolSound = loadSound("assets/sounds/lol.mp3");
}

// the setup function will only run once (before the draw loop begins)
// this is where you want to set up the environment (size of canvas, etc)
function setup() {
  cols = 15;
  rows = 12;

  artifactsGrid = artifactsGridCreation(cols, rows);
  dirtGrid = createDirtLayer(cols, rows);
  cellSize = 60;

  createCanvas(cellSize * cols + 2 * cellSize, cellSize * rows);

  artifactX = 0;
  artifactY = 0;
  dirtX = 0;
  dirtY = 0;

  points = 0;

  mysteryItemPrice = 100000;
  salesSkillsPrice = 300000;
  resetMapPrice = 500000;

  trolled = false;
  state = 1;
  boughtSalesSkills = false;

  bitcoinPrice = 10000;
  poopPrice = 50;
  portalGunPrice = 50000;
  juniorChickenPrice = 10000;
  ringPrice = 50000;

  bgMusic.setVolume(1);
  bgMusic.loop();
}

// a loop that executes given actions according to your fps
function draw() {
  background(45, 32, 4);
  displayArtifactsGrid();
  createDirtLayer();
  displayDirtLayer();
  timeNow = millis();

  // if player lost, draws game over screen
  if (state === 2) {
    gameOver();
  }

  uncoverDirt();
  displayPoints();
  displayTheShop();
  troll();
}

// this function creates a 2d array that randomizes items around the map, then returns that array
function artifactsGridCreation(cols, rows) {
  let randomGrid = [];
  for (let x = 0; x < cols; x++) {
    randomGrid.push([]);
    for (let y = 0; y < rows; y++) {
      if (random(25) < 1) {
        randomGrid[x].push("bitcoin");
      } else if (random(25) < 1) {
        randomGrid[x].push("portalGun");
      } else if (random(25) < 1) {
        randomGrid[x].push("poop");
      } else if (random(25) < 1) {
        randomGrid[x].push("bomb");
      } else if (random(25) < 1) {
        randomGrid[x].push("juniorChicken");
      } else if (random(25) < 1) {
        randomGrid[x].push("ring");
      } else {
        randomGrid[x].push(0);
      }
    }
  }
  return randomGrid;
}

// this function draws the assets from the created 2d array from the artifactsGridCreation function
function displayArtifactsGrid() {
  fill(62, 44, 12);
  for (artifactX = 0; artifactX < cols; artifactX++) {
    for (artifactY = 0; artifactY < rows; artifactY++) {
      if (artifactsGrid[artifactX][artifactY] === "bitcoin") {
        image(bitcoin, artifactX * cellSize, artifactY * cellSize, cellSize, cellSize);
      } else if (artifactsGrid[artifactX][artifactY] === "portalGun") {
        if (artifactX * cellSize - cellSize >= 0) {
          if (artifactsGrid[artifactX - 1][artifactY] >= 0 && artifactsGrid[artifactX - 1][artifactY] != "bitcoin" && artifactsGrid[artifactX - 1][artifactY] != "poop" && artifactsGrid[artifactX - 1][artifactY] != "bomb" &&
            artifactsGrid[artifactX - 1][artifactY] != "portalGun" && artifactsGrid[artifactX - 1][artifactY] != "juniorChicken" && artifactsGrid[artifactX - 1][artifactY] != "ring") {
            image(portalGun, artifactX * cellSize - cellSize, artifactY * cellSize, cellSize * 2, cellSize);
          } else {
            artifactsGrid.splice(artifactX, 1, 0);
          }
        }
      } else if (artifactsGrid[artifactX][artifactY] === "poop") {
        image(poop, artifactX * cellSize, artifactY * cellSize, cellSize, cellSize);
      } else if (artifactsGrid[artifactX][artifactY] === "bomb") {
        image(bomb, artifactX * cellSize, artifactY * cellSize, cellSize, cellSize);
      } else if (artifactsGrid[artifactX][artifactY] === "juniorChicken") {
        image(juniorChicken, artifactX * cellSize, artifactY * cellSize, cellSize, cellSize);
      } else if (artifactsGrid[artifactX][artifactY] === "ring") {
        image(ring, artifactX * cellSize, artifactY * cellSize, cellSize, cellSize);
      }
    }
  }
}

// this function creates a 2d array with only one item...the dirt
function createDirtLayer(cols, rows) {
  let grid = [];
  for (let x = 0; x < cols; x++) {
    grid.push([]);
    for (let y = 0; y < rows; y++) {
      grid[x].push(true);
    }
  }
  return grid;
}

// this function draws the dirt, it goes over the artifacts and it functions with a boolean-oriented system
function displayDirtLayer() {
  fill(85, 64, 16);
  for (dirtX = 0; dirtX < cols; dirtX++) {
    for (dirtY = 0; dirtY < rows; dirtY++) {
      if (dirtGrid[dirtX][dirtY] === true) {
        rect(dirtX * cellSize, dirtY * cellSize, cellSize, cellSize);
      } else {
        continue;
      }
    }
  }
}

// when the mouse is clicked, uncover dirt, check for purchase, check if player is trolled
function mouseClicked() {
  clickedX = mouseX / cellSize;
  clickedY = mouseY / cellSize;
  if (state === 1 && mouseX < cols * cellSize) {
    timeUntilUncover = millis() + 400;
    uncoverDirt();
    checkForItems();
  }
  if (state === 1) {
    mysteryItem();
    salesSkills();
    resetMap();
  }
  if (trolled === true) {
    lolSound.loop();
  }
}

// uncover the dirt block based on mouse coordinate after n seconds
function uncoverDirt() {
  if (timeNow > timeUntilUncover) {
    dirtGrid[floor(clickedX)][floor(clickedY)] = false;
    digSound.play();
    timeUntilUncover = undefined;
  }
}

// function that checks if item is found
function checkForItems() {
  if (dirtGrid[floor(clickedX)][floor(clickedY)] === false && artifactsGrid[floor(clickedX)][floor(clickedY)] === "bitcoin") {
    artifactsGrid[floor(clickedX)][floor(clickedY)] = 0;
    bitcoinSound.play();
    points += bitcoinPrice;
  } else if (dirtGrid[floor(clickedX)][floor(clickedY)] === false && artifactsGrid[floor(clickedX)][floor(clickedY)] === "poop") {
    artifactsGrid[floor(clickedX)][floor(clickedY)] = 0;
    poopSound.play();
    points += poopPrice;
  } else if (dirtGrid[floor(clickedX)][floor(clickedY)] === false && dirtGrid[floor(clickedX) - 1][floor(clickedY)] === false && artifactsGrid[floor(clickedX)][floor(clickedY)] === "portalGun") {
    artifactsGrid[floor(clickedX)][floor(clickedY)] = 0;
    portalGunSound.play();
    points += portalGunPrice;
  } else if (artifactsGrid[floor(clickedX)][floor(clickedY)] === "bomb") {
    bombSound.play();
    gameOver();
  } else if (dirtGrid[floor(clickedX)][floor(clickedY)] === false && artifactsGrid[floor(clickedX)][floor(clickedY)] === "juniorChicken") {
    artifactsGrid[floor(clickedX)][floor(clickedY)] = 0;
    juniorChickenSound.play();
    points += juniorChickenPrice;
  } else if (dirtGrid[floor(clickedX)][floor(clickedY)] === false && artifactsGrid[floor(clickedX)][floor(clickedY)] === "ring") {
    artifactsGrid[floor(clickedX)][floor(clickedY)] = 0;
    ringSound.play();
    points += ringPrice;
  } else {
    displayPoints();
  }
}

// function that displays the points
function displayPoints() {
  textSize(22);
  fill(255, 215, 0);
  text("Points:", cols * cellSize + cellSize * 0.15, cellSize * 0.5);
  text(points, cols * cellSize + cellSize * 0.15, cellSize * 0.85);
}

// the game over screen
function gameOver() {
  state = 2;
  textSize(54);
  fill(255, 0, 0);
  text("GAME OVER", 300, 300);
  text("You made $" + points, 250, 375);
}

// function that draws the shop
function displayTheShop() {
  fill(142, 131, 105);
  rect(cols * cellSize, 3 * cellSize, 2 * cellSize, 3 * cellSize);
  rect(cols * cellSize, 6 * cellSize, 2 * cellSize, 3 * cellSize);
  rect(cols * cellSize, 9 * cellSize, 2 * cellSize, 3 * cellSize);

  // if mouse hovered over, darken button
  if (mouseX > cols * cellSize && mouseX < width && mouseY > 3 * cellSize && mouseY < 6 * cellSize) {
    fill(138, 87, 21);
    rect(cols * cellSize, 3 * cellSize, 2 * cellSize, 3 * cellSize);
  }
  if (mouseX > cols * cellSize && mouseX < width && mouseY > 6 * cellSize && mouseY < 9 * cellSize) {
    fill(138, 87, 21);
    rect(cols * cellSize, 6 * cellSize, 2 * cellSize, 3 * cellSize);
  }
  if (mouseX > cols * cellSize && mouseX < width && mouseY > 9 * cellSize && mouseY < height) {
    fill(138, 87, 21);
    rect(cols * cellSize, 9 * cellSize, 2 * cellSize, 3 * cellSize);
  }

  textSize(22);
  fill("white");
  text("The Shop", cols * cellSize + cellSize * 0.20, cellSize * 2.80);

  textSize(20);
  fill(73, 47, 8);
  text("Mystery", cols * cellSize + cellSize * 0.15, cellSize * 3.40);
  text("Item", cols * cellSize + cellSize * 0.15, cellSize * 3.75);
  text("Cost:", cols * cellSize + cellSize * 0.15, cellSize * 4.75);
  text("$" + mysteryItemPrice, cols * cellSize + cellSize * 0.15, cellSize * 5.15);

  text("Sales", cols * cellSize + cellSize * 0.15, cellSize * 6.40);
  text("Skills", cols * cellSize + cellSize * 0.15, cellSize * 6.75);
  text("Cost:", cols * cellSize + cellSize * 0.15, cellSize * 7.75);
  text("$" + salesSkillsPrice, cols * cellSize + cellSize * 0.15, cellSize * 8.15);

  text("Reset Map", cols * cellSize + cellSize * 0.15, cellSize * 9.40);
  text("Cost:", cols * cellSize + cellSize * 0.15, cellSize * 10.40);
  text("$" + resetMapPrice, cols * cellSize + cellSize * 0.15, cellSize * 10.80);
}

// function that executes when mystery item is purchased
function mysteryItem() {
  if (mouseX > cols * cellSize && mouseX < width && mouseY > 3 * cellSize && mouseY < 6 * cellSize) {
    if (points >= mysteryItemPrice) {
      points = points - mysteryItemPrice;
      trolled = true;
      gameOver();
    }
  }
}

// function that executes when sales skills item is purchased
function salesSkills() {
  if (mouseX > cols * cellSize && mouseX < width && mouseY > 6 * cellSize && mouseY < 9 * cellSize) {
    if (points >= salesSkillsPrice && boughtSalesSkills === false) {
      points = points - salesSkillsPrice;
      purchaseSound.play();
      boughtSalesSkills = true;
      doubleMoney();
    }
  }
}

// function that executes when the sales skills function is executed, doubles the value of the items
function doubleMoney() {
  bitcoinPrice = bitcoinPrice * 2;
  poopPrice = poopPrice * 2;
  portalGunPrice = portalGunPrice * 2;
  juniorChickenPrice = juniorChickenPrice * 2;
  ringPrice = ringPrice * 2;
}

// function that executes when reset map is purchased
function resetMap() {
  if (mouseX > cols * cellSize && mouseX < width && mouseY > 9 * cellSize && mouseY < height) {
    if (points >= resetMapPrice) {
      points = points - resetMapPrice;
      purchaseSound.play();
      artifactsGrid = artifactsGridCreation(cols, rows);
      dirtGrid = createDirtLayer(cols, rows);
    }
  }
}

// function that draws Yao Mings' in random locations
function troll() {
  if (trolled === true) {
    image(lol, random(cols * cellSize), random(rows * cellSize), lol.width * 0.1, lol.height * 0.1);
  }
}
