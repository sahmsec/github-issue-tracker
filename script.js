console.log("js connected!");

let allIssues = [];

const loginBtn = document.getElementById("loginBtn");
const issuesContainer = document.getElementById("issuesContainer");
const issueCount = document.getElementById("issueCount");

// tabs
const allTab = document.getElementById("allTab");
const openTab = document.getElementById("openTab");
const closedTab = document.getElementById("closedTab");

// modal
const issueModal = document.getElementById("issueModal");
const modalTitle = document.getElementById("modalTitle");
const modalStatus = document.getElementById("modalStatus");
const modalAuthor = document.getElementById("modalAuthor");
const modalDate = document.getElementById("modalDate");
const modalDescription = document.getElementById("modalDescription");
const modalAssignee = document.getElementById("modalAssignee");
const modalPriority = document.getElementById("modalPriority");
const modalLabels = document.getElementById("modalLabels");

// search
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

// login

if (loginBtn) {

  loginBtn.addEventListener("click", function () {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "admin123") {
      window.location.href = "main.html";
    } else {
      alert("Invalid Credentials!");
    }

  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      loginBtn.click();
    }
  });

}


// load issues

async function loadIssues() {

  const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
  const data = await res.json();

  allIssues = data.data;

  displayIssues(allIssues);

}


// active tab

function setActiveTab(activeBtn) {

  const tabs = [allTab, openTab, closedTab];

  tabs.forEach(function (tab) {
    tab.style.background = "";
    tab.classList.remove("text-white");
  });

  activeBtn.style.background = "#4A00FF";
  activeBtn.classList.add("text-white");

}


// tabs

allTab.addEventListener("click", function () {

  setActiveTab(allTab);
  displayIssues(allIssues);

});

openTab.addEventListener("click", function () {

  setActiveTab(openTab);

  const openIssues = allIssues.filter(function (issue) {
    return issue.status === "open";
  });

  displayIssues(openIssues);

});

closedTab.addEventListener("click", function () {

  setActiveTab(closedTab);

  const closedIssues = allIssues.filter(function (issue) {
    return issue.status === "closed";
  });

  displayIssues(closedIssues);

});


// display issues

function displayIssues(issues) {

  if (!issuesContainer) return;

  issuesContainer.innerHTML = "";

  issueCount.innerText = issues.length + " Issues";

  issues.forEach(function (issue) {

    const card = document.createElement("div");

    card.className = "bg-white p-5 rounded-xl shadow-sm border-t-4";

    // border color
    if (issue.status === "open") {
      card.classList.add("border-green-500");
    } else {
      card.classList.add("border-purple-500");
    }

    // priority color
    let priorityClass = "";

    if (issue.priority === "high") {
      priorityClass = "bg-red-100 text-red-500";
    }
    else if (issue.priority === "medium") {
      priorityClass = "bg-yellow-100 text-yellow-600";
    }
    else {
      priorityClass = "bg-gray-200 text-gray-500";
    }

    // status icon
    let statusIcon = "./assets/Open-Status.png";

    if (issue.status === "closed") {
      statusIcon = "./assets/Closed-Status.png";
    }

    // icon background
    let iconBg = "bg-green-100";

    if (issue.status === "closed") {
      iconBg = "bg-purple-100";
    }

    card.innerHTML = `

<div class="flex justify-between items-center mb-3">

  <div class="w-8 h-8 rounded-full ${iconBg} flex items-center justify-center">
    <img src="${statusIcon}" class="w-4">
  </div>

  <span class="px-3 py-1 text-xs rounded-full ${priorityClass}">
    ${issue.priority}
  </span>

</div>

<h3 class="font-semibold text-lg mb-2">
  ${issue.title}
</h3>

<p class="text-gray-500 text-sm mb-4">
  ${issue.description}
</p>

<div class="flex gap-2 mb-4 flex-wrap">

  ${issue.labels[0] ? `
  <span class="badge badge-outline badge-error whitespace-nowrap">
    ${issue.labels[0]}
  </span>
  ` : ""}

  ${issue.labels[1] ? `
  <span class="badge badge-outline badge-warning whitespace-nowrap">
    ${issue.labels[1]}
  </span>
  ` : ""}

</div>

<div class="border-t pt-3 text-sm text-gray-400">

  <p>#${issue.id} by ${issue.author}</p>
  <p>${issue.createdAt}</p>

</div>

`;

    card.classList.add("cursor-pointer");

    card.addEventListener("click", function () {
      openIssueModal(issue);
    });

    issuesContainer.appendChild(card);

  });

}


// modal

function openIssueModal(issue) {

  modalTitle.innerText = issue.title;
  modalDescription.innerText = issue.description;

  modalStatus.innerText = issue.status;
  modalAuthor.innerText = "Opened by " + issue.author;
  modalDate.innerText = issue.createdAt;

  modalAssignee.innerText = issue.author;
  modalPriority.innerText = issue.priority;

  modalLabels.innerHTML = `
    ${issue.labels[0] ? `<span class="badge badge-outline badge-error">${issue.labels[0]}</span>` : ""}
    ${issue.labels[1] ? `<span class="badge badge-outline badge-warning">${issue.labels[1]}</span>` : ""}
  `;

  issueModal.showModal();

}


// load issues
loadIssues();