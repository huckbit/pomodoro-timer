const pomodoroTime = 25 * 60;
let countdownTime: number = pomodoroTime;
export let countdownInterval: NodeJS.Timeout;
export let isCounting = false;
export const finishedAudio = new Audio('./asset/audio/dingLing.mp3');
export const startAudio = new Audio('./asset/audio/bubble.mp3');
export const pauseAudio = new Audio('./asset/audio/pop.mp3');
export const resetAudio = new Audio('./asset/audio/multiPop.mp3');

/* updating timer in the FE */
export function renderRemainingTime(timeInSeconds: number) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;

  const remainingTimeElement = document.getElementById('remainingTime');
  if (remainingTimeElement) {
    remainingTimeElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}

export function timeFinished(): void {
  const remainingTimeElement = document.getElementById('remainingTime');
  if (remainingTimeElement) {
    remainingTimeElement.textContent = 'Time to take a break!';
    finishedAudio.play();
  }
  resetCountdown();
}

export function startCountdown(): void {
  startAudio.play();
  isCounting = true;
  countdownInterval = setInterval(() => {
    countdownTime = countdownTime - 1;

    if (countdownTime <= 0) {
      clearInterval(countdownInterval);
      timeFinished();
    } else {
      if (isCounting) {
        renderRemainingTime(countdownTime);
      }
    }
  }, 1000);
}

export function pauseCountdown(): void {
  pauseAudio.play();
  clearInterval(countdownInterval);
  isCounting = false;
}

export function resetCountdown(): void {
  resetAudio.play();
  clearInterval(countdownInterval);
  renderRemainingTime(pomodoroTime);
  countdownTime = pomodoroTime;
  isCounting = false;
}
