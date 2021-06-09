import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from 'src/app/models/profile/profile';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
    public profile?: Profile;
    public isEditing = false;

    constructor(private authService: AuthService, private profileService: ProfileService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            let tempProfile = this.profileService.getProfile();
            
            if(params['id'] != tempProfile?.id) {
                //Unauthorized to edit this page
                this.router.navigateByUrl("/forbidden");
            }

            this.loadInformation(params['id']);
        });
    }

    private loadInformation(id: number) {
        this.profileService.getProfileById(id).subscribe(resp => {
            if(resp.ok && resp.body) {
                this.profile = resp.body;
            }
        }, 
        error => {
            this.router.navigateByUrl('/notFound');
        });
    }

    onSubmit(formData: NgForm) {
        if(this.profile) {
        // update information
            let newProfile = new Profile(this.profile.id, this.profile.accountId, formData.value.name, formData.value.bio, formData.value.location, formData.value.website);
            this.profileService.updateProfile(newProfile).subscribe(resp => {
                console.log('profile updated');
                if(this.profile) {
                    this.loadInformation(this.profile.id)
                }
                this.isEditing = false;
            });
        }
    }

    public toggleEditing() {
        this.isEditing = !this.isEditing;
    }
}
