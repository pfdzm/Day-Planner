let app = document.querySelector("#app");

app.classList.add("row", "card");

let appCont = document.createElement("div");

appCont.classList.add("card-body");

let span = document.createElement("h4");

span.textContent = moment().format("LLL");

span.classList.add('font-weight-bold', 'text-dark')

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

let tbody = document.createElement("div");

tbody.classList.add("container");

for (let index = 0; index < hours.length; index++) {
  const element = hours[index];

  let tr = document.createElement("div");

  tr.classList.add("row");

  let tdTime = document.createElement("div");

  tdTime.classList.add("timeCol", "col-2", "pr-1", "pl-0", "font-weight-bold", "text-dark");

  let spanTime = document.createElement("span");

  spanTime.textContent = element;

  // spanTime.classList.add("pl-2");

  tdTime.append(spanTime);

  tr.append(tdTime);

  var tdInputField = document.createElement("textarea");
  tdInputField.setAttribute("data-index", index);
  tdInputField.setAttribute("rows", "5");
  if(index==hours.length-1) {
    tdInputField.classList.add("col-8", "border", "p-1");
  } else {tdInputField.classList.add("col-8", "border", "p-1", "border-bottom-0");}

  if (index + 9 < nowHour) {
    tr.classList.add("bg-light", "text-secondary");
    tdInputField.classList.add("text-secondary");
  } else if (index + 9 === nowHour) {
    tr.classList.add("current");
  } else {
    tr.classList.add("future");
  }

  tdInputField.textContent = activities[index];

  tr.append(tdInputField);

  let tdSaveButton = document.createElement("button");
  tdSaveButton.classList.add("saveButton", "col-2", "p-0");
  tdSaveButton.setAttribute("data-index", index);

  tdSaveButton.textContent = "Save";
  tdSaveButton.setAttribute("data-state", "save");

  tdSaveButton.classList.add("btn", "btn-primary", "border", "border-bottom-0");

  tr.append(tdSaveButton);

  tbody.append(tr);
}

// table.append(tbody);

appCont.append(tbody);

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
