import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  navItems = [
    {name: 'Home', link: '/home'},
    {name: 'Register', link: '/register'},
    {name: 'Login', link: '/login'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
