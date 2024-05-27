import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "replace" })
export class Replace implements PipeTransform {
  transform(value: string) {
    return value.replace(
      "https://ice-dev.bio.pune.cdac.in/storage/workflow/download/",
      ""
    );
  }
}
