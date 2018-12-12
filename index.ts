function interval(T: number) {
    return T * (Math.random() + 0.5)
}

export function setRandomizedInterval(
    callback: (...args: any[]) => void,
    ms: number,
    ...args: any[]
) {
    return setRandomizedIntervalAsync(() => {
        callback(...args)
        return Promise.resolve()
    }, ms)
}

export function setRandomizedIntervalAsync(
    callback: (...args: any[]) => Promise<void>,
    ms: number,
    ...args: any[]
) {
    let ref = true
    let currTimer: NodeJS.Timeout

    let fn = () => {
        callback(...args).then(() => {
            currTimer = setTimeout(fn, interval(ms))
            if (!ref) {
                currTimer.unref()
            }
        })
    }

    currTimer = setTimeout(fn, interval(ms))

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
