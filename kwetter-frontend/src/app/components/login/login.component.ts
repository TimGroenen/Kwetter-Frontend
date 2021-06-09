import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	public incorrectAttempt = false;
	public unprocessableEntity = false;
	constructor(private router: Router, private authService: AuthService, private profileService: ProfileService) { }

	ngOnInit() {
	}

	onSubmit(formData: NgForm) {
		this.authService.login(formData.value.username, formData.value.password).subscribe(response => {
			if (response.ok) {
                console.log("Login successful! Token received: " + response.headers.get("Authorization"));
				this.authService.setAccountToken(response.headers.get("Authorization") || "");
				
				this.authService.getAccountByEmail(formData.value.username).subscribe(accountResponse => {
					if(accountResponse.ok && accountResponse.body) {
						this.authService.setAccount(accountResponse.body);
						this.profileService.getProfileByAccountId(accountResponse.body.id).subscribe(profileResponse => {
							if(profileResponse.ok && profileResponse.body) {
								console.log('profile saved');
								this.profileService.setProfile(profileResponse.body);
							}
						});
					}
				});

				this.router.navigateByUrl('/home');
			}
		}, error => {
			this.incorrectAttempt = true;
		});
	}
}
