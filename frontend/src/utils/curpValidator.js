// Lista completa de códigos de estado válidos
const ESTADOS = {
    'AS': 'AGUASCALIENTES',
    'BC': 'BAJA CALIFORNIA',
    'BS': 'BAJA CALIFORNIA SUR',
    'CC': 'CAMPECHE',
    'CS': 'CHIAPAS',
    'CH': 'CHIHUAHUA',
    'CL': 'COAHUILA',
    'CM': 'COLIMA',
    'DF': 'CIUDAD DE MÉXICO',
    'DG': 'DURANGO',
    'GT': 'GUANAJUATO',
    'GR': 'GUERRERO',
    'HG': 'HIDALGO',
    'JC': 'JALISCO',
    'MC': 'ESTADO DE MÉXICO',
    'MN': 'MICHOACÁN',
    'MS': 'MORELOS',
    'NT': 'NAYARIT',
    'NL': 'NUEVO LEÓN',
    'OC': 'OAXACA',
    'PL': 'PUEBLA',
    'QT': 'QUERÉTARO',
    'QR': 'QUINTANA ROO',
    'SP': 'SAN LUIS POTOSÍ',
    'SL': 'SINALOA',
    'SR': 'SONORA',
    'TC': 'TABASCO',
    'TS': 'TAMAULIPAS',
    'TL': 'TLAXCALA',
    'VZ': 'VERACRUZ',
    'YN': 'YUCATÁN',
    'ZS': 'ZACATECAS',
    'NE': 'NACIDO EN EL EXTRANJERO'
  };
  
  
  export const validateCURP = (curp) => {
    // Validación básica de longitud
    if (!curp || typeof curp !== 'string' || curp.length !== 18) {
      return { isValid: false, error: 'La CURP debe tener 18 caracteres' };
    }
  
    // Convertir a mayúsculas
    curp = curp.toUpperCase();
  
    // Estructura básica: 4 letras + 6 números + 1 letra (H/M) + 2 letras (estado) + 3 letras + 1 letra/dígito + 1 dígito
    const regex = /^[A-Z]{4}\d{6}[HM][A-Z]{2}[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z][0-9]$/;
    if (!regex.test(curp)) {
      return { isValid: false, error: 'Formato de CURP no válido' };
    }
  
    // Validar estado
    const estadoCode = curp.substr(11, 2);
    if (!ESTADOS[estadoCode]) {
      return { isValid: false, error: 'Código de estado no válido' };
    }
  
  
    // Validar fecha de nacimiento
    const year = parseInt(curp.substr(4, 2));
    const month = parseInt(curp.substr(6, 2));
    const day = parseInt(curp.substr(8, 2));
    
    const currentYear = new Date().getFullYear() % 100;
    const fullYear = year <= currentYear ? 2000 + year : 1900 + year;
    
    if (month < 1 || month > 12) {
      return { isValid: false, error: 'Mes de nacimiento no válido' };
    }
    
    if (day < 1 || day > 31) {
      return { isValid: false, error: 'Día de nacimiento no válido' };
    }
  
    // Validación adicional para meses con menos de 31 días
    if ((month === 4 || month === 6 || month === 9 || month === 11) && day > 30) {
      return { isValid: false, error: 'Día no válido para este mes' };
    }
  
    // Validación para febrero (considerando años bisiestos)
    if (month === 2) {
      const isLeapYear = (fullYear % 4 === 0 && fullYear % 100 !== 0) || fullYear % 400 === 0;
      if (day > (isLeapYear ? 29 : 28)) {
        return { isValid: false, error: 'Día no válido para febrero' };
      }
    }
  
    return { isValid: true };
  };
  
  // Función para extraer información de la CURP
  export const parseCURP = (curp) => {
    const validation = validateCURP(curp);
    if (!validation.isValid) {
      throw new Error(validation.error || 'CURP no válida');
    }
  
    const year = parseInt(curp.substr(4, 2));
    const month = parseInt(curp.substr(6, 2)) - 1; // Los meses en Date son 0-indexed
    const day = parseInt(curp.substr(8, 2));
    const currentYear = new Date().getFullYear() % 100;
    const fullYear = year <= currentYear ? 2000 + year : 1900 + year;
  
    return {
      apellidoPaternoInicial: curp[0],
      apellidoPaternoVocal: curp[1],
      apellidoMaternoInicial: curp[2],
      nombreInicial: curp[3],
      fechaNacimiento: new Date(fullYear, month, day),
      sexo: curp[10] === 'H' ? 'HOMBRE' : 'MUJER',
      estado: ESTADOS[curp.substr(11, 2)],
      consonantes: {
        apellidoPaterno: curp[13],
        apellidoMaterno: curp[14],
        nombre: curp[15]
      },
      homoclave: curp.substr(16, 2)
    };
  };