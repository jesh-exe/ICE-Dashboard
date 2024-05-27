import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "cpuUnit" })
export class cpuUnitPipe implements PipeTransform {
  transform(value: number) {
    // console.log(value);
    return value / 1000;
  }
}
