let app = document.querySelector("#app");

app.classList.add("container", "card");

let appCont = document.createElement("div");

appCont.classList.add("card-body");

let span = document.createElement("h4");

span.textContent = moment().format("LLL");

let nowHour = parseInt(moment().format("HH"), 10);

span.setAttribute("id", "currDateTime");

appCont.append(span);

const START = 9;
const END = 17;
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
var activities;
if (localStorage.getItem("activities") == null) {
  activities = ["", "", "", "", "", "", "", "", ""];
} else {
  activities = JSON.parse(localStorage.getItem("activities"))
};

let tbody = document.createElement("div");

tbody.classList.add("container");

for (let index = 0; index < hours.length; index++) {
  const element = hours[index];

  let tr = document.createElement("div");

  tr.classList.add("row");

  let tdTime = document.createElement("div");

  tdTime.classList.add("timeCol", "col-2");

  let spanTime = document.createElement("span");

  spanTime.textContent = element;

  spanTime.classList.add("pl-2");

  tdTime.append(spanTime);

  tr.append(tdTime);

  var tdInputField = document.createElement("textarea");
  tdInputField.setAttribute("data-index", index);
  tdInputField.setAttribute("rows", "5");
  tdInputField.classList.add("col-8", "border");

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
  tr.setAttribute("data-index", index);

  let tdSaveButton = document.createElement("button");
  tdSaveButton.classList.add("saveButton", "col-2");
  

  tdSaveButton.textContent = "Save";
  //tdSaveButton.setAttribute("data-state", "save");

  tdSaveButton.classList.add("btn", "btn-primary", "border");

  tr.append(tdSaveButton);

  tbody.append(tr);
}

// table.append(tbody);

appCont.append(tbody);

app.append(appCont);

document.addEventListener("click", event => {
  if (event.target.nodeName === "BUTTON") {
    let index = event.target.parentNode.getAttribute("data-index");
    let input = event.target.parentNode.querySelector("textarea")
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
