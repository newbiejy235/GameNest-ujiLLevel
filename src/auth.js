let dataUsers = JSON.parse(localStorage.getItem("users")) || [];

function saveToLocal() {
  localStorage.setItem("users", JSON.stringify(dataUsers));
}

let mode = "login";

const loginButton = document.getElementById("getLogin");
const registerButton = document.getElementById("getRegister");
const switchBtn = document.getElementById("changes");

function render() {
  if (mode === "login") {
    loginButton.hidden = false;
    registerButton.hidden = true;
    switchBtn.textContent = "Belum punya akun? Register";
  } else {
    loginButton.hidden = true;
    registerButton.hidden = false;
    switchBtn.textContent = "Sudah punya akun? Login";
  }
}

switchBtn.addEventListener("click", () => {
  mode = mode === "login" ? "register" : "login";
  render();
});

// initial render
render();

function getAuth(auth) {
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  if (!username.value || !password.value) {
    alert("isi dlu boss");
    return;
  }
  if (auth === "login") {
    const query = dataUsers.find(
      (u) => username.value == u.username && password.value == u.password,
    );
    localStorage.setItem("currentUser", JSON.stringify(query));
    if (query) {
      alert("berhasil");
      window.location.href = "./home2.html";
    } else {
      alert("gagal");
    }
  } else if (auth === "register") {
    const isExist = dataUsers.some((u) => username.value == u.username);

    if (!isExist) {
      dataUsers.push({
        username: username.value,
        password: password.value,
      });
      saveToLocal();
      console.log(dataUsers);

      alert("berhasil buat akun");
    } else {
      alert("gagal buat akun");
    }
  }
}

console.log(dataUsers);
// localStorage.clear();
