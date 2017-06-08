// todo try to use lodash again, webpack or babel couldn't compile this correctly
// const findContext = (items, toFind, acc = []) => {
//   acc.unshift(toFind)
//   if (toFind === 'root') {
//     return acc
//   }
//   return findContext(items, find(items, i => includes(i.children, toFind)).id, acc)
// }

function findContext(items, toFind) {
  let target = toFind
  let acc = [target]
  while (target !== 'root') {
    for(let item of Object.values(items)) {
      let indexOf = item.children.indexOf(target)
      if(indexOf !== -1) {
        target = item.id
        break
      }
    }
    acc.unshift(target)
  }
  return acc
}
export default findContext
