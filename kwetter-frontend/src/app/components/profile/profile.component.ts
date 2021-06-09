import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Profile } from 'src/app/models/profile/profile';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
    public profile?: Profile;

    constructor(private route: ActivatedRoute, private profileService: ProfileService, private router: Router) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.profileService.getProfileById(params['id']).subscribe(resp => {
                if(resp.ok && resp.body) {
                    this.profile = resp.body;
                }
            }, 
            error => {
                this.router.navigateByUrl('/notFound');
            });
        });
    }
}
