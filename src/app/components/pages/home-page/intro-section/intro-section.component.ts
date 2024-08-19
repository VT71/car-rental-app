import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-intro-section',
  standalone: true,
  imports: [MatIconModule, MatInputModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './intro-section.component.html',
  styleUrl: './intro-section.component.css',
})
export class IntroSectionComponent {}
