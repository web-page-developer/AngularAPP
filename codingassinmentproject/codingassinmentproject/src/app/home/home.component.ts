import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
interface FlightInfoPayload {
  airline: string;
  arrivalDate: string;
  arrivalTime: string;
  flightNumber: string;
  numOfGuests: number;
  Comments: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  API_URL =
    'https://us-central1-crm-sdk.cloudfunctions.net/flightInfoChallenge';
  token =
    'WW91IG11c3QgYmUgdGhlIGN1cmlvdXMgdHlwZS4gIEJyaW5nIHRoaXMgdXAgYXQgdGhlIGludGVydmlldyBmb3IgYm9udXMgcG9pbnRzICEh';
  title = 'codingassinmentproject';
  candidate = '';
  airline = '';
  flightinfopayload: FlightInfoPayload = {
    airline: '',
    arrivalDate: '',
    arrivalTime: '',
    flightNumber: '',
    numOfGuests: 0,
    Comments: '',
  };
  errormessaage = '';
  successMessage = '';

  constructor(private http: HttpClient, private router: Router) {}
  ngOnInit(): void {
    console.log(localStorage.getItem('user'));

    if (localStorage.getItem('user') == null) {
      this.router.navigate(['/login']);
    }
  }

  onSubmit() {
    if (!this.isFormValid()) {
      this.errormessaage = 'Please fill in all required fields marked with *.';
      this.successMessage = '';
    } else {
      const headers = new HttpHeaders({
        token: `${this.token}`, // Token header
        candidate: this.candidate, // Candidate header
      });

      console.log(this.flightinfopayload);

      this.http
        .post(this.API_URL, this.flightinfopayload, { headers })
        .subscribe(
          (response) => {
            console.log(response);
            this.successMessage = 'SuccessFull';
            this.resetForm();
          },
          (error) => {
            console.log(error.message);
            this.errormessaage = error.message;
          }
        );
    }
  }

  onLogout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  resetForm() {
    this.candidate = '';
    this.flightinfopayload = {
      airline: '',
      arrivalDate: '',
      arrivalTime: '',
      flightNumber: '',
      numOfGuests: 0,
      Comments: '',
    };
  }

  isFormValid() {
    return (
      this.candidate &&
      this.flightinfopayload.airline &&
      this.flightinfopayload.arrivalDate &&
      this.flightinfopayload.arrivalTime &&
      this.flightinfopayload.flightNumber &&
      this.flightinfopayload.numOfGuests !== null
    );
  }
}
