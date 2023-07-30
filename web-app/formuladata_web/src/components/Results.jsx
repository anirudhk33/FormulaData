import * as functions from "../algorithms";
import axios from "axios";
import React, { useEffect, useState } from "react";

///////////////////////////////////////////////////
///////////////CONSTANTS///////////////////////////
///////////////////////////////////////////////////

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
  "Daniel Ricciardo": 15.9,
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
  "Daniel Ricciardo": 12.8,
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
  "Daniel Ricciardo": 17.4,
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
  "Daniel Ricciardo": 16.0,
  "Pierre Gasly": 10.2,
  "Kevin Magnussen": 13.5,
  "Esteban Ocon": 12.9,
};

const raceOrderBackup = [
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
  "Daniel Ricciardo",
  "Pierre Gasly",
  "Kevin Magnussen",
  "Esteban Ocon",
];

const gridOrderBackup = [
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
  "Daniel Ricciardo",
  "Kevin Magnussen",
];

const flOrderBackup = [
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
  "Daniel Ricciardo",
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
  "Daniel Ricciardo": "AlphaTauri",
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
  AlphaTauri: ["Yuki Tsunoda", "Daniel Ricciardo"],
};

const driverPrices = {
  "Max Verstappen": 28.3,
  "Sergio Perez": 20.3,
  "Lewis Hamilton": 25,
  "Fernando Alonso": 11.9,
  "George Russell": 19.1,
  "Carlos Sainz": 17.5,
  "Charles Leclerc": 22,
  "Lando Norris": 13.9,
  "Lance Stroll": 9.1,
  "Pierre Gasly": 8.5,
  "Zhou Guanyu": 5.2,
  "Oscar Piastri": 9.0,
  "Esteban Ocon": 9.7,
  "Yuki Tsunoda": 5.1,
  "Kevin Magnussen": 6.8,
  "Valtteri Bottas": 7.9,
  "Alexander Albon": 7.4,
  "Nico Hulkenberg": 3.8,
  "Logan Sargeant": 4.5,
  "Daniel Ricciardo": 4.5,
};

const constructorPrices = {
  "Red Bull Racing": 28.6,
  Mercedes: 25.4,
  Ferrari: 23,
  "Aston Martin": 9.5,
  McLaren: 11.8,
  Alpine: 10.3,
  "Alfa Romeo": 5.9,
  "Haas F1 Team": 4.9,
  AlphaTauri: 6.0,
  Williams: 5.5,
};

///////////////////////////////////////////////////
///////////////POINT CALCULATION///////////////////
///////////////////////////////////////////////////

const racePositionToPoints = (position) => {
  switch (position) {
    case 1:
      return 25;
    case 2:
      return 18;
    case 3:
      return 15;
    case 4:
      return 12;
    case 5:
      return 10;
    case 6:
      return 8;
    case 7:
      return 6;
    case 8:
      return 4;
    case 9:
      return 2;
    case 10:
      return 1;
    default:
      return 0;
  }
};

const qualiPositionToPoints = (position) => {
  switch (position) {
    case 1:
      return 10;
    case 2:
      return 9;
    case 3:
      return 8;
    case 4:
      return 7;
    case 5:
      return 6;
    case 6:
      return 5;
    case 7:
      return 4;
    case 8:
      return 3;
    case 9:
      return 2;
    case 10:
      return 1;
    default:
      return 0;
  }
};

const racePositionPoints = (raceOrder) => {
  let DriverPoints = {};
  for (let i = 0; i < raceOrder.length; i++) {
    DriverPoints[raceOrder[i]] = racePositionToPoints(i + 1);
  }
  return DriverPoints;
};

const gridPositionPoints = (gridOrder, DriverPoints) => {
  for (let i = 0; i < gridOrder.length; i++) {
    DriverPoints[gridOrder[i]] += qualiPositionToPoints(i + 1);
  }
  return DriverPoints;
};

const positonsGained = (raceOrder, gridOrder, DriverPoints) => {
  for (let i = 0; i < raceOrder.length; i++) {
    const gridPos = gridOrder.indexOf(raceOrder[i]) + 1;
    const racePos = i + 1;
    const posGained = gridPos - racePos;
    DriverPoints[raceOrder[i]] += posGained;
  }
  return DriverPoints;
};

