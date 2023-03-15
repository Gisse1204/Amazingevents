async function printTabla1() {
    try {
        let urlApi = "https://mh.up.railway.app/api/amazing-events?time=past";
        let fetchResponse = await fetch(urlApi); //Utiliza la función fetch para obtener los datos de la API y los almacena en la variable fetchResponse
        let response = await fetchResponse.json(); //Utiliza la función json() para convertir los datos en formato JSON y los almacena en la variable response
        let arrayEventos = response.events; //Accede al array de eventos dentro de la respuesta JSON y lo almacena en una variable llamada arrayEventos

        arrayEventos = arrayEventos.sort((e1, e2) => e1.assistance - e2.assistance)  // Ordena el array arrayEventos en orden ascendente en función de la asistencia a los eventos
        document.getElementById("highest").innerHTML = arrayEventos[arrayEventos.length - 1].name;
        document.getElementById("highestValue").innerHTML = arrayEventos[arrayEventos.length - 1].assistance.toLocaleString();
        document.getElementById("lowest").innerHTML = arrayEventos[0].name;
        document.getElementById("lowestValue").innerHTML = arrayEventos[0].assistance.toLocaleString();

        arrayEventos = arrayEventos.sort((e1, e2) => e1.capacity - e2.capacity) // Ordena el array por capacidad
        document.getElementById("capacidad").innerHTML = arrayEventos[arrayEventos.length - 1].name;
        document.getElementById("capacidadValue").innerHTML = arrayEventos[arrayEventos.length - 1].capacity.toLocaleString();
    } catch (error) {
        console.error(error);
    }
}

async function printTabla2() {
    try {
  let urlApi = "https://mh.up.railway.app/api/amazing-events?time=upcoming"; //Define una variable llamada urlApi que contiene la URL de la API que proporciona la información de los eventos futuros
  let response = await fetch(urlApi).then(res => res.json()); //Utiliza la función fetch para obtener los datos de la API y luego utiliza then para convertir los datos en formato JSON y los almacena en la variable response
  let arrayEventos = response.events; //Accede al array de eventos dentro de la respuesta JSON y lo almacena en una variable llamada arrayEventos

  let categorias = [...new Set(arrayEventos.map(evento => evento.category))]; //Obtiene las categorías de eventos únicas mediante el uso de Set y map, y las almacena en una variable llamada categorias
  categorias = categorias.sort(); // Ordenar alfabéticamente
  arrayEventos.forEach(evento => evento.ganancia = evento.estimate * evento.price); //Agrega una nueva propiedad llamada ganancia a cada objeto de evento en arrayEventos multiplicando el número estimado de asistentes por el precio de la entrada

  let datos2 = categorias.map(category => { //Crea una nueva variable llamada datos2 que es un array de strings, donde cada string representa una fila de la tabla. Cada fila representa una categoría de evento diferente y contiene información como la ganancia total, el porcentaje de asistencia y la capacidad total
    let eventosFiltro = arrayEventos.filter(evento => evento.category === category);
    let ganancia = eventosFiltro.reduce((acum, evento) => acum + evento.ganancia, 0);
    let asistenciat = eventosFiltro.reduce((acum, evento) => acum + evento.estimate, 0);
    let capitalt = eventosFiltro.reduce((acum, evento) => acum + evento.capacity, 0);
    let gananciaFormateada = ganancia.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    let porcentaje = (asistenciat / capitalt * 100).toFixed(2);
    return `<tr class="d-flex justify-content-center text-center" style="font-weight: bold;">
              <td>${category}</td>
              <td>$${gananciaFormateada}</td>
              <td>${porcentaje}%</td>
            </tr>`;
  });

  document.getElementById("tabla2").innerHTML += datos2.join("");
} catch (error) {
    console.error(error);
}
}

async function printTabla3() {
    try {
  let urlApi = "https://mh.up.railway.app/api/amazing-events?time=past";
  let response = await fetch(urlApi).then(res => res.json());
  let arrayEventos = response.events;

  let categorias = [...new Set(arrayEventos.map(evento => evento.category))];
  categorias = categorias.sort(); // Ordenar alfabéticamente
  arrayEventos.forEach(evento => evento.ganancia = evento.assistance * evento.price);

  let datos3 = categorias.map(category => {
    let eventosFiltro = arrayEventos.filter(evento => evento.category === category);
    let ganancia = eventosFiltro.reduce((acum, evento) => acum + evento.ganancia, 0);
    let asistenciat = eventosFiltro.reduce((acum, evento) => acum + evento.assistance, 0);
    let capitalt = eventosFiltro.reduce((acum, evento) => acum + evento.capacity, 0);
    let gananciaFormateada = ganancia.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    let porcentaje = (asistenciat / capitalt * 100).toFixed(2);
    return `<tr class="d-flex justify-content-center text-center" style="font-weight: bold;">
              <td>${category}</td>
              <td>$${gananciaFormateada}</td>
              <td>${porcentaje}%</td>
            </tr>`;
  });

  document.getElementById("tabla3").innerHTML += datos3.join("");
} catch (error) {
    console.error(error);
}
}

printTabla1();
printTabla2();
printTabla3();