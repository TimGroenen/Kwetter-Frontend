export class NewTweet {
    profileId: number;
    content: string;

    constructor(profileId: number, content: string) {
        this.profileId = profileId;
        this.content = content;
    }
}