const overtakesMade = (raceOrder, gridOrder, DriverPoints) => {
  for (let i = 0; i < raceOrder.length; i++) {
    const gridPos = gridOrder.indexOf(raceOrder[i]) + 1;
    const racePos = i + 1;
    const overtakes = gridPos - racePos > 0 ? gridPos - racePos : 0;
    DriverPoints[raceOrder[i]] += overtakes;
  }
  return DriverPoints;
};

const fastestLapBalanced = (flOrder, DriverPoints) => {
  DriverPoints[flOrder[0]] += 7;
  for (let i = 0; i < 5; i++) {
    DriverPoints[flOrder[i]] += 3;
  }
  return JSON.parse(JSON.stringify(DriverPoints));
};

const fastestLapRisky = (flOrder, DriverPoints) => {
  for (let i = 0; i < 3; i++) {
    DriverPoints[flOrder[i]] += 10;
  }
  return JSON.parse(JSON.stringify(DriverPoints));
};

const raceDeductionsBalanced = (raceOrder, DriverPoints) => {
  for (let i = 17; i < raceOrder.length; i++) {
    DriverPoints[raceOrder[i]] -= 5;
  }
  return DriverPoints;
};

const raceDeductionsRisky = (raceOrder, DriverPoints) => {
  for (let i = 17; i < raceOrder.length; i++) {
    DriverPoints[raceOrder[i]] -= 5;
  }
  return DriverPoints;
};

const DOTDRisky = (avgFinishingPos, raceOrder, DriverPoints) => {
  const percentImprovement = {};
  for (let i = 0; i < 12; i++) {
    let improv =
      (avgFinishingPos[raceOrder[i]] - (i + 1)) / avgFinishingPos[raceOrder[i]];
    percentImprovement[raceOrder[i]] = improv;
  }
  const sortedImprovements = Object.keys(percentImprovement).sort(
    (a, b) => percentImprovement[b] - percentImprovement[a]
  );
  const top5 = sortedImprovements.slice(0, 5);
  for (let i = 0; i < 5; i++) {
    DriverPoints[top5[i]] += 10;
  }
  return DriverPoints;
};

const DOTDBalanced = (avgFinishingPos, raceOrder, DriverPoints) => {
  const percentImprovement = {};
  for (let i = 0; i < 12; i++) {
    let improv =
      (avgFinishingPos[raceOrder[i]] - (i + 1)) / avgFinishingPos[raceOrder[i]];
    percentImprovement[raceOrder[i]] = improv;
  }
  const sortedImprovements = Object.keys(percentImprovement).sort(
    (a, b) => percentImprovement[b] - percentImprovement[a]
  );
  const top5 = sortedImprovements.slice(0, 5);
  for (let i = 0; i < 3; i++) {
    DriverPoints[top5[i]] += 5;
  }
  return DriverPoints;
};

const driverToConstructor = (DriverPoints, constructorDriverMap) => {
  let ConstructorPoints = {};
  for (const constructor in constructorDriverMap) {
    let sum = 0;
    for (let i = 0; i < constructorDriverMap[constructor].length; i++) {
      sum += DriverPoints[constructorDriverMap[constructor][i]];
    }
    ConstructorPoints[constructor] = sum;
  }
  return ConstructorPoints;
};

const modifyConstructorPoints = (
  constructorDriverMap,
  gridOrder,
  ConstructorPoints
) => {
  for (const constructor in constructorDriverMap) {
    const drivers = constructorDriverMap[constructor];
    const driver1 = drivers[0];
    const driver2 = drivers[1];

    const driver1Position = gridOrder.indexOf(driver1) + 1;
    const driver2Position = gridOrder.indexOf(driver2) + 1;

    const neitherReachesQ2 = driver1Position > 15 && driver2Position > 15;
    const oneReachesQ2 = driver1Position <= 15 || driver2Position <= 15;
    const bothReachQ2 = driver1Position <= 15 && driver2Position <= 15;
    const oneReachesQ3 = driver1Position <= 10 || driver2Position <= 10;
    const bothReachQ3 = driver1Position <= 10 && driver2Position <= 10;

    let constructorPoints = 0;
    if (neitherReachesQ2) {
      constructorPoints = -1;
    } else if (oneReachesQ2) {
      constructorPoints = 1;
    } else if (bothReachQ2) {
      constructorPoints = 3;
    } else if (oneReachesQ3) {
      constructorPoints = 5;
    } else if (bothReachQ3) {
      constructorPoints = 10;
    }

    ConstructorPoints[constructor] += constructorPoints;
  }

  return ConstructorPoints;
};

