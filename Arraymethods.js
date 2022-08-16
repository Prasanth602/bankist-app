// Arrays
// The Slice Method
let arr = ['a', 'b', 'c', 'd', 'e']
console.log(arr.slice(2, 4))
/* output =  ['c', 'd']
The slice method was given 2 and 4 as it's parameters. Begin and End. Begin is where the slice starts
and end-1 is where it ends. So we need to remember that the end index is not included in the slice.
*/
console.log(arr.slice(-1))
/* The output of the above line gives us the last element.
The output of the below line gives us the last 2 elements.
*/
console.log(arr.slice(-2))
/* As you can see, if only one parameter is mentioned, it is assumed to be the begin parameter and the slicing
happens upto the last available element */
console.log(arr.slice(1, -2))
// As you can see, negative values can be used as the parameters as and when required.
console.log(arr.slice())
// This creates a shallow copy of the array.
console.log([...arr])
// This is another way of creating a shallow copy of an array.

// The Splice Method
console.log(arr.splice(2))
// now, as we can see, the output of this particular statement is the same if it was slice. a sub array starting
// at 2 index and ending at the last element. But, Splice has the property of changing the original array. Which 
// means that the original array now consists only of elements of index 0 and 1. The elements from 2 onwards were 
// deleted from the array. That is what Splice does as opposed to Slice.
// Splice is more used to delete than elements from an array than to slice it. 
// A common usecase of Splice is to delete the last element of an array, for example
arr.splice(-1)
// Now, arr is an array in which the last element was deleted. 

// The Reverse method
let arr1 = ['a', 'b', 'c', 'd', 'e']
arr1.reverse()
console.log(arr1)
// As we can see, arr1 is now reversed. This means that Reverse method actually changes (mutates the array)
// Just like Splice is also a mutating method. Slice is not.
let arr2 = ['f','g','h','i']
let letters = arr1.concat(arr2)
// Both of the arrays are now concatenated

// The Join Method
console.log(letters.join('-'))
// This returns a string with each element seperated by the parameter mentioned "-" in this case.

// For Each Method
const movements = [200,450,-400,3000,-650,-130,70,1300]
for (let change of movements){
    if(change>0){
        console.log(change + " was Deposited")
    }
    else{
        console.log(change*-1 + " was Withdrawn")
    }
}
console.log(`-------------`)
movements.forEach(function(element, index, array){
    if(element>0){
        console.log(`Movement ${index+1 }: ${element} was Deposited. The list of transactions so far: ${array}`)
    }
    else{
        console.log(`Movement ${index}: ${Math.abs(element)} was Withdrawn. The list of transactions so far: ${array}`)
    }

})
// As we can see, the forEach method is a higher order function. This means that it takes a function as a parameter and it calls
// That function whenever necessary. The function(element) in the above example is not called by us, but it's called by the forEach
// higher order function. Here, it is a callback function for forEach.
// The forEach method does not have a way of breaking the loop. This means that if you want to use a break statement, you have to 
// stick to the for... of loop way of iterating over an array.
// Another thing to notice is that the callback function takes 3 inputs: element, index, and array. These are auto inserted by the 
// forEach method. The order is important.
console.log(`---------------`)
// forEach works on Maps and Sets.
const currencies = new Map([
    ['USD', 'United States Dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound Sterling'],
])
// This is a map with Keys and Values. 
currencies.forEach(function(value, key, map){
    console.log(`${value} is shortened to ${key}`)
})
// Map, filter and reduce

// Map method is used to loop over arrays. It takes an array, loops over it, and on every iteration, it 
// applies a callback function that we specify to the current array element.
// For example, the map method can take an array of numbers as input and return a new array where all the 
// numbers are multiplied by 2
// We say that it maps each element to a new element in a new array.


// Filter method. It is used to filter elements in an array. For example, all numbers in an array that are 
// greater than 10. 

// Reduce method, to boil down all the elements of an array into a single number.

// Map Method
const eurToUsd = 1.1;
const movementsEuro = [200,450,-400,3000,-650,-130,70,1300]
const movementsUsd = movements.map(mov => mov * eurToUsd)
console.log(movementsEuro)
console.log(movementsUsd)

const movementdesc = movements.map((mov, i, arr) => {
    if(mov>0){
        return `movement ${i+1}: You deposited ${mov}`
    }
    else {
        return `movement ${i+1}: You withdrew ${mov}`
    }
})
console.log(movementdesc)

// Filter Method

const deposits = movementsEuro.filter(function (mov){
    return mov > 0;
})
console.log(movementsEuro)
console.log(deposits)
const withdrawals = movementsEuro.filter(function(mov){
    return mov<0; 
})
console.log(withdrawals)
// As we can see, only the movements that are more than 0 are included in the deposits array. This means that the original 
// array has been 'filtered' to include only deposits. The callback function is called on every element of the original array

// Reduce Method
// Instead of having the normal 3 parameters in the callback function, that is element, index, and array. The reduce method has
// a special parameter called accumulator   
const globalBalance = movementsEuro.reduce(function(acc, cur, i){
    console.log(`Iteration ${i}: ${acc}`)
    return acc+cur
}, 0)
console.log(globalBalance)
// This accumulator is the first parameter of the reduce method. And, we can see that along with the function, we can give an initial
// value to the accumulator. As we can see that value give is 0. Notice on line 138.
dogs_julia = [5,2,4,1,15,8,3]
dogs_kate = [16,6,10,5,6,1,4]

const calcAverageAge = function(arr){
    const humanAges = arr.map(function(ages){
        if (ages<=2){
            return ages * 2
        }
        else{
            return 16+ ages * 4
       }
    }).filter(function(ages){
        return ages>=18
    }).reduce(function(acc, ages, i, arr){
        return acc+ ages /arr.length 
    },0)
    return humanAges
}
console.log(calcAverageAge(dogs_julia)) 

// As you can see, the map, filter, reduce methods were chained one after the other. This is the most powerful aspect of these methods.
// Point to remember: Do not overuse chaining. Because if you are chaining on a long array it can lead to performance issues.
// Point to remember: Do not chain methods that mutate the original array, like the splice or revers method. 
// It is considered to be bad practice especially in large scale projects.

// The Find Method
// It is used to retrieve one element of an array based on a condition.

const firstWithdrawl = movementsEuro.find(function(mov){
    return mov<0
})
console.log(firstWithdrawl)
// As we can see, the find method does not return all the negative values in the array. It only returns the first value 
// that satisfies the condition of less than 0.
// The filter method returns a new array, but find returns only one element.

// findIndex Method
// A close cousin of the find method
// To delete an element from an array, we use the splice method, but the splice method requires you to have 
// the appropriate index of that element. 
randomArray = [100,101,102,103,104,105,106,107]
const indexrequired = randomArray.findIndex(function(oneohone){
    return oneohone = 101
})
console.log(indexrequired)

// Some and Every methods
// Lets recap the includes method first
console.log(randomArray.includes(100))
// The value of the above statement is "True". This is because the randomArray includes the number 100.
// The include method is used to test if an array includes an element.

// Includes tests for equality, but SOME tests for a condition.

console.log(randomArray.some(function(num){
    return num>0
}))

// If any number in the array is greater than 0, then the above some method returns "true"
// As you can see, some checks a condition.

