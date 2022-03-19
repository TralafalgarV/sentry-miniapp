import { Response, SentryRequest } from "@sentry/types";
import { SyncPromise, eventStatusFromHttpCode } from "@sentry/utils";
import { sdk } from "../crossPlatform";

import { BaseTransport } from "./base";

/** `XHR` based transport */
export class XHRTransport extends BaseTransport {
  /**
   * @inheritDoc
   */
  protected _sendRequest(
    sentryRequest: SentryRequest
    // originalPayload: Event | Session
  ): PromiseLike<Response> {
    const request = sdk.request || sdk.httpRequest;

    return this._buffer.add(
      () =>
        new SyncPromise<Response>((resolve, reject) => {
          request({
            url: sentryRequest.url,
            method: "POST",
            data: sentryRequest.body,
            header: {
              "content-type": "application/json",
            },
            success(res: { statusCode: number }): void {
              resolve({
                status: eventStatusFromHttpCode(res.statusCode),
              });
            },
            fail(error: object): void {
              reject(error);
            },
          });
        })
    );
  }
}
