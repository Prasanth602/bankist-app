let subjects = ["English", "Math", "Programming"];
let [firstSubject, secondSubject, thirdSubject] = subjects;
// firstSubject = "English"
// secondSubject = "Math"
// thirdSubject = "Programming"

let mainSubject = "Math";
let secondarySubject = "Programming";
[mainSubject, secondarySubject] = [secondarySubject, mainSubject];

// The elements will swap.

let nested = [10, 20, [21, 22, 23]];
let [i, j, [k]] = nested;

//i=10, j=20, k = 21

let values = [5, 6];
let [a, b, c = 1000] = values;

// c = 1000. every other variable is assigned the default value.

const restaurant = {
  restaurantName: "Santosh Dhaba",
  opensAt: 11,
  closesAt: 23,
};

let {
  restname: restaurantName,
  openingHours: opensAt,
  closingHours: closesAt,
  menu: restMenu = ["default value"],
} = restaurant;

// The variable menu does not exist, therefore, the default value will hold.

let object1 = {
  objName: "Object1",
  obj2: {
    objectName: "obj2",
  },
};

let {
  obj2: {
    objectName: realName,
    secondName: secondaryName = "Second Name doesn't exist",
  },
} = object1;

console.log(realName, secondaryName);

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const mergearr = [...arr1, ...arr2];

const username = "Sreekar";
console.log(...username, ".K");

const arr = [1, 2, 3, 4, 5, 6, 7];
let [first, second, ...others] = arr;
//  first = 1, second = 2, others = [3,4,5,6,7]

let example = 0;
let fullexample = example ?? 10;
console.log(fullexample);

console.log("Hello" && true && null && 10);

const menu = ["idly", "dosa", "upma", "puri", "chapathi", "pulao"];
for (let [index, item] of menu.entries()) {
  console.log(`${index + 1}: ${item}`);
}
