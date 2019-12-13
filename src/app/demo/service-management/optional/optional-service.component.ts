import { Component, Input } from '@angular/core';
import { Service } from '../service.model';

@Component({
	selector: 'app-optional',
	templateUrl: './optional-service.component.html'
})
export class OptionalServiceComponent {
    @Input() public item = new Service();
    
	constructor() { }

}