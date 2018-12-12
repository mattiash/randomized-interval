# randomized-interval

[![Build Status](https://travis-ci.org/mattiash/randomized-interval.svg?branch=master)](https://travis-ci.org/mattiash/randomized-interval) [![Coverage Status](https://coveralls.io/repos/github/mattiash/randomized-interval/badge.svg?branch=master)](https://coveralls.io/github/mattiash/randomized-interval?branch=master)

This module provides the same API as setInterval, but with a randomized
interval. If you specify the interval as X, the actual interval will be
X*(Math.random() + 0.5), i.e. between 0.5 and 1.5 times X. The interval time is
recalculated for each interval, which means that over a long period of time, the
average time between two times that the callback is called  will be X.

Using a randomized interval is useful to avoid synchronization effects in
distributed systems.

## Usage

### setRandomizedInterval

    const {setRandomizedInterval} = require('randomized-interval')

    setRandomizedInterval( () => console.log(Date.now()), 10000)

setRandomizedInterval also accepts extra arguments that are passed to the
callback in the same way as setInterval.

setRandomizedInterval returns an object that has the following methods:

- ref() and unref() works as for setInterval()
- clear() stops the timer and makes sure that it never fires again.

### setRandomizedIntervalAsync

    const {setRandomizedIntervalAsync} = require('randomized-interval')

    setRandomizedIntervalAsync( () => Promise.resolve(), 10000)

setRandomizedIntervalAsync has the same behavior as setRandomizedInterval,
but it expects the callback to return a Promise.
The function will wait for that promise to resolve before it starts the next timer.
This guarantees that only one callback-operation will be run at a time
even if the callback takes longer than the interval to complete.
This also means that the time between callback operations will be
the random interval plus the time it takes for the callback to resolve its promise.

# License

ISC License

Copyright (c) 2016, Mattias Holmlund, <mattias@holmlund.se>

Permission to use, copy, modify, and/or distribute this software for any purpose
with or without fee is hereby granted, provided that the above copyright notice
and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF
THIS SOFTWARE.
