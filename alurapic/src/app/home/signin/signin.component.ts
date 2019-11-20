import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';

@Component({
    templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit {
    
    loginForm: FormGroup;
    @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;
    
    constructor(private formBuilder: FormBuilder, 
                private authService: AuthService,
                private router: Router,
                private platformDetectorService: PlatformDetectorService) { }
    
    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required ]
        });

        this.platformDetectorService.isPlatformBrower &&
            this.userNameInput.nativeElement.focus();
    }

    login() {
        const userName = this.loginForm.get('userName').value;
        const password = this.loginForm.get('password').value;
        this.authService
            .authenticate(userName, password)
            .subscribe(
                () => {
                    this.router.navigate(['user', userName]);
                },
                error => {
                    alert('Usuário e/ou senha inválidos');
                    this.platformDetectorService.isPlatformBrower &&
                        this.userNameInput.nativeElement.focus();
                    this.loginForm.reset();
                }
            );
    }
} 