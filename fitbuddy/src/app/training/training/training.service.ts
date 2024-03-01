import { Subject, BehaviorSubject } from "rxjs";
import { Exercise } from "./exercise.module";
import { Injectable } from "@angular/core";
import {
  DocumentData,
  Firestore,
  collection,
  collectionData,
} from "@angular/fire/firestore";
import { switchMap, take } from "rxjs/operators";

@Injectable()
export class TrainingService {
  // Subject to notify changes in the current exercise
  exerciseChanged = new Subject<Exercise | null>();
  // Subject to notify changes in the list of available exercises
  exercisesChanged = new Subject<Exercise[]>();

  // BehaviorSubject to hold the list of available exercises
  private availableExercises: BehaviorSubject<Exercise[]> = new BehaviorSubject<Exercise[]>([]);
  // Currently running exercise
  private runningExercise: any | null;

  // Array to hold completed or cancelled exercises
  private exercises!: Exercise[];

  constructor(private db: Firestore) {}

  // Method to fetch available exercises from the database
  fetchAvaibleExercises() {
    // Get a reference to the "avaiableExercises" collection in the database
    const exercisesInstance = collection(this.db, "avaiableExercises");
    // Get an Observable that emits an array of DocumentData whenever the collection changes
    collectionData(exercisesInstance)
      // Use switchMap to combine the Observable returned by collectionData with a new Observable
      .pipe(
        switchMap((exercises: DocumentData[]) => {
          // Map the DocumentData to Exercise objects and assign them to availableExercises
          this.availableExercises.next(
            exercises.map((exerciseData: DocumentData) => {
              return {
                id: exerciseData["id"],
                name: exerciseData["name"],
                duration: exerciseData["duration"],
                calories: exerciseData["calories"],
              };
            })
          );
          // Return an Observable that emits only once
          return this.availableExercises.pipe(take(1));
        })
      )
      // Subscribe to the Observable returned by switchMap
      .subscribe((exercises: Exercise[]) => {
        // Notify changes in the list of available exercises
        this.exercisesChanged.next([...exercises]);
      });
  }

  // Method to start an exercise
  startExercise(selectedId: string) {
    // Find the selected exercise in the list of available exercises
    this.runningExercise = this.availableExercises.value.find(
      (ex: any) => ex.id === selectedId
    );
    // Notify changes in the current exercise
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  // Method to complete an exercise
  completeExercise() {
    // Add the current exercise to the list of completed exercises
    this.exercises.push({
      ...this.runningExercise,
      date: new Date(),
      state: "completed",
    });
    // Reset the current exercise
    this.runningExercise = null;
    // Notify changes in the current exercise
    this.exerciseChanged.next(null);
  }

  // Method to cancel an exercise
  cancelExercise(progress: number) {
    // Add the current exercise to the list of cancelled exercises
    this.exercises.push({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: "cancelled",
    });
    // Reset the current exercise
    this.runningExercise = null;
    // Notify changes in the current exercise
    this.exerciseChanged.next(null);
  }

  // Method to get the currently running exercise
  getRunningExercise() {
    return { ...this.runningExercise };
  }

  // Method to get the list of completed or cancelled exercises
  getCompletedOrCancelledExercises() {
    return this.exercises.slice();
  }
}
