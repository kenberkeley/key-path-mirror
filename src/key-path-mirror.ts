type Obj = { [key: string]: any }
type Prefix = string | undefined

type RecurSetObjValTypeAsStr<O extends Obj> = {
  [K in keyof O]: O[K] extends Obj ? RecurSetObjValTypeAsStr<O[K]> : string
}
type RetType<O extends Obj, P extends Prefix> = {
  [K in keyof O]: O[K] extends Obj ? RecurSetObjValTypeAsStr<O[K]> : (
    P extends undefined
      ? K // imitate @types/keymirror: https://git.io/JfsJx
      : string
  )
}
export function keyPathMirror<T extends Obj>(obj: T): RetType<T, undefined>
export function keyPathMirror<T extends Obj, P extends string>(obj: T, prefix: P): RetType<T, P>

export function keyPathMirror(obj: Obj, prefix?: string) {
  if (!isObject(obj)) {
    throw new Error('1st argument should be an object')
  }

  const keyPathMirroredObj: Obj = {}
  Object.keys(obj).forEach(key => {
    const curPath = prefix ? `${prefix}${key}` : key

    const val = obj[key]
    keyPathMirroredObj[key] = isObject(val)
      ? keyPathMirror(val as Obj, `${curPath}.`)
      : curPath
  })
  return keyPathMirroredObj
}

function isObject (o: any) {
  return (
    Object.prototype.toString
      .call(o)
      .slice(8, -1)
      .toLowerCase() === 'object'
  )
}
