const CONST = {
    LOGIN: {
        REGARDS: 'Bienvenido a Veekls App! 👋',
        EMAIL: 'Correo electrónico',
        PASSWORD: 'Contraseña',
        EMAIL_PLACEHOLDER: 'Ingresa tu correo electrónico',
        PASSWORD_PLACEHOLDER: '*************',
        FORGOT_PASS: 'Olvidé mi contraseña',
        EMPTY_FIELDS: '¡Debes completar los campos para continuar!',
        BAD_LOGIN: 'Los datos de acceso son incorrectos',
        LOGIN_BTN: 'Ingresar'
    },
    MENU: {
        DASHBOARD: 'Dashboard',
        MODULES: 'Módulos',
        VEHICLES: 'Vehículos',
        ADMIN: {
            TITLE: 'Administración',
            ORGANIZATIONS: 'Organizaciones',
            PROFILES: 'Miembros',
            USERS: 'Usuarios',
        }
    },
    NAVBAR: {
        HELLO: 'Hola',
        ORGANIZATION: 'Organización:',
        ONLINE: 'En línea',
        MY_PROFILE: 'Mi perfil',
        CONFIGURATION: 'Configuración',
        LOGOUT: 'Cerrar sesión'
    },
    _404: {
        PAGE_TITLE: 'Página no encontrada',
        PAGE_DESCRIPTION: '¡Ups! 😖 La URL solicitada no se encontró en este servidor.',
        PAGE_BACK: 'Volver al inicio'
    },
    LOADING: {
        TEXT: 'Cargando...'
    },
    EMPTY: {
        DASHBOARD: {
            TITLE: 'No tienes organizaciones asociadas',
            MSG: 'Para continuar, debes comunicarte con el administrador'
        },
        VEHICLES: {
            TITLE: 'Ups!!!',
            MSG: 'No se encontraron vehículos'
        }
    },
    VEHICLES: {
        TABS: [
            { key: 'Vpublished1', title: 'Publicados', event: 'published' },
            { key: 'Vunpublished1', title: 'Pendientes', event: 'unpublished' },
            { key: 'Vreserved1', title: 'Reservados', event: 'reserved' },
            { key: 'Vsold1', title: 'Vendidos', event: 'sold' },
            { key: 'Varchived1', title: 'Archivados', event: 'archived' }
        ],
        FILTER: {
            BUTTON: 'Filtros de búsqueda',
            SEARCH: 'Buscar'
        }
    }
}
export default CONST;