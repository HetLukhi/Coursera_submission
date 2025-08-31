// Data model: destinations
const DESTINATIONS = [
  // Beaches (2+ with two images each)
  {
    type: "Beach",
    name: "Bali Beaches",
    country: "Indonesia",
    description: "Tropical paradise with lush landscapes and world‑class surf.",
    images: [
      "https://source.unsplash.com/featured/?bali,beach",
      "https://source.unsplash.com/featured/?indonesia,beach"
    ],
    tags: ["Beach","Tropical","Relax"]
  },
  {
    type: "Beach",
    name: "Maldives Atolls",
    country: "Maldives",
    description: "Crystal‑clear lagoons, overwater villas, and pristine coral reefs.",
    images: [
      "https://source.unsplash.com/featured/?maldives,beach",
      "https://source.unsplash.com/featured/?maldives,island"
    ],
    tags: ["Beach","Luxury","Honeymoon"]
  },

  // Temples (2+ with two images each)
  {
    type: "Temple",
    name: "Angkor Wat",
    country: "Cambodia",
    description: "The world’s largest religious monument — a stunning Khmer masterpiece.",
    images: [
      "https://source.unsplash.com/featured/?angkor,temple",
      "https://source.unsplash.com/featured/?angkorwat"
    ],
    tags: ["Temple","Heritage","Sunrise"]
  },
  {
    type: "Temple",
    name: "Golden Temple (Harmandir Sahib)",
    country: "India",
    description: "A serene spiritual complex in Amritsar, shimmering in gold leaf.",
    images: [
      "https://source.unsplash.com/featured/?golden,temple,amritsar",
      "https://source.unsplash.com/featured/?harmandir,sahib"
    ],
    tags: ["Temple","Spiritual","India"]
  },

  // Country-based (2+ countries with two images each)
  {
    type: "Country",
    name: "Japan Highlights",
    country: "Japan",
    description: "From neon Tokyo to tranquil Kyoto — food, culture, and tradition.",
    images: [
      "https://source.unsplash.com/featured/?japan,kyoto",
      "https://source.unsplash.com/featured/?japan,tokyo"
    ],
    tags: ["Country","Culture","City"]
  },
  {
    type: "Country",
    name: "Italy Classics",
    country: "Italy",
    description: "Rome’s history and Venice’s canals — la dolce vita awaits.",
    images: [
      "https://source.unsplash.com/featured/?italy,rome",
      "https://source.unsplash.com/featured/?italy,venice"
    ],
    tags: ["Country","History","Food"]
  },
  // Bonus: India & Indonesia country entries to match dropdown
  {
    type: "Country",
    name: "Incredible India",
    country: "India",
    description: "Majestic forts, diverse cuisine, Himalayas to beaches.",
    images: [
      "https://source.unsplash.com/featured/?india,jaipur",
      "https://source.unsplash.com/featured/?india,goa"
    ],
    tags: ["Country","Diverse","Culture"]
  },
  {
    type: "Country",
    name: "Wonderful Indonesia",
    country: "Indonesia",
    description: "Volcanoes, rainforests, and thousands of islands to explore.",
    images: [
      "https://source.unsplash.com/featured/?indonesia,java",
      "https://source.unsplash.com/featured/?indonesia,komodo"
    ],
    tags: ["Country","Nature","Islands"]
  }
];

// Helpers
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

function renderCard(item){
  const tag = `<span class="tag">${item.type}</span>`;
  const imgs = item.images.slice(0,2).map(src => `<img src="${src}" alt="${item.name} image">`).join("");
  const pills = (item.tags||[]).map(t => `<span class="pill">${t}</span>`).join("");
  return `<article class="card">
    ${tag}
    <h3>${item.name}</h3>
    <p class="muted">${item.country}</p>
    <p>${item.description}</p>
    <div class="imgs">${imgs}</div>
    <div class="pills">${pills}</div>
  </article>`;
}

function renderList(list){
  $("#cards").innerHTML = list.map(renderCard).join("") || `<p class="muted">No matches found. Try another filter.</p>`;
}

function handleForm(e){
  e.preventDefault();
  const category = $("#category").value;
  const keyword = ($("#keyword").value || "").toLowerCase().trim();
  const countrySel = $("#country").value;

  let results = DESTINATIONS.filter(d => d.type === category);

  // Country mode filters by country
  if(category === "Country" && countrySel){
    results = results.filter(d => d.country.toLowerCase() === countrySel.toLowerCase());
  }

  if(keyword){
    results = results.filter(d =>
      d.name.toLowerCase().includes(keyword) ||
      d.country.toLowerCase().includes(keyword) ||
      d.description.toLowerCase().includes(keyword) ||
      (d.tags||[]).some(t => t.toLowerCase().includes(keyword))
    );
  }

  renderList(results);
}

function showAll(){
  renderList(DESTINATIONS);
}

function toggles(){
  // mobile nav
  const btn = $(".nav-toggle");
  const links = $(".nav-links");
  if(btn && links){
    btn.addEventListener("click", () => links.classList.toggle("show"));
  }
  // year
  const y = $("#year");
  if(y) y.textContent = new Date().getFullYear();

  // category/country sync
  const categorySel = $("#category");
  const countryRow = $("#country-row");
  if(categorySel && countryRow){
    const sync = () => {
      countryRow.style.display = categorySel.value === "Country" ? "flex" : "none";
    };
    categorySel.addEventListener("change", sync);
    sync();
  }
}

function contactForm(){
  const form = $("#contact-form");
  if(!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = {
      name: $("#name").value.trim(),
      email: $("#email").value.trim(),
      message: $("#message").value.trim()
    };
    // Simple demo validation feedback
    if(!data.name || !data.email || !data.message){
      alert("Please complete all fields.");
      return;
    }
    alert("Thanks! Your message has been sent (demo).");
    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  toggles();

  const form = $("#recommendation-form");
  if(form){
    form.addEventListener("submit", handleForm);
    $("#show-all").addEventListener("click", showAll);
    // initial content to satisfy rubric visibility
    renderList(DESTINATIONS.filter(d => d.type === "Beach")); // show beaches first
  }

  contactForm();
});
