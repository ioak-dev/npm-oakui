var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, customElement, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { checkboxChangeSubject } from '../../_internal/events/CheckboxChangeEvent';
import { checkboxRegisterSubject } from '../../_internal/events/CheckboxRegisterEvent';
import { formControlRegisterSubject } from '../../_internal/events/FormControlRegisterEvent';
import { formControlValidatedSubject } from '../../_internal/events/FormControlValidatedEvent';
import { formControlValidateSubject } from '../../_internal/events/FormControlValidateEvent';
import { globalStyles } from '../../_internal/styles/global-styles';
import { CheckedCountValidator } from '../../_internal/validator/CheckedCountValidator';
import { UserDefinedValidator } from '../../_internal/validator/UserDefinedValidator';
import '../../_internal/component/oak-internal-label';
import '../../_internal/component/oak-internal-form-tooltip';
import '../../_internal/component/oak-internal-form-error';
import { oakCheckboxGroupStyles } from './index-styles';
let elementIdCounter = 0;
/**
 * Checkbox component.
 *
 */
const customElementName = 'oak-checkbox-group';
let OakCheckboxGroup = class OakCheckboxGroup extends LitElement {
    constructor() {
        super();
        this.elementId = `${customElementName}-${elementIdCounter++}`;
        this.name = '';
        this.tooltip = '';
        this.label = '';
        /**
         * 	If true, the element will have a bottom margin.
         */
        this.gutterBottom = false;
        this.checkboxGroupName = this.elementId;
        /**
         * @private
         */
        this._errors = [];
        this.checkboxList = {};
    }
    connectedCallback() {
        super.connectedCallback();
        this.formControlInit();
        this.checkboxInit();
    }
    checkboxInit() {
        checkboxRegisterSubject.asObservable().subscribe((message) => {
            if (message.checkboxGroupName === this.checkboxGroupName) {
                this.checkboxList = Object.assign(Object.assign({}, this.checkboxList), { [message.name]: message.value });
            }
        });
        checkboxChangeSubject.asObservable().subscribe((message) => {
            if (message.checkboxGroupName === this.checkboxGroupName) {
                this.checkboxList = Object.assign(Object.assign({}, this.checkboxList), { [message.name]: message.value });
            }
        });
    }
    formControlInit() {
        if (this.formGroupName) {
            formControlRegisterSubject.next({
                formControlName: this.name,
                formGroupName: this.formGroupName,
            });
            formControlValidateSubject
                .asObservable()
                .subscribe((message) => {
                if (message.formGroupName === this.formGroupName) {
                    this._validate();
                }
            });
        }
    }
    _validate() {
        this._errors = [];
        if (this.min || this.max) {
            this._errors = this._errors.concat(CheckedCountValidator(this._getValue(), this.min, this.max));
        }
        if (this.validatorFunction) {
            this._errors = this._errors.concat(UserDefinedValidator(this.validatorFunction, this.checkboxList, this.name, this.formGroupName));
        }
        formControlValidatedSubject.next({
            formGroupName: this.formGroupName || '',
            formControlName: this.name,
            isValid: this._errors.length === 0,
            formControlValue: this._getValue(),
            errors: this._errors,
        });
    }
    // private _handleChange = () => {
    //   this.propagateEvent(INPUT_CHANGE_EVENT);
    //   this.propagateEvent(INPUT_INPUT_EVENT);
    // };
    // private propagateEvent = (eventName: string) => {
    //   this.dispatchEvent(
    //     new CustomEvent(eventName, {
    //       bubbles: true,
    //       composed: true,
    //       detail: {
    //         id: this.elementId,
    //         name: this.name,
    //         value: this._getValue(),
    //       },
    //     })
    //   );
    // };
    _getValue() {
        const _value = [];
        Object.keys(this.checkboxList).forEach((key) => {
            if (this.checkboxList[key]) {
                _value.push(key);
            }
        });
        return _value;
    }
    getClassMap(baseClass) {
        switch (baseClass) {
            case 'base':
                return {
                    [customElementName]: true,
                    'oak-gutter-bottom': this.gutterBottom,
                };
            default:
                return {};
        }
    }
    static get styles() {
        return [...globalStyles, oakCheckboxGroupStyles];
    }
    render() {
        const labelId = `${this.elementId}-label`;
        return html `
      <div class=${classMap(this.getClassMap('base'))}>
        <oak-internal-label
          .label=${this.label}
          elementId=${labelId}
          elementFor=${this.elementId}
        ></oak-internal-label>
        <slot></slot>
        <oak-internal-form-tooltip
          .tooltip=${this.tooltip}
        ></oak-internal-form-tooltip>
        <oak-internal-form-error
          .errors=${this._errors}
        ></oak-internal-form-error>
      </div>
    `;
    }
};
__decorate([
    property({ type: String })
], OakCheckboxGroup.prototype, "name", void 0);
__decorate([
    property({ type: String })
], OakCheckboxGroup.prototype, "tooltip", void 0);
__decorate([
    property({ type: String })
], OakCheckboxGroup.prototype, "label", void 0);
__decorate([
    property({ type: Boolean })
], OakCheckboxGroup.prototype, "gutterBottom", void 0);
__decorate([
    property({ type: String })
], OakCheckboxGroup.prototype, "checkboxGroupName", void 0);
__decorate([
    property({ type: String })
], OakCheckboxGroup.prototype, "formGroupName", void 0);
__decorate([
    property({ type: Function })
], OakCheckboxGroup.prototype, "validatorFunction", void 0);
__decorate([
    property({ type: Number })
], OakCheckboxGroup.prototype, "min", void 0);
__decorate([
    property({ type: Number })
], OakCheckboxGroup.prototype, "max", void 0);
__decorate([
    property({ type: Array })
], OakCheckboxGroup.prototype, "_errors", void 0);
OakCheckboxGroup = __decorate([
    customElement(customElementName)
], OakCheckboxGroup);
export { OakCheckboxGroup };
//# sourceMappingURL=index.js.map