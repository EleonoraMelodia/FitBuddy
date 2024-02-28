import { Component, OnInit, OnDestroy } from "@angular/core";
import { Firestore, collection, collectionData, DocumentData } from "@angular/fire/firestore";
import { Subscription } from "rxjs";
import { Observable } from "rxjs-compat";
import { Exercise } from "../training/exercise.module";
import { NgForm } from "@angular/forms";
import { TrainingService } from "../training/training.service";

@Component({
  selector: "app-new-training",
  templateUrl: "./new-training.component.html",
  styleUrls: ["./new-training.component.css"],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: any = [];
  private subscription!: Subscription;

  constructor(
    private trainingService: TrainingService,
    private firestore: Firestore
  ) {}

  ngOnInit(): void {
    this.subscription = collectionData(
      collection(this.firestore, "avaiableExercises")
    ).subscribe((data: DocumentData[]) => {
      this.exercises = data;
      console.log(this.exercises);
    });
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
