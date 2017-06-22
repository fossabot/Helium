import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'form-select',
    template: `
        <div class="dynamic-field form-select" [formGroup]="group">
            <md-select [placeholder]="config.label" [formControlName]="config.name">
                <md-option *ngFor="let option of config.options" [value]="option">
                    {{ option }}
                </md-option>
            </md-select>
        </div>`
})
export class FormSelectComponent {
    public config: any;
    public gruop: FormGroup;
}
