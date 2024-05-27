import { Pipe } from "@angular/core";

@Pipe({
  name: "replaceNull",
})
export class ReplaceNull {
  transform(val) {
    if (val) {
      return val;
    } else {
      return "null";
    }
  }
}
