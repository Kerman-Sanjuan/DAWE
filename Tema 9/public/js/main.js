var id;

$(document).ready(function(){
	$('.deleteUser').on('click', deleteUser);
});

function deleteUser(){
	//alert('Borrar!');
	alert($(this).data('id'));
}

function deleteUser(){
    var confirmation = confirm('Are You Sure?');
	if(confirmation){
		$.ajax({
			type: 'DELETE',
			url:  '/users/delete/'+$(this).data('id')
		}).done(function(response){
			window.location.replace('/')
		});
	} else {
		return false;
	}

}


$(document).ready(function(){
	$('.editUser').on('click', editUser);
});

function editUser(){
	// Necesito que al clickar en el botón editar algo me devuelva la información del usuario que quiero editar.
	// Lo haré mediante API Fetch, en la dirección /users/obtenerInfoUsuario/:id
	id = $(this).data('id');	
	fetch('/users/obtenerInfoUsuario/'+id)
	.then(response => { return response.json(); })
	.then(response => { //nos ha devuleto un array de JSON, en el que en la posicion 0 están nuestros datos
		var datos = response[0];
		document.getElementById("first_name").value = datos.first_name;
		document.getElementById("last_name").value = datos.last_name;
		document.getElementById("email").value = datos.email;
	});

	// Ahora cambiamos el texto del botón a EDITAR
	document.getElementById("boton").value = 'EDITAR';

}


// Necesitamos una función que diferencie cuando se pulsa el botón en modo EDITAR o el modo original

function pulsarBoton(){
	// Miramos si está en modo original de añadir. Si es así, actua como dice el formulario:
	// <form method="POST" action="/users/add" id="form">

	if(document.getElementById("boton").value == "Enviar"){
		document.getElementById("form").submit();
	}else{ //Está en modo editar
		
		//Creamos un JSON con los datos nuevos
		var usuarioEjjditado = {"first_name": document.getElementById('first_name').value, "last_name": document.getElementById('last_name').value, "email": document.getElementById('email').value};
	
		// https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_Fetch#proporcionando_tu_propio_objeto_request
		//https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_Fetch#suministrando_opciones_de_petici%C3%B3n
		//https://stackoverflow.com/questions/29775797/fetch-post-json-data
		fetch('/users/actualizarInfoUsuario/'+id, {
			method: 'POST',
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(usuarioEditado)
		}).then(response => {
			window.location.replace('/');
		});
	}
}