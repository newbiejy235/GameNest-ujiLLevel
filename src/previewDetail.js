let dataGlobal = [];

function card(data) {
  // --- LOGIKA HARGA & DISKON ---
  let priceDisplay = "";
  let finalPrice = data.price;

  // Cek apakah produk Gratis atau Bayar
  let formattedOriginalPrice =
    data.price === 0 ? "Free" : `Rp ${data.price.toLocaleString("id-ID")}`;

  if (data.discount > 0) {
    // Jika ada diskon
    finalPrice = Math.floor(data.price - (data.price * data.discount) / 100);
    let formattedFinalPrice = `Rp ${finalPrice.toLocaleString("id-ID")}`;

    priceDisplay = `
      <div class="flex items-center gap-3">
        <span class="text-3xl font-bold text-gray-900">${formattedFinalPrice}</span>
        <span class="bg-red-100 text-red-600 px-2 py-0.5 rounded text-sm font-bold">-${data.discount}%</span>
      </div>
      <p class="text-gray-400 line-through text-sm">${formattedOriginalPrice}</p>
    `;
  } else {
    // Jika tidak ada diskon
    priceDisplay = `
      <span class="text-3xl font-bold text-gray-900">${formattedOriginalPrice}</span>
    `;
  }

  // --- LOGIKA RATING (STARS) ---
  const fullStars = Math.floor(data.rating / 20);
  const hasHalfStar = data.rating % 20 >= 10;
  let starsHtml = "";

  for (let i = 0; i < fullStars; i++) {
    starsHtml += `<i data-lucide="star" class="w-4 h-4 fill-current text-yellow-400"></i>`;
  }
  if (hasHalfStar) {
    starsHtml += `<i data-lucide="star-half" class="w-4 h-4 fill-current text-yellow-400"></i>`;
  }

  // --- LOGIKA GENRE (LIST) ---
  let genreHtml = "";
  data.genre.forEach((g) => {
    genreHtml += `
      <span class="bg-gray-100 border border-gray-200 px-2 py-1 rounded text-[10px] font-bold text-gray-500 uppercase">
        ${g}
      </span>
    `;
  });

  return `
  <div class="p-8 font-sans text-gray-900">
    <div class="max-w-6xl mx-auto">
      
      <!-- Navigasi Simple -->
      <a href="preview.html" class="text-sm text-gray-200 pb-10 px-2 ">
        Home > Games > <span class="text-gray-500 font-medium">${data.title}</span>
      </a>

      <div class="flex flex-col md:flex-row gap-6 items-start text-left">
        
        <!-- KOLOM KIRI: BOX GAMBAR -->
        <div class="w-full md:w-1/2 bg-white rounded-2xl p-4 shadow-sm border border-gray-200 mt-10">
          <img 
            src="${data.thumbnail}" 
            class="w-full h-auto rounded-xl object-cover shadow-inner" 
            alt="${data.title}"
          >
          <button onclick="alertLogin()" class="absolute top-28 bg-black/60 p-2 rounded-full hover:bg-black text-white hover:cursor-pointer">
         <i class="w-4 h-4" data-lucide="heart-plus"></i>  
        </button>
        </div>

        

        <!-- KOLOM KANAN: BOX DETAIL -->
        <div class="w-full md:w-1/2 bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mt-10">
          
          <div class="flex flex-col gap-2 mb-6">
            <div class="flex gap-2">${genreHtml}</div>
            <h1 class="text-4xl font-extrabold text-gray-900 tracking-tight">${data.title}</h1>
            
            <div class="flex items-center gap-2 mt-1">
              <div class="flex">${starsHtml}</div>
              <span class="text-sm font-bold text-gray-700 ml-1">${data.rating / 10}</span>
              <span class="text-gray-300 text-xs">|</span>
              <span class="text-xs text-gray-500">Released: ${data.release_date}</span>
            </div>
          </div>

          <!-- Bagian Harga (Hasil Logika If Else) -->
          <div class="mb-8 p-4 bg-gray-50 rounded-xl border border-gray-100">
            ${priceDisplay}
          </div>

          <button onclick="alertLogin()" 
            class="hover:cursor-pointer w-full bg-[#4CAF50] hover:bg-[#43A047] text-white font-bold py-4 px-6 rounded-xl transition-all active:scale-95 mb-8 shadow-lg shadow-green-100 flex justify-center items-center gap-2">
            <i data-lucide="shopping-cart" class="w-5 h-5"></i>
            Add to Cart
          </button>

          <!-- Deskripsi -->
          <div class="border-t border-gray-100 pt-6">
            <h3 class="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Description</h3>
            <p class="text-gray-600 leading-relaxed text-sm">
              ${data.description}
            </p>
          </div>
          
        </div>
      </div>

    </div>
  </div>
  `;
}
// function render(selector, data) {
//   const container = document.getElementById(selector);
//   container.innerHTML = data
//     .map((item) => {
//       return card(item);
//     })
//     .join("");
// }

