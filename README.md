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
import keyPathMirror from 'key-path-mirror'
// Or
import { keyPathMirror } from 'key-path-mirror'

keyPathMirror(obj: object, prefix?: string)
```

## § Examples

> 👉 [REPL online example](https://repl.it/repls/BrightBothDevices)

```ts
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
        i: () => { console.log('hello world') }
      },
      j: 123
    },
    k: undefined
  },
  l: new Date()
}

const expectedKeyPathMirroredObject = {
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
  JSON.stringify(expectedKeyPathMirroredObject)
) // no errors :)
```

```ts
const prefix = 'foobar:'
const nestedObject = {
  a: 123,
  b: {
    c: 'hello',
    d: {
      e: null
    }
  }
}

const expectedPrefixedKeyPathMirroredObject = {
  a: 'foobar:a',
  b: {
    c: 'foobar:b.c',
    d: {
      e: 'foobar:b.d.e'
    }
  }
}

console.assert(
  JSON.stringify(keyPathMirror(nestedObject, prefix)) ===
  JSON.stringify(expectedPrefixedKeyPathMirroredObject)
) // no errors :)
```

## § Alternatives

* https://github.com/apolkingg8/KeyMirrorNested
* https://github.com/werk85/pathmirror
