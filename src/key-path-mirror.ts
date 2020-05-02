type Obj = { [key: string]: any }

type RecursiveSetObjValTypeAsStr<O extends Obj> = {
  [K in keyof O]: O[K] extends Obj ? RecursiveSetObjValTypeAsStr<O[K]> : string
}

export default keyPathMirror
export function keyPathMirror<
  T extends Obj,
  R extends RecursiveSetObjValTypeAsStr<T>
> (obj: T, prefixPath?: string): R {
  if (!isObject(obj)) {
    throw new Error('Argument must be an object')
  }

  const keyPathMirroredObj: Obj = {}
  Object.keys(obj).forEach(key => {
    const curPath = prefixPath ? `${prefixPath}.${key}` : key

    const val = obj[key]
    keyPathMirroredObj[key] = isObject(val)
      ? keyPathMirror(val as Obj, curPath)
      : curPath
  })
  return keyPathMirroredObj as R
}

function isObject (o: any) {
  return (
    Object.prototype.toString
      .call(o)
      .slice(8, -1)
      .toLowerCase() === 'object'
  )
}
