const defaultOptions = () => ({
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('id_token'),
  },
})

const doFetch = (url, options = {}) =>
  fetch(url, {...defaultOptions(), ...options})
    .then(response => response.json())
    .catch(e => e)

const doFetchBody = (url, method, body, options = {}) =>
  doFetch(url, {method, body: JSON.stringify(body), ...options})

export const apiCreateSession = data => doFetchBody('/api/session', 'POST', data)

export const apiGetTasks = () => doFetch('/api/tasks').then(responseJson => responseJson.data)

export const apiPatchTask = (id, data) => doFetchBody(`/api/tasks/${id}`, 'PATCH', data)

export const apiPostTask = data => doFetchBody('/api/tasks', 'POST', data).then(json => json.data)

export const apiDeleteTask = id => doFetch(`/api/tasks/${id}`, {method: 'DELETE'})

export const apiIndentTask = (id, data) => doFetchBody(`/api/tasks/${id}/indent`, 'POST', data)

export const apiUnindentTask = (id, data) => doFetchBody(`/api/tasks/${id}/unindent`, 'POST', data)

export const apiMoveTaskBefore = (moveId, targetId, data) =>
  doFetchBody(`/api/tasks/${moveId}/move-before/${targetId}`, 'POST', data)

export const apiMoveTaskAfter = (moveId, targetId, data) =>
  doFetchBody(`/api/tasks/${moveId}/move-after/${targetId}`, 'POST', data)
