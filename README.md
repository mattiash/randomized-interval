# randomized-interval

This module provides the same API as setInterval, but with a randomized
interval. If you specify the interval as X, the actual interval will be
X*(Math.random() + 0.5), i.e. between 0.5 and 1.5 times X. The interval time is
recalculated for each interval, which means that over a long period of time, the
average time between two times that the callback is called  will be X.

Using a randomized interval is useful to avoid synchronization effects in
distributed systems.

## Usage

    const setRandomizedInterval = require('randomized-interval')

    setRandomizedInterval( () => { console.log(Date.now())}, 10000)

setRandomizedInterval also accepts extra arguments that are passed to the
callback in the same way as setInterval.

setRandomizedInterval returns an object that has the following methods:

- ref() and unref() works as for setInterval()
- clear() stops the timer and makes sure that it never fires again.

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
