import jwt from 'jsonwebtoken';
import { SECRET } from '../config.js';

export const createToken = (payload: { userName: string }) => {
    // Suponiendo que quiero un objeto, que quiero guardar en el payload? Secreto no, acceso a ... sí.
    //  1. La info tiene que llegar de fuera (variable y externa, la info estará en un parámetro).
    if (typeof SECRET !== 'string') throw new Error();
    return jwt.sign(payload, SECRET as string); // Quiero crear un token. // 2. Parametro es un secreto (o clave privada no en nuestro caso). // Se pueden meter más opciones (tiempo de estar autenticado, etc.)
};

// Y si secret no tiene contenido (llega undefined)? Lanzar un error si no es un string.
// Me devuelve un string porque el token al final es un string codificado.

// Verificar si el taken es válido, codificamos el secreto y comparamos si coincide con lo que llega. Nunca podemos sacar la información que llega.
// Lee el token y me devuelve la información que hay dentro.
export const readToken = (taken: string) => {
    if (typeof SECRET !== 'string') throw new Error();
    const payload = jwt.verify(taken, SECRET as string);
    if (typeof payload === 'string') throw new Error('Token not valid');
    return payload;
};
