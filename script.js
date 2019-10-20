let app = document.querySelector("#app");

let span = document.createElement("span");

span.textContent = moment();

span.setAttribute("id", "currDateTime");

app.append(span);

let hours = [
  "9 AM",
  "10 AM",
  "11 AM",
  "12 PM",
  "1 PM",
  "2 PM",
  "3 PM",
  "4 PM",
  "5 PM"
];

let actArr = ["", "", "", "Go shopping", "", "", "", "", ""];

let table = document.createElement("table");
table.classList.add("table");
let tbody = document.createElement("tbody");
table.append(tbody);

for (let index = 0; index < hours.length; index++) {
  const element = hours[index];

  let tr = document.createElement("tr");

  let tdTime = document.createElement("td");

  tdTime.textContent = element;

  //   tdTime.setAttribute("data-index", index);

  tr.append(tdTime);

  let tdInput = document.createElement("td");

  //   tdInput.classList.add("m-0", "p-0");
  if (actArr[index] == "") {
    var tdInputField = document.createElement("input");
    tdInputField.setAttribute("placeholder", "...");
  } else {
    var tdInputField = document.createElement("span");
    tdInputField.textContent = actArr[index];
  }
  tdInput.append(tdInputField);
  tr.append(tdInput);

  let tdSave = document.createElement("td");
  let tdSaveButton = document.createElement("button");
  tdSaveButton.setAttribute("data-index", index);

  if (actArr[index] == "") {
    tdSaveButton.textContent = "Save";
    tdSaveButton.setAttribute("data-state", "save");
  } else {
    tdSaveButton.textContent = "Clear";
    tdSaveButton.setAttribute("data-state", "clear");
  }
  tdSaveButton.classList.add("btn", "btn-primary");

  tdSave.append(tdSaveButton);
  tr.append(tdSave);

  tbody.append(tr);
}
let form = document.createElement("form");

form.append(tbody);

app.append(form);

form.addEventListener("submit", event => {
  event.preventDefault();
});

form.addEventListener("click", event => {
  if (event.target.nodeName == "BUTTON") {
    if (actArr[event.target.getAttribute("data-index")]) {
      console.log("activity planned");
    } else {
      console.log("empty row");
    }
  }
});
