import { timeFinished, startCountdown } from '../src/renderer';
import { playSound } from './__mocks__/audioModule';

jest.mock('./audioModule', () => {
  return {
    playSound: jest.fn(),
  };
});

describe('renderer Tests', () => {
  test('click on start should handle button click and play a sound ', () => {
    const startButton = document.createElement('button');
    startButton.id = 'startButton';
    document.body.appendChild(startButton);
    startButton.addEventListener('click', startCountdown);
    startButton.click();
    expect(playSound).toHaveBeenCalled();
  });
});
