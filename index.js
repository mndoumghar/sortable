const API_URL =
  "https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json";

async function fetchData() {
  const data = await fetch(API_URL).then((res) => res.json());
  const table = document.querySelector("table");
  const select = document.querySelector("select");
  let displayCount = 20;

  renderTableHeaders(table);
  renderRows(table, data, displayCount);
  createPaginationButtons(data, displayCount);
  handlePagination(table, data);

  select.addEventListener("click", (e) => {
    const value = e.target.value;
    table.innerHTML = "";
    renderTableHeaders(table);
    const count = value === "all results" ? data.length : Number(value);
    renderRows(table, data, count);
    createPaginationButtons(data, count);
    handlePagination(table, data);
  });
}

function renderTableHeaders(table) {
  const headerHTML = `
    <tr>
      <th rowspan="2">Icon</th>
      <th rowspan="2">Name</th>
      <th rowspan="2">Full Name</th>
      <th colspan="6">Powerstats</th>
      <th rowspan="2">Race</th>
      <th rowspan="2">Gender</th>
      <th rowspan="2">Height</th>
      <th rowspan="2">Weight</th>
      <th rowspan="2">Place Of Birth</th>
      <th rowspan="2">Alignment</th>
    </tr>
    <tr>
      <th>Intelligence</th>
      <th>Strength</th>
      <th>Speed</th>
      <th>Durability</th>
      <th>Power</th>
      <th>Combat</th>
    </tr>
  `;
  table.innerHTML = headerHTML;
}

function createPaginationButtons(data, count) {
  document.querySelectorAll("button").forEach((btn) => btn.remove());
  let page = 1;
  for (let i = 0; i < data.length; i += count) {
    const btn = document.createElement("button");
    btn.textContent = page++;
    btn.dataset.start = i;
    btn.dataset.end = i + count;
    document.body.appendChild(btn);
  }
}

function handlePagination(table, data) {
  document.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const start = Number(btn.dataset.start);
      const end = Number(btn.dataset.end);
      table.innerHTML = "";
      renderTableHeaders(table);
      renderRows(table, data.slice(start, end));
    });
  });
}

function renderRows(table, data, limit = data.length) {
  for (let i = 0; i < limit && i < data.length; i++) {
    const hero = data[i];
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><img src="${hero.images.xs}" alt="${hero.name}"></td>
      <td>${hero.name}</td>
      <td>${hero.biography.fullName}</td>

      <td>${hero.powerstats.intelligence}</td>
      <td>${hero.powerstats.strength}</td>
      <td>${hero.powerstats.speed}</td>
      <td>${hero.powerstats.durability}</td>
      <td>${hero.powerstats.power}</td>
      <td>${hero.powerstats.combat}</td>

      <td>${hero.appearance.race}</td>
      <td>${hero.appearance.gender}</td>
      <td>${hero.appearance.height[1]}</td>
      <td>${hero.appearance.weight[1]}</td>
      <td>${hero.biography.placeOfBirth}</td>
      <td>${hero.biography.alignment}</td>
    `;
    table.appendChild(tr);
  }
}

fetchData();
