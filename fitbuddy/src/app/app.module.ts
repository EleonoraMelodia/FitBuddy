import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatDialogModule } from "@angular/material/dialog"; // Importa MatDialogModule

import { AppRoutingModule } from "./app-routing.module";
import { MaterialModule } from "./material.module";
import { AppComponent } from "./app.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { LoginComponent } from "./auth/login/login.component";
import { TrainingComponent } from "./training/training/training.component";
import { CurrentTrainingComponent } from "./training/current-training/current-training.component";
import { NewTrainingComponent } from "./training/new-training/new-training.component";
import { PastTrainingsComponent } from "./training/past-trainings/past-trainings.component";
import { WelcomeComponent } from "./welcome/welcome.component";

import { HeaderComponent } from "./navigation/header/header.component";
import { SidenavListComponent } from "./navigation/sidenav-list/sidenav-list.component";
import { StopTrainingComponent } from "./training/current-training/stop-training.component";
import { provideHttpClient, withFetch } from "@angular/common/http";
import { AuthService } from "./auth/auth.service";
import { LogoutComponent } from "./navigation/header/logout.component";
import { TrainingService } from "./training/training/training.service";

import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";

@NgModule({
  declarations: [
    LogoutComponent,
    AppComponent,
    SignupComponent,
    LoginComponent,
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    StopTrainingComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    provideFirestore(() => getFirestore()),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: "fitbuddy-86219",
        appId: "1:839877927477:web:46b42cc59807000363877c",
        databaseURL:
          "https://fitbuddy-86219-default-rtdb.europe-west1.firebasedatabase.app",
        storageBucket: "fitbuddy-86219.appspot.com",
        apiKey: "AIzaSyB6b19TagWNJjYMSMrk-UXgm8ixUSAIySU",
        authDomain: "fitbuddy-86219.firebaseapp.com",
        messagingSenderId: "839877927477",
        measurementId: "G-2TPG2JDVSP",
      })
    ),
  ],
  providers: [AuthService, provideHttpClient(withFetch()), TrainingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
