import { ServerRespond } from "./DataStreamer";

export interface Row {
  price_abc: number;
  price_def: number;
  ratio: number;
  timestamp: Date;
  upper_bound: number;
  lower_bound: number;
  trigger_alert: number | undefined;
}

export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]) {
    const priceABC =
      (ServerResponds[0].top_ask_price + ServerResponds[0].top_bid_price) / 2;
    const priceDEF =
      (ServerRespond[1].top_ask_price + ServerResponds[1].top_bid_price) / 2;
    const ratio = priceABC / priceDEF;
    const upperBound = 1 + 0.5;
    const lowerBound = 1 - 0.5;
    return {
      price_abc: priceABC,
      price_def: priceDEF,
      ratio,
      upper_bound: upperBound,
      lower_bound: lowerBound,
      trigger_alert:
        ratio > upperBound || ratio < lowerBound ? ratio : undefined,
    };
  }
}
