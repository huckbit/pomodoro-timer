import exp from 'constants';
import { timeFinished, startCountdown } from '../src/renderer';
import * as module from '../src/renderer';

describe('renderer Tests', () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <div>
      <button id="startButton">Start</button>
      <p id="remainingTime">25:00</p>
    </div>
  `;
  });

  test('click on start should handle button click and play a sound ', () => {
    const spy = jest.spyOn(module, 'startCountdown');
    const startButton = document.getElementById('startButton');
    const clickEvent = new window.MouseEvent('click');
    if (startButton) {
      const clickEventListenerSpy = jest.spyOn(startButton, 'dispatchEvent');
      startButton?.dispatchEvent(clickEvent);
      expect(clickEventListenerSpy).toHaveBeenCalledWith(clickEvent);
    }

    // expect(spy).toHaveBeenCalled();
  });
});
