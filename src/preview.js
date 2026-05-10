const h = document.getElementById("render");
let dataGlobal = [];

function card(data) {
  const finalPrice =
    data.discount > 0
      ? Math.floor(data.price - (data.price * data.discount) / 100)
      : data.price;

  if (data.price <= 0) {
    return `
    <div class="flex-shrink-0 w-72 bg-[#1b2838] text-white rounded-lg overflow-hidden shadow-md hover:scale-105 transition">

      <div class="relative">
       <a href="previewDetails.html?id=${data.id}">
      
      <img src="${data.thumbnail}" class="w-full h-40 object-cover">
      </a>

        <!-- Wishlist -->
        <button onclick="alertLogin()" class="absolute top-2 right-2 bg-black/60 p-2 rounded-full hover:bg-black">
         <i class="w-4 h-4" data-lucide="heart-plus"></i>  
        </button>

        <!-- Badge -->
        <span class="absolute top-2 left-2 bg-green-500 text-black text-xs font-bold px-2 py-1 rounded">
          FREE
        </span>
      </div>

      <div class="p-3 flex flex-col gap-2">
        <h1 class="text-sm font-semibold line-clamp-2">
          ${data.title}
        </h1>

        <button onclick=" alertLogin()"
          class="mt-2 bg-blue-600 hover:bg-blue-500 text-sm py-1 rounded">
          Add to Cart
        </button>
      </div>
    </div>
    `;
  }

  if (data.discount > 0) {
    return `
    <div class="flex-shrink-0 w-72 bg-[#1b2838] text-white rounded-lg overflow-hidden shadow-md hover:scale-105 transition">

      <div class="relative">

       <a href="previewDetails.html?id=${data.id}">
      
      <img src="${data.thumbnail}" class="w-full h-40 object-cover">
      </a>

        <!-- Wishlist -->
        <button onclick="alertLogin()" class="absolute top-2 right-2 bg-black/60 p-2 rounded-full hover:bg-black">
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
            Rp ${data.price.toLocaleString("id-ID")}
          </span>
        </div>

        <button onclick=" alertLogin()"
          class="mt-2 bg-blue-600 hover:bg-blue-500 text-sm py-1 rounded">
          Add to Cart
        </button>
      </div>
    </div>
    `;
  } else {
    return `
    <div class="flex-shrink-0 w-72 bg-[#1b2838] text-white rounded-lg overflow-hidden shadow-md hover:scale-105 transition">

      <div class="relative">
      
       <a href="previewDetails.html?id=${data.id}">
      
      <img src="${data.thumbnail}" class="w-full h-40 object-cover">
      </a>

        <!-- Wishlist -->
        <button onclick="alertLogin()" class="absolute top-2 right-2 bg-black/60 p-2 rounded-full hover:bg-black">
           <i class="w-4 h-4" data-lucide="heart-plus"></i>  
        </button>
      </div>

      <div class="p-3 flex flex-col gap-2">
        <h1 class="text-sm font-semibold line-clamp-2">
          ${data.title}
        </h1>

        <span class="text-gray-300 text-sm">
          Rp ${data.price}
        </span>

        <button onclick=" alertLogin()"
          class="mt-2 bg-blue-600 hover:bg-blue-500 text-sm py-1 rounded">
          Add to Cart
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

function category(genreGames) {
  const back = document.getElementById("seeAll");
  const getCategory = dataGlobal.filter((u) => {
    return u.genre.includes(genreGames);
    lucide.createIcons();
  });
  (back.classList.add("flex"),
    back.classList.remove("hidden"),
    render("homePages", getCategory));
}

function search() {
  const getSearch = document.getElementById("userSearch");
  const form = document.querySelector("form");
  const back = document.getElementById("seeAll");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const keyword = dataGlobal.filter(
      (u) => u.title.toLowerCase().includes(getSearch.value),
      scrollToContainer(),
      back.classList.add("flex"),
      back.classList.remove("hidden"),
    );
    render("homePages", keyword);
  });
}

function scrollToContainer() {
  const container = document.getElementById("game-container");
  if (container) {
    container.scrollIntoView({
      behavior: "smooth",
      block: "start", // Layar akan berhenti tepat di bagian atas kontainer ini
    });
  }
}

function alertLogin() {
  alert("silahkan login terlebih dahuulu");
}

async function getData() {
  const response = await fetch("../db.json");
  const data = await response.json();

  const getDataResponse = data.games;
  dataGlobal = getDataResponse;
  lucide.createIcons();
  const isBigDiscount = dataGlobal.filter((u) => u.discount >= 50);
  const isRekomendasi = dataGlobal.filter((u) => u.rating >= 93);

  if (isBigDiscount) {
    render("render", isBigDiscount);
    lucide.createIcons();
  }
  if (isRekomendasi) {
    render("rekomendasi", isRekomendasi);
    lucide.createIcons();
  }
  render("homePages", dataGlobal);
  console.log(dataGlobal);
  search();

  getUserName("message");
}

getData();
