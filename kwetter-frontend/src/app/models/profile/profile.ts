export class Profile {
    id: number;
    accountId: number;
    name: string;
    bio: string;
    location: string;
    website: string;

    constructor (id: number, accountId: number, name: string, bio: string, location: string, website: string) {
        this.id = id;
        this.accountId = accountId;
        this.name = name;
        this.bio = bio;
        this.location = location;
        this.website = website;
    }

}
