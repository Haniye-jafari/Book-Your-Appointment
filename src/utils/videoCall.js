export function createVideoCallLink() {
  const roomName = `care-connect-${crypto.randomUUID()}`;
  return `${window.location.origin}/video-call/${roomName}`;
}
