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
      DriverPoints[driver] = DriverPoints[driver] * 1.4;
    }
  }
  return DriverPoints;
};

const sprintBoostConstructors = (sprint, ConstructorPoints) => {
  if (sprint) {
    for (let constructor in ConstructorPoints) {
      ConstructorPoints[constructor] = ConstructorPoints[constructor] * 1.4;
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

// const budgetOptimization = (
//   budget,
//   driverPrices,
//   constructorPrices,
//   DriverPoints,
//   ConstructorPoints
// ) => {};

// // // // // // // // // // // // // // // // // // // //

const removeDuplicateArrays = (mainArray) => {
  const uniqueArrays = [];

  for (let i = 0; i < mainArray.length; i++) {
    const currentArray = mainArray[i];

    // Check if the current array is a duplicate of any previous array
    const isDuplicateArray = uniqueArrays.some((array) =>
      array.every((element, index) => element === currentArray[index])
    );

    // Check if the current array has duplicate elements
    const hasDuplicateElements = currentArray.some(
      (element, index, arr) => arr.indexOf(element) !== index
    );

    if (!isDuplicateArray && !hasDuplicateElements) {
      uniqueArrays.push(currentArray);
    }
  }

  return uniqueArrays;
};

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
    for (const constructorComb of constructorCombinations) {
      teams.push({
        drivers: driverComb,
        constructors: constructorComb,
        points:
          driverComb.reduce((sum, driver) => sum + DriverPoints[driver], 0) +
          constructorComb.reduce(
            (sum, constructor) => sum + ConstructorPoints[constructor],
            0
          ),
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

const useWildCard = (optimalTeam) => {
  if (optimalTeam.pointsDeduction > 4) return true;
  return false;
};

const DRSBoost = (optimalTeam, DriverPoints) => {
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

const extraDRSBoost = (optimalTeam, DriverPoints, sprint) => {
  if (!sprint) return false;
  let bestDriver = "";
  let maxPoints = -100;
  for (let driver in optimalTeam.drivers) {
    if (DriverPoints[driver] > maxPoints) {
      bestDriver = driver;
      maxPoints = DriverPoints[driver];
    }
    return bestDriver;
  }
};

const noNegative = (optimalTeam, risky) => {
  if (risky) {
    let constructorChoices = [];
    for (let dr in optimalTeam.drivers) {
      if (!constructorChoices.includes(driverToConstructor[dr])) {
        constructorChoices.push(driverToConstructor[dr]);
      }
    }
    if (constructorChoices.length <= 4) return true;
    return false;
  }
};
