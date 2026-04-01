/**
 * LocalLens — mock data, expanded preferences, scoring, likes.
 * DOM via textContent / createElement only.
 */

const DIETARY_OPTIONS = [
  "Vegetarian-friendly",
  "Vegan options",
  "Gluten-free",
];

const MOCK_RESTAURANTS = [
  {
    id: "r1",
    name: "Nonna's Table",
    cuisines: ["Italian"],
    price: "moderate",
    vibe: "date night",
    dietary: ["Vegetarian-friendly", "Gluten-free"],
    noise: "moderate",
    outdoor: true,
    kidFriendly: false,
  },
  {
    id: "r2",
    name: "Umami Alley",
    cuisines: ["Japanese"],
    price: "moderate",
    vibe: "casual",
    dietary: ["Vegan options"],
    noise: "lively",
    outdoor: false,
    kidFriendly: true,
  },
  {
    id: "r3",
    name: "Casa Verde",
    cuisines: ["Mexican"],
    price: "cheap",
    vibe: "group-friendly",
    dietary: ["Vegetarian-friendly", "Vegan options", "Gluten-free"],
    noise: "lively",
    outdoor: true,
    kidFriendly: true,
  },
  {
    id: "r4",
    name: "Stack & Patty",
    cuisines: ["American"],
    price: "cheap",
    vibe: "casual",
    dietary: [],
    noise: "moderate",
    outdoor: false,
    kidFriendly: true,
  },
  {
    id: "r5",
    name: "Spice Route",
    cuisines: ["Indian"],
    price: "moderate",
    vibe: "group-friendly",
    dietary: ["Vegetarian-friendly", "Vegan options", "Gluten-free"],
    noise: "moderate",
    outdoor: false,
    kidFriendly: true,
  },
  {
    id: "r6",
    name: "Lotus Garden",
    cuisines: ["Thai"],
    price: "moderate",
    vibe: "date night",
    dietary: ["Vegetarian-friendly", "Gluten-free"],
    noise: "quiet",
    outdoor: true,
    kidFriendly: false,
  },
  {
    id: "r7",
    name: "Harbor Grill",
    cuisines: ["American", "Italian"],
    price: "premium",
    vibe: "date night",
    dietary: ["Gluten-free"],
    noise: "quiet",
    outdoor: true,
    kidFriendly: false,
  },
  {
    id: "r8",
    name: "Tokyo Bento",
    cuisines: ["Japanese"],
    price: "cheap",
    vibe: "casual",
    dietary: [],
    noise: "lively",
    outdoor: false,
    kidFriendly: true,
  },
  {
    id: "r9",
    name: "Fiesta Kitchen",
    cuisines: ["Mexican"],
    price: "moderate",
    vibe: "casual",
    dietary: ["Vegetarian-friendly"],
    noise: "moderate",
    outdoor: true,
    kidFriendly: true,
  },
  {
    id: "r10",
    name: "Copper Pot",
    cuisines: ["Indian"],
    price: "cheap",
    vibe: "casual",
    dietary: ["Vegetarian-friendly", "Vegan options"],
    noise: "quiet",
    outdoor: false,
    kidFriendly: true,
  },
];

const PRICES = ["cheap", "moderate", "premium"];
const VIBES = ["casual", "date night", "group-friendly"];
const NOISE_LEVELS = ["quiet", "moderate", "lively"];
const OUTDOOR_PREFS = ["prefer", "any", "avoid"];
const KID_PREFS = ["yes", "any"];

const state = {
  restaurants: MOCK_RESTAURANTS,
  selectedCuisines: new Set(),
  selectedDietary: new Set(),
  price: "moderate",
  vibe: "casual",
  noise: "moderate",
  outdoor: "any",
  kidFriendly: "any",
  likedIds: new Set(),
};

function cuisineOverlap(a, b) {
  return a.some((c) => b.includes(c));
}

/**
 * Score with cap 100; reasons for UI.
 */
