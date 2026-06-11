let car = {
    brand: "Toyota",
    model: "Camry",
    year: 2022,
    color: "Blue"
};

console.log("Before:", car);

let keys = Object.keys(car);

if (keys[1])
    delete car[keys[1]];

console.log("After:", car);

console.log("Count:", Object.keys(car).length);