"use strict";

const asyncer = require("../lib");

let log = console.log;

let tasks = [
    () => { log("First"); }
  , cb => {
        setTimeout(() => {
            log("Waited a second");
            cb();
        }, 1000);
    }
  , cb => {
        setTimeout(() => {
            log("Waited another second");
            cb();
        }, 1000);
    }
  , [
        () => { log("First in nested group"); }
      , {
            parallel: [
               cb => {
                    setTimeout(() => {
                        log("In parallel 1");
                        cb();
                    }, 1000);
                }
              , cb => {
                    setTimeout(() => {
                        log("Second one in parallel, but I'll be faster.");
                        cb();
                    }, 100);
                }
            ]
        }
      , {
            parallel: [
               cb => {
                    setTimeout(() => {
                        log("Waited a second in another parallel group.");
                        cb();
                    }, 1000);
                }
              , cb => {
                    setTimeout(() => {
                        log("Waited 100ms ");
                        cb();
                    }, 100);
                }
            ]
        }
    ]
  , () => { log("Almost done."); }
  , cb => {
        setTimeout(() => {
            log("Last");
            cb();
        }, 1000);
    }
];

asyncer(tasks, err => {
    console.log("Everything was done.");
    // =>
    // First
    // Waited a second
    // Waited another second
    // First in nested group
    // Second one in parallel, but I'll be faster.
    // In parallel 1
    // Waited 100ms
    // Waited a second in another parallel group.
    // Almost done.
    // Last
    // Everything was done.
});
