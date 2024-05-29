/**
 * Funcion encargada de obtener una entrada del locastorage
 * @param {*} key Llave para identificar al elemento
 * @returns Valor recuperado, se regresa como JSON
 */
export function getItem (key) {
    return JSON.parse( window.localStorage.getItem(key) );
}

/**
 * Funcion encargada de agregar una entrada al localstorage
 * @param {*} key Llave para identificar al elemento
 * @param {*} value Valor a salvar en localstorage
 */
export function setItem(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Funcion encargada de remover una entrada al localstorage
 * @param {*} key Llave para identificar al elemento a ELIMINAR
 */
export function deleteItem (key) {
    return window.localStorage.removeItem(key) ;
}

/**
 * Funcion encargada de eliminar todas las entradas del localstorage
 */
export function deleteAll () {
    return window.localStorage.removeAll() ;
}