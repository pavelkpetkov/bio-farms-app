import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.css']
})
export class DoneComponent implements OnInit {

   message: string = "Done!"

   constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    
    const observable = new Observable((subscriber)=> {
      subscriber.next(this.message);
      subscriber.complete();
    })
    const observer = {
      next: () => {
        console.log(this.message);
      },
      complete: ()=> {setTimeout( ()=> {this.router.navigate(['/profile'])}, 2000) }
    }
    observable.subscribe(observer);
  }
}
