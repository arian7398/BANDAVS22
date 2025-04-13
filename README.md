CODIGO ANTERIOR HTML DISEÑO Y LA ESTRUCTURA



<html>
<head>
  <base target="_top">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>Sistema de Registro de Casos de Extorsión</title>
  
  <!-- Bootstrap CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <!-- Font Awesome para iconos -->
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
  
  <style>
    :root {
      --primary-color: #2c3e50;
      --secondary-color: #3498db;
      --light-color: #ecf0f1;
      --dark-color: #34495e;
      --success-color: #27ae60;
      --warning-color: #f39c12;
      --danger-color: #e74c3c;
    }
    
    body {
      background-color: #f5f7fa;
      font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
      color: var(--dark-color);
    }
    
    .app-container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .section-card {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.08);
      padding: 20px;
      margin-bottom: 25px;
      transition: all 0.3s ease;
    }
    
    .section-card:hover {
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
    
    .section-title {
      color: var(--primary-color);
      border-bottom: 2px solid var(--secondary-color);
      padding-bottom: 10px;
      margin-bottom: 20px;
      font-weight: 600;
      display: flex;
      align-items: center;
    }
    
    .section-title i {
      margin-right: 10px;
      color: var(--secondary-color);
    }
    
    .form-label {
      font-weight: 500;
      color: var(--dark-color);
    }
    
    .nav-tabs {
      border-bottom: 2px solid var(--secondary-color);
      margin-bottom: 25px;
    }
    
    .nav-tabs .nav-link {
      border: none;
      color: var(--dark-color);
      font-weight: 500;
      padding: 12px 20px;
      border-radius: 8px 8px 0 0;
      margin-right: 5px;
      transition: all 0.2s ease;
    }
    
    .nav-tabs .nav-link:hover {
      background-color: rgba(52, 152, 219, 0.1);
    }
    
    .nav-tabs .nav-link.active {
      color: white;
      background-color: var(--secondary-color);
      font-weight: 600;
    }
    
    .btn-primary {
      background-color: var(--secondary-color);
      border-color: var(--secondary-color);
      padding: 8px 20px;
      font-weight: 500;
    }
    
    .btn-primary:hover {
      background-color: #2980b9;
      border-color: #2980b9;
    }
    
    .btn-icon {
      background: none;
      border: none;
      color: var(--secondary-color);
      font-size: 1.1rem;
      cursor: pointer;
      transition: transform 0.2s ease;
    }
    
    .btn-icon:hover {
      transform: scale(1.2);
    }
    
    .btn-edit {
      color: var(--secondary-color);
    }
    
    .btn-delete {
      color: var(--danger-color);
    }
    
    .btn-view {
      color: var(--success-color);
    }
    
    .item-list {
      list-style: none;
      padding: 0;
    }
    
    .item-row {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      border: 1px solid #e1e5e8;
      border-radius: 6px;
      padding: 10px;
      background-color: #f8f9fa;
    }
    
    .dynamic-item {
      position: relative;
      margin-bottom: 15px;
      padding: 15px;
      border: 1px solid #e1e5e8;
      border-radius: 6px;
      background-color: #f8f9fa;
    }
    
    .badge-custom {
      padding: 6px 10px;
      font-weight: 500;
      border-radius: 30px;
    }
    
    .spinner-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      visibility: hidden;
      opacity: 0;
      transition: all 0.3s;
    }
    
    .spinner-overlay.show {
      visibility: visible;
      opacity: 1;
    }
    
    /* Mejora de la responsividad */
    @media (max-width: 768px) {
      .section-card {
        padding: 15px;
      }
      
      .nav-tabs .nav-link {
        padding: 8px 15px;
      }
      
      .form-label {
        font-size: 0.95rem;
      }
      
      .section-title {
        font-size: 1.3rem;
      }
    }
    
    @media (max-width: 576px) {
      .nav-tabs .nav-link {
        padding: 8px 10px;
        font-size: 0.9rem;
      }
      
      .section-title {
        font-size: 1.2rem;
      }
      
      .item-row {
        flex-direction: column;
        align-items: flex-start;
      }
      
      .btn-icon {
        font-size: 1rem;
      }
    }
  </style>
