import { Component, ViewChild, Input, SimpleChanges } from "@angular/core";
import {
  MonacoEditorComponent,
  MonacoEditorConstructionOptions,
} from "@materia-ui/ngx-monaco-editor";

@Component({
  selector: "app-parameters",
  templateUrl: "./parameters.component.html",
  styleUrls: ["./parameters.component.scss"],
})
export class ParametersComponent {
  @ViewChild(MonacoEditorComponent, { static: false })
  monacoComponent: MonacoEditorComponent;
  editorOptions: MonacoEditorConstructionOptions = {
    theme: "vs", // Change this to your desired theme
    language: "json", // Change this to your desired language
    autoIndent: "full",
    // Other options...
  };
  @Input() param;
}
