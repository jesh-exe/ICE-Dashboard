import { Sample } from "./Sample";

export class Sequence {
  description: string;
  forwardPrimerSequence: string;
  geneName: string;
  organismName: string;
  organismType: string;
  permanentAccessionNumber: string;
  quality: string;
  reversePrimerSequence: string;
  sample: Sample;
  sequence: string;
  sequenceHeader: string;
  sequenceId: number;
  sequenceType: string;
  sequencingPlatform: string;
  status: string;
  tempAccessionNumber: string;
  userId: string;
}