function scoreRestaurant(restaurant) {
  const reasons = [];
  let score = 0;

  if (state.selectedCuisines.size > 0) {
    const matches = restaurant.cuisines.filter((c) =>
      state.selectedCuisines.has(c)
    );
    if (matches.length > 0) {
      const pts = Math.min(25, 10 * matches.length + 5 * (matches.length - 1));
      score += pts;
      reasons.push(`Cuisine match (${matches.join(", ")})`);
    }
  } else {
    reasons.push("Pick cuisines to personalize");
  }

  if (restaurant.price === state.price) {
    score += 15;
    reasons.push("Price match");
  }

  if (restaurant.vibe === state.vibe) {
    score += 15;
    reasons.push("Vibe match");
  }

  if (state.selectedDietary.size > 0) {
    const dietMatches = [...state.selectedDietary].filter((d) =>
      restaurant.dietary.includes(d)
    );
    if (dietMatches.length > 0) {
      const pts = Math.min(15, 5 * dietMatches.length);
      score += pts;
      reasons.push(`Dietary: ${dietMatches.join(", ")}`);
    }
  }

  if (restaurant.noise === state.noise) {
    score += 10;
    reasons.push("Noise level match");
  }

  if (state.outdoor === "prefer" && restaurant.outdoor) {
    score += 8;
    reasons.push("Outdoor seating available");
  } else if (state.outdoor === "avoid" && !restaurant.outdoor) {
    score += 8;
    reasons.push("Indoor-focused match");
  }

  if (state.kidFriendly === "yes" && restaurant.kidFriendly) {
    score += 7;
    reasons.push("Kid-friendly");
  }

  const likedRestaurants = state.restaurants.filter((r) =>
    state.likedIds.has(r.id)
  );
  if (likedRestaurants.length > 0) {
    const similarToLiked = likedRestaurants.some((lr) =>
      cuisineOverlap(restaurant.cuisines, lr.cuisines)
    );
    if (similarToLiked && !state.likedIds.has(restaurant.id)) {
      score += 10;
      reasons.push("Similar to a place you liked");
    }
  }

  return { score: Math.min(100, score), reasons };
}

function renderPreferenceControls() {
  renderCheckboxGroup("cuisine-checkboxes", getCuisineOptions(), state.selectedCuisines, (val, checked) => {
    if (checked) state.selectedCuisines.add(val);
    else state.selectedCuisines.delete(val);
    refresh();
  });

  renderRadioGroup("price-radios", PRICES, state.price, (val) => {
    state.price = val;
    refresh();
  }, (p) => p.charAt(0).toUpperCase() + p.slice(1));

  renderRadioGroup("vibe-radios", VIBES, state.vibe, (val) => {
    state.vibe = val;
    refresh();
  }, (v) => v);

  renderCheckboxGroup("dietary-checkboxes", DIETARY_OPTIONS, state.selectedDietary, (val, checked) => {
    if (checked) state.selectedDietary.add(val);
    else state.selectedDietary.delete(val);
    refresh();
  });

  renderRadioGroup("noise-radios", NOISE_LEVELS, state.noise, (val) => {
    state.noise = val;
    refresh();
  }, (n) => n.charAt(0).toUpperCase() + n.slice(1));

  renderRadioGroup("outdoor-radios", OUTDOOR_PREFS, state.outdoor, (val) => {
    state.outdoor = val;
    refresh();
  }, (o) =>
    o === "prefer" ? "Prefer patio / outdoor" : o === "avoid" ? "Prefer indoor" : "No preference"
  );

  renderRadioGroup("kid-radios", KID_PREFS, state.kidFriendly, (val) => {
    state.kidFriendly = val;
    refresh();
  }, (k) => (k === "yes" ? "Prefer kid-friendly" : "No preference"));
}

