let eventos = data.events;
let query = location.search
let params = new URLSearchParams(query)
let id_query = Number(params.get('_id'))

function defineDetails(detalle) { //recibe como parámetro un objeto llamado detalle, y devuelve una cadena de texto que representa una tarjeta de detalles en HTML
  let cardQuantity = "";
  if (detalle.assistance) { //se evalúa si la propiedad assistance del objeto detalle existe y tiene un valor. Si es así, se concatena la cadena "Assistance: " con el valor de detalle.assistance y se guarda en la variable cardQuantity
    cardQuantity += "Assistance: " + detalle.assistance;
  }
  if (detalle.estimate) { //se evalúa si la propiedad estimate del objeto detalle existe y tiene un valor. Si es así, se concatena la cadena "Estimate: " con el valor de detalle.estimate, y si cardQuantity no está vacía, se concatena también la cadena " || " antes de la cadena "Estimate: ". El resultado se guarda en la variable cardQuantity
    cardQuantity += (cardQuantity ? " || " : "") + "Estimate: " + detalle.estimate; //verifica si ya se ha agregado algún valor a 'cardQuantity' y, si es así, agrega el separador '||'
  }
  let cardDetails = `<div class="card text-center" style="width:30rem">
    <img src="${detalle.image}" class="fotos card-img-top" style="height:250px" alt="${detalle.name}">
    <div class="card-body">
      <h3 class="card-title">Name: ${detalle.name}</h3>
      <p class="card-title">Date: ${detalle.date}</p>
      <p class="card-title">Description: ${detalle.description}</p>
      <p class="card-title">Category: ${detalle.category}</p>
      <p class="card-title">Place: ${detalle.place}</p>
      <p class="card-title">Capacity: ${detalle.capacity}</p>`;
  if (cardQuantity) { //se evalúa si la variable cardQuantity no está vacía. Si es así, se agrega un elemento p con la clase "card-title" que contiene el valor de cardQuantity a la cadena de texto cardDetails
    cardDetails += `<p class="card-title">${cardQuantity}</p>`;
  }
  cardDetails += `<p class="card-title">Price: ${detalle.price}</p>
    </div>
  </div>`;
  return cardDetails;
}

function printDetalle(id,det,array_events) {
  let container = document.querySelector(id);
  det = array_events.find(each => each._id === det)
  let details = defineDetails(det)
  container.innerHTML = details
}

printDetalle('#cardEvents', id_query, eventos);









/* let minombre = prompt('miNombre');
console.log(minombre);
console.log(typeof minombre);

let miapellido = prompt('miApellido');
console.log(miapellido);
console.log(typeof miapellido);

let miedad = Number (prompt('miEdad'));
console.log(miedad);
console.log(typeof miedad);

let mimascota = prompt('miMascota');
console.log(mimascota);
console.log(typeof mimascota);

const edadmascota = Number (prompt('edadMascota'));
console.log(edadmascota);
console.log(typeof edadmascota);

let nombrecompleto = "Me llamo " + minombre + " " + miapellido;
alert(nombrecompleto);

let textoPresentacion = "Me llamo " + minombre + " " + miapellido + ", tengo " + miedad + " años. Mi mascota se llama " + mimascota + " y tiene " + edadmascota + " años";
alert(textoPresentacion);

let sumaEdades = miedad + edadmascota;
alert("Nuestras edades suman " + sumaEdades);

let restaEdades = miedad - edadmascota;
alert("La diferencia de nuestras edades es " + restaEdades);

let productoEdades = miedad * edadmascota;
alert("El producto de nuestras edades es " + productoEdades);

let divisionEdades = miedad / edadmascota;
alert("La división de nuestras edades es " + divisionEdades); */

/* let alumno = {
    nombre: "Gisela",
    apellido: "Martínez",
    edad: 39,
    educacion: "Universitaria",
    profesion: "Contadora",
};

console.table(alumno);
console.log(alumno.nombre);
console.log(alumno.apellido);
console.log(alumno.edad);
console.log(alumno.educacion);
console.log(alumno.profesion); */

/* let mascota = {
    nombre: "Becky",
    apellido: "Martínez",
    edad: 6,
    raza: "adoptada",
    alimento: "carne y verduras",
};

console.table(mascota);
console.log(mascota.nombre);
console.log(mascota.apellido);
console.log(mascota.edad);
console.log(mascota.raza);
console.log(mascota.alimento); */

/* let frutas = ["cereza", "durazno", "banana", "melón", "frutilla",];

console.log(frutas);

let numeros = ["12", "148", "6418", "84589", "659483",];

console.log(numeros);

for (let i = 0; i < numeros.length; i++) {
    console.log(numeros[i]);
}

let familia = [
    {nombre: "Gisela", edad: 39},
    {nombre: "Juan Manuel", edad: 40},
    {nombre: "Mariana", edad: 39},
    {nombre: "Lorena", edad: 39},
    {nombre: "Julio", edad: 40},
];

console.log(familia);

for (let i = 0; i < familia.length; i++) {
    console.log(familia[i]);
}

let textoAleatorio = 
familia[4].nombre + 
" de " + 
familia[4].edad + 
" años de edad, ha comido " + 
numeros[3] + 
" " + 
frutas[1];

console.log(textoAleatorio); */