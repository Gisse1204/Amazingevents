console.log(data);

const eventos = data.events;

console.log(eventos);

let cardsDelEvento = []
{
    for (let datos of eventos){
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
console.log(cardsDelEvento)
/* console.log(card) */
function printEvents(){
    let card = document.getElementById('cardEvents');
    card.innerHTML = cardsDelEvento.join('')
}

printEvents('')