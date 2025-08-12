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






export const renderPage = (table, data, pageSize, conterData) => {

  const totalData = data.length
  const start = (conterData - 1) * pageSize  
  const end = pageSize === totalData ? totalData : start + pageSize
  let rows = `
    <tr>
      <th>Icon</th>
      <th>Name</th>
      <th>Full Name</th>
      <th>Powerstats</th>
      <th>Race</th>
      <th>Gender</th>
      <th>Height</th>
      <th>Place of Birth</th>
      <th>Alignment</th>
    </tr>
  `;

  data.slice(start, end).forEach(hero => {

    rows += `
      <tr>
        <td><img src="${hero.images.xs}" alt="${hero.name}" width="50" /></td>
        <td>${hero.name}</td>
        <td>${hero.biography.fullName || 'N/A'}</td>
        <td>
          Intelligence: ${hero.powerstats.intelligence} <br>
          Strength: ${hero.powerstats.strength} <br>
          Speed: ${hero.powerstats.speed} <br>
          Durability: ${hero.powerstats.durability} <br>
          Power: ${hero.powerstats.power} <br>
          Combat: ${hero.powerstats.combat}
        </td>
        <td>${hero.appearance.race || 'Unknown'}</td>
        <td>${hero.appearance.gender || 'Unknown'}</td>
        <td>${hero.appearance.height ? hero.appearance.height.join(' / ') : 'N/A'}</td>
        <td>${hero.biography.placeOfBirth || 'N/A'}</td>
        <td>${hero.biography.alignment || 'N/A'}</td>
      </tr>
    `;
  });

  table.innerHTML = rows 

}

export const getData = () => {
  const table = createTable()
  const select = createSelect()
  const buttonNext = createButton('Next Page')
  fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json")
    .then(response => response.json())
    .then(data => {
      let conterData = 1
      function update() {
        const pageSize = select.value === 'All' ? data.length : Number(select.value)
        renderPage(table, data, pageSize, conterData)
      }
      update();
      buttonNext.addEventListener('click', () => {
        conterData++
        update()
      });

      select.addEventListener('change', () => {
        conterData = 1
        update()
      })
    })
    .catch(err => console.error('Error:', err));
}
