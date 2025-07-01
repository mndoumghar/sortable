async function fetchData() {
  const s = await fetch(
    "https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json"
  ).then((response) => response.json());

  const table = document.querySelector("table");
  const select = document.querySelector("select");
  let display = 20;
  createButtons(s, display);
  displayContant(display, table, s);
  console.log(s.length);
  first(table, s, display);
  select.addEventListener("click", (e) => {
    console.log(11111111);
    table.innerHTML = `<tr>
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
</tr>`;
    if (e.target.value == "all results") {
      first(table, s, s.length);
      createButtons(s, s.length);
    } else {
      first(table, s, Number(e.target.value));
      createButtons(s, Number(e.target.value));
      displayContant(Number(e.target.value), table, s);
    }
  });
}
function createButtons(s, a) {
  let count = 1;
  let nextpage = 0;
  const button = document.querySelectorAll("button");
  button.forEach((b) => b.remove());
  console.log("a=", a);

  for (let i = 0; i < s.length; i += a) {
    const button = document.createElement("button");
    document.body.append(button);
    button.textContent = count;
    button.value = a + nextpage;
    nextpage += a;
    count++;
  }
}
function displayContant(num, table, s) {
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      table.innerHTML = `<tr>
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
</tr>`;
      for (let i = e.target.value - num; i < e.target.value; i++) {
        console.log(i);

        if (i > s.length - 1) {
          break;
        }
        const tr = document.createElement("tr");
        const section = `<td><img src="${s[i].images.xs}" alt="${s[i].name}"></td>
<td>${s[i].name}</td>
<td>${s[i].biography.fullName}</td>

<td>${s[i].powerstats.intelligence}</td>
<td>${s[i].powerstats.strength}</td>
<td>${s[i].powerstats.speed}</td>
<td>${s[i].powerstats.durability}</td>
<td>${s[i].powerstats.power}</td>
<td>${s[i].powerstats.combat}</td>

<td>${s[i].appearance.race}</td>
<td>${s[i].appearance.gender}</td>
<td>${s[i].appearance.height}</td>
<td>${s[i].appearance.weight}</td>
<td>${s[i].biography.placeOfBirth}</td>
<td>${s[i].biography.alignment}</td>
        `;
        tr.innerHTML = section;
        table.appendChild(tr);
      }
    });
  });
}

function first(table, s, num) {
  for (let i = 0; i < num; i++) {
    const tr = document.createElement("tr");
    const section = `<td><img src="${s[i].images.xs}" alt="${s[i].name}"></td>
<td>${s[i].name}</td>
<td>${s[i].biography.fullName}</td>

<td>${s[i].powerstats.intelligence}</td>
<td>${s[i].powerstats.strength}</td>
<td>${s[i].powerstats.speed}</td>
<td>${s[i].powerstats.durability}</td>
<td>${s[i].powerstats.power}</td>
<td>${s[i].powerstats.combat}</td>

<td>${s[i].appearance.race}</td>
<td>${s[i].appearance.gender}</td>
<td>${s[i].appearance.height}</td>
<td>${s[i].appearance.weight}</td>
<td>${s[i].biography.placeOfBirth}</td>
<td>${s[i].biography.alignment}</td>
    `;
    tr.innerHTML = section;
    table.appendChild(tr);
  }
}

fetchData();
