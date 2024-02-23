import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";

import { Subscription } from "rxjs";
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: "app-sidenav-list",
  templateUrl: "./sidenav-list.component.html",
  styleUrl: "./sidenav-list.component.css",
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() sidenavClosing = new EventEmitter<void>();
  isAuth = false;
  authSubscription!: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(
      (authStatus) => (this.isAuth = authStatus)
    );
  }

    onLogout() {
      this.authService.logout();
      this.onClosingSidenav();

  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  onClosingSidenav() {
    this.sidenavClosing.emit();
  }
}
