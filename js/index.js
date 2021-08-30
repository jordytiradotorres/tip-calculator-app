const dollarValue = document.querySelector(".tip__form-input");
const personNumber = document.querySelector(
  ".tip__form-people .tip__form-input"
);

const buttonReset = document.querySelector("button.reset");

const percentagesButton = [
  ...document.querySelectorAll(".wrapper-buttons > button"),
];

const amountPerson = document.querySelector(".tip__result-output");
const amountTotal = document.querySelector(".amount-total");

const buttonCustom = document.querySelector(".button-custom");

const makeTheButtonDisabled = (dollarValue) => {
  if (dollarValue === 0) {
    buttonReset.setAttribute("disabled", true);
  } else {
    buttonReset.removeAttribute("disabled");
  }
};
makeTheButtonDisabled(dollarValue.valueAsNumber);

const inputFocusStyles = (display, colorRed, colorGreen) => {
  let paragraphError = document.querySelector(".error");

  paragraphError.style.display = display;
  personNumber.style.border = `thin solid ${colorRed}`;
  dollarValue.style.border = `thin solid ${colorGreen}`;
};

const paintTheBottomWhenPressingClick = (index, buttonCurrent) => {
  for (let i = 0; i < percentagesButton.length; i++) {
    if (i === index) {
      buttonCurrent.style.backgroundColor = "hsl(172, 67%, 45%)";
    } else {
      percentagesButton[i].style.backgroundColor = "hsl(183,100%,15%)";
      percentagesButton[i].style.color = "white";

      buttonCustom.style.border = "thin solid transparent";
      buttonCustom.value = "Custom";
    }
  }
};

const tipAmount = (percentage) => {
  if (percentage) {
    if (personNumber.valueAsNumber === 0) {
      return "$0.00";
    }

    if (percentage <= 9) {
      return (
        "$" +
        (
          (dollarValue.valueAsNumber * `0.0${percentage}`) /
          personNumber.valueAsNumber
        ).toFixed(2)
      );
    } else {
      return (
        "$" +
        (
          (dollarValue.valueAsNumber * `0.${percentage}`) /
          personNumber.valueAsNumber
        ).toFixed(2)
      );
    }
  } else {
    if (
      isNaN(
        (dollarValue.valueAsNumber * `0.${buttonCustom.valueAsNumber}`) /
          personNumber.valueAsNumber
      ) ||
      (dollarValue.valueAsNumber * `0.${buttonCustom.valueAsNumber}`) /
        personNumber.valueAsNumber ===
        Infinity
    ) {
      return (amountPerson.textContent = "$0.00");
    } else {
      return (
        "$" +
        (
          (dollarValue.valueAsNumber * `0.${buttonCustom.valueAsNumber}`) /
          personNumber.valueAsNumber
        ).toFixed(2)
      );
    }
  }
};

const totalAmountPerson = (percentage) => {
  if (percentage) {
    if (percentage <= 9) {
      return "$" + (dollarValue.valueAsNumber * `0.0${percentage}`).toFixed(2);
    } else {
      return "$" + (dollarValue.valueAsNumber * `0.${percentage}`).toFixed(2);
    }
  } else {
    if (buttonCustom.valueAsNumber <= 9) {
      return (
        "$" +
        (
          dollarValue.valueAsNumber * `0.0${buttonCustom.valueAsNumber}`
        ).toFixed(2)
      );
    } else {
      return (
        "$" +
        (dollarValue.valueAsNumber * `0.${buttonCustom.valueAsNumber}`).toFixed(
          2
        )
      );
    }
  }
};

const makeButtonsBgGreen = () => {
  percentagesButton.map((button) => {
    button.style.backgroundColor = "hsl(183, 100%, 15%)";
  });
};

// dollarValue changed
dollarValue.addEventListener("change", (e) => {
  makeTheButtonDisabled(e.target.valueAsNumber);
  makeButtonsBgGreen();
});

// personNumber changed
personNumber.addEventListener("change", (e) => {
  let personNumberValue = e.target.valueAsNumber;

  if (personNumberValue === 0) {
    inputFocusStyles("block", "rgb(196, 49, 49)", "hsl(183, 100%, 15%)");
  } else {
    inputFocusStyles("none", "transparent", "transparent");
  }

  makeButtonsBgGreen();
});

// percentagesButton
percentagesButton.map((button, index) => {
  button.addEventListener("click", (e) => {
    let percentage = e.target.textContent.slice(0, -1);
    let buttonCurrent = e.target;

    paintTheBottomWhenPressingClick(index, buttonCurrent);

    amountPerson.textContent = tipAmount(percentage);
    amountTotal.textContent = totalAmountPerson(percentage);
  });
});

buttonCustom.addEventListener("change", (e) => {
  amountPerson.textContent = tipAmount();
  amountTotal.textContent = totalAmountPerson();

  makeButtonsBgGreen();
});

buttonCustom.addEventListener("focus", (e) => {
  e.target.style.border = "thin solid hsl(183, 100%, 15%)";
});

// clear
buttonReset.addEventListener("click", (e) => {
  amountPerson.textContent = "$0.00";
  amountTotal.textContent = "$0.00";

  dollarValue.value = "0";
  personNumber.value = "0";

  let placeholderValue = buttonCustom.getAttribute("placeholder");
  buttonCustom.value = placeholderValue;
  buttonCustom.style.border = "thin solid transparent";

  makeButtonsBgGreen();

  e.target.setAttribute("disabled", "true");
});
