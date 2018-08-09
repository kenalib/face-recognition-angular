import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';

import { AlifaceApiService } from '../../services/aliface-api.service';

@Component({
  selector: 'app-recognize',
  templateUrl: './recognize.component.html',
  styleUrls: ['./recognize.component.css']
})
export class RecognizeComponent implements OnInit, OnDestroy {

  @ViewChild('video') videoElm: ElementRef;
  @ViewChild('canvas') canvasElm: ElementRef;
  captureData: string;
  userMessage: string;
  imgSrc: string;

  private isCameraActive = false;
  private cameraLabelActive = 'Stop camera';
  private cameraLabelInactive = 'Start camera';
  cameraButtonLabel: string;
  private refreshIntervalId: number;
  private intervalMillSec = 3000;

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
        this.cameraButtonLabel = this.cameraLabelActive;
        this.refreshIntervalId = window.setInterval(() => {
          this.findAllInImage();
        }, this.intervalMillSec);
      })
      .catch(error => {
        console.error(error);
        alert(error);
      });
  }

  private stopCamera() {
    console.log('stopping camera...');

    this.videoElm.nativeElement.pause();
    const track = this.videoElm.nativeElement.srcObject.getTracks()[0] as MediaStreamTrack;
    track.stop();

    this.isCameraActive = false;
    this.cameraButtonLabel = this.cameraLabelInactive;
    window.clearInterval(this.refreshIntervalId);
  }

  onClickCamera() {
    if (this.isCameraActive) {
      this.stopCamera();
    } else {
      this.startCamera();
    }
  }

  public draw() {
    const WIDTH = this.videoElm.nativeElement.clientWidth;
    const HEIGHT = this.videoElm.nativeElement.clientHeight;

    const ctx = this.canvasElm.nativeElement.getContext('2d') as CanvasRenderingContext2D;
    this.canvasElm.nativeElement.width  = WIDTH;
    this.canvasElm.nativeElement.height = HEIGHT;

    return this.canvasElm.nativeElement.toDataURL(
      ctx.drawImage(this.videoElm.nativeElement, 0, 0, WIDTH, HEIGHT)
    );
  }

  private findAllInImage() {
    console.log('findAllInImage...');

    this.captureData = this.draw();
    this.captureData = this.captureData.replace('data:image/png;base64,', '');

    this.apiService.findAllInImage(this.captureData).subscribe(res => {
      const msg = res.persons.length + ' person found.';

      console.log(msg);
      this.userMessage = msg;

      this.imgSrc = 'data:image/png;base64,' + res.photo.toString();
    });
  }

}
