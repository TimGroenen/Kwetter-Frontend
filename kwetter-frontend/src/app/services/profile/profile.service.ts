import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Follow } from 'src/app/models/follow/follow';
import { Profile } from 'src/app/models/profile/profile';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    private url: string = "http://localhost:8080/api/profile";

    constructor(private httpClient: HttpClient) { }

    public setProfile(profile: Profile) {
        sessionStorage.setItem('profile', JSON.stringify(profile))
    }

    public getProfile(): Profile | null {
        let pString = sessionStorage.getItem('profile')
        if (pString == null) return null;
        return JSON.parse(pString);
    }

    public updateProfile(profile: Profile): Observable<HttpResponse<Profile>> {
        return this.httpClient.post(this.url, profile, {observe: "response"}) as Observable<HttpResponse<Profile>>;
    }

    public getProfileById(id: number): Observable<HttpResponse<Profile>> {
        return this.httpClient.get(this.url + "/" + id, {observe: "response"}) as Observable<HttpResponse<Profile>>;
    }

    public getProfileByAccountId(id: number): Observable<HttpResponse<Profile>> {
        return this.httpClient.get(this.url + "/account/" + id, {observe: "response"}) as Observable<HttpResponse<Profile>>;
    }

    public followUser(id: number, followedId: number): Observable<HttpResponse<string>> {
        let follow = new Follow(id, followedId);
        return this.httpClient.post(this.url + "/follow", follow, {observe: "response"}) as Observable<HttpResponse<string>>;
    }

    public unfollowUser(id: number, unfollowedId: number): Observable<HttpResponse<string>> {
        let unfollow = new Follow(id, unfollowedId);
        return this.httpClient.post(this.url + "/unfollow", unfollow, {observe: "response"}) as Observable<HttpResponse<string>>;
    }

    public getFollowed(id: number): Observable<HttpResponse<Profile[]>> {
        return this.httpClient.get(this.url + "/followed/" + id, {observe: "response"}) as Observable<HttpResponse<Profile[]>>;
    }

    public getFollowers(id: number): Observable<HttpResponse<Profile[]>> {
        return this.httpClient.get(this.url + "/followers/" + id, {observe: "response"}) as Observable<HttpResponse<Profile[]>>;
    }
}
