import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private currentRoute: string;
  public showNavBar: boolean;
  private sub: any;

  constructor(public router: Router, private route: ActivatedRoute, private authService: AuthService) {
    this.currentRoute = "#";
    this.showNavBar = true;
  }

  ngOnInit() {
    this.router.events.subscribe(()=> {
      this.currentRoute = this.router.url.toString();
      
      if (this.currentRoute == '/login' || this.currentRoute == '/register')
      {
        this.showNavBar = false;
      } else {
        this.showNavBar = true;
      }
    });
  }

  logout() {
    this.authService.removeAccountToken();
    this.router.navigateByUrl("/login");
  }
}
