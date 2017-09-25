import {find, includes} from 'lodash'

const findContext = (items, toFind, acc = []) => {
  acc.unshift(toFind)
  if (items[toFind].root) {
    return acc
  }
  return findContext(items, find(items, i => includes(i.children, toFind)).id, acc)
}
export default findContext
