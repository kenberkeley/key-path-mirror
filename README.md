# key-path-mirror

<!-- Stolen from https://git.io/Jf34a -->
<p align="center">
  <a href="https://circleci.com/gh/kenberkeley/key-path-mirror/tree/master"><img src="https://img.shields.io/circleci/project/github/kenberkeley/key-path-mirror/master.svg?sanitize=true" alt="Build Status"></a>
  <a href="https://npmjs.com/package/key-path-mirror"><img src="https://img.shields.io/npm/v/key-path-mirror.svg?sanitize=true" alt="Version"></a>
  <a href="https://npmjs.com/package/key-path-mirror"><img src="https://img.shields.io/npm/l/key-path-mirror.svg?sanitize=true" alt="License"></a>
  <a href="https://standardjs.com"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="JavaScript Style Guide"></a>
</p>

> Similar to [keymirror](https://www.npmjs.com/package/keymirror) but supports nested objects, built with TypeScript.

## § Installation

```sh
$ npm i key-path-mirror
# or
$ yarn add key-path-mirror
```

## § Usage

```ts
import { keyPathMirror } from 'key-path-mirror'

const nestedObject = {
  a: 123,
  b: {
    c: 'hello',
    d: {
      e: 'world'
    }
  },
  f: {
    g: {
      h: {
        i: function () { console.log('hello world') }
      },
      j: 123
    },
    k: undefined
  },
  l: new Date()
}

const expectedKeyMirroredObject = {
  a: 'a',
  b: {
    c: 'b.c',
    d: {
      e: 'b.d.e'
    }
  },
  f: {
    g: {
      h: {
        i: 'f.g.h.i'
      },
      j: 'f.g.j'
    },
    k: 'f.k'
  },
  l: 'l'
}

console.assert(
  JSON.stringify(keyPathMirror(nestedObject)) ===
  JSON.stringify(expectedKeyMirroredObject)
)
// no errors :)
```

## § Alternatives

* https://github.com/apolkingg8/KeyMirrorNested
* https://github.com/werk85/pathmirror
