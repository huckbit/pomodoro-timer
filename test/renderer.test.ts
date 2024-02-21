import { timeFinished, startCountdown } from '../src/renderer';

const finishedAudio = new Audio('./asset/audio/dingLing.mp3');
finishedAudio.play = jest.fn();

describe('renderer Tests', () => {
  test('renderRemainingTime', () => {
    timeFinished();
    expect(finishedAudio.play).toHaveBeenCalled();
  });
});