</head>

<body>
  <!-- Spinner para carga -->
  <div class="spinner-overlay" id="loadingSpinner">
    <div class="spinner-border text-light" role="status" style="width: 3rem; height: 3rem;">
      <span class="visually-hidden">Cargando...</span>
    </div>
  </div>

  <div class="app-container py-4">
    <header class="text-center mb-4">
      <h1 class="display-5 fw-bold">Sistema de Registro de Bandas Criminales</h1>
      <p class="text-muted">Ministerio Público - Fiscalía Especializadas contra la Criminalidad Organizada</p>
    </header>

    <!-- Agregar esto en la parte superior de tu archivo Index.html, justo después del header -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div>
        <span class="text-muted me-2" id="usuario-actual"></span>
        <button type="button" class="btn btn-outline-danger" id="btn-cerrar-sesion">
          <i class="fas fa-sign-out-alt me-1"></i>Cerrar Sesión
        </button>
      </div>
    </div>

    
    <!-- Pestañas principales -->
    <ul class="nav nav-tabs" id="mainTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button class="nav-link active" id="form-tab" data-bs-toggle="tab" data-bs-target="#form-panel" type="button" role="tab" aria-controls="form-panel" aria-selected="true">
          <i class="fas fa-file-alt me-2"></i>Formulario
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" id="records-tab" data-bs-toggle="tab" data-bs-target="#records-panel" type="button" role="tab" aria-controls="records-panel" aria-selected="false">
          <i class="fas fa-table me-2"></i>Registros
        </button>
      </li>
    </ul>
    
    <div class="tab-content" id="mainTabContent">
      <!-- Panel de Formulario -->
      <div class="tab-pane fade show active" id="form-panel" role="tabpanel" aria-labelledby="form-tab">
        <form id="casoForm">
          <input type="hidden" id="id" name="id">
          <input type="hidden" id="modoEdicion" name="modoEdicion" value="false">
          
          <!-- 1. Información General -->
          <div class="section-card">
            <h3 class="section-title"><i class="fas fa-info-circle"></i>1. Información General</h3>
            <div class="row g-3">
              <div class="col-md-6">
                <label for="fiscalia" class="form-label">Fiscalía</label>
                <input type="text" class="form-control" id="fiscalia" name="fiscalia" required>
              </div>
              <div class="col-md-6">
                <label for="fiscalacargo" class="form-label">Fiscal a Cargo</label>
                <input type="text" class="form-control" id="fiscalacargo" name="fiscalacargo" required>
              </div>
              <div class="col-md-6">
                <label for="unidadInteligencia" class="form-label">Unidad a Cargo de Acciones de Inteligencia</label>
                <input type="text" class="form-control" id="unidadInteligencia" name="unidadInteligencia">
              </div>
              <div class="col-md-6">
                <label for="instructorCargo" class="form-label">Instructor a Cargo</label>
                <input type="text" class="form-control" id="instructorCargo" name="instructorCargo">
              </div>
            </div>
          </div>
          
          <!-- 2. Detalles del Caso -->
          <div class="section-card">
            <h3 class="section-title"><i class="fas fa-folder-open"></i>2. Detalles del Caso</h3>
            <div class="row g-3">
              <!-- Forma de Inicio de Investigación con nueva lista -->
              <div class="col-md-6">
                <label for="formaInicio" class="form-label">Forma de Inicio de Investigación</label>
                <div class="input-group">
                  <select class="form-select" id="formaInicio" name="formaInicio" required>
                    <option value="">Seleccionar...</option>
                    <option value="Denuncia de Parte">Denuncia de Parte</option>
                    <option value="Información de Fuente Humana">Información de Fuente Humana</option>
                    <option value="Informante">Informante</option>
                    <option value="Testigo Protegido">Testigo Protegido</option>
                    <option value="Búsqueda de Fuente Abierta">Búsqueda de Fuente Abierta</option>
                    <option value="Colaborador Eficaz">Colaborador Eficaz</option>
                    <option value="Otros">Otros</option>
                  </select>
                  <button class="btn btn-outline-secondary" type="button" onclick="mostrarModalOtros('formaInicio')" id="btnOtrosFormaInicio" style="display: none;">
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
                <div id="otrosFormaInicioContainer" style="display: none;" class="mt-2">
                  <input type="text" class="form-control" id="otrosFormaInicio" placeholder="Especifique otra forma de inicio">
                </div>
              </div>

              <div class="col-md-6">
                <label for="carpetaFiscal" class="form-label">Carpeta Fiscal</label>
                <input type="text" class="form-control" id="carpetaFiscal" name="carpetaFiscal" required>
              </div>
              <div class="col-md-6">
                <label for="fechaHecho" class="form-label">Fecha del Hecho</label>
                <input type="date" class="form-control" id="fechaHecho" name="fechaHecho">
              </div>
              <div class="col-md-6">
                <label for="fechaIngresoFiscal" class="form-label">Fecha Ingreso Carpeta Fiscal</label>
                <input type="date" class="form-control" id="fechaIngresoFiscal" name="fechaIngresoFiscal">
              </div>

            </div>
          </div>
          
          <!-- 3. Información del Agraviado -->
          <div class="section-card">
            <h3 class="section-title"><i class="fas fa-user-shield"></i>3. Información del Agraviado</h3>
            <div class="row g-3">
              <div class="col-md-6">
                <label for="tipoAgraviado" class="form-label">Tipo de Agraviado</label>
                <select class="form-select" id="tipoAgraviado" name="tipoAgraviado" required>
                  <option value="">Seleccionar...</option>
                  <option value="Natural">Natural</option>
                  <option value="Jurídica">Jurídica</option>
                </select>
              </div>
              <div class="col-md-6">
                <label class="form-label">Agraviados</label>
                <div id="agraviados-container">
                  <!-- Aquí se agregarán dinámicamente los agraviados -->
                </div>
                <input type="hidden" id="agraviadosJson" name="agraviadosJson">
                <button type="button" class="btn btn-sm btn-outline-primary mt-2" id="btnAgregarAgraviado">
                  <i class="fas fa-plus me-2"></i>Agregar Agraviado
                </button>
              </div>
            </div>
            
            <!-- Nuevas secciones de Función y Tipo de Empresa -->
            <div class="row g-3 mt-3">
              <div class="col-md-6">
                <label class="form-label">Función que Ejerce</label>
                <select class="form-select" id="funcionAgraviado" name="funcionAgraviado">
                  <option value="">Seleccionar...</option>
                  <option value="Pública">Función Pública</option>
                  <option value="Privada">Función Privada</option>
                </select>
              </div>
              <!-- Tipo de Empresa con posibilidad de agregar múltiples -->
              <div class="col-md-6">
                <label class="form-label">Tipo de Empresa</label>
                <div id="empresas-container">
                  <!-- Aquí se agregarán dinámicamente las empresas -->
                  <div class="input-group mb-2">
                    <select class="form-select empresa-tipo">
                      <option value="">Seleccionar...</option>
                      <option value="Pública">Empresa Pública</option>
                      <option value="Privada">Empresa Privada</option>
                    </select>
                    <input type="text" class="form-control empresa-nombre" placeholder="Nombre de la empresa">
                    <button class="btn btn-outline-secondary" type="button" onclick="agregarEmpresa()">
                      <i class="fas fa-plus"></i>
                    </button>
                  </div>
                </div>
                <div id="lista-empresas">
                  <!-- Aquí se mostrarán las empresas agregadas -->
                </div>
                <input type="hidden" id="empresasJson" name="empresasJson" value="[]">
              </div>
            </div>
          </div>

          <!-- Modal para Nombre de Empresa -->
          <div class="modal fade" id="empresaModal" tabindex="-1">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Nombre de la Empresa</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                  <input type="text" id="nombreEmpresa" class="form-control" placeholder="Ingrese el nombre de la empresa">
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                  <button type="button" class="btn btn-primary" id="guardarNombreEmpresa">Guardar</button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 4. Información del Denunciado -->
          <div class="section-card">
            <h3 class="section-title"><i class="fas fa-user-times"></i>4. Información del Denunciado</h3>
            <div class="row g-3">
              <div class="col-md-6">
                <label for="delitos" class="form-label">Delitos</label>
                <input type="text" class="form-control" id="delitos" name="delitos" required>
              </div>
              <div class="col-md-6">
                <label for="lugarHechos" class="form-label">Lugar de los Hechos</label>
                <input type="text" class="form-control" id="lugarHechos" name="lugarHechos" required>
              </div>
              <div class="col-12 mt-3">
                <label class="form-label">Denunciado o Alias</label>
                <div id="denunciados-container">
                  <!-- Aquí se agregarán dinámicamente los denunciados -->
                </div>
                <input type="hidden" id="denunciadosJson" name="denunciadosJson">
                <button type="button" class="btn btn-sm btn-outline-primary mt-2" id="btnAgregarDenunciado">
                  <i class="fas fa-plus me-2"></i>Agregar Denunciado
                </button>
              </div>

              <!-- Datos de Interés del Denunciado con lista------------------------------------------------------ -->
              <div class="col-md-6">
                <label for="datosInteresDenunciado" class="form-label">Datos de Interés del Denunciado</label>
                <div class="mb-2">
                  <div class="form-check form-check-inline">
                    <input class="form-check-input datos-interes-check" type="checkbox" value="Tatuajes" id="datoInteres-tatuajes">
                    <label class="form-check-label" for="datoInteres-tatuajes">Tatuajes</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input datos-interes-check" type="checkbox" value="Cicatrices" id="datoInteres-cicatrices">
                    <label class="form-check-label" for="datoInteres-cicatrices">Cicatrices</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" value="Otros" id="datoInteres-otros">
                    <label class="form-check-label" for="datoInteres-otros">Otros</label>
                  </div>
                </div>
                <div id="otrosDatosInteresContainer" style="display: none;">
                  <div class="input-group mb-2">
                    <input type="text" class="form-control" id="otrosDatosInteres" placeholder="Especificar otros datos de interés">
                    <button class="btn btn-outline-secondary" type="button" id="btnAgregarOtroDatoInteres">
                      <i class="fas fa-plus"></i>
                    </button>
                  </div>
                  <div id="otros-datos-interes-lista" class="mt-2">
                    <!-- Aquí se mostrarán los datos de interés personalizados -->
                  </div>
                </div>
                <input type="hidden" id="datosInteresDenunciadoJson" name="datosInteresDenunciadoJson" value="[]">
              </div>

              <!-- Nombre/Apodo de Banda Criminal con botón agregar -->
              <div class="col-md-6">
                <label for="nombreBandaCriminal" class="form-label">Nombre/Apodo de Banda Criminal</label>
                <div id="bandas-container">
                  <!-- Aquí se agregarán dinámicamente las bandas -->
                  <div class="input-group mb-2">
                    <input type="text" class="form-control banda-input" placeholder="Nombre o apodo de la banda">
                    <button class="btn btn-outline-secondary" type="button" onclick="agregarBanda()">
                      <i class="fas fa-plus"></i>
                    </button>
                  </div>
                  
                </div>
                <input type="hidden" id="bandasCriminalesJson" name="bandasCriminalesJson">
              </div>

              <!-- Cantidad de Miembros con nombre modificado -->
              <div class="col-md-6">
                <label for="cantidadMiembrosBanda" class="form-label">Cantidad de miembros de la banda/organización criminal</label>
                <input type="number" class="form-control" id="cantidadMiembrosBanda" name="cantidadMiembrosBanda" min="0" placeholder="Ingrese la cantidad">
              </div>
              <!-- -------------------------------------------------------------------------- -->

              <div class="col-md-6">
                <label for="modalidadViolencia" class="form-label" >Modalidad de Violencia</label>
                <textarea class="form-control" id="modalidadViolencia" name="modalidadViolencia" rows="2" placeholder="Detallar"></textarea>
              </div>
              <div class="col-md-6">
                <label for="modalidadAmenaza" class="form-label">Modalidad de Amenaza</label>
                <textarea class="form-control" id="modalidadAmenaza" name="modalidadAmenaza" rows="2" placeholder="Detallar"></textarea>
              </div>
              <div class="col-md-6">
                <label for="atentadosCometidos" class="form-label">Atentados Cometidos</label>
                <textarea class="form-control" id="atentadosCometidos" name="atentadosCometidos" rows="2" placeholder="Detallar"></textarea>
              </div>
            </div>
          </div>
          
          <!-- 5. Instrumentos Utilizados para la Extorsión -->
          <div class="section-card">
            <h3 class="section-title"><i class="fas fa-tools"></i>5. Instrumentos y Métodos de Extorsión</h3>
            <div class="row g-3">
              <!-- Instrumentos Utilizados para la Extorsión con nueva lista -->
              <div class="col-md-6">
                <label class="form-label">Instrumentos Utilizados para la Extorsión</label>
                <div id="instrumentos-container">
                  <div class="form-check">
                    <input class="form-check-input instrumento-check" type="checkbox" value="Motos" id="instrumento-motos">
                    <label class="form-check-label" for="instrumento-motos">Motos</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input instrumento-check" type="checkbox" value="Carros" id="instrumento-carros">
                    <label class="form-check-label" for="instrumento-carros">Carros</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="Otro" id="instrumento-otro">
                    <label class="form-check-label" for="instrumento-otro">Otro</label>
                  </div>
                  <div id="instrumento-otro-container" style="display: none;" class="mt-2">
                    <div class="input-group mb-2">
                      <input type="text" class="form-control" id="instrumento-otro-texto" placeholder="Especificar otro instrumento">
                      <button class="btn btn-outline-secondary" type="button" id="btnAgregarInstrumentoOtro">
                        <i class="fas fa-plus"></i>
                      </button>
                    </div>
                    <div id="otros-instrumentos-lista" class="mt-2">
                      <!-- Aquí se mostrarán los instrumentos personalizados -->
                    </div>
                  </div>
                </div>
                <input type="hidden" id="instrumentosJson" name="instrumentosJson" value="[]">
              </div>

              <!-- Forma que se Obliga el Pago con nueva lista -->
              <div class="col-md-6">
                <label for="formaPago" class="form-label">Forma que se Obliga el Pago</label>
                <select class="form-select" id="formaPago" name="formaPago">
                  <option value="">Seleccionar...</option>
                  <option value="Yape">Yape</option>
                  <option value="Plin">Plin</option>
                  <option value="Transferencias">Transferencias</option>
                  <option value="Efectivo">Efectivo</option>
                  <option value="Otro">Otro</option>
                </select>
                <div id="otraFormaPagoContainer" style="display: none;" class="mt-2">
                  <input type="text" class="form-control" id="otraFormaPago" placeholder="Especificar otra forma de pago">
                </div>
              </div>


              <!-- -------------------------------------------------------------------------- -->
              <div class="col-md-6">
                <label class="form-label">Números Telefónicos Utilizados para Extorsión</label>
                <div id="numeros-container">
                  <!-- Aquí se agregarán dinámicamente los números -->
                </div>
                <input type="hidden" id="numerosTelefonicosJson" name="numerosTelefonicosJson">
                <button type="button" class="btn btn-sm btn-outline-primary mt-2" id="btnAgregarNumero">
                  <i class="fas fa-plus me-2"></i>Agregar Número
                </button>
              </div>

              <div class="col-md-6">
                <label class="form-label">IMEI de los Números Telefónicos</label>
                <div id="imeis-container">
                  <!-- Aquí se agregarán dinámicamente los IMEIs -->
                </div>
                <input type="hidden" id="imeisTelefonicosJson" name="imeisTelefonicosJson">
                <button type="button" class="btn btn-sm btn-outline-primary mt-2" id="btnAgregarImei">
                  <i class="fas fa-plus me-2"></i>Agregar IMEI
                </button>
              </div>
              <!-- Número para método de Pago con botón agregar más -->
              <div class="col-md-6">
                <label class="form-label">Número Telefónico o Cuenta Corriente para método de Pago</label>
                <div id="cuentas-pago-container">
                  <!-- Aquí se agregarán dinámicamente las cuentas -->
                </div>
              <input type="hidden" id="cuentasPagoJson" name="cuentasPagoJson">
              <button type="button" class="btn btn-sm btn-outline-primary mt-2" id="btnAgregarCuenta">
                <i class="fas fa-plus me-2"></i>Agregar Cuenta
              </button>
              </div>

              <div class="col-md-6">
                <label class="form-label">Nombres de Titulares de Pago</label>
                <div id="titulares-container">
                  <!-- Aquí se agregarán dinámicamente los titulares -->
                </div>
                <input type="hidden" id="titularesPagoJson" name="titularesPagoJson">
                <button type="button" class="btn btn-sm btn-outline-primary mt-2" id="btnAgregarTitular">
                  <i class="fas fa-plus me-2"></i>Agregar Titular
                </button>
              </div>
            </div>
          </div>
          
          <!-- 6. Datos de Interés de Pagos -->
          <div class="section-card">
            <h3 class="section-title"><i class="fas fa-money-bill-wave"></i>6. Datos de Interés de Pagos</h3>
            <div class="row g-3">
              <div class="col-md-6">
                <label for="tipoPago" class="form-label">Tipo de Pago</label>
                <select class="form-select" id="tipoPago" name="tipoPago">
                  <option value="">Seleccionar...</option>
                  <option value="Mensual">Mensual</option>
                  <option value="Quincenal">Quincenal</option>
                  <option value="Semanal">Semanal</option>
                  <option value="Único">Único</option>
                  <option value="Otro">Otro</option>
                </select>
                <div id="tipoPagoOtroContainer" style="display: none;" class="mt-2">
                  <div class="input-group">
                    <input type="text" class="form-control" id="tipoPagoOtros" name="tipoPagoOtros" placeholder="Especifique otro tipo">
                    <button class="btn btn-outline-secondary" type="button" id="btnGuardarTipoPagoOtro">
                      <i class="fas fa-check"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <label for="montoSolicitado" class="form-label">Monto Solicitado</label>
                <div class="input-group">
                  <span class="input-group-text">S/</span>
                  <input type="number" class="form-control" id="montoSolicitado" name="montoSolicitado" step="0.01" min="0">
                </div>
              </div>
              <div class="col-md-6">
                <label for="montoPagado" class="form-label">Monto Pagado</label>
                <div class="input-group">
                  <span class="input-group-text">S/</span>
                  <input type="number" class="form-control" id="montoPagado" name="montoPagado" step="0.01" min="0">
                </div>
              </div>
              <div class="col-md-6">
                <label for="numeroPagos" class="form-label">Número de Veces que se Efectuó el Pago</label>
                <input type="number" class="form-control" id="numeroPagos" name="numeroPagos" min="0">
              </div>
            </div>
          </div>

          <!-- 7. Sumilla de Hechos -->
          <div class="section-card">
            <h3 class="section-title"><i class="fas fa-align-left"></i>7. Sumilla de los Hechos</h3>
            <div class="row">
              <div class="col-12">
                <textarea class="form-control" id="sumillaHechos" name="sumillaHechos" rows="5" maxlength="500" onkeyup="contarCaracteres(this, 'contadorSumilla')" required></textarea>
                <small class="text-muted d-flex justify-content-end mt-1"><span id="contadorSumilla">0</span>/500 caracteres</small>
              </div>
            </div>
          </div>

          <!-- 8. Observaciones -->
          <div class="section-card">
            <h3 class="section-title"><i class="fas fa-clipboard"></i>8. Observaciones</h3>
            <div class="row">
              <div class="col-12">
                <textarea class="form-control" id="observaciones" name="observaciones" rows="3" maxlength="500" onkeyup="contarCaracteres(this, 'contadorObservaciones')"></textarea>
                <small class="text-muted d-flex justify-content-end mt-1"><span id="contadorObservaciones">0</span>/500 caracteres</small>
              </div>
            </div>
          </div>
          
          <!-- Botones del formulario -->
          <div class="d-flex justify-content-between mt-4 mb-5">
            <button type="button" class="btn btn-secondary" id="btnLimpiar">
              <i class="fas fa-eraser me-2"></i>Limpiar Formulario
            </button>
            <button type="submit" class="btn btn-primary" id="btnGuardar">
              <i class="fas fa-save me-2"></i>Guardar Registro
            </button>
          </div>
        </form>
      </div>
      
      <!-- Panel de Registros -->
      <div class="tab-pane fade" id="records-panel" role="tabpanel" aria-labelledby="records-tab">
        <div class="section-card">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h3 class="section-title mb-0"><i class="fas fa-table"></i>Registros de Casos</h3>
            <div class="input-group" style="max-width: 300px;">
              <input type="text" class="form-control" id="buscarRegistro" placeholder="Buscar...">
              <button class="btn btn-outline-secondary" type="button" id="btnBuscar">
                <i class="fas fa-search"></i>
              </button>
            </div>
            <!-- Cambiar el botón existente -->
            <button class="btn btn-primary ms-2" type="button" id="btnExportarPDF">
              <i class="fas fa-file-pdf me-2"></i>Exportar PDF
            </button>
            <!-- Botón para exportar a Excel -->
            <button id="btnExportarExcel" class="btn btn-success" 
              onclick="google.script.run
                      .withSuccessHandler(onExcelSuccess)
                      .withFailureHandler(onExcelError)
                      .handleExportarExcel()">
              <i class="fas fa-file-excel"></i> Exportar a Excel
            </button>
          </div>
          
          <div class="table-responsive">
            <table class="table table-striped table-hover">
              <thead class="table-light">
                <tr>
                  <th>Carpeta Fiscal</th>
                  <th>Fiscal a Cargo</th>
                  <th>Fecha de Ingreso</th>
                  <th>Agraviado</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody id="registros-body">
                <!-- Aquí se cargarán los registros dinámicamente -->
              </tbody>
            </table>
          </div>
          
          <div id="no-registros-message" class="alert alert-info text-center" style="display: none;">
            <i class="fas fa-info-circle me-2"></i>No hay registros disponibles.
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Modal para Ver Detalles -->
  <div class="modal fade" id="detalleModal" tabindex="-1" aria-labelledby="detalleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header bg-light">
          <h5 class="modal-title" id="detalleModalLabel">Detalles del Caso</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" id="detalleModalBody">
          <!-- Contenido dinámico -->
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          <button type="button" class="btn btn-primary" id="btnEditarDesdeDetalle">Editar</button>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Modal de confirmación de eliminación -->
  <div class="modal fade" id="eliminarModal" tabindex="-1" aria-labelledby="eliminarModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title" id="eliminarModalLabel">Confirmar Eliminación</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>¿Está seguro que desea eliminar este registro? Esta acción no se puede deshacer.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-danger" id="btnConfirmarEliminar">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
  
