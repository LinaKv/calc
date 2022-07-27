const btnNum = document.querySelectorAll(".num");
const tablo = document.querySelector(".tablo");
const deleteFull = document.querySelector(".delete_full");
const deleteOne = document.querySelector(".delete_one");
const btnMathCalc = document.querySelectorAll(".math_calc");
const btnEqual = document.querySelector(".equal");

let tabloString = " ";
let numMathCalc = "";
let numArray = [];
let signsArray = [];
let op = "";
let switchDelete = "";

function clean() {
  tabloString = " ";
  numMathCalc = "";
  numArray = [];
  signsArray = [];
  op = "";
  switchDelete = "";
  tablo.textContent = "Let's start!";
}

function addNumToArray() {
  if (numMathCalc !== "") {
    numArray.push(+numMathCalc);
    numMathCalc = "";
    num = "";
  }
}

function updateTabloString(el) {
  tabloString += el.textContent;
  tablo.textContent = tabloString;
}

function getAnswer() {
  addNumToArray();

  for (let i = 0; i < numArray.length; i++) {
    switch (signsArray[i]) {
      case "+":
        result = numArray[i] + numArray[i + 1];
        numArray[i + 1] = result;
        break;
      case "-":
        result =
          numArray[i + 1] < 0
            ? numArray[i] + numArray[i + 1]
            : numArray[i] - numArray[i + 1];
        numArray[i + 1] = result;
        break;
      case "x":
        result = numArray[i] * numArray[i + 1];
        numArray[i + 1] = result;
        break;
      case "/":
        numArray[i + 1] === 0
          ? (result = "Impossible :(")
          : (result = numArray[i] / numArray[i + 1]);
        numArray[i + 1] = result;
        break;
    }
  }

  tablo.textContent = result;

  setTimeout((x) => clean(), 2000);
}

btnNum.forEach((el) =>
  el.addEventListener("click", function () {
    updateTabloString(el);

    switchDelete = "addNumber";

    if (op !== "-") {
      numMathCalc += el.textContent;
    } else if (numMathCalc < 0) {
      let x = numMathCalc.toString();
      x += el.textContent;
      numMathCalc = Number(x);
      console.log("work");
    } else {
      numMathCalc = -Number(el.textContent);
    }
  })
);

btnMathCalc.forEach((el) =>
  el.addEventListener("click", function () {
    updateTabloString(el);
    addNumToArray();

    switchDelete = "addSign";

    if (tabloString.length > 2) {
      signsArray.push(el.textContent);
    }
  })
);

deleteFull.addEventListener("click", function () {
  clean();
});

deleteOne.addEventListener("click", function () {
  const calcArr = tabloString.split("");
  calcArr.pop();
  tabloString = calcArr.join("");
  tablo.textContent = tabloString;

  if (switchDelete === "addNumber") {
    numMathCalc = +tabloString;
  } else if (switchDelete === "addSign") {
    signsArray.pop();
  }
});

btnEqual.addEventListener("click", getAnswer);

document.addEventListener("keydown", function (e) {
  e.preventDefault();
  if (e.key === "Enter") getAnswer();
});
