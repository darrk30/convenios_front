export function transformFormData(obj: any): any {
    Object.keys(obj).forEach((key) => {
        if (obj[key] && typeof obj[key] === 'object' && !(obj[key] instanceof File) && !(obj[key] instanceof Blob)) {
            // Aplica la transformación recursivamente para objetos o arrays
            this.transformFormData(obj[key]);
        } else if (obj[key] === null) {
            delete obj[key]; // Elimina las propiedades con valor null
        } else if (obj[key] === true) {
            obj[key] = 1; // Convierte true a 1
        } else if (obj[key] === false) {
            obj[key] = 0; // Convierte false a 0
        }
    });
    return obj;
}


export function appendFormData(formData: FormData, data: any, parentKey: string | null = null): void {
    Object.keys(data).forEach((key) => {
        const value = data[key];
        const formKey = parentKey ? `${parentKey}[${key}]` : key;
    
        if (value === null || value === undefined || value === '') {
            // No agregar valores nulos, indefinidos o vacíos
            return;
        }
    
        if (value instanceof File || value instanceof Blob) {
            // Manejar archivos
            formData.append(formKey, value);
        } else if (typeof value === 'object' && !(value instanceof Date)) {
            // Llamada recursiva para objetos anidados
            appendFormData(formData, value, formKey);
        } else {
            // Agregar otros valores
            formData.append(formKey, String(value));
        }
    });
}