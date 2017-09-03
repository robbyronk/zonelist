import {Socket} from 'phoenix';

import {eventChannel, takeLatest} from "redux-saga";
import {call, fork, put, take} from "redux-saga/effects";

import ActionTypes, {removeItem, updateTask} from '../actions'
import {fetchTasks} from "./items";

function* connectToSocket(url) {
  const socket = new Socket(url, {
    params: {token: localStorage.getItem('id_token')},
    logger: (kind, msg, data) => {
      console.log(`${kind}: ${msg}`, data)
    },
  });
  socket.connect();
  return socket;
}

// TODO channel.join is async, this is probably an error
function* joinPhoenixChannel(socket, channel_name) {
  const channel = socket.channel(channel_name, {});
  channel.join()
    .receive("ok", ({messages}) => console.log("catching up", messages))
    .receive("error", ({reason}) => console.log("failed join", reason))
    .receive("timeout", () => console.log("Networking issue. Still waiting..."))
  return channel;
}

function createEventChannel(phoenixChannel) {
  return eventChannel(emit => {
    const emitTaskCreate = () => {
      emit({type: 'task_create'})
    }
    const emitTaskUpdate = (task) => {
      emit({type: 'task_update', task})
    }
    const emitTaskDelete = (task) => {
      emit({type: 'task_delete', task})
    }

    phoenixChannel.on('task_create', emitTaskCreate);
    phoenixChannel.on('task_update', emitTaskUpdate);
    phoenixChannel.on('task_delete', emitTaskDelete);

    return () => {
      phoenixChannel.off('task_create', emitTaskCreate)
      phoenixChannel.off('task_update', emitTaskUpdate)
      phoenixChannel.off('task_delete', emitTaskDelete)
    };
  });
}

function* startSocket(action) {
  const {session} = action;

  const socket = yield call(connectToSocket, '/socket');
  const channelName = `users:${session.user}`;
  const phoenixChannel = yield call(joinPhoenixChannel, socket, channelName);

  const sagaChannel = yield call(createEventChannel, phoenixChannel);

  while (true) {
    const event = yield take(sagaChannel)
    switch (event.type) {
      case 'task_create':
        yield call(fetchTasks)
        break
      case 'task_update':
        yield put(updateTask(event.task));
        break
      case 'task_delete':
        yield put(removeItem(event.task.id))
        break
    }
  }
}

export default function* getWatcher() {
  yield fork(takeLatest, ActionTypes.START_SESSION, startSocket);
}
