import { paramMap } from "./paramap";

export class BlastUnit {
  computeUnitList: string;
  containerName: string;
  cost: number;
  cpus: number;
  duration: string;
  durationMessage: string;
  endDate: string;
  id: string;
  imageName: string;
  jobname: string;
  log: string;
  logPath: string;
  maintype: string;
  memory: number;
  outputPath: string;
  paramMap: paramMap;
  params: string;
  processName: string;
  startDate: string;
  status: string;
  submittedDate: string;
  type: string;
  userName: string;
}
