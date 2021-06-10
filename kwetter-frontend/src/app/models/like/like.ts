export class Like {
    profileId: number;
    tweetId: number;

    constructor(profileId: number, tweetId: number) {
        this.profileId = profileId;
        this.tweetId = tweetId;
    }
}
