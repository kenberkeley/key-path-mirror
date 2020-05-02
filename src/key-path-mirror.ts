type Obj = { [key: string]: any }

export default keyPathMirror
export function keyPathMirror<T extends Obj> (obj: T, prefixPath?: string): T {
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
  return keyPathMirroredObj as T
}

function isObject (o: any) {
  return Object.prototype.toString
    .call(o)
    .slice(8, -1)
    .toLowerCase() === 'object'
}
