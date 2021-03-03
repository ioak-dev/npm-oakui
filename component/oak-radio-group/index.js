var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, customElement, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { formControlRegisterSubject } from '../../_internal/events/FormControlRegisterEvent';
import { formControlValidatedSubject } from '../../_internal/events/FormControlValidatedEvent';
import { formControlValidateSubject } from '../../_internal/events/FormControlValidateEvent';
import { globalStyles } from '../../_internal/styles/global-styles';
import { UserDefinedValidator } from '../../_internal/validator/UserDefinedValidator';
import '../../_internal/component/oak-internal-label';
import '../../_internal/component/oak-internal-form-tooltip';
import '../../_internal/component/oak-internal-form-error';
import { oakRadioGroupStyles } from './index-styles';
import { radioChangeSubject } from '../../_internal/events/RadioChangeEvent';
import { INPUT_CHANGE_EVENT } from '../../event/OakInputEvent';
let elementIdCounter = 0;
/**
 * Radio button group component.
 *
 */
const customElementName = 'oak-radio-group';
let OakRadioGroup = class OakRadioGroup extends LitElement {
    constructor() {
        super();
        this.elementId = `${customElementName}-${elementIdCounter++}`;
        this.name = '';
        this.value = '';
        this.tooltip = '';
        this.label = '';
        /**
         * 	If true, the element will have a bottom margin.
         */
        this.gutterBottom = false;
        this.radioGroupName = this.elementId;
        /**
         * @private
         */
        this._errors = [];
        this._handleChange = (value) => {
            this.propagateEvent(INPUT_CHANGE_EVENT, value);
        };
        this.propagateEvent = (eventName, value) => {
            this.dispatchEvent(new CustomEvent(eventName, {
                bubbles: true,
                composed: true,
                detail: {
                    id: this.elementId,
                    name: this.name,
                    value,
                },
            }));
        };
    }
    connectedCallback() {
        super.connectedCallback();
        this.formControlInit();
        this.radioInit();
    }
    radioInit() {
        radioChangeSubject.asObservable().subscribe((message) => {
            console.log('**from radio group change**', message);
            if (message.radioGroupName === this.radioGroupName) {
                this._handleChange(message.name);
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
        if (this.validatorFunction) {
            this._errors = this._errors.concat(UserDefinedValidator(this.validatorFunction, this.value, this.name, this.formGroupName));
        }
        formControlValidatedSubject.next({
            formGroupName: this.formGroupName || '',
            formControlName: this.name,
            isValid: this._errors.length === 0,
            formControlValue: this.value,
            errors: this._errors,
        });
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
        return [...globalStyles, oakRadioGroupStyles];
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
], OakRadioGroup.prototype, "name", void 0);
__decorate([
    property({ type: String })
], OakRadioGroup.prototype, "value", void 0);
__decorate([
    property({ type: String })
], OakRadioGroup.prototype, "tooltip", void 0);
__decorate([
    property({ type: String })
], OakRadioGroup.prototype, "label", void 0);
__decorate([
    property({ type: Boolean })
], OakRadioGroup.prototype, "gutterBottom", void 0);
__decorate([
    property({ type: String })
], OakRadioGroup.prototype, "radioGroupName", void 0);
__decorate([
    property({ type: String })
], OakRadioGroup.prototype, "formGroupName", void 0);
__decorate([
    property({ type: Function })
], OakRadioGroup.prototype, "validatorFunction", void 0);
__decorate([
    property({ type: Array })
], OakRadioGroup.prototype, "_errors", void 0);
OakRadioGroup = __decorate([
    customElement(customElementName)
], OakRadioGroup);
export { OakRadioGroup };
//# sourceMappingURL=index.js.map