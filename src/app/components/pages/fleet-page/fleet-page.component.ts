import { Component } from '@angular/core';
import { SearchFleetComponent } from './search-fleet/search-fleet.component';
import { SearchFormComponent } from '../../search-form/search-form.component';

@Component({
    selector: 'app-fleet-page',
    imports: [SearchFleetComponent],
    templateUrl: './fleet-page.component.html',
    styleUrl: './fleet-page.component.css'
})
export class FleetPageComponent {}
