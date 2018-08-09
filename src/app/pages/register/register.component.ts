import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';

import { AlifaceApiService } from '../../services/aliface-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  @ViewChild('video') videoElm: ElementRef;
  @ViewChild('canvas') canvasElm: ElementRef;
  name: string;
  captureData: string;
  userMessage: string;
  private isCameraActive = false;
  private cameraLabelActive = 'Take a photo';
  private cameraLabelInactive = 'Restart camera';
  cameraButtonLabel = this.cameraLabelActive;
  registerButtonLabel = 'Register this photo';

  readonly medias: MediaStreamConstraints = {
    audio: false,
    video: {
      facingMode: 'user',
    }
  };

  constructor(
    private apiService: AlifaceApiService,
  ) { }

  ngOnInit() {
    this.startCamera();
  }

  ngOnDestroy(): void {
    this.stopCamera();
  }

  private startCamera() {
    console.log('starting camera...');

    window.navigator.mediaDevices.getUserMedia(this.medias)
      .then(stream => {
        this.videoElm.nativeElement.srcObject = stream;
        this.isCameraActive = true;
      })
      .catch(error => {
        console.error(error);
        alert(error);
      });
  }

  onClickCamera() {
    if (this.isCameraActive) {
      this.captureData = this.draw();
      this.captureData = this.captureData.replace('data:image/png;base64,', '');

      this.stopCamera();

      this.cameraButtonLabel = this.cameraLabelInactive;
    } else {
      this.captureData = '';
      this.startCamera();

      this.cameraButtonLabel = this.cameraLabelActive;
    }
  }

  private draw() {
    const WIDTH = this.videoElm.nativeElement.clientWidth;
    const HEIGHT = this.videoElm.nativeElement.clientHeight;

    const ctx = this.canvasElm.nativeElement.getContext('2d') as CanvasRenderingContext2D;
    this.canvasElm.nativeElement.width  = WIDTH;
    this.canvasElm.nativeElement.height = HEIGHT;

    return this.canvasElm.nativeElement.toDataURL(
      ctx.drawImage(this.videoElm.nativeElement, 0, 0, WIDTH, HEIGHT)
    );
  }

  private stopCamera() {
    console.log('stopping camera...');

    this.videoElm.nativeElement.pause();
    if (this.videoElm.nativeElement.srcObject !== null) {
      const track = this.videoElm.nativeElement.srcObject.getTracks()[0] as MediaStreamTrack;
      track.stop();
    }

    this.isCameraActive = false;
  }

  onClickRegister() {
    this.registerPhoto();
  }

  isGoodToRegister = () => {
    // initial state is always active to promote click
    return this.captureData !== '' && this.name !== '';
  }

  private registerPhoto() {
    if (!this.name) {
      this.userMessage = 'Please fill name';
    } else if (!this.captureData) {
      this.userMessage = 'Please take photo';
    } else {
      this.apiService.addPhoto(this.name, this.captureData).subscribe(res => {
        console.log(res);
        this.userMessage = 'Registration done.';
      });
    }
  }

}
