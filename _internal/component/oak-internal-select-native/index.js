var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, customElement, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { formControlRegisterSubject } from '../../events/FormControlRegisterEvent';
import { formControlValidatedSubject } from '../../events/FormControlValidatedEvent';
import { formControlValidateSubject } from '../../events/FormControlValidateEvent';
import { globalStyles } from '../../styles/global-styles';
import { INPUT_CHANGE_EVENT, INPUT_INPUT_EVENT, } from '../../../event/OakInputEvent';
import '../oak-internal-label';
import '../oak-internal-form-tooltip';
import '../oak-internal-form-error';
import { oakInternalSelectNativeStyles } from './index-styles';
import { oakInternalSelectNativeSizeStyles } from './size-styles';
let elementIdCounter = 0;
const customElementName = 'oak-internal-select-native';
/**
 * Select drop down (native) form element.
 *
 */
let OakInternalSelectNative = class OakInternalSelectNative extends LitElement {
    constructor() {
        super();
        this.elementId = `${customElementName}-${elementIdCounter++}`;
        this.label = null;
        this.placeholder = '';
        this.multiple = false;
        this.tooltip = '';
        this.name = this.elementId;
        this.disabled = false;
        this.size = 'small';
        this.shape = 'rectangle';
        this.fill = 'surface';
        /**
         * 	If true, the text will have a bottom margin.
         */
        this.gutterBottom = false;
        /**
         * Validators
         *
         */
        /**
         * @private
         */
        this._errors = [];
        this.getClassMap = (baseClass) => {
            switch (baseClass) {
                case 'base':
                    return {
                        [customElementName]: true,
                        'oak-gutter-bottom': this.gutterBottom,
                    };
                case 'select':
                    return {
                        [`${customElementName}--${baseClass}`]: true,
                        'validation-failure': this._errors.length > 0,
                        [`oak-shape-${this.shape}`]: true,
                        [`oak-fill-${this.fill}`]: true,
                        [`oak-fill-${this.fill}--hover`]: true,
                        [`${customElementName}--size-${this.size}`]: true,
                    };
                default:
                    return {};
            }
        };
        this.handleInput = (event) => {
            console.log('input', event);
            this.propagateEvent(INPUT_INPUT_EVENT, event);
        };
        this.handleChange = (event) => {
            console.log('change', event);
            this.propagateEvent(INPUT_CHANGE_EVENT, event);
            // (this.closest('FORM') as any)?.dispatchEvent(new Event('submit'));
        };
        this.propagateEvent = (eventName, event, value) => {
            this.value = event.srcElement.value;
            this.dispatchEvent(new CustomEvent(eventName, {
                bubbles: true,
                composed: true,
                detail: {
                    id: event.srcElement.id,
                    name: event.srcElement.name,
                    value: value || event.srcElement.value,
                },
            }));
        };
    }
    connectedCallback() {
        super.connectedCallback();
        this.init();
    }
    init() {
        if (this.formGroupName) {
            formControlRegisterSubject.next({
                formControlName: this.name,
                formGroupName: this.formGroupName,
            });
            formControlValidateSubject
                .asObservable()
                .subscribe((message) => {
                if (message.formGroupName === this.formGroupName) {
                    this.validate();
                }
            });
        }
    }
    validate() {
        this._errors = [];
        formControlValidatedSubject.next({
            formGroupName: this.formGroupName || '',
            formControlName: this.name,
            isValid: this._errors.length === 0,
            formControlValue: this.value,
            errors: this._errors,
        });
    }
    static get styles() {
        return [
            ...globalStyles,
            oakInternalSelectNativeStyles,
            oakInternalSelectNativeSizeStyles,
        ];
    }
    render() {
        var _a, _b;
        const labelId = `${this.elementId}-label`;
        return html `
      <div class=${classMap(this.getClassMap('base'))} id=${this.elementId}>
        <oak-internal-label
          .label=${this.label}
          elementId=${labelId}
          elementFor=${this.elementId}
        ></oak-internal-label>
        <select
          class=${classMap(this.getClassMap('select'))}
          aria-labelledby=${labelId}
          name=${this.name}
          id=${this.elementId}
          .value=${this.value}
          placeholder=${this.placeholder}
          ?disabled=${this.disabled}
          ?multiple=${this.multiple}
          @change=${this.handleChange}
          @input=${this.handleInput}
        >
          ${(_a = this.options) === null || _a === void 0 ? void 0 : _a.map((option) => html ` <option value=${option} key=${option}>${option}</option>`)}
          ${(_b = this.optionsAsKeyValue) === null || _b === void 0 ? void 0 : _b.map((option) => html ` <option value=${option.value} key=${option.key}
                >${option.value}</option
              >`)}
        </select>
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
], OakInternalSelectNative.prototype, "formGroupName", void 0);
__decorate([
    property({ type: String })
], OakInternalSelectNative.prototype, "label", void 0);
__decorate([
    property()
], OakInternalSelectNative.prototype, "value", void 0);
__decorate([
    property({ type: String })
], OakInternalSelectNative.prototype, "placeholder", void 0);
__decorate([
    property({ type: Boolean })
], OakInternalSelectNative.prototype, "multiple", void 0);
__decorate([
    property({ type: String })
], OakInternalSelectNative.prototype, "tooltip", void 0);
__decorate([
    property({ type: String })
], OakInternalSelectNative.prototype, "name", void 0);
__decorate([
    property({ type: Boolean })
], OakInternalSelectNative.prototype, "disabled", void 0);
__decorate([
    property({ type: Array })
], OakInternalSelectNative.prototype, "options", void 0);
__decorate([
    property({ type: Array })
], OakInternalSelectNative.prototype, "optionsAsKeyValue", void 0);
__decorate([
    property({ type: String })
], OakInternalSelectNative.prototype, "size", void 0);
__decorate([
    property({ type: String })
], OakInternalSelectNative.prototype, "shape", void 0);
__decorate([
    property({ type: String })
], OakInternalSelectNative.prototype, "fill", void 0);
__decorate([
    property({ type: Boolean })
], OakInternalSelectNative.prototype, "gutterBottom", void 0);
__decorate([
    property({ type: Array })
], OakInternalSelectNative.prototype, "_errors", void 0);
OakInternalSelectNative = __decorate([
    customElement(customElementName)
], OakInternalSelectNative);
export { OakInternalSelectNative };
//# sourceMappingURL=index.js.map