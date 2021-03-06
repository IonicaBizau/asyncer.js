"use strict";

const noop = require("noop6")
    , typpy = require("typpy")
    , oneByOne = require("one-by-one")
    , sameTime = require("same-time")
    , fnResult = require("fn-result")
    ;

/**
 * asyncer
 * Run groups of (a)sync functions.
 *
 * @name asyncer
 * @function
 * @param {Array|Object} tasks The tasks to run in parallel or one by one.
 * @param {Function} cb The callback function.
 */
function asyncer (tasks, cb) {

    cb = cb || noop6;

    if (typpy(tasks, Function)) {
        if (tasks.length >= 1) {
            return tasks(cb);
        }
        return fnResult(tasks, cb);
    }

    let normalize = tsks => tsks.map(c => {
        if (typpy(c, Function) && c.length >= 1) {
            return c;
        }

        return done => {
            asyncer(c, done)
        };
    });

    if (typpy(tasks, Object)) {
        tasks = normalize(tasks.parallel || tasks.p);
        sameTime(tasks, cb);
        return;
    }

    if (typpy(tasks, Array)) {
        tasks = normalize(tasks);
        oneByOne(tasks, cb);
        return;
    }

    throw new TypeError("The tasks should be an array or an object.");
};

module.exports = asyncer;
