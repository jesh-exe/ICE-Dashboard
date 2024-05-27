export class Blast {
  //out
  jobName: string;
  //-query
  sequence: string;
  accessionId: string;
  //-task
  //toolName: string;
  //-db
  db: string;
  //-max_target_seqs 20
  max_target_sequence: number;
  //-evalue 0.05
  expect_threshold: number;
  //-word_size 11
  word_size: string;
  //-outfmt 6
  //5 = BLAST XML,
  //6 = Tabular,
  //7 = Tabular with comment lines,
  //8 = HTML,
  output_format: number;
  // html: boolean;
}
