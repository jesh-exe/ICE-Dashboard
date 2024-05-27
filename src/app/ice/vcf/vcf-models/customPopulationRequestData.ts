import { StringValue } from "vega";

export class CustomPopulationRequestData {
  analysisName: string;
  description: string;
  collection: string;
  calculatetags: string[];
  outputExtension: string;
  popcode: Map<string, string[]>;
}
