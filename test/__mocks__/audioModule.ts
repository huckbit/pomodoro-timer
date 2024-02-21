export function playSound(url) {
  const audioContext = new (window.AudioContext || window.AudioContext)();
  const source = audioContext.createBufferSource();
  return source;
}
