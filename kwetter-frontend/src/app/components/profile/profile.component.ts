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
    public following?: Profile[];
    public followers?: Profile[];

    constructor(private route: ActivatedRoute, private profileService: ProfileService, private router: Router) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.profileService.getProfileById(params['id']).subscribe(resp => {
                if(resp.ok && resp.body) {
                    this.profile = resp.body;
                    this.profileService.getFollowed(this.profile.id).subscribe(followedResp => {
                        if(followedResp.ok && followedResp.body) {
                            this.following = followedResp.body;
                        }
                    });

                    this.profileService.getFollowers(this.profile.id).subscribe(followingResp => {
                        if(followingResp.ok && followingResp.body) {
                            this.followers = followingResp.body;
                        }
                    });
                }
            }, 
            error => {
                this.router.navigateByUrl('/notFound');
            });
        });
    }
}
