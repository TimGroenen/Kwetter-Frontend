export class Follow {
    id: number;
    followedId: number;
    
    constructor(id: number, followedId: number) {
        this.id = id;
        this.followedId = followedId;
    }
}
