import { Injectable, Type } from '@angular/core';
import { AutocompleteControlComponent } from '../dynamic-controls/autocomplete-control.component';
import { CheckboxControlComponent } from '../dynamic-controls/checkbox-control.component';
import { DateTimeControlComponent } from '../dynamic-controls/date-time-control.component';
import { EnumeratedControlComponent } from '../dynamic-controls/enumerated-control.component';
import { InputControlComponent } from '../dynamic-controls/input-control.component';
import { FormControlType } from '../form-control-spec.interface';

/**
 * Maps FormControlTypes to component types. Exists as a service instead of a
 * function primarily for testing purposes.
 */
@Injectable()
export class ComponentMapperService {
    public componentFor(type: FormControlType): Type<any> {
        switch (type) {
            case 'autocomplete':
                return AutocompleteControlComponent;
            case 'text':
                return InputControlComponent;
            case 'enum':
                return EnumeratedControlComponent;
            case 'boolean':
                return CheckboxControlComponent;
            case 'date':
                return DateTimeControlComponent;
            default:
                throw new Error('No known component for type ' + type);
        }
    }
}
