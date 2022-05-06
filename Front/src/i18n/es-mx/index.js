export default {
  user: {
    label: 'Usuario | Usuarios',
    name: 'Nombre',
    password: 'Contraseña',
    forgotPassword: '¿Olvidaste tu constraseña? Haz clic ',
    modal: {
      title: 'Borrar Usuario',
      description: `Estas a punto de eliminar al usuario “{user}” de la plataforma.`,
    },
  },
  gral: {
    pages: {
      logIn: 'Inicio de sesión',
      newPassword: 'Nueva contraseña',
    },
    new: 'Nuevo',
    delete: 'Borrar',
    save: 'Guardar',
    send: 'Enviar',
    cancel: 'Cancelar',
    accept: 'Aceptar',
    export: 'Exportar',
    here: 'aquí',
    goback: 'Regresar',
    restore: 'Recuperar',
    settings: 'Opciones',
    signOut: 'Cerrar sesión',
    areYouSure: `¿Estás seguro de continuar?`,
    table: {
      pagination: '{num1}-{num2} de {total}',
      noData: 'Sin información.',
    },
  },
  errors: {
    server: {
      forbidden: 'Acceso denegado',
      unauthorizedUser: 'Usuario no autorizado',
      notFound: 'URL de petición no encontrada',
      internalError: 'Error interno en el servidor',
      system: 'Error interno del sistema',
    },
    amplify: {
      disableUser: 'Usuario desactivado',
      invalidCredentials: 'Usuario y/o contraseña inválidos',
      passNotLongerValid: 'Contraseña no valida',
      registerIncomplete: 'Registro incompleto',
    },
    exportFile: {
      nodata: 'No hay información para exportar',
      nocolums: 'No existen columnas para exportar',
    },
    fieldRequired: ' es requerido.',
    pageNotFound: '¡Oops!, no hay nada por aquí...',
    email: 'Correo electrónico inválido',
    invalidRequest: 'Solicitud inválida',
    badRequest: 'Error en los datos de la solicitud',
  },
};
