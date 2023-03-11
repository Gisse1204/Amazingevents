function EnviarFormulario() {
    // obtener los valores del formulario
    let name = document.getElementById('inputName').value;
    let email = document.getElementById('inputEmail').value;
    let message = document.getElementById('inputMessage').value;

    // validar que los campos estén llenos
    if (name && email && message) {
        // hacer algo con los valores del formulario
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Message:', message);

        // mostrar un mensaje de éxito en un alert
        swal({
            title: "Message sent successfully!",
            icon: "success",
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        }).then(() => {
            // recargar la página después de cerrar el SweetAlert
            location.reload();
        });
    } else {
        // mostrar un mensaje de error en un alert
        swal({
            title: "Error",
            text: "Please fill in all fields",
            icon: "error"
        });
    }
}