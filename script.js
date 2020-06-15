const USER_CREATION_API = "https://randomuser.me/api";
const MONEY_RANDOM_BAG = 1000000;
const MONEY_DEFAULT = 99999;
var addUserEl;
var doubleMoneyEl;
var showOnlyMillionaresEl;
var sortByRichestEl;
var calculateEntireWealthEl;
var contentTableDiv;
var userList = [];
class User {
  constructor(firstName, lastName, money) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.money = money;
  }
  converToHtml() {
    return;
  }
  doubleMoney() {
    this.money = 2 * this.money;
  }
  isMillionare() {
    return this.money >= 1000000;
  }
  getMoney() {
    return this.money;
  }
}
var init = () => {
  initializeDomRefferences();
  initializeEventListeners();
};
var initializeDomRefferences = () => {
  addUserEl = document.getElementById("addUser");
  doubleMoneyEl = document.getElementById("doubleMoney");
  showOnlyMillionaresEl = document.getElementById("showOnlyMillionares");
  sortByRichestEl = document.getElementById("sortByRichest");
  calculateEntireWealthEl = document.getElementById("calculateEntireWealth");
  contentTableDiv = document.querySelector(".contentTable");
};
var initializeEventListeners = () => {
  addUserEl.addEventListener("click", addUser);
  doubleMoneyEl.addEventListener("click", doubleMoney);
  showOnlyMillionaresEl.addEventListener("click", showOnlyMillionares);
  sortByRichestEl.addEventListener("click", sortByRichest);
  calculateEntireWealthEl.addEventListener("click", calculateEntireWealth);
};
var addUser = () => {
  fetch(USER_CREATION_API)
    .then((resp) => resp.json())
    .then((data) => {
      addUserElement(
        data.results[0].name,
        Math.floor(Math.random() * MONEY_RANDOM_BAG + MONEY_DEFAULT)
      );
    });
};

var addUserElement = ({ first, last }, money) => {
  console.log("adding user");
  console.table(userList);
  userList.push(new User(first, last, money));
  displayUsers(userList);
};

var doubleMoney = () => {
  userList.forEach((user) => user.doubleMoney());
  displayUsers(userList);
};

var showOnlyMillionares = () => {
  userList = userList.filter((user) => user.isMillionare());
  displayUsers(userList);
};

var sortByRichest = () => {
  userList = userList.sort((u1, u2) => {
    return u1.money - u2.money;
  });
  displayUsers(userList);
};

var calculateEntireWealth = () => {
  totalWealth = userList
    .map((user) => user.getMoney())
    .reduce((a, b) => a + b, 0);
  displayUsers(userList, totalWealth);
};
// DOM MANIPULATION FUNCTIONS
var displayUsers = (_userList, totalWealth) => {
  let htmlVal = _userList
    .map(
      (user) =>
        `<div class="contentTableEntity"><div class="contentItemPerson">${user.firstName} ${user.lastName}</div><div class="contentItemWelath">${user.money}</div></div>`
    )
    .reduce((a, b) => a + b, "");
  if (totalWealth != undefined) {
    htmlVal += `<div class="contentTableSum"><h3>TOTAL SUM:</h3><h3>${totalWealth}</h3></div>`;
  }
  contentTableDiv.innerHTML = htmlVal;
};
window.onload = init;
