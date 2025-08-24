import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { SearchFormComponent } from '../../../search-form/search-form.component';

@Component({
    selector: 'app-intro-section',
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
        provideNativeDateAdapter(),
    ],
    imports: [
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatDatepickerModule,
        MatButtonModule,
        SearchFormComponent
    ],
    templateUrl: './intro-section.component.html',
    styleUrl: './intro-section.component.css'
})
export class IntroSectionComponent {}
