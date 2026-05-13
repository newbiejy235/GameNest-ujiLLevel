let ulasan = [
  {
    profille: "https://i.pravatar.cc/100?img=12",
    user: "Mara's Playthroughs",
    star: "★★★★★",
    title: "Deep Dive into 'Cyber Quest 2077': A Masterpiece Revealed",
    deskripsi:
      "Experience futuristic worlds, breathtaking visuals, and immersive storytelling in one of the most anticipated sci-fi adventures ever created.",
    images1: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
    images2: "https://images.unsplash.com/photo-1511512578047-dfb367046420",
    images3: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8",
  },

  {
    profille:
      "https://i.pinimg.com/webp85/736x/50/09/32/500932212b34a21f5cfcd121f1ef1a41.webp",

    user: "Rahmat Fushiguro",

    star: "★★★★",

    title: "Cyber Hunters Push Competitive Gaming to Another Level",

    deskripsi:
      "Fast-paced combat, futuristic weapons, and intense multiplayer battles make Cyber Hunters one of the most exciting competitive experiences for modern gamers.",

    images1:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop",

    images2:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop",

    images3:
      "https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=1200&auto=format&fit=crop",
  },

  {
    profille: "https://i.pravatar.cc/100?img=32",

    user: "Luna Arcadia",

    star: "★★★★★",

    title: "Shadow Realms Online Delivers the Ultimate Fantasy Experience",

    deskripsi:
      "From massive open-world exploration to intense boss battles, Shadow Realms Online creates a breathtaking fantasy journey filled with stunning visuals and unforgettable adventures.",

    images1:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop",

    images2:
      "https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=1200&auto=format&fit=crop",

    images3:
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=1200&auto=format&fit=crop",
  },
];

function getUlasan(selector, index) {
  const container = document.getElementById(selector);
  container.innerHTML = `
     <div class="max-w-7xl mx-auto">
          <!-- Header -->
          <div class="flex items-center justify-between mb-8">
            <div>
              <h1 class="text-4xl font-bold">Trekker's Highlights</h1>
              <p class="text-gray-400 mt-2">
                Explore trending moments from the gaming universe
              </p>
            </div>

          </div>

          <!-- Content -->
          <div class="grid lg:grid-cols-2 gap-6">
            <!-- Left Card -->
            <div class="bg-[#111827] rounded-3xl p-6 border border-cyan-500/20">
              <div class="flex items-center gap-4 mb-5">
                <img
                  src="${ulasan[index].profille}"
                  class="w-14 h-14 rounded-full object-cover"
                />

                <div>
                  <h2 class="font-semibold text-lg">${ulasan[index].user}</h2>

                  <p class="text-sm text-gray-400">Top Reviewer</p>

                  <div class="flex text-yellow-400 text-sm mt-1">${ulasan[index].star}</div>
                </div>
              </div>

              <h1 class="text-2xl font-bold leading-snug mb-4">
               ${ulasan[index].title}
              </h1>

              <p class="text-gray-400 leading-relaxed">
               ${ulasan[index].deskripsi}
              </p>
            </div>

            <!-- Right Images -->
            <div class="grid grid-cols-2 gap-4">
              <div
                class="overflow-hidden rounded-2xl border border-cyan-500/20"
              >
                <img
                  src="${ulasan[index].images1}"
                  class="w-full h-full object-cover hover:scale-110 transition duration-300"
                />
              </div>

              <div
                class="overflow-hidden rounded-2xl border border-cyan-500/20"
              >
                <img
                  src="${ulasan[index].images2}"
                  class="w-full h-full object-cover hover:scale-110 transition duration-300"
                />
              </div>

              <div
                class="overflow-hidden rounded-2xl border border-cyan-500/20"
              >
                <img
                  src="${ulasan[index].images3}"
                  class="w-full h-full object-cover hover:scale-110 transition duration-300"
                />
              </div>

              <div
                class="flex items-center justify-center"
              >
                <button
                onclick="nextUlasan()"
                  class="bg-cyan-400 text-black px-5 py-2 rounded-full font-semibold hover:scale-105 transition"
                >
                  View More ->
                </button>
              </div>
            </div>
          </div>
        </div>
    `;
}

function card(data) {
  return `
    <div class="flex-shrink-0 w-72 bg-[#1b2838] text-white rounded-lg overflow-hidden shadow-md hover:scale-105 transition">

      <div class="relative">
      <img src="${data.thumbnail}" class="w-full h-40 object-cover">
      </div>

      <div class="p-3 flex flex-col gap-2">
        <h1 class="text-md font-semibold line-clamp-2">
          ${data.title}
        </h1>
        <p class="text-xs">${data.genre}</p>
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
}

let nextIndex = 0;
function nextUlasan() {
  nextIndex = nextIndex + 1;

  if (nextIndex >= ulasan.length) {
    nextIndex = nextIndex - nextIndex;
  }

  getUlasan("ulasan", nextIndex);
}

async function getData() {
  const response = await fetch("../db.json");
  const data = await response.json();
  const getItems = data.games;
  console.log(getItems);

  const isRekomendasi = getItems.filter((u) => u.rating >= 93);

  const Rekomendasi = getItems.slice(isRekomendasi, 4);
  const newRealease = getItems.slice(6, 10);

  if (isRekomendasi) {
    render("card", Rekomendasi);
  }
  render("new", newRealease);

  getUlasan("ulasan", nextIndex);
  console.log(nextIndex);
}

getData();
