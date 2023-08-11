import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  @Input() sideNavStatus: boolean = false;
  constructor(private route: Router) { }
  ngOnInit(): void {

  }
}
