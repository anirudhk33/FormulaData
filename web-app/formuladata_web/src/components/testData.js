// Real Data - Testing of algorithms
import * as functions from "../algorithms";

const avgFinishingPos = {
  "Max Verstappen": 1.2,
  "Lewis Hamilton": 4.4,
  "Sergio Perez": 4.6,
  "Fernando Alonso": 3.9,
  "Carlos Sainz": 6.6,
  "George Russell": 8.3,
  "Charles Leclerc": 8.9,
  "Esteban Ocon": 11.9,
  "Lando Norris": 11.1,
  "Pierre Gasly": 11.0,
  "Lance Stroll": 10.7,
  "Yuki Tsunoda": 12.9,
  "Oscar Piastri": 12.7,
  "Zhou Guanyu": 13.9,
  "Valtteri Bottas": 13.5,
  "Nico Hulkenberg": 14.6,
  "Nyck De Vries": 15.9,
  "Kevin Magnussen": 15.5,
  "Alexander Albon": 13.2,
  "Logan Sargeant": 16.2,
};

const avgFP1Pos = {
  "Max Verstappen": 2.4,
  "Lewis Hamilton": 8.2,
  "Sergio Perez": 3.7,
  "Fernando Alonso": 4.7,
  "Carlos Sainz": 7.1,
  "George Russell": 11.1,
  "Charles Leclerc": 5.8,
  "Esteban Ocon": 12.6,
  "Lando Norris": 11.2,
  "Pierre Gasly": 12.4,
  "Lance Stroll": 7.6,
  "Yuki Tsunoda": 14.3,
  "Oscar Piastri": 12.4,
  "Zhou Guanyu": 14.2,
  "Valtteri Bottas": 12.9,
  "Nico Hulkenberg": 14.5,
  "Nyck De Vries": 12.8,
  "Kevin Magnussen": 12.8,
  "Alexander Albon": 12.3,
  "Logan Sargeant": 17.3,
};

const avgFP2Pos = {
  "Max Verstappen": 2.0,
  "Lando Norris": 9.4,
  "Lewis Hamilton": 9.6,
  "Oscar Piastri": 14.2,
  "George Russell": 9.0,
  "Sergio Perez": 4.4,
  "Fernando Alonso": 4.4,
  "Alexander Albon": 13.5,
  "Charles Leclerc": 5.8,
  "Carlos Sainz": 5.6,
  "Logan Sargeant": 17.7,
  "Valtteri Bottas": 13.4,
  "Nico Hulkenberg": 10.0,
  "Lance Stroll": 9.8,
  "Zhou Guanyu": 13.7,
  "Yuki Tsunoda": 15.7,
  "Nyck De Vries": 17.4,
  "Pierre Gasly": 10.2,
  "Kevin Magnussen": 14.4,
  "Esteban Ocon": 9.8,
};

const avgFP3Pos = {
  "Max Verstappen": 1.8,
  "Lando Norris": 12.4,
  "Lewis Hamilton": 7.1,
  "Oscar Piastri": 13.6,
  "George Russell": 9.8,
  "Sergio Perez": 5.7,
  "Fernando Alonso": 5.9,
  "Alexander Albon": 12.8,
  "Charles Leclerc": 4.8,
  "Carlos Sainz": 5.4,
  "Logan Sargeant": 16.5,
  "Valtteri Bottas": 12.9,
  "Nico Hulkenberg": 13.2,
  "Lance Stroll": 8.3,
  "Zhou Guanyu": 13.4,
  "Yuki Tsunoda": 13.8,
  "Nyck De Vries": 16.0,
  "Pierre Gasly": 10.2,
  "Kevin Magnussen": 13.5,
  "Esteban Ocon": 12.9,
};

