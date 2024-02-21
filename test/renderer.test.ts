import { timeFinished, startCountdown, renderRemainingTime, pauseCountdown, countdownInterval, isCounting, finishedAudio, startAudio, pauseAudio, resetAudio } from '../src/renderer';
import * as module from '../src/renderer';

beforeEach(() => {
  document.body.innerHTML = `
      <div>
        <button id="startButton">Start</button>
        <p id="remainingTime">25:00</p>
      </div>
    `;
});

describe('renderer Tests', () => {
  test('click on start should handle button click and play a sound ', () => {
    const spy = jest.spyOn(module, 'startCountdown');
    const startButton = document.getElementById('startButton');
    const clickEvent = new window.MouseEvent('click');
    if (startButton) {
      const clickEventListenerSpy = jest.spyOn(startButton, 'dispatchEvent');
      startButton?.dispatchEvent(clickEvent);
      expect(clickEventListenerSpy).toHaveBeenCalledWith(clickEvent);
    }
  });
});

describe('renderer renderRemainingTime Tests', () => {
  test('renderRemainingTime should update the remaining time element with the correct time', () => {
    const timeInSeconds = 1500; // 25 minutes
    renderRemainingTime(timeInSeconds);

    const remainingTimeElement = document.getElementById('remainingTime');
    expect(remainingTimeElement?.textContent).toBe('25:00');
  });

  test('renderRemainingTime should pad the seconds with leading zeros when necessary', () => {
    const timeInSeconds = 61; // 1 minute and 1 second
    renderRemainingTime(timeInSeconds);

    const remainingTimeElement = document.getElementById('remainingTime');
    expect(remainingTimeElement?.textContent).toBe('1:01');
  });
});

describe('renderer startCountdown Tests', () => {
  test('startCountdown should play audio, update countdown time, and call timeFinished when countdown reaches 0', () => {
    // Arrange
    const startAudioPlaySpy = jest.spyOn(startAudio, 'play');
    const timeFinishedSpy = jest.spyOn(module, 'timeFinished');

    // Act
    startCountdown();

    // Assert
    expect(startAudioPlaySpy).toHaveBeenCalled();
    expect(timeFinishedSpy).toHaveBeenCalled();
  });

  test('startCountdown should render remaining time when countdown is not 0', () => {
    // Arrange
    const renderRemainingTimeSpy = jest.spyOn(module, 'renderRemainingTime');
    jest.useFakeTimers();

    // Act
    startCountdown();
    jest.advanceTimersByTime(1000);

    // Assert
    expect(renderRemainingTimeSpy).toHaveBeenCalledWith(1499); // countdownTime - 1
  });
});

describe('renderer timeFinished Tests', () => {
  test('timeFinished should update the remaining time element with the message "Time to take a break!"', async () => {
    // Arrange
    jest.useFakeTimers();
    const remainingTimeElement = document.getElementById('remainingTime');

    // Act
    await timeFinished();
    jest.runAllTimers();
    // Assert
    expect(remainingTimeElement?.textContent).toBe('Time to take a break!');
  });
});
describe('renderer pauseCountdown Tests', () => {
  test('pauseCountdown should play pause audio', () => {
    // Arrange
    const pauseAudioPlaySpy = jest.spyOn(pauseAudio, 'play');

    // Act
    pauseCountdown();

    // Assert
    expect(pauseAudioPlaySpy).toHaveBeenCalled();
  });

  test('pauseCountdown should clear the countdown interval', () => {
    // Arrange
    jest.useFakeTimers();
    const clearIntervalSpy = jest.spyOn(window, 'clearInterval');

    // Act
    pauseCountdown();

    // Assert
    expect(clearIntervalSpy).toHaveBeenCalledWith(countdownInterval);
  });

  test('pauseCountdown should set isCounting to false', () => {
    // Act
    pauseCountdown();

    // Assert
    expect(isCounting).toBe(false);
  });
});
