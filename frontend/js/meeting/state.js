export const state = {
  ROOM_ID: null,
  USERNAME: null,
  lastSubtitle: null,

  myStream: null,
  myPeerId: null,

  aiEnabled: true,
  aiInterval: null,

  audioCtx: null,
  audioUnlocked: false,

  aiRequestInFlight: false,

  peers: {},
  users: {}
};