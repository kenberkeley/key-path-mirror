import { keyPathMirror } from '../src/key-path-mirror'

describe(keyPathMirror.name, () => {
  it('should throw if the first argument is not an object', () => {
    ;[
      undefined,
      null,
      true,
      NaN,
      1,
      'hello',
      [],
      new Date(),
      new RegExp(''),
      () => {}
    ].forEach(o => {
      expect(() => {
        keyPathMirror(
          // @ts-ignore
          o
        )
      }).toThrow('1st argument should be an object')
    })
  })

  it('should return a key-path-mirrored object', () => {
    expect({}).toEqual({})

    expect(
      keyPathMirror({
        a: 1,
        b: () => {},
        c: /hello/
      })
    ).toEqual({
      a: 'a',
      b: 'b',
      c: 'c'
    })

    expect(
      keyPathMirror({
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
              i: () => {
                console.log('hello world')
              }
            },
            j: 123
          },
          k: undefined
        },
        l: new Date()
      })
    ).toEqual({
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
    })
  })

  it('should return a prefixed key-path-mirrored object', () => {
    const prefix = 'foobar:'
    expect(
      keyPathMirror(
        {
          a: 1,
          b: null,
          c: {
            d: NaN,
            e: new Date(),
            f: {
              g: new RegExp(''),
              h: {
                i: () => {}
              }
            }
          }
        },
        prefix
      )
    ).toEqual({
      a: `${prefix}a`,
      b: `${prefix}b`,
      c: {
        d: `${prefix}c.d`,
        e: `${prefix}c.e`,
        f: {
          g: `${prefix}c.f.g`,
          h: {
            i: `${prefix}c.f.h.i`
          }
        }
      }
    })
  })
})
