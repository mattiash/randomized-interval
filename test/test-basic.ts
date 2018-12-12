import 'source-map-support/register'
import * as test from 'purple-tape'
import { setRandomizedInterval } from '../index'

test('shall fire a reasonable number of times', function*(t) {
    let times = 0
    let interval = 200
    let time = 5000

    let i1 = setRandomizedInterval(() => {
        times++
    }, interval)

    yield wait(time)

    t.ok(times < time / (interval * 0.5), 'shall not fire too many times')
    t.ok(times > time / (interval * 1.5), 'shall not fire too few times')

    times = 0

    i1.clear()

    yield wait(2000)
    t.equal(times, 0, 'shall stop when told to')
})

test('shall include extra arguments to callback', function*(t) {
    let lastArg
    let times = 0
    let i1 = setRandomizedInterval(
        arg => {
            times++
            lastArg = arg
        },
        1000,
        'myarg'
    )

    while (times === 0) {
        yield wait(100)
    }

    t.equal(lastArg, 'myarg', 'shall pass argument first time callback fires')

    lastArg = undefined

    while (times === 1) {
        yield wait(100)
    }

    t.equal(lastArg, 'myarg', 'shall pass argument second time callback fires')

    i1.clear()
})

test('unref()', function*(t) {
    let t1 = setRandomizedInterval(() => {}, 100)
    let t2 = setRandomizedInterval(() => {}, 100)
    t1.unref()
    yield wait(400)
    t1.ref()
    t1.unref()
    t2.unref()
    t.pass('if the test exits, the unref() was successful')
})

function wait(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
