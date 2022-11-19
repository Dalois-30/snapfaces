import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { FaceSnap } from '../core/models/face-snap.model';
import { FaceSnapsService } from '../services/face-snaps.service';

@Component({
  selector: 'app-single-face-snap-component',
  templateUrl: './single-face-snap-component.component.html',
  styleUrls: ['./single-face-snap-component.component.scss']
})
export class SingleFaceSnapComponentComponent implements OnInit {

  faceSnap$!: Observable<FaceSnap>;
  buttonText!: string;

  constructor(private faceSnapsService: FaceSnapsService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.buttonText = 'Oh Snap!'
    const snapId = +this.route.snapshot.params['id'];
    this.faceSnap$ = this.faceSnapsService.getFaceSnapById(snapId);
  }


  onSnap(faceSnapId: number) {
    if (this.buttonText === 'Oh Snap!') {
        this.faceSnap$ = this.faceSnapsService.snapFaceSnapById(faceSnapId, 'snap').pipe(
            tap(() => this.buttonText = 'Oops, unSnap!')
        );
    } else {
        this.faceSnap$ = this.faceSnapsService.snapFaceSnapById(faceSnapId, 'unsnap').pipe(
            tap(() => this.buttonText = 'Oh Snap!')
        );
    }
}
  onReturn() {
    this.router.navigateByUrl('/facesnaps')
  }
}
