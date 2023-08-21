import { Component, OnInit } from '@angular/core';
import { trips } from '../data/trips';
import {Router } from '@angular/router';

@Component({
  selector: 'app-trip-listing',
  templateUrl: './trip-listing.component.html',
  styleUrls: ['./trip-listing.component.css']
})
export class TripListingComponent implements OnInit {

  trips: Array<any> = [];

  message: string;

  constructor( 
    private router: Router
  ){}

  private addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  ngOnInit(): void {
    this.loadTrips();
  }

  private loadTrips(): void {
    console.log('Inside TripListingComponent#loadTrips');
    this.trips = trips;
    this.message = this.trips.length > 0 ? '' : 'No trips found';
  }
}
