const foodinfo = [
  {
    foodName: "Sushi",
    price: 100,
    img: "./img/Sushi.jpg",
  },
  {
    foodName: "Ramen",
    price: 150,
    img: "./img/Ramen.jpg",
  },
  {
    foodName: "Tom Yam",
    price: 130,
    img: "./img/TomYan.jpg",
  },
  {
    foodName: "Kebab",
    price: 170,
    img: "./img/Kebab.jpg",
  },
  {
    foodName: "Paella",
    price: 200,
    img: "./img/Paella.jpg",
  },
  {
    foodName: "Peking duck",
    price: 250,
    img: "./img/Peking.jpg",
  },
  {
    foodName: "Pho",
    price: 110,
    img: "./img/Pho.jpg",
  },
  {
    foodName: "Pizza",
    price: 190,
    img: "./img/Pizza.jpg",
  },
];

const signUplink = document.querySelector(".signup-section");
const logInLink = document.querySelector(".login-section");
const createLink = document.querySelectorAll(".create");
const myCartSection = document.querySelector(".my-cart-section");
const mycartIcon = document.querySelector(".fa-cart-shopping");
const btnLogin = document.querySelector(".btn-login");
const btnSignup = document.querySelector(".btn-signup");
const inputSignupUser = document.querySelector(".input-signup--user");
const inputSignupPassword = document.querySelector(".input-signup--password");
const wrongPassword = document.querySelector(".wrong-password");
const wrongUserName = document.querySelector(".wrong-username");
const formSection = document.querySelector(".form-section ");
const inputLoginUser = document.querySelector(".input-login--user");
const inputLoginPassword = document.querySelector(".input-login--password");
const userUiSection = document.querySelector(".user-ui-section");
const btnOrderall = document.querySelector(".btn-order");
const alretText = document.querySelector(".alret-text");
const btnOk = document.querySelector(".btn-ok");
const alretContainer = document.querySelector(".alret-container");

const userAmountBalance = [1100, 700, 800, 250, 3200, 500];
const accoutInfo = [];

/****************************************** */
//chgange login to signup == signup to login***
const showSignupUi = () => {
  logInLink.style.display = "none";
  signUplink.style.display = "block";
};
const showLoginUi = () => {
  logInLink.style.display = "block";
  signUplink.style.display = "none";
};

createLink.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const transitionLink = e.target.className.split(" ")[1];
    transitionLink === "one";
    if (transitionLink === "one") {
      showSignupUi();
    } else {
      showLoginUi();
    }
  });
});

/****************************************** */
//btn signup************

btnSignup.addEventListener("click", (e) => {
  e.preventDefault();

  //for money amount------
  const i = Math.trunc(Math.random() * userAmountBalance.length - 1);
  console.log(i);
  const userName = inputSignupUser.value;
  const password = inputSignupPassword.value;

  //for unique password and userName
  if (accoutInfo.map((acc) => acc.userName).includes(userName)) {
    alretbox("User Name already taken");
  } else if (accoutInfo.map((acc) => acc.password).includes(password)) {
    alretbox("Password already taken");
  } else {
    accoutInfo.push({
      userName,
      password,
      amount: userAmountBalance[i],
    });
    alretbox("Your account create successfully!");
  }
  inputSignupUser.value = inputSignupPassword.value = "";
});

/****************************************** */
// login form****
const welcome = document.querySelector(".welcome");
const balance = document.querySelector(".balance");
let currentUserIndex;
let index;

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  const userName = inputLoginUser.value;
  const password = inputLoginPassword.value;
  index = accoutInfo.findIndex((acc) => acc.userName === userName);
  console.log(index);
  if (index === -1) {
    alretbox("UserName not found");
  } else {
    if (
      accoutInfo[index].userName === userName &&
      accoutInfo[index].password === password
    ) {
      formSection.style.display = "none";
      userUiSection.classList.add("open");
      prevFoodIndex = "undefined";
      noti.style.display = "none";
      welcome.textContent = `Welcome ${accoutInfo[index].userName
        .split(" ")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" ")}`;
      balance.textContent = `${accoutInfo[index].amount}$`;
      inputLoginUser.value = inputLoginPassword.value = "";
    } else {
      if (accoutInfo[index].userName !== userName) {
        wrongUserName.style.display = "block";
      } else {
        wrongPassword.style.display = "block";
      }
    }
  }
});

/****************************************** */
//totall amount function****
let orderPrice,
  orderPriceForArr,
  orderArr,
  btnIncrease,
  foodCountAll,
  foodCounEle,
  orderPriceDym;
