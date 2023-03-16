function EnviarFormulario() {
    try {
        let name = document.getElementById('inputName').value;
        let email = document.getElementById('inputEmail').value;
        let message = document.getElementById('inputMessage').value;
        if (name && email && message) {
            console.log('Name:', name);
            console.log('Email:', email);
            console.log('Message:', message);
            swal({
                title: "Message sent successfully!",
                icon: "success",
                text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
            }).then(() => {
                location.reload();
            });
        } else {
            throw new Error("Please fill in all fields");
        }
    } catch (error) {
        swal({
            title: "Error",
            text: error.message,
            icon: "error"
        });
    }
}