let myWishlist = JSON.parse(localStorage.getItem("myWishlist")) || [];

function card(data) {
  const finalPrice =
    data.discount > 0
      ? Math.floor(data.price - (data.price * data.discount) / 100)
      : data.price;

  if (data.price <= 0) {
    return `
    <div  class="flex-shrink-0 w-72 bg-[#1b2838] text-white rounded-lg overflow-hidden shadow-md hover:scale-105 transition">

      <div class="relative">
      <a href="details.html?id=${data.id}">
      
      <img src="${data.thumbnail}" class="w-full h-40 object-cover">
      </a>

        <!-- Badge -->
        <span class="absolute top-2 left-2 bg-green-500 text-black text-xs font-bold px-2 py-1 rounded">
          FREE
        </span>
      </div>

      <div class="p-3 flex flex-col  justify-between  gap-2">
        <h1 class="text-sm font-semibold line-clamp-2">
          ${data.title}
        </h1>

        <button onclick="remove(${data.id})" class="bg-white/15 p-2 rounded-full hover:cursor-pointer hover:bg-white/35 flex ml-auto" >
        <i class="w-5 h-5" data-lucide="trash-2"></i>  
        </button>

        
      </div>
    </div>
    `;
  }

  if (data.discount > 0) {
    return `
    <div class="flex-shrink-0 w-72 bg-[#1b2838] text-white rounded-lg overflow-hidden shadow-md hover:scale-105 transition">

      <div class="relative">
      <a href="details.html?id=${data.id}">
      
      <img src="${data.thumbnail}" class="w-full h-40 object-cover">
      </a>

        <!-- Discount Badge -->
        <span class="absolute top-2 left-2 bg-green-500 text-black text-xs font-bold px-2 py-1 rounded">
          -${data.discount}%
        </span>
      </div>

      <div class="p-3 flex flex-col gap-2">
        <h1 class="text-sm font-semibold line-clamp-2">
          ${data.title}
        </h1>

        <!-- Price -->
        <div class="flex items-center gap-2">
          <span class="text-green-400 font-bold text-sm">
            Rp ${finalPrice.toLocaleString("id-ID")}
          </span>
          <span class="text-gray-400 line-through text-xs">
            Rp ${data.price}
          </span>

            <button onclick="remove(${data.id})" class="bg-white/15 p-2 rounded-full hover:cursor-pointer hover:bg-white/35 flex ml-auto" >
        <i class="w-5 h-5" data-lucide="trash-2"></i>  
        </button>
        </div>

        
      </div>
    </div>
    `;
  } else {
    return `
    <div class="flex-shrink-0 w-72 bg-[#1b2838] text-white rounded-lg overflow-hidden shadow-md hover:scale-105 transition">

      <div class="relative">
      <a href="details.html?id=${data.id}">
      
      <img src="${data.thumbnail}" class="w-full h-40 object-cover">
      </a>
      </div>

      <div class="p-3 flex flex-col gap-2">
        <h1 class="text-sm font-semibold line-clamp-2">
          ${data.title}
        </h1>

        <span class="text-gray-300 text-sm">
          Rp ${data.price.toLocaleString("id-ID")}
        </span>
         <button onclick="remove(${data.id})" class="bg-white/15 p-2 rounded-full hover:cursor-pointer hover:bg-white/35 flex ml-auto" >
        <i class="w-5 h-5" data-lucide="trash-2"></i>  
        </button>
        
      </div>
    </div>
    `;
  }
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
    const keyword = cart.filter((u) =>
      u.title.toLowerCase().includes(getSearch.value),
    );
    render("homePages", keyword);
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
  localStorage.setItem("myWishlist", JSON.stringify(myWishlist));
}

function remove(id) {
  window.location.reload();
  const index = myWishlist.findIndex((u) => u.id === id);
  myWishlist.splice(index, 1);
  console.log("wishhlist", myWishlist);
  console.log(index);

  saveToLocal();
}

function getAllData() {
  render("homePages", myWishlist);
  getUserName("message");
  search();

  lucide.createIcons();

  console.log("wishlist", myWishlist);

  //   myLibrary = [];
  //   saveToLocal();
}

getAllData();