function getCuisineOptions() {
  const set = new Set();
  state.restaurants.forEach((r) => r.cuisines.forEach((c) => set.add(c)));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

function renderCheckboxGroup(containerId, options, selectedSet, onChange) {
  const el = document.getElementById(containerId);
  el.replaceChildren();
  options.forEach((opt) => {
    const id = `${containerId}-${opt.replace(/\s+/g, "-")}`;
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.value = opt;
    input.id = id;
    input.checked = selectedSet.has(opt);
    input.addEventListener("change", () => onChange(opt, input.checked));
    label.appendChild(input);
    label.appendChild(document.createTextNode(` ${opt}`));
    el.appendChild(label);
  });
}

function renderRadioGroup(containerId, options, current, onChange, formatLabel) {
  const el = document.getElementById(containerId);
  el.replaceChildren();
  const name = containerId.replace(/-/g, "_");
  options.forEach((opt) => {
    const id = `${name}-${opt}`;
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = name;
    input.value = opt;
    input.id = id;
    input.checked = current === opt;
    input.addEventListener("change", () => onChange(opt));
    label.appendChild(input);
    label.appendChild(document.createTextNode(` ${formatLabel(opt)}`));
    el.appendChild(label);
  });
}

function renderTopThree(ranked) {
  const ol = document.getElementById("top-three");
  ol.replaceChildren();
  const top = ranked.slice(0, 3);
  if (top.length === 0) {
    const li = document.createElement("li");
    li.className = "empty-state";
    li.textContent = "No restaurants to rank.";
    ol.appendChild(li);
    return;
  }
  top.forEach(({ restaurant, score, reasons }) => {
    const li = document.createElement("li");
    const strong = document.createElement("strong");
    strong.textContent = restaurant.name;
    li.appendChild(strong);
    const meta = document.createElement("div");
    meta.className = "top-meta";
    meta.textContent = `Score ${score} — ${reasons.slice(0, 2).join("; ")}`;
    li.appendChild(meta);
    ol.appendChild(li);
  });
}

function formatRestaurantMeta(r) {
  const diet =
    r.dietary.length > 0 ? r.dietary.join(", ") : "—";
  const outdoor = r.outdoor ? "Outdoor" : "Indoor";
  const kids = r.kidFriendly ? "Kid-friendly" : "Adults-leaning";
  return `${r.cuisines.join(" · ")} · ${r.price} · ${r.vibe} · Noise: ${r.noise} · ${outdoor} · ${kids} · ${diet}`;
}

function renderRestaurantList(ranked) {
  const ul = document.getElementById("restaurant-list");
  ul.replaceChildren();

  ranked.forEach(({ restaurant, score, reasons }) => {
    const li = document.createElement("li");
    li.className = "card";

    const header = document.createElement("div");
    header.className = "card-header";
    const title = document.createElement("h3");
    title.className = "card-title";
    title.textContent = restaurant.name;
    const badge = document.createElement("span");
    badge.className = "score-badge";
    badge.textContent = `${score} pts`;
    header.appendChild(title);
    header.appendChild(badge);

    const meta = document.createElement("p");
    meta.className = "card-meta";
    meta.textContent = formatRestaurantMeta(restaurant);

    const ulReasons = document.createElement("ul");
    ulReasons.className = "reasons";
    if (reasons.length === 0) {
      const rli = document.createElement("li");
      rli.textContent = "Adjust preferences or like a spot for stronger matches.";
      ulReasons.appendChild(rli);
    } else {
      reasons.forEach((r) => {
        const rli = document.createElement("li");
        rli.textContent = r;
        ulReasons.appendChild(rli);
      });
    }

    const actions = document.createElement("div");
    actions.className = "card-actions";
    const likeBtn = document.createElement("button");
    likeBtn.type = "button";
    likeBtn.className =
      "like-btn" + (state.likedIds.has(restaurant.id) ? " is-liked" : "");
    likeBtn.textContent = state.likedIds.has(restaurant.id) ? "Liked" : "Like";
    likeBtn.setAttribute(
      "aria-pressed",
      state.likedIds.has(restaurant.id) ? "true" : "false"
    );
    likeBtn.addEventListener("click", () => {
      if (state.likedIds.has(restaurant.id)) state.likedIds.delete(restaurant.id);
      else state.likedIds.add(restaurant.id);
      refresh();
    });
    actions.appendChild(likeBtn);

    li.appendChild(header);
    li.appendChild(meta);
    li.appendChild(ulReasons);
    li.appendChild(actions);
    ul.appendChild(li);
  });
}

function refresh() {
  const ranked = state.restaurants
    .map((restaurant) => {
      const { score, reasons } = scoreRestaurant(restaurant);
      return { restaurant, score, reasons };
    })
    .sort((a, b) => b.score - a.score);

  renderTopThree(ranked);
  renderRestaurantList(ranked);
}

function init() {
  renderPreferenceControls();
  refresh();
}

init();
