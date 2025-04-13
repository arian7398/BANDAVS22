// Archivo con funciones para manejar los registros

/**
 * Guarda un nuevo registro en la hoja de cálculo
 */
function saveRegistroToCaso(formData) {
  // Asegurarse de que la hoja existe y tiene la columna de usuario
  checkAndSetupSheet();
  
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  
  // Generar ID único para el registro que incluye el usuario
  var id = generateUniqueId();
  
  // Obtener fecha actual
  var fechaRegistro = new Date().toLocaleDateString('es-ES');
  
  // Obtener usuario actual
  var currentUser = getCurrentUsername();
  
  // Crear array con datos en el orden correcto según los encabezados
  var headers = getHeaders();
  var rowData = [];
  
  // Primeras columnas fijas
  rowData.push(id); // ID
  rowData.push(fechaRegistro); // Fecha de Registro
  rowData.push(currentUser); // Usuario Creador
  
  // Añadir el resto de datos siguiendo el orden de los encabezados
  for (var i = 3; i < headers.length; i++) {
    var header = headers[i];
    rowData.push(formData[header] || ''); // Si no existe el valor, usar string vacío
  }
  
  // Añadir fila a la hoja
  sheet.appendRow(rowData);
  
  // Registrar en el log para debug
  Logger.log("Registro guardado con ID: " + id + " para usuario: " + currentUser);
  
  return {
    success: true,
    id: id,
    message: "Registro guardado correctamente"
  };
}

/**
 * Genera un ID único que incluye el nombre de usuario
 */
function generateUniqueId() {
  var currentUser = getCurrentUsername() || "usuario";
  var timestamp = new Date().getTime();
  var randomString = Math.random().toString(36).substring(2, 8);
  return currentUser + "_" + timestamp + "_" + randomString;
}

/**
 * Obtiene todos los registros filtrando por el usuario actual
 * Versión simplificada y directa
 */
function getUserCasos() {
  try {
    var ss = getSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);
    
    if (sheet.getLastRow() <= 1) return [];
    
    var data = sheet.getDataRange().getValues();
    var headers = data[0];
    var records = [];
    
    // Obtener usuario actual
    var currentUser = getCurrentUsername();
    var currentRole = getCurrentUserRole();
    
    Logger.log("Usuario actual: " + currentUser + ", Rol: " + currentRole);
    
    // Para cada fila de datos (saltando la fila de encabezados)
    for (var i = 1; i < data.length; i++) {
      // Solo si tiene datos
      if (data[i][0]) {
        // Convertir a objeto
        var record = {};
        for (var j = 0; j < headers.length; j++) {
          record[headers[j]] = data[i][j];
        }
        
        // El ID está en la primera columna
        var id = data[i][0] || '';
        var userCreator = '';
        
        // Buscar columna Usuario Creador
        var userColumn = headers.indexOf("Usuario Creador");
        if (userColumn >= 0) {
          userCreator = data[i][userColumn];
        }
        
        // Si es admin muestra todo, si es usuario normal solo sus registros
        if (currentRole === 'admin' || 
            id.indexOf(currentUser) === 0 || 
            userCreator === currentUser) {
          records.push(record);
        }
      }
    }
    
    Logger.log("Registros encontrados: " + records.length);
    return records;
  } catch (error) {
    Logger.log("Error en getUserCasos: " + error);
    return [];
  }
}

/**
 * Obtiene todos los registros sin filtrar por usuario
 * Esta función es útil para debugging
 */
function getAllCasos() {
  try {
    var ss = getSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);
    
    if (sheet.getLastRow() <= 1) return [];
    
    var data = sheet.getDataRange().getValues();
    var headers = data[0];
    var records = [];
    
    // Para cada fila de datos (saltando la fila de encabezados)
    for (var i = 1; i < data.length; i++) {
      // Solo si tiene datos
      if (data[i][0]) {
        // Convertir a objeto
        var record = {};
        for (var j = 0; j < headers.length; j++) {
          record[headers[j]] = data[i][j];
        }
        records.push(record);
      }
    }
    
    Logger.log("Todos los registros: " + records.length);
    return records;
  } catch (error) {
    Logger.log("Error en getAllCasos: " + error);
    return [];
  }
}

/**
 * Obtiene un registro específico por ID
 */
function getCasoById(id) {
  checkAndSetupSheet();
  
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  
  // Obtener encabezados
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  
  // Obtener usuario actual y rol
  var currentUser = getCurrentUsername();
  var currentRole = getCurrentUserRole();
  
  // Obtener todas las filas
  var dataRange = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn());
  var data = dataRange.getValues();
  
  // Buscar el registro con el ID específico
  for (var i = 0; i < data.length; i++) {
    if (data[i][0] === id) {
      // Verificar si el usuario tiene permisos para ver este registro
      // Permitir si es admin o si el ID contiene el nombre del usuario o si la columna Usuario Creador coincide
      if (currentRole === 'admin' || 
          (id && id.indexOf(currentUser) === 0) || 
          data[i][2] === currentUser) { // Índice 2 corresponde a 'Usuario Creador'
        
        // Convertir a objeto
        var record = {};
        for (var j = 0; j < headers.length; j++) {
          record[headers[j]] = data[i][j];
        }
        return record;
      } else {
        // El usuario no tiene permiso para ver este registro
        return { error: "No tienes permiso para ver este registro" };
      }
    }
  }
  
  // No se encontró el registro
  return { error: "Registro no encontrado" };
}

