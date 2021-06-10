import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Like } from 'src/app/models/like/like';
import { NewTweet } from 'src/app/models/new-tweet/new-tweet';
import { ProfileIds } from 'src/app/models/profile-ids/profile-ids';
import { Tweet } from 'src/app/models/tweet/tweet';

@Injectable({
    providedIn: 'root'
})
export class TweetService {
    private url: string = "http://localhost:8080/api/tweet";

    constructor(private httpClient: HttpClient) { }

    public createTweet(profileId: number, content: string) : Observable<HttpResponse<any>> {
        let newTweet = new NewTweet(profileId, content);
        return this.httpClient.post<any>(this.url, newTweet, {observe: "response"});
    }

    public getTweetsByProfileIds(profileIds: number[], profileId: number) : Observable<HttpResponse<Tweet[]>>{
        let dto = new ProfileIds(profileIds, profileId);
        return this.httpClient.post<Tweet[]>(this.url + "/ids", dto, {observe: "response"});
    }

    public like(profileId: number, tweetId: number) : Observable<HttpResponse<any>> {
        let dto = new Like(profileId, tweetId);
        return this.httpClient.post<any>(this.url + "/like", dto, {observe: "response"});
    }

    public unlike(profileId: number, tweetId: number) : Observable<HttpResponse<any>> {
        let dto = new Like(profileId, tweetId);
        return this.httpClient.post<any>(this.url + "/unlike", dto, {observe: "response"});
    }
}
