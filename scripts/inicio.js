async function fetchCards() { //Se define una función asincrónica llamada fetchCards. La clave async indica que la función devuelve una promesa que se resuelve en algún momento en el futuro
  try { //se utiliza para envolver el código que podría generar errores
    let urlApi = 'https://mh.up.railway.app/api/amazing-events';
    let response = await fetch(urlApi).then(res => res.json()); //Se realiza una petición a la API utilizando la función fetch, que devuelve una promesa. Se usa await para esperar la respuesta antes de continuar. Una vez que recibimos la respuesta, la convertimos a un objeto JSON utilizando el método json()
    let printEvents = (cardId, eventsArray) => { //Se define una función llamada printEvents que toma dos argumentos: cardId, que es el ID del elemento HTML en el que se van a imprimir los eventos, y eventsArray, que es un array de objetos de eventos. Esta función crea elementos HTML para cada evento y los agrega al elemento con el ID especificado
      let card = document.getElementById(cardId); //Se obtiene una referencia al elemento HTML con el ID especificado en el argumento cardId
      let cardsDelEvento = eventsArray
        .filter(event => event.date)//Filtramos el array para que solo incluya eventos que tengan una propiedad date. Mapeamos cada evento en el array filtrado para que se convierta en una cadena de texto que representa un elemento HTML. Utilizamos una plantilla literal para construir esta cadena de texto, que incluye propiedades del objeto de eventos como el nombre, la descripción, la imagen y el precio
        .sort((a, b) => a.name.localeCompare(b.name)) // Ordenar alfabéticamente
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
          </div>
        `);
      card.innerHTML = cardsDelEvento.join(''); //Configuramos el contenido HTML del elemento especificado por card para que incluya todas las cadenas de texto generadas por map(), que se han unido utilizando el método join()
    };

    printEvents('cardEvents', response.events); //Llamamos a la función printEvents, pasando el ID del elemento HTML cardEvents y el array de eventos obtenidos de la respuesta de la API

    let categorias = [...new Set(response.events.map(evento => evento.category))]; //Creamos una nueva variable llamada categorias, que es igual a un array de categorías de eventos únicas. Primero mapeamos el array de eventos de la respuesta de la API para obtener un array de categorías, y luego usamos el operador de propagación (...) y el constructor Set para crear un conjunto único de categorías
    categorias = categorias.sort(); // Ordenar alfabéticamente
    let checkboxContainer = document.querySelector('#inlineCheckbox'); //Obtenemos una referencia al elemento HTML que va a contener los checkboxes
    let updateResults = async () => { //Se define una función asincrónica llamada updateResults que se ejecuta cada vez que el usuario cambia una opción de búsqueda o categoría. Actualiza los resultados de búsqueda basados en la entrada del usuario
      try {
        let response = await fetch(urlApi).then(res => res.json()); //Realizamos una petición a la API
        let events = response.events.filter(event => event.date); //Se filtran los eventos que tienen una fecha válida
        let checkedCategories = [...checkboxes].filter(checkbox => checkbox.checked).map(checkbox => checkbox.value.toLowerCase()); //Se obtienen las categorías seleccionadas por el usuario y se convierten a minúsculas
        let searchTerm = searchInput.value.toLowerCase(); //Se obtiene el término de búsqueda ingresado por el usuario y se convierte a minúsculas
        let filteredEvents = events.filter(event => { //Se filtran los eventos según el término de búsqueda y las categorías seleccionadas por el usuario
          return (
            event.name.toLowerCase().includes(searchTerm) &&
            (checkedCategories.length === 0 || checkedCategories.includes(event.category.toLowerCase()))
          );
        });
        if (filteredEvents.length > 0) { //Si se encuentran eventos que coinciden con los criterios de búsqueda, se llamará a la función printEvents para imprimir los eventos en la página
          printEvents('cardEvents', filteredEvents);
        } else {
          swal("No matches found", "", "warning");
          searchInput.value = '';
          setTimeout(() => location.reload(), 2000);
        }
      } catch (error) {
        console.error('Error al recuperar los datos de la API:', error);
      }
    };

    categorias.forEach(categoria => { //Se define un bucle forEach para crear checkboxes de categorías en la página
      let checkbox = document.createElement('input'); //Se crean los checkboxes, etiquetas y contenedores para cada categoría y se agregan a la página
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

    let checkboxes = document.querySelectorAll('input[type=checkbox]'); //Se obtienen todas las opciones de checkbox y el campo de búsqueda y se les agrega un escuchador de eventos change para actualizar los resultados de búsqueda en tiempo real
    let searchInput = document.querySelector('input[type=search]');

    checkboxes.forEach(checkbox => checkbox.addEventListener('change', updateResults));
    searchInput.addEventListener('input', updateResults);
  } catch (error) {
    console.error('Error al recuperar los datos de la API:', error);
  }
}

document.addEventListener('DOMContentLoaded', fetchCards);