function cardRecomendation(data) {
  const finalPrice =
    data.discount > 0
      ? Math.floor(data.price - (data.price * data.discount) / 100)
      : data.price;

  if (data.price <= 0) {
    return `
    <a href="previewDetails.html?id=${data.id}" class="flex-shrink-0 w-72 bg-[#1b2838] text-white rounded-lg overflow-hidden shadow-md hover:scale-105 transition">

      <div class="relative">
        <img src="${data.thumbnail}" class="w-full h-40 object-cover">

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

        <button onclick="alertLogin()"
          class="mt-2 hover:cursor-pointer bg-blue-600 hover:bg-blue-500 text-sm py-1 rounded">
          Add to Cart
        </button>
      </div>
    </a>
    `;
  }

  if (data.discount > 0) {
    return `
    <a href="previewDetails.html?id=${data.id}" class="flex-shrink-0 w-72 bg-[#1b2838] text-white rounded-lg overflow-hidden shadow-md hover:scale-105 transition">

      <div class="relative">
        <img src="${data.thumbnail}" class="w-full h-40 object-cover">

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
            Rp ${finalPrice}
          </span>
          <span class="text-gray-400 line-through text-xs">
            Rp ${data.price}
          </span>
        </div>

        <button
        onclick="alertLogin()"
          class="mt-2 hover:cursor-pointer bg-blue-600 hover:bg-blue-500 text-sm py-1 rounded">
          Add to Cart
        </button>
      </div>
    </a>
    `;
  } else {
    return `
    <a href="previewDetails.html?id=${data.id}" class="flex-shrink-0 w-72 bg-[#1b2838] text-white rounded-lg overflow-hidden shadow-md hover:scale-105 transition">

      <div class="relative">
        <img src="${data.thumbnail}" class="w-full h-40 object-cover">

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

       <button
        onclick="alertLogin()"
          class="mt-2 hover:cursor-pointer bg-blue-600 hover:bg-blue-500 text-sm py-1 rounded text-center">
          Add to Cart
        </button>
      </div>
    </a>
    `;
  }
}

function renderDetail(selector, item) {
  const container = document.getElementById(selector);
  container.innerHTML = card(item);
  lucide.createIcons();
}

function renderRecomendation(selector, data) {
  const container = document.getElementById(selector);
  container.innerHTML = data
    .map((items) => {
      return cardRecomendation(items);
    })
    .join("");
  lucide.createIcons();
}

function randomRecomendation(data) {
  const shuffled = [...data].sort(() => 0.5 - Math.random());

  const rekomendation = shuffled.slice(0, 4);
  console.log(rekomendation);
  renderRecomendation("recomendation", rekomendation);
}

function alertLogin() {
  alert("silahkan login terlebih dahulu");
}

async function getCardDetails() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const response = await fetch("../db.json");
  const data = await response.json();
  const getData = data.games;
  dataGlobal = getData;

  const result = getData.find((item) => item.id == id);
  console.log(result);

  renderDetail("detailsProduct", result);
  randomRecomendation(getData);
}

getCardDetails();
