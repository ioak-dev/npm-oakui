var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, customElement, property } from 'lit-element';
import { globalStyles } from '../../_internal/styles/global-styles';
import '../../_internal/component/oak-internal-label';
import { formControlRegisterSubject } from '../../_internal/events/FormControlRegisterEvent';
import { formControlSubmitSubject } from '../../_internal/events/FormControlSubmitEvent';
import { FORM_SUBMIT_EVENT, FORM_RESET_EVENT } from '../../event/OakFormEvent';
import { formControlValidateSubject } from '../../_internal/events/FormControlValidateEvent';
import { formControlValidatedSubject } from '../../_internal/events/FormControlValidatedEvent';
import { formControlResetSubject } from '../../_internal/events/FormControlResetEvent';
let elementIdCounter = 0;
/**
 * Text box form element.
 *
 */
let OakForm = class OakForm extends LitElement {
    constructor() {
        super();
        this.elementId = `oak-form-${elementIdCounter++}`;
        this.formGroupName = '';
        this.formControlNameList = [];
        this.validationResults = [];
        this.handleSubmit = (formControlEvent) => {
            this.propagateEvent(FORM_SUBMIT_EVENT, formControlEvent);
            this.validationResults = [];
        };
        this.handleReset = (formControlEvent) => {
            this.propagateEvent(FORM_RESET_EVENT, formControlEvent);
        };
        this.propagateEvent = (eventName, formControlEvent) => {
            this.dispatchEvent(new CustomEvent(eventName, {
                bubbles: true,
                composed: true,
                detail: formControlEvent,
            }));
        };
    }
    connectedCallback() {
        super.connectedCallback();
        this.init();
    }
    init() {
        formControlRegisterSubject.asObservable().subscribe((message) => {
            if (message.formGroupName === this.formGroupName) {
                this.formControlNameList.push(message.formControlName);
            }
        });
        formControlSubmitSubject.asObservable().subscribe((message) => {
            if (message.formGroupName === this.formGroupName) {
                formControlValidateSubject.next({
                    formGroupName: message.formGroupName,
                });
            }
        });
        formControlResetSubject.asObservable().subscribe((message) => {
            if (message.formGroupName === this.formGroupName) {
                this.handleReset({ formGroupName: message.formGroupName });
            }
        });
        formControlValidatedSubject.asObservable().subscribe((message) => {
            if (message.formGroupName === this.formGroupName) {
                this.validationResults.push(message);
                if (this.validationResults.length === this.formControlNameList.length) {
                    this.handleSubmit({
                        isValid: !this.validationResults.find((item) => !item.isValid),
                        validationResults: this.validationResults,
                    });
                }
            }
        });
    }
    static get styles() {
        return [...globalStyles];
    }
    render() {
        return html `
      <form
        method="GET"
        @submit=${this.handleSubmit}
        novalidate
        id=${this.elementId}
      >
        <slot></slot>
      </form>
    `;
    }
};
__decorate([
    property({ type: String })
], OakForm.prototype, "formGroupName", void 0);
OakForm = __decorate([
    customElement('oak-form')
], OakForm);
export { OakForm };
//# sourceMappingURL=index.js.map