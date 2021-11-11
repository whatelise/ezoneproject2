clickSignup();

export function clickSignup() {
  document.querySelectorAll("signup").addEventListener("click", toggleSelect);
}

export function toggleSelect(event) {
  const isSelected = event.target;
  isSelected.classlist.toggle(".selected");
}

export function getValue(event) {
  let selectedNewsletter;
  const isSelected = event.target;
  selectedNewsletter = isSelected.value;
}
