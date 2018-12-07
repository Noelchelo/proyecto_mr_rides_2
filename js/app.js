/**
 * Tablas
 */
 function guardarUsuario(){
   let nombre = document.getElementById('nombre-registro').value;
   let apellido = document.getElementById('apellido-registro').value;
   let telefono = document.getElementById('telefono-registro').value;
   let nombreUsuario = document.getElementById('nombreUsuario-registro').value;
   let pass = document.getElementById('pass-registro').value;
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
   const usuarios = insertarEnTabla('usuarios', usuario);
 }

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
 * metodos de base de datos
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
 		row += `<td> <a onclick="editarElemento(this)" data-id="${ride.id}" data-entity="${tableName}" class="link edit">Edit</a>
    |  <a  onclick="eliminarElemento(this);" data-id="${ride.id}" data-entity="${tableName}" class="link delete">Delete</a></td>`;
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


 function esValido(nombre, nombreTabla){
    nombreTabla.forEach((usuario, index)=>{
      if(usuario.nombre==nombre){
      }
    });
 }

 function eventos() {
 	jQuery('#agregar-usuario-button').bind('click', (element) => {
 		guardarUsuario();
 	});
 jQuery('#agregar-ride-ejemplo-button').bind('click', (element) =>{
   guardarEjemplosRides();
  });
  jQuery('#agregar-ride-ejemplo-button').on('click', function() {
    document.getElementById('salida-principal').value='';
    document.getElementById('destino-principal').value='';
  });
 }

 eventos();
