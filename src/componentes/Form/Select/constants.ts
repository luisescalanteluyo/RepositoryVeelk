const SELECT_CONST = {
    GENDERS: [
        { "k": "", "v": "Seleccione su género" },
        { "k": "GENDER.FEMALE", "v": "Mujer" },
        { "k": "GENDER.MALE", "v": "Hombre" }
    ],
    VEHICLES: {
        TYPES: [
            { "k": "", "v": "Seleccione el tipo" },
            { "k": "TYPES.VEHICLE.AUTOMOBILE", "v": "Automóvil" },
            { "k": "TYPES.VEHICLE.PICKUP", "v": "Camioneta" },
            { "k": "TYPES.VEHICLE.SUV", "v": "SUV" },
            { "k": "TYPES.VEHICLE.TRUCK", "v": "Camión" },
            { "k": "TYPES.VEHICLE.MOTORCYCLE", "v": "Motocicleta" },
            { "k": "TYPES.VEHICLE.NAUTIC", "v": "Náutico" },
            { "k": "TYPES.VEHICLE.MACHINERY", "v": "Maquinaria" },
            { "k": "TYPES.VEHICLE.OTHER", "v": "Otro" }
        ],
        GALLERY: [
            { "k": "", "v": "Seleccione el tipo de galería" },
            { "k": "public", "v": "Imágenes públicas" },
            { "k": "registry", "v": "Imágenes de registro" },
            { "k": "attachment", "v": "Documentos adjuntos" },
            
        ],
        FUEL: [
            { "k": "", "v": "Seleccione el tipo de gasolina" },
            { "k": "FUEL.UNLEADED", "v": "Gasolina sin plomo" },
            { "k": "FUEL.LEADED", "v": "Gasolina con plomo" },
            { "k": "FUEL.DIESEL", "v": "Diesel" },
            { "k": "FUEL.NATURAL_GAS", "v": "Gas Natural" },
            { "k": "FUEL.BIODIESEL", "v": "Biodiesel" },
            { "k": "FUEL.ELECTRIC", "v": "Eléctrico" },
            { "k": "FUEL.HYDROGEN", "v": "Hidrógeno" },
            { "k": "FUEL.PROPANE", "v": "Propano" },
            { "k": "FUEL.ETHANOL", "v": "Etanol" },
            { "k": "FUEL.HYBRID", "v": "Híbrido" }
        ],
        TRANSMISSION: [
            { "k": "", "v": "Seleccione el tipo de transmisión" },
            { "k": "GEARBOX.MANUAL", "v": "Manual" },
            { "k": "GEARBOX.AUTO", "v": "Automática" }
        ],
        CHASSIS_TYPE: [
            { "k": "", "v": "Seleccione el tipo de chasis" },
            { "k": "SEDAN", "v": "Sedan" },
            { "k": "COUPE", "v": "Coupe" },
            { "k": "CONVERTIBLE", "v": "Convertible" },
            { "k": "HATCKBACK", "v": "Hatchback" },
            { "k": "PICKUP", "v": "Pickup" },
            { "k": "VAN", "v": "Van" },
            { "k": "MINIVAN", "v": "Minivan" },
            { "k": "WAGON", "v": "Wagon" }
        ],
        CHARACTERISTICS: {
            COMFORT: [
                { "k": "CHARACTERISTICS.VEHICLE.COMFORT.AC", "v": "Aire Acondicionado" },
                { "k": "CHARACTERISTICS.VEHICLE.COMFORT.CRUISE_CONTROL", "v": "Control Crucero" },
                { "k": "CHARACTERISTICS.VEHICLE.COMFORT.CD_CHANGER", "v": "Caja para CD" },
                { "k": "CHARACTERISTICS.VEHICLE.COMFORT.AM_FM_RECEIVER", "v": "Radio AM/FM" },
                { "k": "CHARACTERISTICS.VEHICLE.COMFORT.POWER_WINDOW", "v": "Alzavidrios Eléctricos" },
                { "k": "CHARACTERISTICS.VEHICLE.COMFORT.ALL_WHEEL_DRIVE", "v": "Tracción Integral (4x4/4WD/AWD/IWD)" },
                { "k": "CHARACTERISTICS.VEHICLE.COMFORT.CD_RECEIVER", "v": "Radio con CD" },
                { "k": "CHARACTERISTICS.VEHICLE.COMFORT.ON_BOARD_COMPUTER", "v": "Computador a Bordo" },
                { "k": "CHARACTERISTICS.VEHICLE.COMFORT.MEMORY_SEATS", "v": "Asientos con Memoria" },
                { "k": "CHARACTERISTICS.VEHICLE.COMFORT.POWER_SEATS", "v": "Asientos Eléctricos" },
                { "k": "CHARACTERISTICS.VEHICLE.COMFORT.POWER_LOCKS", "v": "Cierre Centralizado" },
                { "k": "CHARACTERISTICS.VEHICLE.COMFORT.ADJUSTABLE_STEERING_WHEEL", "v": "Volante Ajustable" },
                { "k": "CHARACTERISTICS.VEHICLE.COMFORT.MP3_RECEIVER", "v": "Radio con MP3" },
                { "k": "CHARACTERISTICS.VEHICLE.COMFORT.HEATED_SEATS", "v": "Asientos Calefaccionados" },
                { "k": "CHARACTERISTICS.VEHICLE.COMFORT.LEATHER_SEATS", "v": "Asientos de Cuero" },
            ],
            EXTERIOR: [
                { "k": "CHARACTERISTICS.VEHICLE.EXTERIOR.POWER_MIRRORS", "v": "Espejos Eléctricos" },
                { "k": "CHARACTERISTICS.VEHICLE.EXTERIOR.REAR_FOG_LIGHTS", "v": "Neblineros Traseros" },
                { "k": "CHARACTERISTICS.VEHICLE.EXTERIOR.REAR_WINDOW_WIPERS", "v": "Limpiavidrio Trasero" },
                { "k": "CHARACTERISTICS.VEHICLE.EXTERIOR.ALLOY_AHEELS", "v": "Llantas de Aleación" },
                { "k": "CHARACTERISTICS.VEHICLE.EXTERIOR.FRONT_FOG_LIGHTS", "v": "Neblineros Delanteros" },
                { "k": "CHARACTERISTICS.VEHICLE.EXTERIOR.MANUAL_ROOF", "v": "Techo Manual" },
                { "k": "CHARACTERISTICS.VEHICLE.EXTERIOR.POWER_ROOF", "v": "Techo Eléctrico" },
                { "k": "CHARACTERISTICS.VEHICLE.EXTERIOR.TINTED_WINDOWS", "v": "Vidrios Polarizados" },
                { "k": "CHARACTERISTICS.VEHICLE.EXTERIOR.XENON_LIGHTS", "v": "Luces de Xenon" }
            ],
            SECURITY: [
                { "k": "CHARACTERISTICS.VEHICLE.SECURITY.ALARM", "v": "Alarma" },
                { "k": "CHARACTERISTICS.VEHICLE.SECURITY.LATERAL_AIRBAG", "v": "Airbags Laterales" },
                { "k": "CHARACTERISTICS.VEHICLE.SECURITY.REAR_DISC_BRAKES", "v": "Frenos de Disco Traseros" },
                { "k": "CHARACTERISTICS.VEHICLE.SECURITY.ESP", "v": "Control de Estabilización Electrónica..." },
                { "k": "CHARACTERISTICS.VEHICLE.SECURITY.RAIN_SENSOR", "v": "Sensor de Lluvia" },
                { "k": "CHARACTERISTICS.VEHICLE.SECURITY.DRIVER_AIRBAG", "v": "Airbag Conductor" },
                { "k": "CHARACTERISTICS.VEHICLE.SECURITY.COPILOT_AIRBAG", "v": "Airbag Copiloto" },
                { "k": "CHARACTERISTICS.VEHICLE.SECURITY.ABS", "v": "Frenos Anti-bloqueo (ABS)" },
                { "k": "CHARACTERISTICS.VEHICLE.SECURITY.EBD", "v": "Distribución de Frenado Electrónica..." },
                { "k": "CHARACTERISTICS.VEHICLE.SECURITY.TCS", "v": "Control de Tracción (TCS/ASR)" },
                { "k": "CHARACTERISTICS.VEHICLE.SECURITY.REAR_HEADREST", "v": "Apoya Cabeza Trasero" },
                { "k": "CHARACTERISTICS.VEHICLE.SECURITY.CHIP_KEY", "v": "Llave Electrónica (Chip/Inteligente)" },
                { "k": "CHARACTERISTICS.VEHICLE.SECURITY.LOCKING_WHEEL_NUT", "v": "Tuerca de Seguridad" }
            ]
        },
        STATE: [
            { "k": "", "v": "Seleccione el estado" },
            { "k": "STATE.VEHICLE.PURCHASED", "v": "Comprado" },
            { "k": "STATE.VEHICLE.PRESENT", "v": "Concesión en local" },
            { "k": "STATE.VEHICLE.VIRTUAL", "v": "Concesión virtual" }
        ],
        INSURANCE: [
            { "k": "", "v": "Seleccione el estado del seguro" },
            { "k": "STATUS.INSURANCE.PENDING", "v": "Pendiente" },
            { "k": "STATUS.INSURANCE.PAID", "v": "Pagado" },
        ],
        PERMIT: [
            { "k": "", "v": "Seleccione el estado del seguro" },
            { "k": "STATUS.PERMIT.PENDING", "v": "Pendiente" },
            { "k": "STATUS.PERMIT.PAID", "v": "Pagado" },
            { "k": "STATUS.PERMIT.DUE", "v": "Cuotas" },
        ],
        MAINTENANCE: [
            { "k": "", "v": "Seleccione el estado del mantenimiento" },
            { "k": "STATUS.MAINTENANCE.UP_TO_DATE", "v": "Al día" },
            { "k": "STATUS.MAINTENANCE.PENDING", "v": "Pendiente" },
        ]
    }
}

export default SELECT_CONST;