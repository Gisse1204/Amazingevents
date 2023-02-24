let cardsDelEvento = []
for (let datos of eventos) {
  let card = `
  <div class="card h-100 text-center">
                <img src="${datos.image}" class="fotos card-img-top" style="height:150px" alt="${datos.name}">
                <div class="card-body">
                    <h5 class="card-title">${datos.name}</h5>
                    <p class="card-text">${datos.description}</p>
                </div>
                <div class="card-footer">
                        <small class="text-muted">${datos.price}</small>
                        <a href="./details.html" class="boton btn btn-danger">Details</a>
                </div>
    </div>
  `
  console.log(card)
  cardsDelEvento.push(card)
}

console.log(cardsDelEvento)