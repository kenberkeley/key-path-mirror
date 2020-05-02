import { keyPathMirror } from '../src/key-path-mirror'

describe(keyPathMirror.name, () => {
  it('should throw if the argument is not an object', () => {
    ;[undefined, null, true, 1, 'string', [], new Date(), () => {}].forEach(
      o => {
        expect(() => {
          keyPathMirror(
            // @ts-ignore
            o
          )
        }).toThrow('Argument must be an object')
      }
    )
  })

  it('should throw if any object value is not an object or string', () => {
    expect(() => {
      keyPathMirror({
        // @ts-ignore
        a: 1
      })
    }).toThrow('Unsupported type number in a')

    expect(() => {
      keyPathMirror({
        a: '',
        b: {
          c: {
            // @ts-ignore
            d: true
          },
          e: ''
        }
      })
    }).toThrow('Unsupported type boolean in b.c.d')
  })

  it('should return key path mirrored object', () => {
    expect({}).toEqual({})

    expect(
      keyPathMirror({
        a: '',
        b: ''
      })
    ).toEqual({
      a: 'a',
      b: 'b'
    })

    expect(
      keyPathMirror({
        a: '',
        b: {
          c: '',
          d: {
            e: ''
          }
        },
        f: {
          g: {
            h: {
              i: ''
            },
            j: ''
          },
          k: ''
        },
        l: ''
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
