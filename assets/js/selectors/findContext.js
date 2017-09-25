import {find, includes} from 'lodash'

const findContext = (tasks, toFind, acc = []) => {
  acc.unshift(toFind)
  if (tasks[toFind].root) {
    return acc
  }
  return findContext(tasks, find(tasks, i => includes(i.children, toFind)).id, acc)
}
export default findContext
