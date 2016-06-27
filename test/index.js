"use strict";

const tester = require("tester")
    , asyncer = require("..")
    ;


tester.describe("asyncer", t => {

    t.should("run simple tasks", cb => {
        let res = [];
        let tasks = [
            () => { res.push(1); }
          , () => { res.push(2); }
        ];
        asyncer(tasks, err => {
            t.expect(err).toBe(null);
            t.expect(res).toEqual([1, 2]);
            cb();
        });
    });

    t.should("run parallel tasks", cb => {
        let res = [];

        let tasks = {
            parallel: [
                cb => setTimeout(() => { res.push(1); cb(); }, 200)
              , cb => setTimeout(() => { res.push(2); cb(); }, 100)
            ]
        };

        asyncer(tasks, err => {
            t.expect(err).toBe(null);
            t.expect(res).toEqual([2, 1]);
            cb();
        });
    });

    t.should("run series and parallel tasks", cb => {
        let res = [];

        let tasks = [
            () => { res.push(1); }
          , {
                parallel: [
                    cb => setTimeout(() => { res.push(4); cb(); }, 200)
                  , cb => setTimeout(() => { res.push(3); cb(); }, 100)
                  , () => { res.push(2) }
                ]
            }
          , () => { res.push(5); }
          , cb => { setTimeout(() => { res.push(6); cb() }, 200); }
        ];

        asyncer(tasks, err => {
            t.expect(err).toBe(null);
            t.expect(res).toEqual([1, 2, 3, 4, 5, 6]);
            cb();
        });
    });

    t.should("run nested series and parallel tasks", cb => {
        let res = [];

        let tasks = [
            () => { res.push(1); }
          , {
                parallel: [
                    cb => setTimeout(() => { res.push(7); cb(); }, 300)
                  , cb => setTimeout(() => { res.push(6); cb(); }, 200)
                  , () => { res.push(2) }
                  , [
                        () => { res.push(3) }
                      , {
                            parallel: [
                                cb => setTimeout(() => { res.push(5); cb(); }, 100)
                              , cb => setTimeout(() => { res.push(4); cb(); }, 0)
                            ]
                        }
                    ]
                ]
            }
        ];

        asyncer(tasks, err => {
            t.expect(err).toBe(null);
            t.expect(res).toEqual([1, 2, 3, 4, 5, 6, 7]);
            cb();
        });
    });
});
