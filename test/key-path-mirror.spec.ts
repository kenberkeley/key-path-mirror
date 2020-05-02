import { keyPathMirror } from '../src/key-path-mirror'

describe(keyPathMirror.name, () => {
  it('should throw if the argument is not an object', () => {
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
      }).toThrow('Argument must be an object')
    })
  })

  it('should return key path mirrored object', () => {
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
})
