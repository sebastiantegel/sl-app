export function showSpinner(text: string = "Loading...") {
  const spinner = document.getElementById("spinner");
  const spinnerText = document.getElementById("spinnerText");

  if (spinner && spinnerText) {
    spinnerText.textContent = text;
    spinner.classList.remove("hidden");
  }
}

export function hideSpinner() {
  const spinner = document.getElementById("spinner");
  if (spinner) {
    spinner.classList.add("hidden");
  }
}
