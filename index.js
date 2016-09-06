'use strict'

function interval(T) {
    return T*(Math.random()+0.5)
}

function setRandomizedInterval(callback, T, ...args) {
    let ref = true
    let currTimer

    let fn = () => {
        callback(...args)
        currTimer = setTimeout(fn, interval(T))
        if(!ref) {
            currTimer.unref()
        }
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

if(!module.parent) {
    let prev = Date.now()

    setRandomizedInterval(() => {
        let now = Date.now()
        console.log(now-prev) // eslint-disable-line
        prev = now
    }, 1000)

}

module.exports = setRandomizedInterval
