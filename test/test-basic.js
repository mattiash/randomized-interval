'use strict'

let test = require('purple-tape')
let setRandomizedInterval = require('../index.js')

test('shall fire a reasonable number of times', function *(t) {
    let times = 0
    let int = setRandomizedInterval( () => { times++ }, 1000)

    yield wait(5000)

    t.ok(times<5000/(1000*0.5), 'shall not fire too many times')
    t.ok(times>5000/(1000*1.5), 'shall not fire too few times')

    times = 0

    int.clear()

    yield wait(2000)
    t.equal(times, 0, 'shall stop when told to')
})

test('unref()', function *(t) {
    let times1 = 0
    let times2 = 0
    let t1 = setRandomizedInterval( () => {times1++}, 100)
    let t2 = setRandomizedInterval( () => {times2++}, 100)
    t1.unref()
    yield wait(400)
    t2.unref()
    t.pass('if the test exits, the unref() was successful')
})

function wait(ms) {
    return new Promise( resolve => setTimeout(resolve, ms))
}
