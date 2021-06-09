import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from 'src/app/models/profile/profile';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private currentRoute: string;
  public showNavBar: boolean;
  public profile?: Profile;
  private sub: any;

  constructor(public router: Router, private route: ActivatedRoute, private authService: AuthService, private profileService: ProfileService) {
    this.currentRoute = "#";
    this.showNavBar = true;
  }

  ngOnInit() {
    this.router.events.subscribe(()=> {
      this.currentRoute = this.router.url.toString();

      let profileTemp = this.profileService.getProfile();
      if(profileTemp != null) {
        this.profile = profileTemp;
      }
      
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
    this.profileService.removeProfile();
    this.router.navigateByUrl("/login");
  }
}
