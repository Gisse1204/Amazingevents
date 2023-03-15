async function detalleEvento() { // función asincrónica y puede esperar que devuelva una promesa
  try {
  let id = new URLSearchParams(location.search).get("id"); //obtiene el parámetro "id" de la URL actual
  let response = await fetch(`https://mh.up.railway.app/api/amazing-events/${id}`); //usa la función "fetch" para realizar una solicitud GET a una API externa en una URL que incluye el ID del evento. La palabra clave "await" se utiliza para esperar a que se complete la solicitud antes de continuar
  let data = await response.json() //extrae los datos de la respuesta de la solicitud en formato JSON y los almacena en una variable llamada "data". La palabra clave "await" se utiliza para esperar a que se complete la conversión de la respuesta a JSON antes de continuar
  let event = data.response //almacena los detalles del evento en una variable llamada "event". Se asume que la respuesta de la API tiene una propiedad llamada "response" que contiene los datos del evento
  detalleCard(event); //llama a la función "detalleCard" y le pasa el objeto "event" como argumento. La función "detalleCard" mostrará los detalles del evento en una card
} catch (error) {
  console.error(error);
}
}

detalleEvento(); //llama a la función "detalleEvento" para iniciar la obtención de detalles del evento tan pronto como la página se carga y se ejecuta el script

function detalleCard(evento) {
  let fecha = new Date(evento.date);
  fecha = fecha.toLocaleDateString();
  let cardQuantity = "";
  if (evento.assistance) {
    cardQuantity += "Assistance: " + evento.assistance;
  }
  if (evento.estimate) {
    cardQuantity += (cardQuantity ? " || " : "") + "Estimate: " + evento.estimate;
  }
  let cardDetails = `<div class="card text-center" style="width:30rem">
    <img src="${evento.image}" class="fotos card-img-top" style="height:250px" alt="${evento.name}">
    <div class="card-body">
      <h3 class="card-title">Name: ${evento.name}</h3>
      <p class="card-title">Date: ${fecha}</p>
      <p class="card-title">Description: ${evento.description}</p>
      <p class="card-title">Category: ${evento.category}</p>
      <p class="card-title">Place: ${evento.place}</p>
      <p class="card-title">Capacity: ${evento.capacity}</p>`;
  if (cardQuantity) {
    cardDetails += `<p class="card-title">${cardQuantity}</p>`;
  } cardDetails += `
      <p class="card-title">Price: ${evento.price}</p>
    </div>
  </div>`;
  document.querySelector("#cardEvents").innerHTML = cardDetails;  
}




//línea 15 Si la propiedad "assistance" existe y tiene un valor, entonces la cadena "Assistance: " seguida del valor de
//"evento.assistance" se agrega a la variable "cardQuantity" con el operador de concatenación "+=".
//Si la propiedad "assistance" no existe o es nula, esta línea de código se saltará y no se agregará nada a la variable "cardQuantity".

//línea 18 verifica si el evento tiene un valor para la propiedad estimate. Si evento.estimate es verdadero, entonces agrega
//la cadena "Estimate: " seguida del valor de evento.estimate a la variable cardQuantity.
//La parte cardQuantity ? " || " : "" se conoce como un operador ternario. Es una forma abreviada de escribir una instrucción
//condicional if-else. Aquí, la condición cardQuantity verifica si la variable ya tiene un valor, y si es así, agrega " || "
//para separar la información del evento previa. Si cardQuantity aún no tiene ningún valor, se establece una cadena vacía "".