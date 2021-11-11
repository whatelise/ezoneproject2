"use strict";
import "./style.scss";
/* import { toggleSelect } from "./modules/select";
console.log(toggleSelect); */
const form = document.querySelector(".nl-form");

const Signup = {
  email: form.elements.email.value,
  area: [],
};

clickSignup();

function clickSignup() {
  document.querySelectorAll(".btn-signup").forEach((item) => item.addEventListener("click", toggleSelect));
  document.querySelector("form").addEventListener("submit", post);
  document.querySelector(".x").addEventListener("click", closePopup);
}

function closePopup() {
  Object.assign(Signup, { email: "" });
  Object.assign(Signup, { area: [] });
  document.querySelectorAll(".btn-signup").forEach((item) => (item.classList = "btn-signup"));
  countSelected();
}

function toggleSelect(event) {
  const isSelected = event.target;
  isSelected.classList.toggle("selected");
  if (isSelected.classList.contains("selected")) {
    getValue(event);
  } else {
    const eventIndex = Signup.area.indexOf(event.target);
    Signup.area.splice(eventIndex, 1);
    countSelected();
  }
  document.querySelector(".popup p").classList.add("hidden");
}

function getValue(event) {
  const isSelected = event.target;
  let newArea = isSelected.value;
  Signup.area.push(newArea);
  console.log(Signup.area);
  countSelected();
}

function countSelected() {
  console.log(Signup.area.length);
  const selectedAmount = Signup.area.length;
  document.querySelector(".nl-count").innerHTML = selectedAmount;
  if (selectedAmount > 0) {
    document.querySelector(".popup").classList.remove("hidden");
    document.querySelector(".popup").classList.add("moveup");
    document.querySelector(".popup").classList.remove("movedown");
  } else {
    document.querySelector(".popup").classList.add("movedown");
    document.querySelector(".movedown").addEventListener("animationend", reset);
  }
  if (selectedAmount === 1) {
    document.querySelector(".s").classList.add("hidden");
  } else {
    document.querySelector(".s").classList = "s";
  }
}

function reset() {
  document.querySelector(".movedown").removeEventListener("animationend", reset);
  document.querySelector(".popup").classList.remove("movedown");
  document.querySelector(".popup").classList.remove("moveup");
  document.querySelector(".popup").classList.add("hidden");
  document.querySelector(".x").removeEventListener("click", closePopup);
  document.querySelector(".x").addEventListener("click", closePopup);
  clickSignup();
}

function post(evt) {
  evt.preventDefault();
  let emailInput = form.elements.email.value;
  Object.assign(Signup, { email: `${emailInput}` });
  console.log(Signup);
  const postData = JSON.stringify(Signup);
  fetch("https://keasem2-551e.restdb.io/rest/ezone", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "606defeaf592f7113340ed01",
      "cache-control": "no-cache",
    },
    body: postData,
  })
    .then((res) => {
      console.log(res);
      document.querySelector("input[type=submit]").disabled = false;
      form.elements.email.value = "";
      /*       document.querySelector(".popup p").classList.remove("hidden"); */
      document.querySelector(".yay").classList.remove("hidden");
    })

    .then((response) => {
      console.log(response);
    });
}