let orderPriceforAdmin = 0;

const price = document.querySelector(".totalPrice");
const totalAmount = () => {
  //for orderprice arr

  //fore reduce
  orderPrice = orderPriceForArr.reduce((accr, p) => accr + p, 0);
  price.textContent = `${orderPrice}$`;
};

//foodOrder list add function ***

const foodOrderList = (foodIndex) => {
  const orderFoodList = `
  <div class="order-food-box">
    <figure>
      <img class="order-img" src=${foodinfo[foodIndex].img} alt="" />
      <p class="order-food-name">${foodinfo[foodIndex].foodName}</p>
    </figure>
      <p class="order-price order-dyn orderArr a${foodIndex} ">${foodinfo[foodIndex].price}$</p>
  </div>
  `;

  if (prevFoodIndex !== foodIndex) {
    orderFoodContainer.insertAdjacentHTML("afterbegin", orderFoodList);

    //orderPrice for arr
    orderPriceForArr = Array.from(document.querySelectorAll(".order-price"))
      .map((p) => p.textContent)
      .join(" ")
      .replaceAll("$", "")
      .split(" ")
      .map((a) => Number(a));

    //food amount - number
    foodCountAll = Array.from(document.querySelectorAll(".food-amount")).map(
      (n) => Number(n.textContent)
    );

    // console.log(orderPriceForArr);
    // console.log("----------------");
    // console.log(orderArr);

    prevFoodIndex = foodIndex;
  } else {
    alretbox("Already Add shop");
  }
};

//add cart button ****
let prevFoodIndex;
const btnAdds = document.querySelectorAll(".btn-add");
const closeIcon = document.querySelector(".fa-xmark");
const orderFoodContainer = document.querySelector(".order-food-contaienr");
orderFoodContainer.innerHTML = "";
btnAdds.forEach((btnAdd, a) => {
  btnAdd.addEventListener("click", (e) => {
    e.preventDefault();
    const str = e.target.id;
    const foodIndex = Number(str[str.length - 1]);

    //add select food
    foodOrderList(foodIndex);
    //calc total amount

    totalAmount();

    console.log(a);
  });
});
/****************************************** */
//mycart icon handle******

mycartIcon.addEventListener("click", (e) => {
  e.preventDefault();
  myCartSection.classList.remove("hidden");
});
//close icon handle**********

closeIcon.addEventListener("click", (e) => {
  e.preventDefault();
  myCartSection.classList.add("hidden");
});

/****************************************** */
//btn-orderall handel
btnOrderall.addEventListener("click", (e) => {
  e.preventDefault();
  if (orderPrice === 0) {
    alretbox("No items selected");
  } else if (accoutInfo[index].amount >= orderPrice) {
    orderFoodContainer.innerHTML = "";
    alretbox("Thank you for your order");
    accoutInfo[index].amount -= orderPrice;
    balance.textContent = `${accoutInfo[index].amount}$`;
    price.textContent = "0";
    orderPriceforAdmin += orderPrice;
    adminAcc.customer[index] = {
      income: orderPriceforAdmin,
      name: accoutInfo[index].userName,
    };
    orderPrice = 0;
  } else {
    alretbox("Money is not enough");
    orderFoodContainer.innerHTML = "";
    price.textContent = "0";
    orderPrice = 0;
  }
});

//alretbox function**************
const alretbox = (str) => {
  alretContainer.style.top = 0;
  alretText.textContent = `${str}`;
};

//btn-ok**************
btnOk.addEventListener("click", (e) => {
  e.preventDefault();
  alretContainer.style.top = "-100px";
});

//btn-create one and btn-login**************
const btnCreateone = document.querySelector(".btn-s");
const btnSwitch = document.querySelector(".btn-l");
btnCreateone.addEventListener("click", (e) => {
  e.preventDefault();
  showSignupUi();
  userUiSection.classList.remove("open");
  orderPriceforAdmin = 0;
});
btnSwitch.addEventListener("click", (e) => {
  e.preventDefault();
  showLoginUi();
  userUiSection.classList.remove("open");
  orderPriceforAdmin = 0;
});

//for user feedback****************
const btnSend = document.querySelector(".btn-send");
const textArea = document.querySelector(".text-area");

