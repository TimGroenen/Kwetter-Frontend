import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	public incorrectAttempt = false;
	private loginSuccess = false;
	constructor(private router: Router, private authService: AuthService) { }

	ngOnInit() {
	}

	onSubmit(formData: NgForm) {
		this.authService.login(formData.value.username, formData.value.password).subscribe(response => {
			if (response.status) {
                console.log("Login successful!");
				this.authService.setAccountToken(response.headers.get('Authorization'));
				this.router.navigateByUrl('/home');
			}
		}, error => {
				this.incorrectAttempt = true;
		});
	}
}
