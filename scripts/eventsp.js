let eventos = data.events;

let card = (imagen, nombre, descripcion, precio, id) => {
    return `
        <div class="card m-2 text-center" style="width:18rem">
            <img src="${imagen}" class="fotos card-img-top" style="height:150px" alt="${nombre}">
            <div class="card-body d-flex flex-column align-items-center text-center">
                <h5 class="card-title">${nombre}</h5>
                <p class="card-text">${descripcion}</p>
            </div>
            <div class="card-footer d-flex flex-column align-items-center">
                <small class="text-muted">${precio}</small>
                <a href="./details.html?_id=${id}" class="boton btn btn-danger">Details</a>
            </div>
        </div>
    `;
}

let currentDate;
function printPastEvents() {
    currentDate = data.currentDate;
    let cardsDelEvento = []
    
    for (let datos of eventos) {
        if(datos.date<currentDate){
        cardsDelEvento.push(card(datos.image, datos.name, datos.description, datos.price, datos._id));
        }
    }    
    
    let pasado = document.getElementById('cardEventsp');
    pasado.innerHTML = cardsDelEvento.join(' ');
}

printPastEvents();


let categorias = [];

eventos.forEach((each) => {
  if (!categorias.includes(each.category)) {
    categorias.push(each.category);
  }
});

function printcategoria() {
  let categ = document.querySelector('#inlineCheckbox');
  categ.innerHTML = categorias.map((category) => {
    return `
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="${category}" value="${category}">
        <label class="text-category form-check-label text-light blockquote" for="${category}">${category}</label>
      </div>
    `;
  }).join('');
}

printcategoria();

// obtener los checkboxes
let checkboxes = document.querySelectorAll('input[type=checkbox]');

// obtener el elemento de entrada de búsqueda
let searchInput = document.querySelector('input[type=search]');

// obtener el elemento de contenedor de resultados de búsqueda
let cardf = document.getElementById('cardEventsp');

// agregar eventListeners a los checkboxes y al elemento de entrada de búsqueda
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', updateResults);
});

searchInput.addEventListener('input', updateResults);

// función para actualizar los resultados de búsqueda en la página
function updateResults() {
  // obtener las categorías seleccionadas
  let checkedCategories = Array.from(checkboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);

  // obtener el término de búsqueda
  let searchTerm = searchInput.value.toLowerCase();

  // filtrar los eventos por categoría y término de búsqueda
  let filteredEvents = eventos.filter((event) => {
    return (
      event.name.toLowerCase().includes(searchTerm) &&
      (checkedCategories.length === 0 || checkedCategories.includes(event.category)) && event.date<currentDate
    );
  });

  // crear el HTML de los eventos filtrados y actualizar el contenido en la página
  if (filteredEvents.length > 0) {
    let cardsDelEvento = filteredEvents.map((datos) => {
      // código para crear el HTML de los eventos
      return `<div class="card m-2 text-center" style="width:18rem">
      <img src="${datos.image}" class="fotos card-img-top" style="height:150px" alt="${datos.name}">
      <div class="card-body d-flex flex-column align-items-center text-center">
          <h5 class="card-title">${datos.name}</h5>
          <p class="card-text">${datos.description}</p>
      </div>
      <div class="card-footer d-flex flex-column align-items-center">
          <small class="text-muted">${datos.price}</small>
          <a href="./details.html?_id=${datos._id}" class="boton btn btn-danger">Details</a>
      </div>
  </div>`
  ;});
    cardf.innerHTML = cardsDelEvento.join('');
  } else {
    swal("No matches found", "", "warning");
    searchInput.value = '';
    setTimeout(() => {      
      location.reload();
    }, 2000);
  }
}