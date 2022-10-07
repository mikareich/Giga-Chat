function initSocket(name = Math.random().toString(36).substring(7)) {
  const socket = io(window.location.origin, {
    query: `name=${name}`,
  });

  return socket;
}
