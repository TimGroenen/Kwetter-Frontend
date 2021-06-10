export class Tweet {
    id: number;
    profileId: number;
    content: string;
    date: number;
    likes: number;
    isLiked: boolean;

    constructor(id: number, profileId: number, content: string, date: number, likes: number, isLiked: boolean) {
        this.id = id;
        this.profileId = profileId;
        this.content = content;
        this.date = date;
        this.likes = likes;
        this.isLiked = isLiked;
    }
}
