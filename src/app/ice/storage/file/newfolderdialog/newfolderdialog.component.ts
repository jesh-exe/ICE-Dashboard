import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-newfolderdialog',
  templateUrl: './newfolderdialog.component.html',
  styleUrls: ['./newfolderdialog.component.scss']
})
export class NewfolderdialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NewfolderdialogComponent>) {}

  folderName: string;

  form = new FormGroup({
    folderName: new FormControl("", [Validators.pattern(/^\S*$/)]),
  });

  ngOnInit() {}

}
