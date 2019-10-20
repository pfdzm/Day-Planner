let app = document.querySelector("#app");

app.classList.add("container", "card");

let appCont = document.createElement("div");

appCont.classList.add("card-body");

let span = document.createElement("h4");

span.textContent = moment();

span.setAttribute("id", "currDateTime");

appCont.append(span);

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

if (localStorage.getItem("activities") == null) {
  var activities = ["", "", "", "", "", "", "", "", ""];
} else var activities = JSON.parse(localStorage.getItem("activities"));

let table = document.createElement("table");
table.classList.add("table");
let tbody = document.createElement("tbody");

for (let index = 0; index < hours.length; index++) {
  const element = hours[index];

  let tr = document.createElement("tr");

  let tdTime = document.createElement("td");

  tdTime.textContent = element;

  tr.append(tdTime);

  let tdInput = document.createElement("td");

  var tdInputField = document.createElement("input");
  tdInputField.setAttribute("data-index", index);

  tdInputField.value = activities[index];

  tdInput.append(tdInputField);
  tr.append(tdInput);

  let tdSave = document.createElement("td");
  let tdSaveButton = document.createElement("button");
  tdSaveButton.setAttribute("data-index", index);

  tdSaveButton.textContent = "Save";
  tdSaveButton.setAttribute("data-state", "save");

  tdSaveButton.classList.add("btn", "btn-primary");

  tdSave.append(tdSaveButton);
  tr.append(tdSave);

  tbody.append(tr);
}

table.append(tbody);

appCont.append(table);

app.append(appCont);

document.addEventListener("click", event => {
  if (event.target.nodeName == "BUTTON") {
    let index = event.target.getAttribute("data-index");
    let input = document.querySelector("input[data-index='" + index + "']")
      .value;
    if (activities[index] == input) {
      console.log("...");
    } else {
      activities[index] = input;
      localStorage.setItem("activities", JSON.stringify(activities));
      console.log(activities);
    }
  }
});
