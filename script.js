console.log("js connected!");

const loginBtn = document.getElementById("loginBtn");

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