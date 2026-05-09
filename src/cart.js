let cart = JSON.parse(localStorage.getItem("keranjangkku")) || [];
let myLibrary = JSON.parse(localStorage.getItem("myLibraryy")) || [];

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

       
        <button class="absolute top-2 right-2 bg-black/60 p-2 rounded-full hover:bg-black">
         <i class="w-4 h-4" data-lucide="heart-plus"></i>  
        </button>

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

        <!-- Wishlist -->
        <button class="absolute top-2 right-2 bg-black/60 p-2 rounded-full hover:bg-black">
           <i class="w-4 h-4" data-lucide="heart-plus"></i>  
        </button>

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

        <!-- Wishlist -->
        <button class="absolute top-2 right-2 bg-black/60 p-2 rounded-full hover:bg-black">
           <i class="w-4 h-4" data-lucide="heart-plus"></i>  
        </button>
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
  const back = document.getElementById("seeAll");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const keyword = cart.filter(
      (u) => u.title.toLowerCase().includes(getSearch.value),
      back.classList.add("flex"),
      back.classList.remove("hidden"),
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

function PriceGames() {
  const Harga = document.getElementById("harga");
  const total = document.getElementById("total");
  let subTotal = 0;
  let diskon = 0;

  cart.forEach((element) => {
    if (element.discount > 0) {
      const diskonGames = Math.floor(
        element.price - (element.price * element.discount) / 100,
      );
      let getDiscountGames = diskonGames;
      diskon = diskon + getDiscountGames;
      console.log(diskon);
    } else {
      subTotal = subTotal + element.price;
    }
  });
  subTotal = subTotal + diskon;
  console.log(subTotal);
  Harga.textContent = `Rp ${subTotal.toLocaleString("id-ID")}`;
  total.textContent = `Rp ${subTotal.toLocaleString("id-ID")}`;
}

function saveToLocal() {
  localStorage.setItem("keranjangkku", JSON.stringify(cart));
  localStorage.setItem("myLibraryy", JSON.stringify(myLibrary));
}

function payment() {
  if (cart.length > 0) {
    myLibrary = [...cart];
    saveToLocal();
    setTimeout(() => {
      window.location.reload();
      cart = [];
      saveToLocal();
    }, 3000);
  } else {
    alert("cart kosong, silahkan belaanja dlu");
  }
}

function remove(id) {
  window.location.reload();
  const index = cart.findIndex((u) => u.id === id);
  cart.splice(index, 1);
  console.log(cart);
  saveToLocal();
}

function getAllData() {
  render("homePages", cart);
  getUserName("message");
  search();

  lucide.createIcons();
  PriceGames();
  console.log("cart", cart);
  console.log("library", myLibrary);
  //   myLibrary = [];
  //   saveToLocal();
}

getAllData();
