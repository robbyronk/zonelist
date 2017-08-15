// todo try to use lodash again, webpack or babel couldn't compile this correctly
// const findContext = (items, toFind, acc = []) => {
//   acc.unshift(toFind)
//   if (toFind === 'root') {
//     return acc
//   }
//   return findContext(items, find(items, i => includes(i.children, toFind)).id, acc)
// }

// todo make this with lodash
function findContext(items, toFind) {
  // console.log(arguments)
  let target = toFind
  let acc = [target]
  let limit = 100
  while (!items[target].root && limit > 0) { // loop until we are trying to find the parent of root
    for(let item of Object.values(items)) { // loop through all tasks
      let indexOf = item.children.indexOf(target)
      if(indexOf !== -1) { // found a task that has the target in its children
        target = item.id // new target is the parent
        acc.unshift(target)
        break // break for loop
      }
    }
    limit--;
  }
  return acc
}
export default findContext
