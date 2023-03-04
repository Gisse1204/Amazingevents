let eventos = data.events;

/* console.log(eventos); */

let cardsDelEvento = []
{
    for (let datos of eventos) {
        let card = `<div class="card m-2 text-center" style="width:18rem">
                <img src="${datos.image}" class="fotos card-img-top" style="height:150px" alt="${datos.name}">
                <div class="card-body d-flex flex-column align-items-center text-center">
                    <h5 class="card-title">${datos.name}</h5>
                    <p class="card-text">${datos.description}</p>
                </div>
                <div class="card-footer d-flex flex-column align-items-center">
                    <small class="text-muted">${datos.price}</small>
                    <a href="./details.html" class="boton btn btn-danger">Details</a>
                </div>
            </div>`
        cardsDelEvento.push(card)
    }
}
/* console.log(cardsDelEvento) */

function printEvents() {
    let card = document.getElementById('cardEvents');
    card.innerHTML = cardsDelEvento.join('')
}

printEvents()

function defineDetalle(detalle){
   return `<div class="card m-2 text-center" style="width:18rem">
                <img src="${detalle.image}" class="fotos card-img-top" style="height:150px" alt="${detalle.name}">
                <div class="card-body d-flex flex-column align-items-center text-center">
                    <h5 class="card-title">${detalle.name}</h5>
                    <p class="card-text">${detalle.description}</p>
                </div>
                <div class="card-footer d-flex flex-column align-items-center">
                    <small class="text-muted">${detalle.price}</small>
                    <a href="./details.html?_id=${detalle._id}" class="boton btn btn-danger">Details</a>
                </div>
            </div>`
}

function printDetalles(id,array_data) {
  let container = document.querySelector(id);
  array_data = array_data.map(defineDetalle)
  container.innerHTML = array_data.join('')
}

printDetalles('#cardEvents', eventos);


//Traer las categorías automáticamente
let categorias = []; //array vacío

eventos.forEach((each) => { //se recorre la lista de eventos y se comprueba si la categoría actual no está en la lista categorias. Si no está en la lista, se agrega a categorias. Después de este bucle, categorias contendrá una lista de categorías únicas.
  if (!categorias.includes(each.category)) {
    categorias.push(each.category);
  }
});

/* console.log(categorias); */

function printcategoria() { //se define una función que utiliza el método map() para iterar sobre las categorías y crear un bloque HTML para cada una. Para cada categoría, se crea un checkbox y una etiqueta de texto, y luego se concatenan para formar un bloque completo.
  let categ = document.querySelector('#inlineCheckbox');
  categ.innerHTML = categorias.map((category) => { //para iterar sobre las categorías
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
let card = document.getElementById('cardEvents');

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
      (checkedCategories.length === 0 || checkedCategories.includes(event.category))
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
  </div>`;
    });
    card.innerHTML = cardsDelEvento.join('');
  } else {
    card.innerHTML = '<blockquote class="blockquote text-center strong p-3 text-light">No se encontraron eventos que coincidan con los criterios de búsqueda.</blockquote>';
  }
}



/* let checkboxes = document.querySelectorAll('input[type=checkbox]'); //se guarda una lista de todos los checkboxes en la variable checkboxes.
let checked = []; //Se crea un array vacío llamado checked que se utilizará para almacenar las categorías que han sido seleccionadas.

for (let checkbox of checkboxes){ //Se agrega un eventListener a cada checkbox que escucha el evento de clic. Si el checkbox se ha marcado, se agrega el valor de la categoría correspondiente a la lista checked. Si el checkbox se ha desmarcado, se elimina el valor de la categoría correspondiente de la lista checked.
    checkbox.addEventListener('click', (event) => {
        if(event.target.checked){
            checked.push(event.target.value)
        } else {
            checked = checked.filter(value => value !== event.target.value)
        }
        console.log(checked)
    })
}

//Búsqueda

const form = document.querySelector("#search-form");
form.addEventListener("submit", function(event) { //El evento "submit" del formulario (que tiene el ID "search-form") escucha la acción de enviar el formulario
    event.preventDefault(); //se evita el comportamiento predeterminado de recargar la página
    const searchTerm = document.querySelector("input[type=search]").value.toLowerCase(); //El valor de la barra de búsqueda se guarda en la variable searchTerm y se convierte a minúsculas con toLowerCase() para que la búsqueda sea insensible a mayúsculas y minúsculas.
    const filteredEvents = eventos.filter(event => { //La función filter se utiliza en la matriz eventos para devolver solo los eventos que cumplen los criterios de búsqueda
      return event.name.toLowerCase().includes(searchTerm) && (checked.length === 0 || checked.includes(event.category)); //La función de retorno comprueba si el nombre del evento incluye el término de búsqueda y si la categoría del evento está en la matriz checked (si no hay elementos en la matriz checked, entonces cualquier categoría es válida).
    });
    const cardsDelEvento = filteredEvents.map(datos => { //Los eventos filtrados se convierten en HTML usando map y se agregan a la matriz cardsDelEvento.
      return `<div class="card m-2 text-center" style="width:18rem">
                <img src="${datos.image}" class="fotos card-img-top" style="height:150px" alt="${datos.name}">
                <div class="card-body d-flex flex-column align-items-center text-center">
                    <h5 class="card-title">${datos.name}</h5>
                    <p class="card-text">${datos.description}</p>
                </div>
                <div class="card-footer d-flex flex-column align-items-center">
                    <small class="text-muted">${datos.price}</small>
                    <a href="./details.html" class="boton btn btn-danger">Details</a>
                </div>
            </div>`;
    });
    const card = document.getElementById('cardEvents');
    card.innerHTML = cardsDelEvento.join('');
    console.log(filteredEvents);
  }); */