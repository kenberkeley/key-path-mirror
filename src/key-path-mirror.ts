type Obj = { [key: string]: Obj | string }

export default keyPathMirror
export function keyPathMirror<T extends Obj> (obj: T, prefixPath?: string): T {
  if (typeOf(obj) !== 'object') {
    throw new Error('Argument must be an object')
  }

  const keyPathMirroredObj: Obj = {}
  // Object.keys = for...in + hasOwnProperty
  Object.keys(obj).forEach(key => {
    const curPath = prefixPath ? `${prefixPath}.${key}` : key

    const val = obj[key]
    const valType = typeOf(val)
    switch (valType) {
      case 'string':
        keyPathMirroredObj[key] = curPath
        break
      case 'object':
        keyPathMirroredObj[key] = keyPathMirror(val as Obj, curPath)
        break
      default:
        throw new Error(`Unsupported type ${valType} in ${curPath}`)
    }
  })
  return keyPathMirroredObj as T
}

function typeOf (o: any) {
  return Object.prototype.toString
    .call(o)
    .slice(8, -1)
    .toLowerCase()
}