const raceOrder = [
  "Max Verstappen",
  "Lando Norris",
  "Lewis Hamilton",
  "Oscar Piastri",
  "George Russell",
  "Sergio Perez",
  "Fernando Alonso",
  "Alexander Albon",
  "Charles Leclerc",
  "Carlos Sainz",
  "Logan Sargeant",
  "Valtteri Bottas",
  "Nico Hulkenberg",
  "Lance Stroll",
  "Zhou Guanyu",
  "Yuki Tsunoda",
  "Nyck De Vries",
  "Pierre Gasly",
  "Kevin Magnussen",
  "Esteban Ocon",
];

const gridOrder = [
  "Max Verstappen",
  "Lando Norris",
  "Oscar Piastri",
  "Charles Leclerc",
  "Carlos Sainz",
  "George Russell",
  "Lewis Hamilton",
  "Alexander Albon",
  "Fernando Alonso",
  "Pierre Gasly",
  "Nico Hulkenberg",
  "Lance Stroll",
  "Esteban Ocon",
  "Logan Sargeant",
  "Valtteri Bottas",
  "Sergio Perez",
  "Yuki Tsunoda",
  "Zhou Guanyu",
  "Nyck De Vries",
  "Kevin Magnussen",
];

const flOrder = [
  "Max Verstappen",
  "Lando Norris",
  "Lewis Hamilton",
  "Oscar Piastri",
  "Sergio Perez",
  "George Russell",
  "Charles Leclerc",
  "Alexander Albon",
  "Fernando Alonso",
  "Carlos Sainz",
  "Lance Stroll",
  "Pierre Gasly",
  "Logan Sargeant",
  "Zhou Guanyu",
  "Nico Hulkenberg",
  "Valtteri Bottas",
  "Yuki Tsunoda",
  "Nyck De Vries",
  "Kevin Magnussen",
  "Esteban Ocon",
];

const fastPitFreq = {
  "Red Bull Racing": 5,
  McLaren: 2,
  Mercedes: 0,
  Ferrari: 3,
  Williams: 0,
  "Aston Martin": 0,
  Alpine: 0,
  "Alfa Romeo": 0,
  "Haas F1 Team": 0,
  AlphaTauri: 0,
};

const driverConstructorMap = {
  "Max Verstappen": "Red Bull Racing",
  "Lando Norris": "McLaren",
  "Lewis Hamilton": "Mercedes",
  "Oscar Piastri": "McLaren",
  "Sergio Perez": "Red Bull Racing",
  "George Russell": "Mercedes",
  "Charles Leclerc": "Ferrari",
  "Alexander Albon": "Williams",
  "Fernando Alonso": "Aston Martin",
  "Carlos Sainz": "Ferrari",
  "Pierre Gasly": "Alpine",
  "Logan Sargeant": "Williams",
  "Zhou Guanyu": "Alfa Romeo",
  "Nico Hulkenberg": "Haas F1 Team",
  "Valtteri Bottas": "Alfa Romeo",
  "Yuki Tsunoda": "AlphaTauri",
  "Nyck De Vries": "AlphaTauri",
  "Kevin Magnussen": "Haas F1 Team",
  "Esteban Ocon": "Alpine",
};

const constructorDriverMap = {
  "Red Bull Racing": ["Max Verstappen", "Sergio Perez"],
  McLaren: ["Lando Norris", "Oscar Piastri"],
  Mercedes: ["Lewis Hamilton", "George Russell"],
  Ferrari: ["Charles Leclerc", "Carlos Sainz"],
  Williams: ["Alexander Albon", "Logan Sargeant"],
  "Aston Martin": ["Fernando Alonso", "Lance Stroll"],
  Alpine: ["Pierre Gasly", "Esteban Ocon"],
  "Alfa Romeo": ["Zhou Guanyu", "Valtteri Bottas"],
  "Haas F1 Team": ["Nico Hulkenberg", "Kevin Magnussen"],
  AlphaTauri: ["Yuki Tsunoda", "Nyck De Vries"],
};

