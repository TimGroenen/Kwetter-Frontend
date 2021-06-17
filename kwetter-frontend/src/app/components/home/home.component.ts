import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Profile } from 'src/app/models/profile/profile';
import { Tweet } from 'src/app/models/tweet/tweet';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { TweetService } from 'src/app/services/tweet/tweet.service';

@Component({
selector: 'app-home',
templateUrl: './home.component.html',
styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    public profile: Profile;
    public following: Profile[];
    public followers: Profile[];
    public tweets: Tweet[];
    public lastTweet: Tweet;

    constructor(private httpClient: HttpClient, private profileService: ProfileService, private router: Router, private authService: AuthService, private tweetService: TweetService) { }

    ngOnInit(): void {
        this.profile = this.profileService.getProfile();
        if(this.profile) {
            this.profileService.getFollowers(this.profile.id).subscribe(resp => {
                if(resp.ok && resp.body) {
                    this.followers = resp.body;
                }
            });
            this.profileService.getFollowed(this.profile.id).subscribe(resp => {
                if(resp.ok && resp.body) {
                    this.following = resp.body;

                    //Get tweets from following
                    let ids = [ this.profile.id ];
                    this.following.forEach(x => {
                        ids.push(x.id);
                    });

                    this.tweetService.getTweetsByProfileIds(ids, this.profile.id).subscribe(tweetResp => {
                        if(tweetResp.ok && tweetResp.body) {
                            this.tweets = tweetResp.body;
                            this.lastTweet = this.tweets.find(t => t.profileId == this.profile.id);
                        }
                    });
                }
            });
        } else  {
            this.router.navigateByUrl("/notfound");
        }
    }

    onSubmit(f: NgForm) {
        //Send new tweet
        this.tweetService.createTweet(this.profile.id, f.value.tweet).subscribe(resp => {
            if(resp.ok) {
                console.log("New tweet sent!");
            }
        });
    }
}
