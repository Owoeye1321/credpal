import { FxResponse } from './types';

export default interface FxInterface {
  fetchRates(currency: string): Promise<FxResponse>;
}