const driverPrices = {
  "Max Verstappen": 28.1,
  "Sergio Perez": 19.3,
  "Lewis Hamilton": 24.7,
  "Fernando Alonso": 11.4,
  "George Russell": 18.8,
  "Carlos Sainz": 17.4,
  "Charles Leclerc": 21.9,
  "Lando Norris": 12.9,
  "Lance Stroll": 8.6,
  "Pierre Gasly": 8.6,
  "Zhou Guanyu": 5.2,
  "Oscar Piastri": 8.0,
  "Esteban Ocon": 9.8,
  "Yuki Tsunoda": 5.1,
  "Kevin Magnussen": 6.8,
  "Valtteri Bottas": 7.9,
  "Alexander Albon": 6.9,
  "Nico Hulkenberg": 3.8,
  "Logan Sargeant": 4.5,
  "Nyck De Vries": 4.5,
};

const constructorPrices = {
  "Red Bull Racing": 28.4,
  Mercedes: 25.3,
  Ferrari: 22.9,
  "Aston Martin": 9.0,
  McLaren: 10.8,
  Alpine: 10.4,
  "Alfa Romeo": 5.9,
  "Haas F1 Team": 4.9,
  AlphaTauri: 6.0,
  Williams: 5.5,
};

currentDrivers = [
  "Max Verstappen",
  "Fernando Alonso",
  "Yuki Tsunoda",
  "Lance Stroll",
  "Sergio Perez",
];
currentConstructors = ["Red Bull Racing", "Aston Martin"];

let DriverPoints = racePositionPoints(raceOrder);
DriverPoints = gridPositionPoints(gridOrder, DriverPoints);
DriverPoints = positonsGained(raceOrder, gridOrder, DriverPoints);
DriverPoints = overtakesMade(raceOrder, gridOrder, DriverPoints);
let DriverPointsBalanced = fastestLapBalanced(flOrder, DriverPoints);

DriverPointsBalanced = raceDeductionsBalanced(raceOrder, DriverPointsBalanced);
DriverPointsBalanced = DOTDBalanced(
  avgFinishingPos,
  raceOrder,
  DriverPointsBalanced
);
DriverPointsBalanced = sprintBoostDrivers(false, DriverPointsBalanced);
/////////////////////////////////////

let DriverPointsRisky = fastestLapRisky(flOrder, DriverPoints);
DriverPointsRisky = raceDeductionsRisky(raceOrder, DriverPointsRisky);
DriverPointsRisky = DOTDRisky(avgFinishingPos, raceOrder, DriverPointsRisky);
DriverPointsRisky = sprintBoostDrivers(false, DriverPointsRisky);
// console.log(DriverPointsRisky)
//////////////////////////

let ConstructorPointsBalanced = driverToConstructor(
  DriverPointsBalanced,
  constructorDriverMap
);
ConstructorPointsBalanced = modifyConstructorPoints(
  constructorDriverMap,
  gridOrder,
  ConstructorPointsBalanced
);
ConstructorPointsBalanced = sprintBoostConstructors(
  false,
  ConstructorPointsBalanced
);
ConstructorPointsBalanced = pitStopBonus(
  fastPitFreq,
  ConstructorPointsBalanced
);

/////////////////////////////////////

let ConstructorPointsRisky = driverToConstructor(
  DriverPointsRisky,
  constructorDriverMap
);
ConstructorPointsRisky = modifyConstructorPoints(
  constructorDriverMap,
  gridOrder,
  ConstructorPointsRisky
);
ConstructorPointsRisky = sprintBoostConstructors(false, ConstructorPointsRisky);
ConstructorPointsRisky = pitStopBonus(fastPitFreq, ConstructorPointsRisky);

const optimalTeamBalanced = optimizeTeam(
  driverPrices,
  constructorPrices,
  currentDrivers,
  currentConstructors,
  DriverPointsBalanced,
  ConstructorPointsBalanced,
  110.4
);

const optimalTeamRisky = optimizeTeam(
  driverPrices,
  constructorPrices,
  currentDrivers,
  currentConstructors,
  DriverPointsRisky,
  ConstructorPointsRisky,
  110.4
);

console.log(optimalTeamBalanced.slice(0, 5));
console.log(optimalTeamRisky.slice(0, 5));
