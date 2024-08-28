import { Component } from '@angular/core';
import { SearchFormComponent } from "../../../search-form/search-form.component";

@Component({
  selector: 'app-search-fleet',
  standalone: true,
  imports: [SearchFormComponent],
  templateUrl: './search-fleet.component.html',
  styleUrl: './search-fleet.component.css'
})
export class SearchFleetComponent {

}
