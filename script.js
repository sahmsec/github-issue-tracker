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

    console.log(data);

}

loadIssues();