let card = (imagen, nombre, descripcion, precio) => {
    return `
        <div class="card m-2 text-center" style="width:18rem">
            <img src="${imagen}" class="fotos card-img-top" style="height:150px" alt="${nombre}">
            <div class="card-body d-flex flex-column align-items-center text-center">
                <h5 class="card-title">${nombre}</h5>
                <p class="card-text">${descripcion}</p>
            </div>
            <div class="card-footer d-flex flex-column align-items-center">
                <small class="text-muted">${precio}</small>
                <a href="./details.html" class="boton btn btn-danger">Details</a>
            </div>
        </div>
    `;
}

function printUpcomingEvents() {
    let eventos = data.events;
    let currentDate = data.currentDate;
    let cardsDelEvento = []
    
    for (let datos of eventos) {
        if(datos.date>currentDate){
        cardsDelEvento.push(card(datos.image, datos.name, datos.description, datos.price));
        }
    }
    
    
    let futuro = document.getElementById('cardEventsf');
    futuro.innerHTML = cardsDelEvento.join('');
}

printUpcomingEvents();