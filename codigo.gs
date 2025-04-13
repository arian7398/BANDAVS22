// Archivo principal de Google Apps Script

// ID de la hoja de cálculo
const SPREADSHEET_ID = '1nn7E27XSxW0qQ6WfRSoNiAmEauNb2quzYv9eaztjtUM';

// Variables globales
const SHEET_NAME = 'Registros';
const USER_COLUMN = 'Usuario Creador'; // Columna para asociar registros con usuarios

// Constantes para autenticación
const USUARIOS = [
  { username: 'admin', password: 'fecor2025', role: 'admin' },
  { username: 'fecore1', password: '123', role: 'user' },
  { username: 'fecore2', password: 'user2', role: 'user' }
  // Añadir más usuarios según sea necesario
];

// Propiedades para manejo de sesión
const SESION_DURATION_SECONDS = 3600; // 1 hora

/**
 * Función doGet - Punto de entrada para la aplicación web
 */
function doGet(e) {
  // Registrar la entrada para debugging
  Logger.log("Recibiendo solicitud doGet con parámetros: " + JSON.stringify(e.parameters));
  
  // Obtener el parámetro de acción o usar 'login' por defecto
  var action = e.parameter.action || 'login';
  
  // Verificar si hay una sesión activa
  var userSession = getUserSession();
  Logger.log("Sesión actual: " + (userSession ? userSession.username : "No hay sesión"));
  
  // Si no hay sesión activa y no es la página de login, redirigir al login
  if (!userSession && action !== 'login') {
    return HtmlService.createTemplateFromFile('index')
      .evaluate()
      .setTitle('Sistema de Registro - Login')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }
  
  // Manejar las diferentes acciones
  switch(action) {
    case 'login':
      return HtmlService.createTemplateFromFile('index')
        .evaluate()
        .setTitle('Sistema de Registro - Login')
        .addMetaTag('viewport', 'width=device-width, initial-scale=1')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    
    case 'formulario':
      return HtmlService.createTemplateFromFile('formulario')
        .evaluate()
        .setTitle('Formulario de Registro')
        .addMetaTag('viewport', 'width=device-width, initial-scale=1')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    
    case 'historial':
      return HtmlService.createTemplateFromFile('historial')
        .evaluate()
        .setTitle('Historial de Registros')
        .addMetaTag('viewport', 'width=device-width, initial-scale=1')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    
    case 'detalle':
      return HtmlService.createTemplateFromFile('detalle')
        .evaluate()
        .setTitle('Detalle de Registro')
        .addMetaTag('viewport', 'width=device-width, initial-scale=1')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    
    default:
      return HtmlService.createTemplateFromFile('index')
        .evaluate()
        .setTitle('Sistema de Registro - Login')
        .addMetaTag('viewport', 'width=device-width, initial-scale=1')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }
}

/**
 * Incluir archivos HTML
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Obtener la hoja de cálculo por ID
 */
function getSpreadsheet() {
  return SpreadsheetApp.openById(SPREADSHEET_ID);
}

/**
 * Genera un archivo PDF de todos los registros
 */
function exportToPDF() {
  // Verificar si el usuario tiene sesión activa
  var session = getUserSession();
  if (!session) {
    return {
      success: false,
      message: "Sesión expirada, por favor vuelve a iniciar sesión"
    };
  }
  
  try {
    var ss = getSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);
    
    // Obtener URL de exportación a PDF
    var sheetId = sheet.getSheetId();
    var ssId = ss.getId();
    var exportUrl = 'https://docs.google.com/spreadsheets/d/' + ssId + '/export?'
      + 'format=pdf&'
      + 'size=A4&'
      + 'portrait=true&'
      + 'fitw=true&'
      + 'gridlines=false&'
      + 'printtitle=false&'
      + 'sheetnames=false&'
      + 'pagenum=false&'
      + 'gid=' + sheetId;
    
    // Opciones para obtener el PDF
    var options = {
      headers: {
        'Authorization': 'Bearer ' + ScriptApp.getOAuthToken()
      }
    };
    
    // Obtener el PDF
    var response = UrlFetchApp.fetch(exportUrl, options);
    var pdfBlob = response.getBlob().setName("Registros_" + new Date().toLocaleDateString('es-ES') + ".pdf");
    
    // Obtener URL para descargar el PDF
    var pdfData = Utilities.base64Encode(pdfBlob.getBytes());
    
    return {
      success: true,
      fileName: pdfBlob.getName(),
      mimeType: pdfBlob.getContentType(),
      data: pdfData
    };
  } catch (error) {
    Logger.log("Error en exportToPDF: " + error.toString());
    return {
      success: false,
      message: "Error al exportar a PDF: " + error.toString()
    };
  }
}

/**
 * Genera un archivo Excel de todos los registros
 */
function exportToExcel() {
  // Verificar si el usuario tiene sesión activa
  var session = getUserSession();
  if (!session) {
    return {
      success: false,
      message: "Sesión expirada, por favor vuelve a iniciar sesión"
    };
  }
  
  try {
    var ss = getSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);
    
    // Exportar directamente la hoja de cálculo como archivo Excel
    var url = "https://docs.google.com/spreadsheets/d/" + ss.getId() + "/export?format=xlsx&gid=" + sheet.getSheetId();
    
    var options = {
      headers: {
        'Authorization': 'Bearer ' + ScriptApp.getOAuthToken()
      }
    };
    
    var response = UrlFetchApp.fetch(url, options);
    var excelBlob = response.getBlob().setName("Registros_" + new Date().toLocaleDateString('es-ES') + ".xlsx");
    
    // Convertir a base64 para enviar al cliente
    var excelData = Utilities.base64Encode(excelBlob.getBytes());
    
    return {
      success: true,
      fileName: excelBlob.getName(),
      mimeType: excelBlob.getContentType(),
      data: excelData
    };
  } catch (error) {
    Logger.log("Error en exportToExcel: " + error.toString());
    return {
      success: false,
      message: "Error al exportar a Excel: " + error.toString()
    };
  }
}

/**
 * Función para manejar la redirección del logout
 * Esta función se llama desde el cliente después de cerrar sesión
 */
function redirectAfterLogout() {
  return ScriptApp.getService().getUrl();
}

//-------------
