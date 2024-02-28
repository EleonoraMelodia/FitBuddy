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
  exercises: Observable<DocumentData[]> = new Observable<DocumentData[]>();
  private subscription!: Subscription;

  constructor(
    private trainingService: TrainingService,
    private firestore: Firestore
  ) {}

  ngOnInit(): void {
    this.exercises = collectionData(
      collection(this.firestore, "avaiableExercises")
    );
  }


  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
