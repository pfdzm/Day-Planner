
let app = document.querySelector("#app");

app.classList.add("container", "card");

let appCont = document.createElement("div");

appCont.classList.add("card-body");

let span = document.createElement("h4");

span.textContent = moment().format('LLL')

let nowHour = parseInt(moment().format("HH"), 10);

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
} else activities = JSON.parse(localStorage.getItem("activities"));

let table = document.createElement("table");
table.classList.add("table");
let tbody = document.createElement("tbody");

for (let index = 0; index < hours.length; index++) {
  const element = hours[index];

  let tr = document.createElement("tr");

  let tdTime = document.createElement("td");

  tdTime.classList.add("timeCol");

  let spanTime = document.createElement("span");

  spanTime.textContent = element;

  spanTime.classList.add("pl-2");

  tdTime.append(spanTime);

  tr.append(tdTime);

  let tdInput = document.createElement("td");

  var tdInputField = document.createElement("textarea");
  tdInputField.setAttribute("data-index", index);
  tdInputField.setAttribute("rows", "5");

  if (index + 9 < nowHour) {
    tr.classList.add("bg-light", "text-secondary");
    tdInputField.classList.add("text-secondary");
  } else if (index + 9 === nowHour) {
    tr.classList.add("bg-danger");
  } else {
    tr.classList.add("bg-success");
  }

  tdInputField.textContent = activities[index];

  tdInput.append(tdInputField);
  tr.append(tdInput);

  let tdSave = document.createElement("td");

  tdSave.classList.add("saveButton", "text-right")
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
  if (event.target.nodeName === "BUTTON") {
    let index = event.target.getAttribute("data-index");
    let input = document.querySelector("textarea[data-index='" + index + "']")
      .value;
    if (activities[index] === input) {
      console.log(input);

      console.log("No state change");
    } else {
      activities[index] = input;
      localStorage.setItem("activities", JSON.stringify(activities));
    }
  }
});
