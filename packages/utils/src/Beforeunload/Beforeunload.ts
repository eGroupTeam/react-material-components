export interface BlockOptions {
  dialogText?: string;
}

/**
 * This class is a surger to handle window beforeunload event.
 *
 * Example .
 * ```javascript
 * beforeunload.block(); // block user exit browser.
 *
 * doSomething()
 *
 * beforeunload.unblock(); // unblock user exit browser.
 * ```
 */
class Beforeunload {
  private onbeforeunload?: (e) => void;

  block(options?: BlockOptions) {
    if (this.onbeforeunload) return;
    this.onbeforeunload = (e) => {
      // Cancel the event as stated by the standard.
      e.preventDefault();
      // Chrome requires returnValue to be set.
      e.returnValue = options?.dialogText;
      return options?.dialogText;
    };
    window.addEventListener('beforeunload', this.onbeforeunload);
  }

  unblock() {
    if (!this.onbeforeunload) return;
    window.removeEventListener('beforeunload', this.onbeforeunload);
    this.onbeforeunload = undefined;
  }
}

const Instance = new Beforeunload();

export default Instance;
