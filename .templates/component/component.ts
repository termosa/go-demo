import { Component, OnInit } from '@angular/core';

@Component({
  selector: '{{ name }}',
  templateUrl: './{{ name }}.component.html',
  styleUrls: ['./{{ name }}.component.css']
})
export class {{ className }} implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
