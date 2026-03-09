console.log("js connected!");

const loginBtn = document.getElementById("loginBtn");
const issuesContainer = document.getElementById("issuesContainer");

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

    // Enter key login
    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            loginBtn.click();
        }
    });

}

async function loadIssues() {

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();

    displayIssues(data.data);

}


function displayIssues(issues) {

    issuesContainer.innerHTML = "";

    issues.forEach(function (issue) {

        const card = document.createElement("div");

        card.className = "bg-white p-5 rounded-xl shadow-sm border-t-4";

        if (issue.status === "open") {
            card.classList.add("border-green-500");
        }
        else {
            card.classList.add("border-purple-500");
        }

        // set issue  priority color 
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

        // card design
        card.innerHTML = `

<div class="flex justify-between items-center mb-3">

  <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
    <img src="./assets/open-status.png" class="w-4">
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


<div class="flex gap-2 mb-4">

  <span class="badge badge-outline badge-error">
    BUG
  </span>

  <span class="badge badge-outline badge-warning">
    HELP WANTED
  </span>

</div>


<div class="border-t pt-3 text-sm text-gray-400">

  <p>#${issue.id} by ${issue.author}</p>
  <p>${issue.createdAt}</p>

</div>

`;

        issuesContainer.appendChild(card);

    });

}

loadIssues();
