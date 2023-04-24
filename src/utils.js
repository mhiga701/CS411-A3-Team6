//higher order function to catch errors

export const errCatch = fn => {
    return function(...args) {
        return fn(...args).catch((err) => {
            console.error(err);
        })
    }
}