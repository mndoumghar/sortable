export const createTable = () => {
  const table = document.createElement('table');
  table.border = '1';
  document.body.appendChild(table);
  return table;
}

export const createSelect = () => {
  const select = document.createElement('select');
  [10, 20, 50, 100, 'All'].forEach(size => {
    const option = document.createElement('option');
    option.value = size;
    option.textContent = size;
    select.appendChild(option);
  });
  select.value = 20;
  document.body.insertBefore(select, document.body.firstChild)
  return select;
}

export const createButton = (text) => {
  const btn = document.createElement('button');
  btn.textContent = text;
  document.body.appendChild(btn);
  return btn;
}

export const creatinput = () => {
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'search ...';
  document.body.appendChild(input);
  document.body.insertBefore(input, document.body.firstChild);
  return input;
}


// Sort Table column ...
const sortData = (arr, column, order = 'asc') => {
  return arr.sort((a, b) => {
    // variables
    let valA, valB;

    if (column === 'height') {
      const x = a.appearance.height?.[1] || '0'
      const y = b.appearance.height?.[1] || '0'
      const cm1 = x.includes('meters') ? 100 : 1
      const cm2 = y.includes('meters') ? 100 : 1
      valA = parseFloat(x) * cm1
      valB = parseFloat(y) * cm2
    } else if (column === 'weight') {
      valA = a.appearance.weight?.[1] || ''
      valB = b.appearance.weight?.[1] || ''
      const w = a.appearance.weight[1].includes('tons') ? 1000 : 1
      const z = b.appearance.weight[1].includes('tons') ? 1000 : 1

      valA = parseInt(a.appearance.weight[1].replace(',', '')) * w || 0
      valB = parseInt(b.appearance.weight[1].replace(',', '')) * z || 0


    } else if (column === 'gender') {
      valA = (!a.appearance.gender || a.appearance.gender === '-') ? null : a.appearance.gender;
      valB = (!b.appearance.gender || b.appearance.gender === '-') ? null : b.appearance.gender;
      console.log(valA, valB);

    } else if (column === 'name') {
      

      valA = (!a.name || a.name === '-') ? null : a.name
      valB = (!b.name || b.name === '-') ? null :b.name


    } else if (column === 'fullName') {
      
      valA = (!a.biography.fullName || a.biography.fullName === '-') ? null : a.biography.fullName
      valB = (!b.biography.fullName || b.biography.fullName === '-') ? null :b.biography.fullName


    } else if (column === 'race') {


      valA = (!a.appearance.race || a.appearance.race === '-') ? null : a.appearance.race
      valB = (!b.appearance.race || b.appearance.race === '-') ? null :b.appearance.race

    } else if (column === 'placeOfBirth') {

      valA = (!a.biography.placeOfBirth || a.biography.placeOfBirth === '-') ? null : a.biography.placeOfBirth
      valB = (!b.biography.placeOfBirth || b.biography.placeOfBirth === '-') ? null :b.biography.placeOfBirth

    } else if (column === 'alignment') {

      valA = (!a.biography.alignment || a.biography.alignment === '-') ? null : a.biography.alignment
      valB = (!b.biography.alignment || b.biography.alignment === '-') ? null :b.biography.alignment

    } else if (['intelligence', 'strength', 'speed', 'durability', 'power', 'combat'].includes(column)) {
      valA = a.powerstats[column] ?? '';
      valB = b.powerstats[column] ?? '';
    } else if (column in a.biography) {
      valA = a.biography[column] || '';
      valB = b.biography[column] || '';
    } else if (column in a.appearance) {
      valA = a.appearance[column] || '';
      valB = b.appearance[column] || '';
    } else {
      valA = a[column] || '';
      valB = b[column] || '';
    }
    const numA = parseFloat(String(valA).replace(/[^\d.-]/g, ''))
    const numB = parseFloat(String(valB).replace(/[^\d.-]/g, ''))
    const bothNumbers = !isNaN(numA) && !isNaN(numB)
    if (!valA) return 1;
    if (!valB) return -1;

    let cmp;
    if (bothNumbers) {
      cmp = numA - numB;
    } else {
      cmp = String(valA).localeCompare(String(valB));
    }

    return order === 'asc' ? cmp : -cmp;
  });
}

export const renderPage = (table, data, pageSize, conterData) => {
  const totalData = data.length;
  const start = (conterData - 1) * pageSize;
  const end = pageSize === totalData ? totalData : start + pageSize;

  let rows = `
    <tr>
      <th rowspan="2">Icon</th>
      <th rowspan="2" class="sortable" data-column="name">Name</th>
      <th rowspan="2" class="sortable" data-column="fullName">Full Name</th>
      <th colspan="6">Powerstats</th>
      <th rowspan="2" class="sortable" data-column="race">Race</th>
      <th rowspan="2" class="sortable" data-column="gender">Gender</th>
      <th rowspan="2" class="sortable" data-column="height">Height</th>
      <th rowspan="2" class="sortable" data-column="weight">Weight</th>
      <th rowspan="2" class="sortable" data-column="placeOfBirth">Place Of Birth</th>
      <th rowspan="2" class="sortable" data-column="alignment">Alignment</th>
    </tr>
    <tr>
      <th class="sortable" data-column="intelligence">Intelligence</th>
      <th class="sortable" data-column="strength">Strength</th>
      <th class="sortable" data-column="speed">Speed</th>
      <th class="sortable" data-column="durability">Durability</th>
      <th class="sortable" data-column="power">Power</th>
      <th class="sortable" data-column="combat">Combat</th>
    </tr>
  `;

  data.slice(start, end).forEach(hero => {
    rows += `
      <tr>
      
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
      </tr>
    `;
  });

  table.innerHTML = rows;

  table.querySelectorAll('.sortable').forEach(th => {

    th.addEventListener('click', () => {

      const col = th.dataset.column

      if (window.sortColumn === col) {
        window.sortOrder = window.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        window.sortColumn = col;
        window.sortOrder = 'asc';
      }
      sortData(data, window.sortColumn, window.sortOrder);
      renderPage(table, data, pageSize, conterData);
    });
  });
}

export const getData = () => {
  const table = createTable();
  const select = createSelect();
  const search = creatinput();
  const buttonNext = createButton('Next Page');

  fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json")
    .then(response => response.json())
    .then(data => {
      let conterData = 1;
      let searchData = data;

      window.sortColumn = 'name';
      window.sortOrder = 'asc';
      sortData(searchData, window.sortColumn, window.sortOrder);

      function update() {
        const pageSize = select.value === 'All' ? searchData.length : Number(select.value);
        renderPage(table, searchData, pageSize, conterData);
      }

      search.addEventListener('input', () => {
        const searchText = search.value.toLowerCase().trim();
        searchData = data.filter(hero =>
          hero.name.toLowerCase().includes(searchText) ||
          (hero.biography.fullName && hero.biography.fullName.toLowerCase().includes(searchText))
        );
        conterData = 1;
        sortData(searchData, window.sortColumn, window.sortOrder);
        update();
      });

      buttonNext.addEventListener('click', () => {
        conterData++;
        update();
      });

      select.addEventListener('change', () => {
        conterData = 1;
        update();
      });

      update();
    })
    .catch(err => console.error('Error:', err));
}
