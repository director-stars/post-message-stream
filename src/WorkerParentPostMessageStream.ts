import {
  BasePostMessageStream,
  PostMessageEvent,
  StreamData,
} from './BasePostMessageStream';
import { DEDICATED_WORKER_NAME } from './enums';

interface WorkerParentStreamArgs {
  worker: Worker;
}

/**
 * Parent-side dedicated web worker `postMessage` stream.
 */
export class WorkerParentPostMessageStream extends BasePostMessageStream {
  private _target: string;

  private _worker: Worker;

  /**
   * Creates a stream for communicating with a dedicated web worker.
   *
   * @param args - Options bag.
   * @param args.worker - The Web Worker to exchange messages with. The worker
   * must instantiate a WorkerPostMessageStream.
   */
  constructor({ worker }: WorkerParentStreamArgs) {
    if (!worker) {
      throw new Error('Invalid input.');
    }
    super();

    this._target = DEDICATED_WORKER_NAME;
    this._worker = worker;
    this._worker.onmessage = this._onMessage.bind(this) as any;

    this._handshake();
  }

  protected _postMessage(data: unknown): void {
    this._worker.postMessage({
      target: this._target,
      data,
    });
  }

  private _onMessage(event: PostMessageEvent): void {
    const message = event.data;

    // validate message
    if (typeof message !== 'object' || !message.data) {
      return;
    }

    this._onData(message.data as StreamData);
  }

  _destroy(): void {
    this._worker.onmessage = null;
    this._worker = null as any;
  }
}
