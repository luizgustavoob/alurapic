import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';

@Component({
    templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit {
    
    private fromUrl: string;
    loginForm: FormGroup;
    @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;
    
    constructor(private formBuilder: FormBuilder, 
                private authService: AuthService,
                private router: Router,
                private platformDetectorService: PlatformDetectorService,
                private activatedRoute: ActivatedRoute) { }
    
    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe( params => this.fromUrl = params.fromUrl );

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
                    if (this.fromUrl) {
                        this.router.navigateByUrl(this.fromUrl);
                    } else {
                        this.router.navigate(['user', userName]);
                    }
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