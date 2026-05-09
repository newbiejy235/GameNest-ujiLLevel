let myLibrary = JSON.parse(localStorage.getItem("myLibraryy")) || [];

function card(data) {
  return `
    <div  class="flex-shrink-0 w-72 bg-[#1b2838] text-white rounded-lg overflow-hidden shadow-md hover:scale-105 transition">

      <div class="relative">
      <a href="details.html?id=${data.id}">
      
      <img src="${data.thumbnail}" class="w-full h-40 object-cover">
      </a>

      </div>

      <div class="p-3 flex flex-col  justify-between  gap-2">
        <h1 class="text-sm font-semibold line-clamp-2">
          ${data.title}
        </h1>

        <div class="bg-green-400 text-white p-2 rounded flex items-center justify-center hover:bg-green-400/55 hover:border-white hover:border transition-all duration-200">
        <h1 class="text-md">Play</h1>
        </div>
        
      </div>
    </div>
    `;
}

function render(selector, data) {
  const container = document.getElementById(selector);
  container.innerHTML = data
    .map((item) => {
      return card(item);
    })
    .join("");
  lucide.createIcons();
}

function search() {
  const getSearch = document.getElementById("userSearch");
  const form = document.querySelector("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const keyword = myLibrary.filter((u) =>
      u.title.toLowerCase().includes(getSearch.value),
    );
    render("library", keyword);
  });
}

function getUserName(selector) {
  const getName = document.getElementById(selector);
  const dataName = JSON.parse(localStorage.getItem("users"));
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  getName.textContent = currentUser.username;
  console.log(currentUser);
}

function saveToLocal() {
  localStorage.setItem("myLibraryy", JSON.stringify(myLibrary));
}

function getAllData() {
  render("library", myLibrary);
  getUserName("message");
  search();
  lucide.createIcons();
  console.log("Library", myLibrary);
  //   myLibrary = [];
  //   saveToLocal();
}

getAllData();
