/**
 * Tablas
 */

 /**
  * Guarda a un nuevo usuario en el localStorage
  */
 function guardarUsuario(){
   let nombre = document.getElementById('nombre-registro').value;
   let apellido = document.getElementById('apellido-registro').value;
   let telefono = document.getElementById('telefono-registro').value;
   let nombreUsuario = document.getElementById('nombreUsuario-registro').value;
   let pass = document.getElementById('rePass-registro').value;
   let velocidad = "";
   let sobreMi="";

   const usuario = {
     nombre,
     apellido,
     telefono,
     nombreUsuario,
     pass,
     velocidad,
     sobreMi
   };
   return usuario;
 }

 /**
  * Guarda los ride de un usuario sin registrase
  */
 function guardarEjemplosRides(){
   let usuario = "anónimo";
   let salida = document.getElementById('salida-principal').value;
   let destino = document.getElementById('destino-principal').value;

   const ride = {
     usuario,
     salida,
     destino
   };

   const rides = insertarEnTabla('rides_ejemplo', ride);

   renderizarTablaRideEjemplo('rides_ejemplo', rides);
 }

 /**
  * guarda los datos necesarios en el sessionStorage
  */
 function datosUsuarioSession() {
   let nombreUsuario = document.getElementById('usuario-sesion').value;
   let idUsuario= obtenerIdUsuario('usuarios',nombreUsuario);

   const usuarioSession={
     nombreUsuario,
     idUsuario
   };
   const usuariosSession = guardarSession('usuario_session',usuarioSession);
 }

 /**
  * Guardar los ride de los usarios
  */
 function guardarRidesUsuario(){
   let nombreUsuario = obtenerUsuario('usuario_session');;
   let idUsuario = obtenerIdUsuario('usuarios',nombreUsuario);
   let nombreRide = document.getElementById('nombreRide').value;
   let salida = document.getElementById('salidaRide').value;
   let destino = document.getElementById('destinoRide').value;
   let descripcion =document.getElementById('descripcionRide').value;
   let horaSalida = document.getElementById('horaSalidaRide').value;
   let horaLlegada = document.getElementById('horaLlegadaRide').value;
   let dias= verificarChecked('dia');

   const rideUsuario = {
     nombreUsuario,
     idUsuario,
     nombreRide,
     salida,
     destino,
     descripcion,
     horaSalida,
     horaLlegada,
     dias
   };
   return rideUsuario;
 }

 /**
  * Obtiene a un usuaio de una tabla
  */
 function obtenerUsuario(tableName) {
   let nombreUsuario="";
   let session= obtenerDatosSession(tableName);
   for(let i in session){
     nombreUsuario= session[i].nombreUsuario;
     break;
   }
   return nombreUsuario;
 }
 /**
  * verifica cuales checkboxs estan marcados para obetener el valor
  */
 function verificarChecked(groupName){
   let result = jQuery('input[name= "'+groupName +'"]:checked');
   let dias ="";
   if(result.lenght > 0){
     result.each(function(){
       dias += jQuery(this).val();
     });
   }
   return dias;
 }
 /**
  * Obtiene el id de una tabla de usuarios
  * @param nombreTabla nombre de la tabla
  */
 function obtenerIdUsuario(nombreTabla,nombreUsuario){
   let usuarios=obtenerDatosTabla(nombreTabla);
   let id="";
   for(let i in usuarios){
     if(nombreUsuario==usuarios[i].nombreUsuario){
       id=usuarios[i].id;
       break;
     }
   }
   return id;
 }

/**
 * metodos de localStorage y sessionStorage
 */

 /**
  * Elimina un objeto en especifico de una tabla en el localStorage
  *
  * @param tableName nombre de la tabla desde la cual se va a borrar un objeto
  * @param objectId i del objeto que se va eliminar
  */
 function eliminarDesdeTabla(tableName, objectId) {
   let tableData = JSON.parse(localStorage.getItem(tableName));

   if (!tableData) {
     return false;
   }
   let newTableData = [];
   tableData.forEach((element) => {
     if (element.id != objectId) {
       newTableData.push(element);
     }
   });

   localStorage.setItem(tableName, JSON.stringify(newTableData));
   return newTableData;
 }


 /**
  * Inserta cualquier objeto en la tabla del localStorage
  *
  * @param {*} nombreTabla nombre de la tabla donde se insertará un objeto
  * @param {*} objeto objeto que se inserta en la tabla
  */
  function insertarEnTabla(tableName, object) {
    let tableData = JSON.parse(localStorage.getItem(tableName));

    if (!tableData) {
      tableData = [];
    }
    let primaryKey = tableData.length + 1;
    object.id = primaryKey;
    tableData.push(object);
    localStorage.setItem(tableName, JSON.stringify(tableData));
    return tableData;
  }

  /**
   * Obtener datos
   *
   * @param {*} tableName nombre de la tabla
   */
  function obtenerDatosTabla(tableName) {
    let tableData = JSON.parse(localStorage.getItem(tableName));

    if (!tableData) {
      tableData = [];
    }
    return tableData;
  }

  /**
   * Guarda una llave en especifico en la base del localStorage
   *
   * @param {*} llave llave para guardar
   * @param {*} valor valor asociado a la llave
   */
  function guardarLocalStorage(llave, valor){
    localStorage.setItem(key, JSON.stringify(valor));
    return true;
  }

