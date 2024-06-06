import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity-timeline',
  templateUrl: './activity-timeline.component.html',
  styleUrls: ['./activity-timeline.component.scss']
})
export class ActivityTimelineComponent implements OnInit {

  public data = [
    {
      "title" : "Container Created.",
      "description" : "Created a container named MySQL at 10.30am",
      "time" : "12/01 03:34pm",
      "username" : "jayesh",
      "fullName" : "Jayesh Murodiya",
      "role" : "User",
      "avatar" : "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?w=826&t=st=1717668579~exp=1717669179~hmac=c32cead28485d1dfc68c7639e261cdfcd3c7ab5ac0c8b5be928265eabdcc3eb4"
    },
    {
      "title" : "Container Deleted.",
      "description" : "Delete a container named Linux at 07:30pm",
      "time" : "22/04 11:33am",
      "username" : "prachi",
      "fullName" : "Prachi Barkale",
      "role" : "Admin",
      "avatar" : "https://img.freepik.com/premium-psd/3d-illustration-human-avatar-profile_23-2150671175.jpg"
    },
    {
      "title" : "New Sequence",
      "description" : "Started a new Sequence at 11.00pm",
      "time" : "12/01 03:34pm",
      "username" : "jayesh",
      "fullName" : "Jayesh Murodiya",
      "role" : "User",
      "avatar" : "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?w=826&t=st=1717668579~exp=1717669179~hmac=c32cead28485d1dfc68c7639e261cdfcd3c7ab5ac0c8b5be928265eabdcc3eb4"
    },
    {
      "title" : "Logged In",
      "description" : "Logged in to the Website at 10.30am",
      "time" : "12/01 03:34pm",
      "username" : "supriya",
      "fullName" : "Supriya Sutar",
      "role" : "User",
      "avatar" : "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671140.jpg?t=st=1717651735~exp=1717652335~hmac=dedaadd1f1579638557d43077986e3dfd91d4659aa3c03282c624905e758fe35"
    },
    {
      "title" : "Container Created.",
      "description" : "Created a container named MySQL at 10.30am",
      "time" : "12/01 03:34pm",
      "username" : "jayesh",
      "fullName" : "Jayesh Murodiya",
      "role" : "User",
      "avatar" : "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?w=826&t=st=1717668579~exp=1717669179~hmac=c32cead28485d1dfc68c7639e261cdfcd3c7ab5ac0c8b5be928265eabdcc3eb4"
    }
  ]

  
  public colors = [
    'warning',
    'success',
    'primary',
    'info',
    'secondary'
  ];

  constructor() { }

  ngOnInit() {
  }

}
