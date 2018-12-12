'use strict'

function interval(T) {
    return T*(Math.random()+0.5)
}

function setRandomizedInterval(callback, T, ...args) {
    return setRandomizedIntervalAsync( () => {
        callback(...args)
        return Promise.resolve()
    }, T)
}

function setRandomizedIntervalAsync(callback, T, ...args) {
    let ref = true
    let currTimer

    let fn = () => {
        callback(...args).then( () => {
            currTimer = setTimeout(fn, interval(T))
            if(!ref) {
                currTimer.unref()
            }    
        })
    }

    currTimer = setTimeout(fn, interval(T))

    return {
        clear: () => {
            clearTimeout(currTimer)
        },
        unref: () => {
            ref = false
            currTimer.unref()
        },
        ref: () => {
            ref = true
            currTimer.ref()
        }
    }

}

module.exports = { setRandomizedInterval, setRandomizedIntervalAsync}
