const btnNum = document.querySelectorAll(".num");
const tablo = document.querySelector(".tablo");
const deleteFull = document.querySelector(".delete_full");
const deleteOne = document.querySelector(".delete_one");
const btnMathCalc = document.querySelectorAll(".math_calc");
const btnEqual = document.querySelector(".equal");

let tabloString = " ";
let numMathCalc = "";
let op = "";

function clean() {
  tabloString = " ";
  numMathCalc = "";
  op = "";
  tablo.textContent = "Let's start!";
}

function updateTabloString(el) {
  tabloString += el.textContent;
  tablo.textContent = tabloString;
}

function deleteOneEl(ElementFrom) {
  const calcArr = ElementFrom.split("");
  calcArr.pop();
  tabloString = calcArr.join("");
}

function getAnswer() {
  const y = numMathCalc.split("#");

  for (let i = 0; i < y.length; i++) {
    // chek for * or / for the first step and change the array
    if (y.includes("*") || y.includes("/")) {
      if (y[i] === "*") {
        result = y[i - 1] * y[i + 1];
        y.splice(i - 1, 2);
        y[i - 1] = result;
        i = 0;
      } else if (y[i] === "/") {
        result = y[i + 1] === "0" ? "no" : y[i - 1] / y[i + 1];
        y.splice(i - 1, 2);
        y[i - 1] = result;
        console.log(y[i]);
        i = 0;
      }
    } else {
      switch (y[i]) {
        case "-":
          result = y[i - 1] - y[i + 1];
          y.splice(i - 1, 2);
          y[i - 1] = result;
          break;
        case "+":
          result = Number(y[i - 1]) + Number(y[i + 1]);
          y.splice(i - 1, 2);
          y[i - 1] = result;
          break;
      }
    }
  }

  tablo.textContent = result;

  setTimeout((x) => clean(), 2000);
}

btnNum.forEach((el) =>
  el.addEventListener("click", function () {
    updateTabloString(el);
    numMathCalc += el.textContent;
  })
);

btnMathCalc.forEach((el) =>
  el.addEventListener("click", function () {
    numMathCalc += "#" + el.textContent + "#";
    updateTabloString(el);
  })
);

deleteFull.addEventListener("click", function () {
  clean();
});

deleteOne.addEventListener("click", function () {
  deleteOneEl(tabloString);

  tablo.textContent = tabloString;

  deleteOneEl(numMathCalc);
});

btnEqual.addEventListener("click", getAnswer);

document.addEventListener("keydown", function (e) {
  e.preventDefault();
  if (e.key === "Enter") getAnswer();
});
