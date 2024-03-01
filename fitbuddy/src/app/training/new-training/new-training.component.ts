import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  Firestore,
  collection,
  collectionData,
  DocumentData,
} from "@angular/fire/firestore";
import { Subscription, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { NgForm } from "@angular/forms";
import { TrainingService } from "../training/training.service";
import { Exercise } from "../training/exercise.module";

@Component({
  selector: "app-new-training",
  templateUrl: "./new-training.component.html",
  styleUrls: ["./new-training.component.css"],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises!: Exercise[];
   exerciseSubscription!: Subscription;

  constructor(
    private trainingService: TrainingService) {}


  ngOnInit(): void {
  this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(exercises => this.exercises = exercises);
  this.trainingService.fetchAvaibleExercises();
}


  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  //on destroy the component unsubscripe to optimazing the app
  ngOnDestroy(): void {
    this.exerciseSubscription.unsubscribe();
  }
}