const sprintBoostDrivers = (sprint, DriverPoints) => {
  if (sprint) {
    for (let driver in DriverPoints) {
      DriverPoints[driver] = parseInt(DriverPoints[driver] * 1.3);
    }
  }
  return DriverPoints;
};

const sprintBoostConstructors = (sprint, ConstructorPoints) => {
  if (false) {
    for (let constructor in ConstructorPoints) {
      ConstructorPoints[constructor] = ConstructorPoints[constructor] * 1.3;
    }
  }
  return ConstructorPoints;
};

const pitStopBonus = (fastPitFreq, ConstructorPoints) => {
  const sortedFreq = Object.keys(fastPitFreq).sort(
    (a, b) => fastPitFreq[b] - fastPitFreq[a]
  );
  ConstructorPoints[sortedFreq[0]] += 10;
  ConstructorPoints[sortedFreq[1]] += 5;
  ConstructorPoints[sortedFreq[2]] += 5;
  return ConstructorPoints;
};

///////////////////////////////////////////////////
///////////////OPTIMIZATION////////////////////////
///////////////////////////////////////////////////

const generateCombinations = (elements, k) => {
  const combinations = [];
  const currentComb = [];

  const backtrack = (start) => {
    if (currentComb.length === k) {
      combinations.push([...currentComb]);
      return;
    }

    for (let i = start; i < elements.length; i++) {
      currentComb.push(elements[i]);
      backtrack(i + 1);
      currentComb.pop();
    }
  };

  backtrack(0);

  return combinations;
};

const optimizeTeam = (
  driverPrices,
  constructorPrices,
  currentDrivers,
  currentConstructors,
  DriverPoints,
  ConstructorPoints,
  budget
) => {
  const drivers = Object.keys(driverPrices);
  const constructors = Object.keys(constructorPrices);

  // Generate all combinations of 5 drivers from the available list
  const driverCombinations = generateCombinations(drivers, 5);

  // Generate all combinations of 2 constructors from the available list
  const constructorCombinations = generateCombinations(constructors, 2);

  // Combine the driver and constructor combinations to form teams
  const teams = [];
  for (const driverComb of driverCombinations) {
    let maxPoints = 0;
    for (const driver of driverComb) {
      const points = DriverPoints[driver];
      if (points > maxPoints) {
        maxPoints = points;
      }
    }
    for (const constructorComb of constructorCombinations) {
      teams.push({
        drivers: driverComb,
        constructors: constructorComb,
        points:
          driverComb.reduce((sum, driver) => sum + DriverPoints[driver], 0) +
          constructorComb.reduce(
            (sum, constructor) => sum + ConstructorPoints[constructor],
            0
          ) +
          maxPoints,
      });
    }
  }

  // Step 3: Calculate total prices and remove teams exceeding budget
  const teamsWithinBudget = teams.filter((team) => {
    const driverPriceSum = team.drivers.reduce(
      (total, driver) => total + driverPrices[driver],
      0
    );
    const constructorPriceSum = team.constructors.reduce(
      (total, constructor) => total + constructorPrices[constructor],
      0
    );
    const totalPrices = driverPriceSum + constructorPriceSum;
    team.prices = totalPrices; // Add prices key to team object

    return totalPrices <= budget;
  });

  // Step 4: Return teams if current drivers and constructors are empty
  if (currentDrivers.length === 0 && currentConstructors.length === 0) {
    return teamsWithinBudget.sort((a, b) => b.points - a.points);
  }
  const finalTeams = [];
  for (let i = 0; i < teamsWithinBudget.length; i++) {
    // Step 5: Calculate points deduction based on current team
    const commonDrivers = currentDrivers.filter((driver) =>
      teamsWithinBudget[i].drivers.includes(driver)
    );
    const commonConstructors = currentConstructors.filter((constructor) =>
      teamsWithinBudget[i].constructors.includes(constructor)
    );

    let pointsDeduction = 0;
    if (commonDrivers.length + commonConstructors.length > 3) {
      pointsDeduction = 0;
    } else if (commonDrivers.length + commonConstructors.length == 3) {
      pointsDeduction = 4;
    } else if (commonDrivers.length + commonConstructors.length == 2) {
      pointsDeduction = 8;
    } else if (commonDrivers.length + commonConstructors.length == 1) {
      pointsDeduction = 12;
    } else if (commonDrivers.length + commonConstructors.length == 0) {
      pointsDeduction = 16;
    }
    teamsWithinBudget[i]["pointsDeduction"] = pointsDeduction;
    teamsWithinBudget[i]["points"] -= pointsDeduction;
    // finalTeams.append(teamsWithinBudget[i]);
  }

  return teamsWithinBudget.sort((a, b) => b.points - a.points);
};

