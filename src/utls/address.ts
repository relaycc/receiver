export function truncate (e:string | undefined) {
  if (e !== undefined) {
    return e.slice(0,5) + '...' + e.substring(e.length -4)
  }
  else return "not found"
}