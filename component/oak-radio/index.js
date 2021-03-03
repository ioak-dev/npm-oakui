var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, customElement, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { radioChangeSubject } from '../../_internal/events/RadioChangeEvent';
import { radioRegisterSubject } from '../../_internal/events/RadioRegisterEvent';
import { globalStyles } from '../../_internal/styles/global-styles';
import { oakRadioStyles } from './index-styles';
let elementIdCounter = 0;
/**
 * Radio button component.
 *
 */
const customElementName = 'oak-radio';
let OakRadio = class OakRadio extends LitElement {
    constructor() {
        super();
        this.elementId = `${customElementName}-${elementIdCounter++}`;
        this.name = '';
        this.color = 'primary';
        this.size = 'small';
        /**
         * 	If true, the element will have a bottom margin.
         */
        this.gutterBottom = false;
        this.radioGroupName = '';
        this._value = false;
        this._handleChange = () => {
            radioChangeSubject.next({
                name: this.name,
                radioGroupName: this.radioGroupName,
            });
        };
    }
    connectedCallback() {
        super.connectedCallback();
        this.init();
    }
    init() {
        if (this.radioGroupName) {
            radioRegisterSubject.next({
                name: this.name,
                radioGroupName: this.radioGroupName,
            });
        }
        radioChangeSubject.asObservable().subscribe((message) => {
            if (message.radioGroupName === this.radioGroupName) {
                this._value = message.name === this.name;
            }
        });
    }
    getClassMap(baseClass) {
        switch (baseClass) {
            case 'base':
                return {
                    [customElementName]: true,
                    'oak-gutter-bottom': this.gutterBottom,
                };
            case 'input-container':
                return {
                    [`${customElementName}__${baseClass}`]: true,
                };
            case 'radio-svg':
            case 'radio-svg-dot':
                const _baseClass = 'radio-svg';
                return {
                    [`${customElementName}__${_baseClass}`]: true,
                    [`${customElementName}__${_baseClass}--color-${this.color}`]: true,
                    [`${customElementName}__${_baseClass}--checked`]: this._value,
                    [`${customElementName}__${_baseClass}--notchecked`]: !this._value,
                    [`${customElementName}__${_baseClass}--size-${this.size}`]: true,
                    [`${customElementName}__${_baseClass}--dot`]: baseClass === 'radio-svg-dot',
                };
            case 'input':
                return {
                    [`${customElementName}__${baseClass}`]: true,
                    [`${customElementName}__${baseClass}--hidden`]: true,
                };
            case 'label-container':
                return {
                    [`${customElementName}__${baseClass}`]: true,
                };
            case 'label':
                return {
                    [`${customElementName}__${baseClass}`]: true,
                };
            default:
                return {};
        }
    }
    static get styles() {
        return [...globalStyles, oakRadioStyles];
    }
    render() {
        return html `
      <label class=${classMap(this.getClassMap('base'))}>
        <span class=${classMap(this.getClassMap('input-container'))}>
          <input
            class=${classMap(this.getClassMap('input'))}
            type="checkbox"
            name=${this.name}
            ?checked=${this._value}
            id=${this.elementId}
            @change=${this._handleChange}
          />
          ${this._value
            ? html ` <svg
                  class=${classMap(this.getClassMap('radio-svg'))}
                  focusable="false"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
                  ></path>
                </svg>
                <svg
                  class=${classMap(this.getClassMap('radio-svg-dot'))}
                  focusable="false"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"
                  ></path>
                </svg>`
            : html ` <svg
                class=${classMap(this.getClassMap('radio-svg'))}
                focusable="false"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
                ></path>
              </svg>`}
        </span>
        <span class=${classMap(this.getClassMap('label-container'))}>
          <slot></slot>
        </span>
      </label>
    `;
    }
};
__decorate([
    property({ type: String })
], OakRadio.prototype, "name", void 0);
__decorate([
    property({ type: String })
], OakRadio.prototype, "color", void 0);
__decorate([
    property({ type: String })
], OakRadio.prototype, "size", void 0);
__decorate([
    property({ type: Boolean })
], OakRadio.prototype, "gutterBottom", void 0);
__decorate([
    property({ type: String })
], OakRadio.prototype, "radioGroupName", void 0);
__decorate([
    property({ type: String })
], OakRadio.prototype, "_value", void 0);
OakRadio = __decorate([
    customElement(customElementName)
], OakRadio);
export { OakRadio };
//# sourceMappingURL=index.js.map