import {Socket} from 'phoenix';

import {eventChannel, takeLatest} from "redux-saga";
import {fork, call, take, put} from "redux-saga/effects";

import ActionTypes, {updateTask} from '../actions'

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

function createEventChannel(channel) {
  return eventChannel(emit => {
    const emitTaskUpdate = (event) => {
      emit(event)
    }

    channel.on('task_update', emitTaskUpdate);

    return () => {
      channel.off('task_update', emitTaskUpdate)
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
    const task = yield take(sagaChannel)
    yield put(updateTask(task));
  }
}

export default function* getWatcher() {
  yield fork(takeLatest, ActionTypes.START_SESSION, startSocket);
}