//user msg string functiion
const showMsgUi = (name, text) => {
  const msgString = `
  <div class="message">
    <p class="name-sm">
      From customer <span class="msg-name"> ${name} :</span>
    </p>
    <p class="msg-text">${text}</p>
  </div>
  `;
  msgBox.insertAdjacentHTML("afterbegin", msgString);
};
// msg working funtcion
const msgworking = () => {
  adminAcc.msgAll.forEach((c) => {
    showMsgUi(c.name, c.msg);
  });
};

//btn-send handle
btnSend.addEventListener("click", (e) => {
  e.preventDefault();
  const text = textArea.value;
  adminAcc.msgAll[index] = {
    name: accoutInfo[index].userName,
    msg: text,
  };
  textArea.value = "";
});

//for admin****************
const adminUserName = document.querySelector(".input-user-admin");
const adminPassword = document.querySelector(".input-password-admin");
const btnAdmin = document.querySelector(".btn-admin");
const adminUiSection = document.querySelector(".adminUisection ");
const incomeName = document.querySelector(".income-name");
const incomePrice = document.querySelector(".income-price");
const incomeBox = document.querySelector(".income-box");
const msgName = document.querySelector(".msg-name");
const msgText = document.querySelector(".msg-text");
const msgBox = document.querySelector(".msg-box");

const adminAcc = {
  userName: "admin",
  password: "admin11",
  customer: [],
  msgAll: [],
};

//icome string function
const showIncomeUi = (name, price) => {
  const incomeString = `
  <div class="income">
    <p class="name-sm">
      From customer <span class="income-name"> ${name}</span>
    </p>
    <p>Paid : <span class="income-price"> ${price}$</span></p>
  </div>
  `;
  incomeBox.insertAdjacentHTML("afterbegin", incomeString);
};

//income working function
const incomeWork = () => {
  adminAcc.customer.forEach((c) => {
    showIncomeUi(c.name, c.income);
  });
};

//totall income
const totallIncome = document.querySelector(".t-income");
const calcTincome = () => {
  const tIncome = adminAcc.customer
    .map((c) => c.income)
    .reduce((accr, inc) => accr + inc, 0);
  totallIncome.textContent = `${tIncome}$`;
};

//btn admin btn

btnAdmin.addEventListener("click", (e) => {
  e.preventDefault();
  const adminName = adminUserName.value;
  const adminPass = adminPassword.value;
  if (adminName === adminAcc.userName && adminPass === adminAcc.password) {
    userUiSection.classList.remove("open");
    adminUiSection.style.display = "block";
    incomeBox.innerHTML = "";
    incomeWork();
    msgBox.innerHTML = "";
    msgworking();
    calcTincome();
  } else {
    alretbox("Admin user name or password incorrect");
  }
});

//for replay
const msgFromAdmin = document.querySelector(".msg-from-admin");
const mailbox = document.querySelector(".icon-mail");
const replayTo = document.querySelector(".input-replay");
const replayText = document.querySelector(".replay-textarea");
const btnReplay = document.querySelector(".btn-replay");
const btnBack = document.querySelector(".btn-back");
const mailIcon = document.querySelector(".fa-envelope");
const noti = document.querySelector(".noti");
const nomsg = document.querySelector(".admin-msg");

// btnReplay******************************
let reciveIndex;
btnReplay.addEventListener("click", (e) => {
  e.preventDefault();
  const replay = replayTo.value;
  const text = replayText.value;
  reciveIndex = accoutInfo.findIndex((acc) => acc.userName === replay);
  accoutInfo[reciveIndex].adminMsg = text;
  replayTo.value = replayText.value = "";
});

//btnback ******************************
btnBack.addEventListener("click", (e) => {
  e.preventDefault();
  adminUiSection.style.display = "none";
  showLoginUi();
});

//mailbutton******************

mailIcon.addEventListener("click", (e) => {
  e.preventDefault();
  if (accoutInfo[index].adminMsg === undefined) {
    nomsg.textContent = `No message 🙄🙄`;
    msgFromAdmin.style.left = `${msgFromAdmin.offsetWidth}px`;
    setTimeout(() => {
      msgFromAdmin.style.left = `-${msgFromAdmin.offsetWidth}px`;
    }, 2000);
  } else {
    noti.style.display = "none";
    console.log(true);
    nomsg.textContent = `From admin : ${accoutInfo[index].adminMsg}`;
    msgFromAdmin.style.left = `${msgFromAdmin.offsetWidth}px`;
    setTimeout(() => {
      msgFromAdmin.style.left = `-${msgFromAdmin.offsetWidth}px`;
    }, 4000);
  }
});

// Increase or decrease btn************
