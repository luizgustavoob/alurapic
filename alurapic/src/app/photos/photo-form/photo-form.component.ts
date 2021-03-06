import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhotoService } from '../photo.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { UserService } from 'src/app/core/user/user.service';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  photoForm: FormGroup;
  file: File;
  preview: string;
  progress = 0;

  constructor(private formBuilder: FormBuilder, 
              private photoService: PhotoService, 
              private router: Router,
              private alertService: AlertService,
              private userService: UserService) { }

  ngOnInit() {
    this.photoForm = this.formBuilder.group({
      file: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(300)]],
      allowComments: [true]
    });
  }

  upload() {
    const description = this.photoForm.get('description').value;
    const allowComments = this.photoForm.get('allowComments').value;
    this.photoService.upload(description, allowComments, this.file)
      .pipe(finalize( () => this.router.navigate(['/user', this.userService.getUserName()]) ))
      .subscribe(
        (event: HttpEvent<any>) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.alertService.success('Upload complete', true);
          }                   
        },
        () => this.alertService.danger('Upload failed!', true)
      );
  }

  handleFile(file: File) {
    const reader = new FileReader();
    reader.onload = (event: any) => this.preview = event.target.result;
    reader.readAsDataURL(file);
    this.file = file;
  }
}
