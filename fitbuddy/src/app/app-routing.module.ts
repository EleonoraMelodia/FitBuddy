import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WelcomeComponent } from "./welcome/welcome.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { LoginComponent } from "./auth/login/login.component";
import { TrainingComponent } from "./training/training/training.component";
import { AuthGuard } from "./auth/auth.guard";
import { RecipesComponent } from "./recipes/recipes.component";
import { CalendarComponent } from "./calendar/calendar.component";

const routes: Routes = [
  {
    path: "",
    component: WelcomeComponent,
  },
{
  path: "sign-up",
  component: SignupComponent,
},
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "training",
    component: TrainingComponent, /* canActivate: [AuthGuard] */
  },
  {
    path: "recipes",
    component: RecipesComponent, /* canActivate: [AuthGuard] */
  },
  {
    path: "calendar",
    component: CalendarComponent, /* canActivate: [AuthGuard] */
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
