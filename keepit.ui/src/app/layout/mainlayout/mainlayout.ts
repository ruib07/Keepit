import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../header/header';

@Component({
  selector: 'app-mainlayout',
  standalone: true,
  imports: [RouterOutlet, Header],
  templateUrl: './mainlayout.html',
})
export class Mainlayout {}
