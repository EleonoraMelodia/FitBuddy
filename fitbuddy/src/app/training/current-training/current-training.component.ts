import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { StopTrainingComponent } from "./stop-training.component";
import { TrainingService } from "../training/training.service";
@Component({
  selector: "app-current-training",
  templateUrl: "./current-training.component.html",
  styleUrl: "./current-training.component.css",
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: any;

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService
  ) {}
  ngOnInit(): void {
    this.startOrResumeTimer();
  }
  startOrResumeTimer() {
    const step =
      (this.trainingService.getRunningExercise().duration / 100) * 1000;

    this.timer = setInterval(() => {
      this.progress += 5;
      if (this.progress >= 100) {
        this.trainingService.completeExercise();
        clearInterval(this.timer);
      }
    }, step);
  }

  onStop() {
    clearInterval(this.timer);
    const dialog = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress,
      },
    });

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.trainingService.cancelExercise(this.progress);
      } else {
        this.startOrResumeTimer();
      }
    });
  }
}