///////////////////////////////////////////////////
///////////////CHIP USAGE//////////////////////////
///////////////////////////////////////////////////

const useWildCard = (optimalTeam) => {
  try {
    if (optimalTeam.pointsDeduction > 4) return true;
    return false;
  } catch {
    return false;
  }
};

const DRSBoost = (optimalTeam, DriverPoints, exception) => {
  let bestDriver = "";
  let maxPoints = -100;
  for (let i = 0; i < optimalTeam.drivers.length; i++) {
    if (
      DriverPoints[optimalTeam.drivers[i]] > maxPoints &&
      optimalTeam.drivers[i] !== exception
    ) {
      bestDriver = optimalTeam.drivers[i];
      maxPoints = DriverPoints[optimalTeam.drivers[i]];
    }
  }
  return bestDriver;
};

const extraDRSBoost = (optimalTeam, DriverPoints, sprint) => {
  if (!sprint) return "";
  let bestDriver = "";
  let maxPoints = -100;
  for (let i = 0; i < optimalTeam.drivers.length; i++) {
    if (DriverPoints[optimalTeam.drivers[i]] > maxPoints) {
      bestDriver = optimalTeam.drivers[i];
      maxPoints = DriverPoints[optimalTeam.drivers[i]];
    }
  }
  return bestDriver;
};

const calcBestQualifierinTeam = (optimalTeam, gridOrder) => {
  let bestQualifier = "";
  let minIndex = 20;
  for (let i = 0; i < optimalTeam.drivers.length; i++) {
    if (gridOrder.indexOf(optimalTeam.drivers[i]) < minIndex) {
      bestQualifier = optimalTeam.drivers[i];
      minIndex = gridOrder.indexOf(optimalTeam.drivers[i]);
    }
  }
  return bestQualifier;
};

const calcMostImproved = (optimalTeam, avgFinishingPos, raceOrder) => {
  let mostImproved = "";
  let maxDiff = -20;
  for (let i = 0; i < optimalTeam.drivers.length; i++) {
    const racePosition = raceOrder.indexOf(optimalTeam.drivers[i]) + 1;
    const avgPosition = parseInt(avgFinishingPos[optimalTeam.drivers[i]]);
    console.log(racePosition, avgPosition, optimalTeam.drivers[i]);
    const diff = avgPosition - racePosition;

    if (diff > maxDiff) {
      mostImproved = optimalTeam.drivers[i];
      maxDiff = diff;
    }
  }
  return [mostImproved, maxDiff.toString()];
};

const noNegative = (optimalTeam, constructorChoices, driverConstructorMap) => {
  let ctrs = [];
  for (let dr in optimalTeam.drivers) {
    if (
      !constructorChoices.includes(
        driverConstructorMap[optimalTeam.drivers[dr]]
      )
    ) {
      ctrs.push(driverConstructorMap[optimalTeam.drivers[dr]]);
    }
  }
  if (ctrs.length < 4) return true;
  return false;
};

///////////////////////
///////////////////////
///////////////////////
///////////////////////
///////////////////////
///////////////////////
///////////////////////
///////////////////////
///////////////////////
///////////////////////
///////////////////////
///////////////////////
//FUNC-CALLS & DISPLAY/
///////////////////////
///////////////////////
///////////////////////
///////////////////////
///////////////////////
///////////////////////
///////////////////////
///////////////////////
///////////////////////
///////////////////////
///////////////////////

