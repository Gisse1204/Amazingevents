async function fetchCards() {
  try {
    let urlApi = 'https://mh.up.railway.app/api/amazing-events';
    let response = await fetch(urlApi).then(res => res.json());
    let printEvents = (cardId, eventsArray) => {
      let card = document.getElementById(cardId);
      let cardsDelEvento = eventsArray
        .filter(event => event.date < response.currentDate)
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(event => `
          <div class="card m-2 text-center" style="width:18rem" class="cardDetails">
            <img src="${event.image}" class="fotos card-img-top" style="height:150px" alt="${event.name}">
            <div class="card-body d-flex flex-column align-items-center text-center">
              <h5 class="card-title">${event.name}</h5>
              <p class="card-text">${event.description}</p>
            </div>
            <div class="card-footer d-flex flex-column align-items-center">
              <small class="text-muted">${event.price}</small>
              <a href="./details.html?id=${event.id}" class="boton btn btn-danger">Details</a>
            </div>
          </div>`
        );
      card.innerHTML = cardsDelEvento.join('');
    };

    printEvents('cardEventsp', response.events);

  let categorias = [...new Set(response.events.map(evento => evento.category))];
  categorias = categorias.sort();
  let checkboxContainer = document.querySelector('#inlineCheckbox');
  let updateResults = async () => {
    try {
      let response = await fetch(urlApi).then(res => res.json());
      let events = response.events.filter(event => event.date);
      let checkedCategories = [...checkboxes].filter(checkbox => checkbox.checked).map(checkbox => checkbox.value.toLowerCase());
      let searchTerm = searchInput.value.toLowerCase();
      let filteredEvents = events.filter(event => {
        return (
          event.name.toLowerCase().includes(searchTerm) &&
          (checkedCategories.length === 0 || checkedCategories.includes(event.category.toLowerCase())) && event.date < response.currentDate
        );
      });
      if (filteredEvents.length > 0) {
        printEvents('cardEventsp', filteredEvents);
      } else {
        swal("No matches found", "", "warning");
        searchInput.value = '';
        setTimeout(() => location.reload(), 2000);
      }
    } catch (error) {
      console.error('Error al recuperar los datos de la API:', error);
    }
  };

  categorias.forEach(categoria => {
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = categoria;
    checkbox.value = categoria;
    checkbox.classList.add('form-check-input');
    checkbox.addEventListener('change', updateResults);

    let label = document.createElement('label');
    label.htmlFor = categoria;
    label.textContent = categoria;
    label.classList.add('form-check-label', 'blockquote');

    let div = document.createElement('div');
    div.classList.add('form-check', 'form-check-inline');
    div.appendChild(checkbox);
    div.appendChild(label);

    checkboxContainer.appendChild(div);
  });

  let checkboxes = document.querySelectorAll('input[type=checkbox]');
  let searchInput = document.querySelector('input[type=search]');

  checkboxes.forEach(checkbox => checkbox.addEventListener('change', updateResults));
  searchInput.addEventListener('input', updateResults);
} catch (error) {
  console.error('Error al recuperar los datos de la API:', error);
}
}

document.addEventListener('DOMContentLoaded', fetchCards);