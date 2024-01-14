import {MatSnackBar, MatSnackBarRef} from "@angular/material/snack-bar";
import {Injectable} from "@angular/core";
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private snackBar: MatSnackBar) { }

  error(message: string): MatSnackBarRef<any> {
    return this.snackBar.open(message, 'OK', {
      duration: 10000,
      panelClass: ['error-snackbar']
    })
  }
  success(message: string): MatSnackBarRef<any> {
    return  this.snackBar.open(message, 'OK', {
      duration: 2000,
      panelClass: ['success-snackbar']
    })
  }

  info(message: string): MatSnackBarRef<any> {
    return this.snackBar.open(message, 'OK', {
      duration: 2000,
      panelClass: ['info-snackbar']
    })
  }
}
