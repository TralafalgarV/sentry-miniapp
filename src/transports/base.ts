import {
  APIDetails,
  initAPIDetails,
  getStoreEndpointWithUrlEncodedAuth,
  eventToSentryRequest,
} from "@sentry/core";
import {
  Event,
  Transport,
  TransportOptions,
  Response as SentryResponse,
  SentryRequest,
  Session,
} from "@sentry/types";
import { PromiseBuffer, makePromiseBuffer } from "@sentry/utils";

/** Base Transport class implementation */
export abstract class BaseTransport implements Transport {
  /**
   * @inheritDoc
   */
  public url: string;

  /** Helper to get Sentry API endpoints. */
  protected readonly _api: APIDetails;

  /** A simple buffer holding all requests. */
  protected readonly _buffer: PromiseBuffer<SentryResponse> =
    makePromiseBuffer(30);

  public constructor(public options: TransportOptions) {
    this._api = initAPIDetails(options.dsn, options._metadata, options.tunnel);
    this.url = getStoreEndpointWithUrlEncodedAuth(this._api.dsn);
  }

  /**
   * @inheritDoc
   */
  public sendEvent(event: Event): PromiseLike<SentryResponse> {
    return this._sendRequest(eventToSentryRequest(event, this._api), event);
  }

  /**
   * @inheritDoc
   */
  public close(timeout?: number): PromiseLike<boolean> {
    return this._buffer.drain(timeout);
  }

  protected abstract _sendRequest(
    sentryRequest: SentryRequest,
    originalPayload: Event | Session
  ): PromiseLike<SentryResponse>;
}
