import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Profile } from 'src/app/models/profile/profile';
import { AuthService } from 'src/app/services/auth/auth.service';
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
    public isMyProfile = false;
    public isFollowing = false;

    constructor(private route: ActivatedRoute, private profileService: ProfileService, private router: Router, private authService: AuthService) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.loadInformation(params['id']);
        });
    }

    private loadInformation(id: number) {
        this.isMyProfile = false;
        this.isFollowing = false;

        this.profileService.getProfileById(id).subscribe(resp => {
            if(resp.ok && resp.body) {
                let tempProfile = this.profileService.getProfile();
                if(tempProfile != null) {
                    if(tempProfile.id == resp.body.id) {
                        this.isMyProfile = true;
                    } else {
                        this.isMyProfile = false;
                    }
                }

                this.profile = resp.body;
                this.profileService.getFollowed(this.profile.id).subscribe(followedResp => {
                    if(followedResp.ok && followedResp.body) {
                        this.following = followedResp.body;
                    }
                });

                this.profileService.getFollowers(this.profile.id).subscribe(followingResp => {
                    if(followingResp.ok && followingResp.body) {
                        this.followers = followingResp.body;

                        if(!this.isMyProfile){
                            this.followers.forEach(element => {
                                if(element.id == this.authService.getAccount()?.id) {
                                    this.isFollowing = true;
                                }
                            });
                        }
                    }
                });
            }
        }, 
        error => {
            this.router.navigateByUrl('/notFound');
        });
    }

    public followUser() {
        let myProfile = this.profileService.getProfile();
        
        if(myProfile != null && this.profile) {
            console.log("Following user");
            this.profileService.followUser(myProfile.id, this.profile.id).subscribe(resp => {
                console.log("Following user, response: " + resp.status);
                if(this.profile){
                    console.log("reloading information");
                    this.loadInformation(this.profile.id);
                }
            });
        }
    }

    public unfollowUser() {
        let myProfile = this.profileService.getProfile();
        
        if(myProfile != null && this.profile) {
            console.log("Unfollowing user");
            this.profileService.unfollowUser(myProfile.id, this.profile.id).subscribe(resp => {
                console.log("Unfollowing user, response: " + resp.status);
                if(this.profile){
                    console.log("reloading information");
                    this.loadInformation(this.profile.id);
                }
            });
        }
    }
}
