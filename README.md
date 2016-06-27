
# asyncer

 [![PayPal](https://img.shields.io/badge/%24-paypal-f39c12.svg)][paypal-donations] [![AMA](https://img.shields.io/badge/ask%20me-anything-1abc9c.svg)](https://github.com/IonicaBizau/ama) [![Version](https://img.shields.io/npm/v/asyncer.svg)](https://www.npmjs.com/package/asyncer) [![Downloads](https://img.shields.io/npm/dt/asyncer.svg)](https://www.npmjs.com/package/asyncer) [![Get help on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/johnnyb?utm_source=github&utm_medium=button&utm_term=johnnyb&utm_campaign=github)

> Run groups of (a)sync functions.

## :cloud: Installation

```sh
$ npm i --save asyncer
```


## :clipboard: Example



```js
const asyncer = require("asyncer");

let log = console.log;

let tasks = [
    () => { log("First"); }
  , cb => {
        log("Wait a second");
        setTimeout(() => cb(), 1000);
    }
  , cb => {
        log("Wait another second");
        setTimeout(() => cb(), 1000);
    }
  , [
        () => { log("First"); }
      , {
            parallel: [
               cb => {
                    log("In parallel");
                    setTimeout(() => cb(), 1000);
                }
              , cb => {
                    log("In parallel");
                    setTimeout(() => cb(), 1000);
                }
            ]
        }
      , {
            parallel: [
               cb => {
                    log("Wait a second");
                    setTimeout(() => cb(), 1000);
                }
              , cb => {
                    log("Wait another second");
                    setTimeout(() => cb(), 1000);
                }
            ]
        }
    ]
];
```

## :memo: Documentation


### `asyncer(a, b)`
Run groups of (a)sync functions.

#### Params
- **Number** `a`: Param descrpition.
- **Number** `b`: Param descrpition.

#### Return
- **Number** Return description.



## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].


## :scroll: License

[MIT][license] © [Ionică Bizău][website]

[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(http%3A%2F%2Fionicabizau.net)&year=2016#license-mit
[website]: http://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
