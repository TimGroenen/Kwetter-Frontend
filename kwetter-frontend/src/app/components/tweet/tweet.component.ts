import { Component, Input, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/profile/profile';
import { Tweet } from 'src/app/models/tweet/tweet';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { TweetService } from 'src/app/services/tweet/tweet.service';

@Component({
    selector: 'app-tweet',
    templateUrl: './tweet.component.html',
    styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {
    @Input() public tweet: Tweet;
    public profile: Profile;

    constructor(private profileService: ProfileService, private tweetService: TweetService) { }

    ngOnInit(): void {
        //Get profile
        this.profileService.getProfileById(this.tweet.profileId).subscribe(resp => {
            if(resp.ok && resp.body) {
                this.profile = resp.body;
            }
        });
    }

    like() {
        let profile = this.profileService.getProfile();

        if(profile) {
            this.tweetService.like(profile.id, this.tweet.id).subscribe(resp => {
                if(resp.ok) {
                    this.tweet.likes += 1;
                    this.tweet.liked = true;
                }
            })
        }
    }

    unlike() {
        let profile = this.profileService.getProfile();

        if(profile) {
            this.tweetService.unlike(profile.id, this.tweet.id).subscribe(resp => {
                if(resp.ok) {
                    this.tweet.likes -= 1;
                    this.tweet.liked = false;
                }
            })
        }
    }

}
