async function printstats1() {
  try {
    let urlApi = "https://mh.up.railway.app/api/amazing-events?time=past";
    let fetchResponse = await fetch(urlApi);
    let response = await fetchResponse.json();
    let arrayEventos = response.events;

    // Ordeno el array por asistencia
    arrayEventos = arrayEventos.sort((evento1, evento2) => evento1.assistance - evento2.assistance);

    // Calculo el porcentaje de asistencia de cada evento utilizando la función map()
    arrayEventos = arrayEventos.map(evento => {
      return {
        ...evento,
        percentAssistance: (evento.assistance / evento.capacity) * 100
      };
    });

    // Ordeno el array por porcentaje de asistencia
    arrayEventos = arrayEventos.sort((evento1, evento2) => evento1.percentAssistance - evento2.percentAssistance);

    // Encuentro el valor máximo y mínimo de porcentaje de asistencia
    let maxPercentAssistance = arrayEventos[arrayEventos.length - 1].percentAssistance;
    let minPercentAssistance = arrayEventos[0].percentAssistance;

    // Asigno los valores máximos y mínimos de porcentaje de asistencia a las variables correspondientes
    document.getElementById("highest").innerHTML = arrayEventos[arrayEventos.length - 1].name;
    document.getElementById("highestValue").innerHTML = maxPercentAssistance.toFixed(2) + "%";
    document.getElementById("lowest").innerHTML = arrayEventos[0].name;
    document.getElementById("lowestValue").innerHTML = minPercentAssistance.toFixed(2) + "%";

    // Ordeno el array por capacidad
    arrayEventos = arrayEventos.sort((evento1, evento2) => evento1.capacity - evento2.capacity);
    document.getElementById("capacidad").innerHTML = arrayEventos[arrayEventos.length - 1].name;
    document.getElementById("capacidadValue").innerHTML = arrayEventos[arrayEventos.length - 1].capacity.toLocaleString();
  } catch (error) {
    console.error(error);
  }
}

async function printstats2() {
  try {
    let urlApi = "https://mh.up.railway.app/api/amazing-events?time=upcoming"; //Define una variable llamada urlApi que contiene la URL de la API que proporciona la información de los eventos futuros
    let response = await fetch(urlApi).then(res => res.json()); //Utiliza la función fetch para obtener los datos de la API y luego utiliza then para convertir los datos en formato JSON y los almacena en la variable response
    let arrayEventos = response.events; //Accede al array de eventos dentro de la respuesta JSON y lo almacena en una variable llamada arrayEventos
    let categorias = [...new Set(arrayEventos.map(evento => evento.category))]; //Obtiene las categorías de eventos únicas mediante el uso de Set y map, y las almacena en una variable llamada categorias
    categorias = categorias.sort(); // Ordenar alfabéticamente
    arrayEventos.forEach(evento => evento.ganancia = evento.estimate * evento.price); //Agrega una nueva propiedad llamada ganancia a cada objeto de evento en arrayEventos multiplicando el número estimado de asistentes por el precio de la entrada
    let datos2 = categorias.map(category => {
      let { ganancia, asistencia, capacidad } = arrayEventos.filter(evento => evento.category === category)
        .reduce((acum, evento) => {
          return {
            ganancia: acum.ganancia + evento.ganancia,
            asistencia: acum.asistencia + evento.estimate,
            capacidad: acum.capacidad + evento.capacity
          };
        }, { ganancia: 0, asistencia: 0, capacidad: 0 });
    
      let gananciaFormateada = ganancia.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      let porcentaje = (asistencia / capacidad * 100).toFixed(2);
    
      return `<tr class="d-flex justify-content-center text-center" style="font-weight: bold;">
              <td>${category}</td>
              <td>$${gananciaFormateada}</td>
              <td>${porcentaje}%</td>
            </tr>`;
    });

    document.getElementById("stats2").innerHTML += datos2.join("");
  } catch (error) {
    console.error(error);
  }
}

async function printstats3() {
  try {
    let urlApi = "https://mh.up.railway.app/api/amazing-events?time=past";
    let response = await fetch(urlApi).then(res => res.json());
    let arrayEventos = response.events;
    let categorias = [...new Set(arrayEventos.map(evento => evento.category))];
    categorias = categorias.sort(); // Ordenar alfabéticamente
    arrayEventos.forEach(evento => evento.ganancia = evento.assistance * evento.price);
    let datos3 = categorias.map(category => {
      let { ganancia, asistencia, capacidad } = arrayEventos.filter(evento => evento.category === category)
        .reduce((acum, evento) => {
          return {
            ganancia: acum.ganancia + evento.ganancia,
            asistencia: acum.asistencia + evento.assistance,
            capacidad: acum.capacidad + evento.capacity
          };
        }, { ganancia: 0, asistencia: 0, capacidad: 0 });
    
      let gananciaFormateada = ganancia.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      let porcentaje = (asistencia / capacidad * 100).toFixed(2);
    
      return `<tr class="d-flex justify-content-center text-center" style="font-weight: bold;">
              <td>${category}</td>
              <td>$${gananciaFormateada}</td>
              <td>${porcentaje}%</td>
            </tr>`;
    });

    document.getElementById("stats3").innerHTML += datos3.join("");
  } catch (error) {
    console.error(error);
  }
}

printstats1();
printstats2();
printstats3();