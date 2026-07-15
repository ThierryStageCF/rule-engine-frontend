/**
 * Type représentant de façon générique la réponse donnée par le backend à une requête.
 */
export type  ResponseEntity<T> = {
    data: T
    errors: ErrorResponse[]
}


export type ErrorResponse = {
    code: string,
    message: string,
}

export type GlobalError = {
    status?: number;
    title: string
    message: string
}