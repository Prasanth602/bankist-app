"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  // username: "js",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2020-07-28T23:36:17.929Z",
    "2020-08-01T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  // username: "jd",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account3 = {
  owner: "Steven Thomas Williams",
  // username: "stw",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account4 = {
  owner: "Sarah Smith",
  // username: "ss",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");


const calcDisplaySummary = function(acc){
  const incomes = acc.movements.filter(function(mov){
    return mov>0
  }).reduce(function(acc, mov){
    return acc + mov
  },0)
  labelSumIn.textContent = `${incomes}€`
  const outgoings = acc.movements.filter(function(mov){
    return mov<0
  }).reduce(function(acc, mov){
    return acc + mov
  }, 0)
  labelSumOut.textContent = `${Math.abs(outgoings)}€` 
  const int = acc.movements.filter(function(mov){
    return mov>0
  }).map(function(mov){
    return (mov*acc.interestRate)/100
  }).reduce(function(acc, mov){
    return acc +mov
  }, 0)
  labelSumInterest.textContent = `${int}€`
}
const displayMovements = function(movements){
  containerMovements.innerHTML = ''
  movements.forEach(function(mov, i){
    const type = mov> 0 ? 'deposit': 'withdrawal'
    const html = 
    `<div class="movements__row"> 
          <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
          <div class="movements__value">${mov}€</div>
    </div>`
    containerMovements.insertAdjacentHTML('afterbegin', html)
  })
}
const createUsernames = function(accs){
  accs.forEach(function(acc){
    acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('')
  })  
} 
createUsernames(accounts);
const calcDisplayBalance = function(acc){
  acc.balance = acc.movements.reduce(function(acc, cur){
    return acc+=cur
  }, 0)
  labelBalance.textContent = `${acc.balance}€`
}
const updateUI = function(acc){
  displayMovements(acc.movements) 
  calcDisplayBalance(acc)
  calcDisplaySummary(acc)
}
// Event Handlers
let currentAccount;
containerApp.style.opacity = 0;
// Login Functionality 
btnLogin.addEventListener('click', function(e){
  // By Default, the Submit button in a form element refreshes the page. To prevent this behaviour, the following code
  e.preventDefault();
  // is written. 
  currentAccount = accounts.find(function(acc){
    return acc.username === inputLoginUsername.value
  })
  if(currentAccount?.pin === Number(inputLoginPin.value)){
    labelWelcome.textContent = `Welcome back ${currentAccount.owner.split(' ')[0]}`
    // Display a list of movements of this account
    displayMovements(currentAccount.movements);
    // Display the Current Balance on the right hand corner 
    calcDisplayBalance(currentAccount);
    // Display a summary of the account info on the bottom.
    calcDisplaySummary(currentAccount);
    // Clear input Fields after entering Username and PIN.
    inputLoginUsername.value = inputLoginPin.value  = ''
    // Take the focus away from the input fields
    inputLoginPin.blur();
    containerApp.style.opacity = 100;
  }
})
// Transfer Functionality
btnTransfer.addEventListener('click', function(e){
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAccount = accounts.find(acc => acc.username === inputTransferTo.value);
  inputTransferAmount.value = inputTransferTo.value = ''
  if(amount>0 && amount<currentAccount.balance && recieverAccount && recieverAccount!==currentAccount){
    currentAccount.movements.push(amount * -1)
    updateUI(currentAccount)
    recieverAccount.movements.push(amount)  
  }})
btnClose.addEventListener('click', function(e){
  e.preventDefault()
  console.log(currentAccount)
  if(inputCloseUsername.value == currentAccount.username && inputClosePin.value == currentAccount.pin){
    const index = accounts.findIndex(function(acc){
      return acc.username == currentAccount.username
    })
    accounts.splice(index, 1)
    containerApp.style.opacity = 0
  }
  inputCloseUsername.value = inputClosePin.value = ''
})
btnLoan.addEventListener('click', function(e){
  e.preventDefault()
  const amount = Number(inputLoanAmount.value)
  if(amount>0 && currentAccount.movements.some(function(mov){
    return mov >= amount*0.1
  })){
    currentAccount.movements.push(amount)
    updateUI(currentAccount)
  }
  inputLoanAmount.value = ''
})
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