/**
 * Actualiza un registro existente
 */
function updateCaso(id, formData) {
  checkAndSetupSheet();
  
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  
  // Obtener encabezados
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  
  // Obtener usuario actual y rol
  var currentUser = getCurrentUsername();
  var currentRole = getCurrentUserRole();
  
  // Obtener todas las filas
  var dataRange = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn());
  var data = dataRange.getValues();
  
  // Buscar el registro a actualizar
  for (var i = 0; i < data.length; i++) {
    if (data[i][0] === id) {
      // Verificar si el usuario tiene permisos para editar este registro
      // Permitir si es admin o si el ID contiene el nombre del usuario o si la columna Usuario Creador coincide
      if (currentRole === 'admin' || 
          (id && id.indexOf(currentUser) === 0) || 
          data[i][2] === currentUser) { // Índice 2 corresponde a 'Usuario Creador'
        
        // Crear array con datos actualizados
        var rowData = [];
        
        // Para cada encabezado, mantener o actualizar el valor
        for (var j = 0; j < headers.length; j++) {
          var header = headers[j];
          
          if (j === 0) { // ID
            rowData.push(id); // Mantener ID original
          } else if (j === 1) { // Fecha de Registro
            rowData.push(data[i][1]); // Mantener fecha original
          } else if (j === 2) { // Usuario Creador
            rowData.push(data[i][2]); // Mantener usuario creador original
          } else {
            // Actualizar si se proporcionó un nuevo valor, sino mantener el original
            rowData.push(formData[header] !== undefined ? formData[header] : data[i][j]);
          }
        }
        
        // Actualizar la fila en la hoja
        sheet.getRange(i + 2, 1, 1, headers.length).setValues([rowData]);
        
        return {
          success: true,
          message: "Registro actualizado correctamente"
        };
      } else {
        // El usuario no tiene permiso para editar este registro
        return {
          success: false,
          message: "No tienes permiso para editar este registro"
        };
      }
    }
  }
  
  // No se encontró el registro
  return {
    success: false,
    message: "Registro no encontrado"
  };
}

/**
 * Elimina un registro (solo para administradores)
 */
function deleteCaso(id) {
  // Solo los administradores pueden eliminar registros
  if (!isAdmin()) {
    return {
      success: false,
      message: "No tienes permiso para eliminar registros"
    };
  }
  
  checkAndSetupSheet();
  
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  
  // Obtener todas las filas
  var dataRange = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn());
  var data = dataRange.getValues();
  
  // Buscar la fila con el ID específico
  for (var i = 0; i < data.length; i++) {
    if (data[i][0] === id) {
      // Eliminar la fila
      sheet.deleteRow(i + 2); // +2 porque i empieza en 0 y la fila 1 son los encabezados
      
      return {
        success: true,
        message: "Registro eliminado correctamente"
      };
    }
  }
  
  // No se encontró el registro
  return {
    success: false,
    message: "Registro no encontrado"
  };
}

/**
 * Comprueba y configura la hoja de cálculo
 */
function checkAndSetupSheet() {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    setupSheet();
  }
}

/**
 * Configura la hoja con los encabezados necesarios
 */
function setupSheet() {
  var ss = getSpreadsheet();
  var sheet = ss.insertSheet(SHEET_NAME);
  
  // Definir encabezados
  var headers = [
    'ID',
    'Fecha de Registro',
    'Usuario Creador',
    'Fiscalía',
    'Fiscal a Cargo',
    'Unidad de Inteligencia',
    'Instructor a Cargo',
    'Forma de Inicio de Investigación',
    'Carpeta Fiscal',
    'Fecha del Hecho',
    'Fecha Ingreso Carpeta Fiscal',
    'Tipo de Agraviado',
    'Agraviados',
    'Función que Ejerce',
    'Tipo de Empresa',
    'Delitos',
    'Lugar de los Hechos',
    'Denunciados',
    'Datos de Interés del Denunciado',
    'Nombre/Apodo Banda Criminal',
    'Cantidad de Miembros de Banda',
    'Modalidad de Violencia',
    'Modalidad de Amenaza',
    'Atentados Cometidos',
    'Instrumentos de Extorsión',
    'Forma de Pago',
    'Números Telefónicos',
    'IMEI de Teléfonos',
    'Cuenta de Pago',
    'Titulares de Pago',
    'Tipo de Pago',
    'Monto Solicitado',
    'Monto Pagado',
    'Número de Pagos',
    'Otros Tipos de Pago',
    'Sumilla de Hechos',
    'Observaciones'
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length)
    .setBackground('#4285F4')
    .setFontColor('#FFFFFF')
    .setFontWeight('bold');
  
  sheet.autoResizeColumns(1, headers.length);
}

/**
 * Obtiene los encabezados de la hoja
 */
function getHeaders() {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    setupSheet();
    sheet = ss.getSheetByName(SHEET_NAME);
  }
  
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  return headers;
}
