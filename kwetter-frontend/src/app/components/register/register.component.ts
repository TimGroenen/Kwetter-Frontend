import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    public usernameTaken = false;
    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
    }

    onSubmit(formData: NgForm) {
        // Register user via service
        this.authService.register(formData.value.username, formData.value.name, formData.value.password).subscribe(response => {
            if (response.body) {
                this.router.navigateByUrl('/login');
            }
        }, error => {
            this.usernameTaken = true;
        });
    }
}
