import { Directive, HostListener } from "@angular/core";

@Directive({
  selector: "[appNoSpace]",
})
export class NoSpaceDirective {
  @HostListener("keydown", ["$event"])
  onKeyDown(event: KeyboardEvent) {
    if (
      event.keyCode === 32 ||
      event.keyCode === 48 ||
      event.keyCode === 49 ||
      event.keyCode === 50 ||
      event.keyCode === 51 ||
      event.keyCode === 52 ||
      event.keyCode === 53 ||
      event.keyCode === 54 ||
      event.keyCode === 55 ||
      event.keyCode === 56 ||
      event.keyCode === 57 ||
      event.keyCode === 220 ||
      event.keyCode === 221 ||
      event.keyCode === 219 ||
      event.keyCode === 222 ||
      event.keyCode === 186 ||
      event.keyCode === 188 ||
      event.keyCode === 190 ||
      event.keyCode === 191 ||
      event.keyCode === 187
    ) {
      event.preventDefault();
    }
  }
}
