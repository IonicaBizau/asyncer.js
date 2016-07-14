"use strict";

const asyncer = require("../lib");

let log = console.log;

let tasks = [
    // Execute this sync function
    () => { log("First"); }

    // *Then* execute an async one
  , cb => {
        setTimeout(() => {
            log("Waited a second");
            cb();
        }, 1000);
    }

    // Another async function
  , cb => {
        setTimeout(() => {
            log("Waited another second");
            cb();
        }, 1000);
    }

    // *Then* Execute the following group
  , [
        // ...containing a sync function
        () => { log("First in nested group"); }
      , {
            // ...and a group of parallel functions
            // to run in the same time
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

        // After that group of parallel function, execute
        // this group of parallel functions
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

    // Run another sync function
  , () => { log("Almost done."); }

    // An another async one
  , cb => {
        setTimeout(() => {
            log("Last");
            cb();
        }, 1000);
    }
];

// Pass the array above to asyncer
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
