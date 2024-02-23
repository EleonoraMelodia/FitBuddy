import { Component, OnInit, Output, EventEmitter, OnDestroy } from "@angular/core";
import { AuthService } from "../../auth/auth.service";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { LogoutComponent } from "./logout.component";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();

  @Output() loggingOut = new EventEmitter<void>();

  isAuth = false ;
  authSubscription!: Subscription ;

  constructor(private authService : AuthService, private dialog : MatDialog) {}

  ngOnInit(): void {
   this.authSubscription = this.authService.authChange.subscribe(authStatus =>
      this.isAuth = authStatus )
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
    const dialog = this.dialog.open(LogoutComponent);
      dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.loggingOut.emit();
      }
      else { }
    });
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }
}
