import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent implements OnInit {
  loginForm: any;

  

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl("", {
        validators: [Validators.email, Validators.required],
      }),
      password: new FormControl("", { validators: Validators.required }),
    });

  }

  onSubmit() {
    this.authService.login({
      email: this.loginForm.email,
      password: this.loginForm.password,
    });
  }
}