/**
* metodos para eventos
*/

 /**
  * Renderizar una tabla de HTML dinamicamente
  *
  * @param tableName nombre de la tabla
  * @param tableData datos de la tabla
  */
 function renderizarTablaRideEjemplo(tableName, tableData) {
 	let table = jQuery(`#${tableName}_table`);
 	// loop atraves de los items para generar el html
 	let rows = "";
 	tableData.forEach((ride, index) => {
 		let row = `<tr><th scope="row">${ride.usuario}</th><td>${ride.salida}</td><td>${ride.destino}</td>`;
 		row += `<td> <a  onclick="eliminarElemento(this);" data-id="${ride.id}" data-entity="${tableName}" class="link delete">Delete</a></td>`;
 		rows += row + '</tr>';
 	});
 	table.html(rows);
 }

function rederizarTablaRidesUsuario(tableName,tableData) {
  let table = jQuery(`#${tableName}_table`);
  let rows = "";
  tableData.forEach((rideUsuario, index) =>{
    let row = `<tr><th scope="row">${rideUsuario.nombreRide}</th><td>${rideUsuario.salida}</td><td>${rideUsuario.destino}</td>`;
 		row += `<td> <a onclick="editarElemento(this)" data-id="${rideUsuario.id}" data-entity="${tableName}" class="link edit">Edit</a>
    |  <a  onclick="eliminarElemento(this);" data-id="${rideUsuario.id}" data-entity="${tableName}" class="link delete">Delete</a></td>`;
 		rows += row + '</tr>';
  });
  table.html(rows);
}

/**
 * Elimina un elemento de una tabla
 */
 function eliminarElemento(element) {
 	const dataObj = jQuery(element).data();
 	const newEntities = eliminarDesdeTabla(dataObj.entity, dataObj.id);
 	renderizarTablaRideEjemplo(dataObj.entity, newEntities);
 }

 /**
  * carga la tabla
  */
 function cargarDatosTabla(tableName) {
 	renderizarTablaRideEjemplo(tableName, obtenerDatosTabla(tableName));
 }

 /**
  * Inserta cualquier objeto en la tabla del sessionStorage
  *
  * @param {*} nombreTabla nombre de la tabla donde se insertará un objeto
  * @param {*} objeto objeto que se inserta en la tabla
  */
function guardarSession(tableName, object){
  let tableData = JSON.parse(sessionStorage.getItem(tableName));

  if (!tableData) {
    tableData = [];
  }
  let primaryKey = tableData.length + 1;
  object.id = primaryKey;
  tableData.push(object);
  sessionStorage.setItem(tableName, JSON.stringify(tableData));
  return tableData;
}

/**
 * obtiene los datos de una tabla en el sessionStorage
 * @param tableName nombre de la tabla
 */
function obtenerDatosSession(tableName) {
  let tableData = JSON.parse(sessionStorage.getItem(tableName));

  if (!tableData) {
    tableData = [];
  }
  return tableData;
}

/**
 * Metodos login
 */

 function validarUsuario(){
   let usuario = document.getElementById('usuario-sesion').value;
   let pass = document.getElementById('pass-sesion').value;
   let usuariosS = obtenerDatosTabla('usuarios');

   for(let i in usuariosS){
     if (usuario==usuariosS[i].nombreUsuario && pass==usuariosS[i].pass) {
       window.location.href="dashboard.html";
       break;
     }
   }
 }

/**
 * terminando
 */
 function verificarRegistro(){
   let nombreUsuario = document.getElementById('nombreUsuario-registro').value;
   let usuarios=obtenerDatosTabla('usuarios');
   let user="";
   for(let i in usuarios){
     if(nombreUsuario==usuarios[i].nombreUsuario){
       user=usuarios[i].nombreUsuario;
       break;
     }
   }
   const usuario= guardarUsuario();
   if(!usuario.nombre || !usuario.apellido || !usuario.telefono ||
   !usuario.nombreUsuario || !usuario.pass || !document.getElementById('rePass-registro').value){
     window.alert("Recuerda llenar todos los campos");
   }else{
     if(document.getElementById('pass-registro').value==document.getElementById('rePass-registro').value){
       if(user!=nombreUsuario){
         usuario=insertarEnTabla('usuarios', usuario);
       }else {
         window.alert("el usuario ya existe");
       }
      }else {
        window.alert("las contraseñas no son iguales");
      }
   }
}

function verificarRideUsuario(){
  let rideUsuario = guardarRidesUsuario();
  if(!rideUsuario.nombreUsuario||!rideUsuario.idUsuario || !rideUsuario.nombreRide || !rideUsuario.salida
  || !rideUsuario.destino){
    window.alert("Recuerda llenar los campos necesarios, nombre del ride, salida y destino");
  }else{
    const ridesUsuario = insertarEnTabla('rides_usuario',rideUsuario);
    rederizarTablaRidesUsuario('rides_usuario',ridesUsuario);
  }
}

function limpiarModal(){
  jQuery('.modal-btn').on('click', function() {
 		document.getElementById('nombre-registro').value="";
    document.getElementById('apellido-registro').value="";
    document.getElementById('telefono-registro').value="";
    document.getElementById('nombreUsuario-registro').value="";
    document.getElementById('pass-registro').value="";
    document.getElementById('rePass-registro').value="";
 	});
}

function cerrarSesion(){
    sessionStorage.clear();
}

 function eventos() {
 	jQuery('#agregar-usuario-button').bind('click', (element) => {
 		verificarRegistro();
 	});
 jQuery('#agregar-ride-ejemplo-button').bind('click', (element) =>{
   guardarEjemplosRides();
  });
  jQuery('#agregar-ride-ejemplo-button').on('click', function() {
    document.getElementById('salida-principal').value='';
    document.getElementById('destino-principal').value='';
  });
  jQuery('#btn-sesion').bind('click',(element) =>{
    validarUsuario();
    datosUsuarioSession();
  });
  jQuery('#btn-guardar-ride').on('click',(element)=>{
    verificarRideUsuario();
  });

  limpiarModal();
 }

 eventos();