export const Results = ({
  data,
  currentDrivers,
  currentConstructors,
  budget,
  track,
  chips,
  strategy,
}) => {
  const dataArray = Object.entries(data).map(([driver, probabilities]) => ({
    driver,
    ...probabilities,
  }));

  const sortedByRace = dataArray
    .slice()
    .sort(
      (a, b) => parseFloat(b.race_probability) - parseFloat(a.race_probability)
    );

  const sortedByFL = dataArray
    .slice()
    .sort(
      (a, b) => parseFloat(b.fl_probability) - parseFloat(a.fl_probability)
    );

  const sortedByQuali = dataArray
    .slice()
    .sort(
      (a, b) =>
        parseFloat(b.quali_probability) - parseFloat(a.quali_probability)
    );

  function transformDriverName(input) {
    const words = input.split("_");
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].slice(1);
    }
    return words.join(" ");
  }

  function transformDriverNameBack(input) {
    const words = input.split(" ");
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toLowerCase() + words[i].slice(1);
    }
    return words.join("_");
  }

  function convertToPercent(input) {
    const num = input.split(".");
    const percent = num[1].slice(0, 2);
    return percent;
  }

  // Extract the driver names from each sorted array
  const raceOrder = sortedByRace.map((item) =>
    transformDriverName(item.driver)
  );
  const flOrder = sortedByFL.map((item) => transformDriverName(item.driver));
  const gridOrder = sortedByQuali.map((item) =>
    transformDriverName(item.driver)
  );

  // console.log("Race Order", raceOrder);
  // console.log("Grid Order", gridOrder);
  // console.log("FL Order", flOrder);
  let sprint = false;
  if (
    [
      "azerbaijan",
      "belgium",
      "austria",
      "qatar",
      "united-states",
      "brazil",
    ].includes(track)
  ) {
    sprint = true;
  }

  // // // // ALGORITHMIC IMPLEMENTATION

  let DriverPoints = racePositionPoints(raceOrder);
  DriverPoints = gridPositionPoints(gridOrder, DriverPoints);
  DriverPoints = positonsGained(raceOrder, gridOrder, DriverPoints);
  DriverPoints = overtakesMade(raceOrder, gridOrder, DriverPoints);

  let optimalTeam;
  let ConstructorPoints;

  if (strategy !== "High Risk, High Reward") {
    DriverPoints = fastestLapBalanced(flOrder, DriverPoints);

    DriverPoints = raceDeductionsBalanced(raceOrder, DriverPoints);
    DriverPoints = DOTDBalanced(avgFinishingPos, raceOrder, DriverPoints);
    DriverPoints = sprintBoostDrivers(sprint, DriverPoints);

    ConstructorPoints = driverToConstructor(DriverPoints, constructorDriverMap);
    ConstructorPoints = modifyConstructorPoints(
      constructorDriverMap,
      gridOrder,
      ConstructorPoints
    );
    ConstructorPoints = sprintBoostConstructors(sprint, ConstructorPoints);
    ConstructorPoints = pitStopBonus(fastPitFreq, ConstructorPoints);

    optimalTeam = optimizeTeam(
      driverPrices,
      constructorPrices,
      currentDrivers,
      currentConstructors,
      DriverPoints,
      ConstructorPoints,
      parseFloat(budget) - 0.5
    );
  } else {
    DriverPoints = fastestLapRisky(flOrder, DriverPoints);

    DriverPoints = raceDeductionsRisky(raceOrder, DriverPoints);
    DriverPoints = DOTDRisky(avgFinishingPos, raceOrder, DriverPoints);
    DriverPoints = sprintBoostDrivers(sprint, DriverPoints);
    if (strategy === "High Risk, High Reward") {
      for (let driver in DriverPoints) {
        DriverPoints[driver] = parseInt(DriverPoints[driver] * 0.8);
      }
    }

    ConstructorPoints = driverToConstructor(DriverPoints, constructorDriverMap);
    ConstructorPoints = modifyConstructorPoints(
      constructorDriverMap,
      gridOrder,
      ConstructorPoints
    );
    ConstructorPoints = sprintBoostConstructors(sprint, ConstructorPoints);
    ConstructorPoints = pitStopBonus(fastPitFreq, ConstructorPoints);

    optimalTeam = optimizeTeam(
      driverPrices,
      constructorPrices,
      currentDrivers,
      currentConstructors,
      DriverPoints,
      ConstructorPoints,
      parseFloat(budget) - 0.5
    );
  }

  // Receive: Predicted Race Order in String Array Form
  //
  let driverChoices = optimalTeam[0].drivers.slice();
  let constructorChoices = optimalTeam[0].constructors.slice();
  let difference = null;
  if (strategy === "Budget Increase") {
    driverChoices = optimalTeam[1].drivers.slice();
    for (let i = 0; i < 5; i++) {
      if (optimalTeam[0].drivers[i] !== optimalTeam[1].drivers[i]) {
        difference = optimalTeam[1].drivers[i];
      }
    }
    const temp = optimalTeam[0];
    optimalTeam[0] = optimalTeam[1];
    optimalTeam[1] = temp;
  }

  const AllChips = [
    "Limitless",
    "Wildcard",
    "Final Fix",
    "Autopilot",
    "No Negative",
    "Extra DRS",
  ];

  const chipDict = {};

  if (chips.includes("All of the above")) {
    chips = AllChips.slice();
  }

  const Wildcard = chips.includes("Wildcard")
    ? useWildCard(optimalTeam[0])
    : "no driver";

  const extraDRSBoostDriver = chips.includes("Extra DRS")
    ? extraDRSBoost(optimalTeam[0], DriverPoints, sprint)
    : "";

  let DRSBoostDriver;
  if (extraDRSBoostDriver === "") {
    DRSBoostDriver = DRSBoost(optimalTeam[0], DriverPoints, "None");
  } else {
    DRSBoostDriver = DRSBoost(
      optimalTeam[0],
      DriverPoints,
      extraDRSBoostDriver
    );
  }

  const useNoNegative = noNegative(
    optimalTeam[0],
    constructorChoices,
    driverConstructorMap
  );

  console.log(optimalTeam[0]);
  console.log("Wildcard:", Wildcard);
  console.log("XtraBoost:", extraDRSBoostDriver);
  console.log("Boost:", DRSBoostDriver);
  console.log("NoNeg:", useNoNegative);
  console.log(strategy);
  console.log("Diff:", difference);

  // CHIPS Filtering

  // // // // DISPLAY IMPLEMENTATION

  // driverChoices = [
  //   "Max Verstappen",
  //   "Max Verstappen",
  //   "Max Verstappen",
  //   "Max Verstappen",
  //   "Max Verstappen",
  // ];
  // constructorChoices = ["Mercedes", "Mercedes"];

  for (let i in AllChips) {
    if (chips.includes(AllChips[i])) {
      switch (AllChips[i]) {
        case "Limitless":
          chipDict[AllChips[i]] = "Do Not Use";
          break;
        case "Wildcard":
          chipDict[AllChips[i]] = Wildcard ? "Use This Chip" : "Do Not Use";
          break;
        case "Final Fix":
          chipDict[AllChips[i]] = "Do Not Use";
          break;
        case "Autopilot":
          chipDict[AllChips[i]] = "Do Not Use";
          break;
        case "No Negative":
          chipDict[AllChips[i]] = useNoNegative
            ? "Use This Chip"
            : "Do Not Use";
          break;
        case "Extra DRS":
          chipDict[AllChips[i]] =
            extraDRSBoostDriver === ""
              ? "Do Not Use"
              : `Use This Chip on ${extraDRSBoostDriver}`;
          break;
      }
    } else {
      chipDict[AllChips[i]] = "Chip Unavailable";
    }
  }

  // IGNORE
  let highestPointScorer = extraDRSBoost(optimalTeam[0], DriverPoints, true);
  if (highestPointScorer.split(" ").length < 2)
    highestPointScorer = "Max Verstappen";

  let bestQualifier = calcBestQualifierinTeam(optimalTeam[0], gridOrder);
  if (bestQualifier.split(" ").length < 2) bestQualifier = "Max Verstappen";

  const mostImprovedArr = calcMostImproved(
    optimalTeam[0],
    avgFinishingPos,
    raceOrder
  );
  const mostImproved = mostImprovedArr[0];
  const positionsImproved = mostImprovedArr[1];

  const handleGoBack = () => {
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-center mt-[50px] ">
      <div className="  flex flex-row items-center mb-20 px-14 bg-discount-gradient overflow-scroll rounded-[30px] w-4/5 pb-12">
        <div className="w-full h-full max-w-full max-h-full font-poppins font-normal text-white text-[16px] leading-[30px] ml-2">
          <div className="flex flex-col items-center justify-center mt-8 relative">
            <h2 className=" text-[25px] font-bold leading-[50px] mb-10 ">
              Optimal Fantasy Team
              <button
                className="text-white font-semibold text-[14px] absolute top-0 right-0 hover:underline"
                onClick={handleGoBack}
              >
                Go Back
              </button>
            </h2>
            <h3 className=" text-[20px] font-medium leading-[50px] mb-5">
              Drivers
            </h3>
            <div className="grid sm:grid-cols-5 grid-cols-3 gap-2">
              {/* Render 20 images */}
              {driverChoices.map((name, index) => (
                <div
                  key={index}
                  className={`bg-darkGrey flex flex-col items-center justify-center h-full rounded-lg shadow-xl border-2 border-white relative`}
                >
                  {/* Render image content here */}
                  <img
                    src={`/src/DriverImages/${name}.avif`}
                    alt={`${name}`}
                    className="max-w-full max-h-full object-contain mb-1"
                  />
                  {/* Add label */}
                  <p className="text-md text-poppins text-white">{`${name}`}</p>

                  {/* Add sticky note for Max Verstappen */}
                  {name === DRSBoostDriver && (
                    <div className="absolute top-0 right-0 mr-1 bg-yellow text-gray-200 font-bold sm:text-sm text-xs rounded-md">
                      DRS Boost
                    </div>
                  )}
                </div>
              ))}
            </div>
            <h3 className=" text-[20px] font-medium leading-[50px] mb-5 mt-10">
              Constructors
            </h3>

            <div className="grid grid-cols-2 gap-2">
              {/* Render 20 images */}
              {constructorChoices.map((name, index) => (
                <div
                  key={index}
                  className={`bg-darkGrey flex flex-col items-center justify-center h-full rounded-lg shadow-xl border-2 border-white`}
                >
                  {/* Render image content here */}
                  <img
                    src={`/src/ConstructorImages/${name}.avif`}
                    alt={`${name}`}
                    className="w-2/3 max-h-full object-contain mb-1"
                  />
                  {/* Add label */}
                  <p className="text-md text-poppins text-white">{`${name}`}</p>
                </div>
              ))}
            </div>
            <h3 className=" text-[20px] font-medium leading-[50px] mb-5 mt-10">
              Points
            </h3>
            <ul className="grid grid-cols-1 gap-x-[200px] justify-items-center items-center">
              <li>Predicted Points for Team: {optimalTeam[0].points} Pts</li>
              {driverChoices.map((driver, index) => (
                <li key={index}>
                  Predicted Points for {driver}: {DriverPoints[driver]} Pts
                </li>
              ))}
              {constructorChoices.map((constructor, index) => (
                <li key={index}>
                  Predicted Points for {constructor}:{" "}
                  {ConstructorPoints[constructor]} Pts
                </li>
              ))}
            </ul>
            <h3 className=" text-[20px] font-medium leading-[50px] mb-5 mt-10">
              Chips
            </h3>

            <ul className="grid grid-cols-1 gap-x-[200px] justify-items-center items-center">
              {Object.keys(chipDict).map((chip, index) => (
                <li key={index}>
                  {chip}: {chipDict[chip]}
                </li>
              ))}
            </ul>
            <h3 className=" text-[20px] font-medium  leading-[50px] mb-5 mt-10">
              Key Predictions
            </h3>
            <ul className="grid grid-cols-1 gap-x-[200px] justify-items-center items-center">
              <li>
                {" "}
                The probability that {highestPointScorer} finishes on the podium
                is{" "}
                {convertToPercent(
                  data[transformDriverNameBack(highestPointScorer)][
                    "race_probability"
                  ]
                )}
                %.
              </li>
              <li>
                The probability that {bestQualifier} qualifies in the top{" "}
                {gridOrder.indexOf(bestQualifier) + 2} is{" "}
                {convertToPercent(
                  data[transformDriverNameBack(bestQualifier)][
                    "quali_probability"
                  ]
                )}
                %.
              </li>
              <li>
                {mostImprovedArr[0]} is predicted to finish {mostImprovedArr[1]}{" "}
                positions better than average.
              </li>
              <li>
                Either {flOrder[0]} or {flOrder[1]} is likely to score the
                fastest lap.
              </li>
              {difference ? (
                <li>
                  {difference} is predicted to increase in price in the near
                  future.
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
