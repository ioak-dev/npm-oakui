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
import '../oak-internal-popup';
import { oakInternalSelectModernStyles } from './index-styles';
import { isEmptyOrSpaces, toString } from '../../utils/StringUtils';
import { INPUT_CHANGE_EVENT, INPUT_INPUT_EVENT, } from '../../../event/OakInputEvent';
import { RequiredValidator } from '../../validator/RequiredValidator';
import { oakInternalSelectModernSizeStyles } from './size-styles';
import { oakInternalSelectModernFillStyles } from './fill-styles';
let elementIdCounter = 0;
const customElementName = 'oak-internal-select-modern';
/**
 * Select drop down (native) form element.
 *
 */
let OakInternalSelectModern = class OakInternalSelectModern extends LitElement {
    constructor() {
        super();
        this.elementId = `${customElementName}-${elementIdCounter++}`;
        this.inputElementId = `${this.elementId}-input`;
        this.liElementId = `${this.elementId}-popup-li`;
        this.ulElementId = `${this.elementId}-popup-ul`;
        this._isActivated = false;
        this._currentIndex = 0;
        this._searchCriteria = '';
        this.label = null;
        this.placeholder = '';
        this.multiple = false;
        this.tooltip = '';
        this.name = this.elementId;
        this.disabled = false;
        this.options = [];
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
        this.handleChange = (index) => {
            if (this._isActivated) {
                this.propagateCustomEvent(INPUT_CHANGE_EVENT, this.search()[index]);
                this.propagateCustomEvent(INPUT_INPUT_EVENT, this.search()[index]);
                this._deactivate();
            }
        };
        this.search = () => {
            if (isEmptyOrSpaces(this._searchCriteria)) {
                return this.options;
            }
            else {
                return this.options.filter((option) => toString(option).includes(this._searchCriteria));
            }
        };
        this.keydownEventHandler = (event) => {
            switch (event.key) {
                case 'ArrowDown':
                    event.preventDefault();
                    this.navigateDown();
                    break;
                case 'ArrowUp':
                    event.preventDefault();
                    this.navigateUp();
                    break;
                case 'Enter':
                    event.preventDefault();
                    this.handleChange(this._currentIndex);
                    break;
                case 'Tab':
                    event.preventDefault();
                    this._deactivate();
                    break;
                default:
                    break;
            }
        };
        this.navigateUp = () => {
            var _a;
            if (this._currentIndex > 0) {
                const elRef = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById(`${this.liElementId}-${this._currentIndex - 1}`);
                if (elRef && !this.isScrolledIntoView(elRef)) {
                    elRef.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                        inline: 'start',
                    });
                }
                this._currentIndex = this._currentIndex - 1;
            }
            else {
                this._currentIndex = 0;
            }
        };
        this.isScrolledIntoView = (el, invertDirection = false) => {
            var _a;
            const rect = el.getBoundingClientRect();
            const elemTop = rect.top;
            const elemBottom = rect.bottom;
            const containerEl = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById(this.ulElementId);
            if (!containerEl) {
                return true;
            }
            // Only completely visible elements return true:
            let isVisible = true;
            if (invertDirection) {
                isVisible =
                    elemTop >= 0 &&
                        elemBottom <=
                            containerEl.getBoundingClientRect().height +
                                containerEl.getBoundingClientRect().top;
            }
            else {
                isVisible =
                    elemTop >= 0 &&
                        elemTop >=
                            containerEl.getBoundingClientRect().height +
                                containerEl.getBoundingClientRect().top;
            }
            // Partially visible elements return true:
            //isVisible = elemTop < containerEl.getBoundingClientRect().height && elemBottom >= 0;
            return isVisible;
        };
        this._activate = () => {
            var _a;
            this._isActivated = true;
            const chosenIndex = this._searchResults().findIndex((item) => item === this.value);
            this._currentIndex = chosenIndex < 0 ? 0 : chosenIndex;
            const docRef = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById(this.elementId);
            if (docRef) {
                docRef.addEventListener('keydown', this.keydownEventHandler);
            }
            setTimeout(() => {
                var _a;
                const inputElRef = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById(this.inputElementId);
                if (inputElRef) {
                    inputElRef.focus();
                }
            }, 201);
        };
        this._deactivate = () => {
            var _a;
            this._isActivated = false;
            this._searchCriteria = '';
            const docRef = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById(this.elementId);
            if (docRef) {
                docRef.removeEventListener('keydown', this.keydownEventHandler);
            }
        };
        this.handleKeydown = (event) => {
            if (this._isActivated) {
                this.keydownEventHandler(event.detail.value);
            }
        };
        this._searchResults = () => {
            if (isEmptyOrSpaces(this._searchCriteria)) {
                return this.options;
            }
            else {
                return this.options.filter((option) => toString(option).includes(this._searchCriteria));
            }
        };
        this.handleSearchCriteriaChange = (event) => {
            this._searchCriteria = event.srcElement.value;
            this._currentIndex = 0;
        };
        this.validate = () => {
            this._errors = [];
            this._errors = this._errors.concat(RequiredValidator(this.value));
            formControlValidatedSubject.next({
                formGroupName: this.formGroupName || '',
                formControlName: this.name,
                isValid: this._errors.length === 0,
                formControlValue: this.value,
                errors: this._errors,
            });
        };
        this.getClassMap = (baseClass, index) => {
            switch (baseClass) {
                case 'action':
                case 'value':
                case 'placeholder':
                case 'li-indicator':
                case 'li-text':
                    return {
                        [`${customElementName}__${baseClass}`]: true,
                    };
                case 'ul':
                    return {
                        [`${customElementName}__${baseClass}`]: true,
                        activated: this._isActivated,
                    };
                case 'li':
                    return {
                        [`${customElementName}__${baseClass}`]: true,
                        [`${customElementName}__${baseClass}--active`]: this._currentIndex === index,
                    };
                case 'margin':
                    return {
                        [`${customElementName}__${baseClass}`]: true,
                        'oak-gutter-bottom': this.gutterBottom,
                    };
                case 'search-filter':
                case 'popup':
                    return {
                        [`${customElementName}__${baseClass}`]: true,
                        [`${customElementName}__${baseClass}--fill-${this.fill}`]: true,
                    };
                case 'input':
                    return {
                        [`${customElementName}__${baseClass}`]: true,
                        [`${customElementName}__${baseClass}--size-${this.size}`]: true,
                        [`oak-shape-${this.shape}`]: true,
                        [`oak-fill-${this.fill}`]: true,
                        [`oak-fill-${this.fill}--hover`]: true,
                    };
                default:
                    return {};
            }
        };
        this.propagateCustomEvent = (eventName, value) => {
            this.dispatchEvent(new CustomEvent(eventName, {
                bubbles: true,
                composed: true,
                detail: {
                    id: this.elementId,
                    name: this.name,
                    value: value,
                },
            }));
        };
    }
    connectedCallback() {
        super.connectedCallback();
        this._registerEvents();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this._unregisterEvents();
    }
    _registerEvents() {
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
    _unregisterEvents() {
        //
    }
    navigateDown() {
        var _a;
        if (this._currentIndex < this.search().length - 1) {
            const elRef = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById(`${this.liElementId}-${this._currentIndex + 1}`);
            if (elRef && !this.isScrolledIntoView(elRef, true)) {
                elRef.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'start',
                });
            }
            this._currentIndex = this._currentIndex + 1;
        }
        else {
            this._currentIndex = 0;
        }
    }
    // private handleSearchCriteriaChange = (event: any) => {
    //   this._searchCriteria = event.detail.value;
    // };
    static get styles() {
        return [
            ...globalStyles,
            oakInternalSelectModernStyles,
            oakInternalSelectModernSizeStyles,
            oakInternalSelectModernFillStyles,
        ];
    }
    render() {
        const labelId = `${this.elementId}-label`;
        return html `
      <oak-internal-label
        .label=${this.label}
        id=${labelId}
        elementFor=${this.elementId}
      ></oak-internal-label>
      <oak-internal-popup
        .value=${this.value}
        .placeholder=${this.placeholder}
        .label=${this.label}
        .errors=${this._errors}
        @popup-activate=${this._activate}
        @popup-deactivate=${this._deactivate}
        @popup-key-pressed=${this.handleKeydown}
        ?isActivated=${this._isActivated}
        .size=${this.size}
        .shape=${this.shape}
        .fill=${this.fill}
      >
        <div
          slot="popup"
          class=${classMap(this.getClassMap('popup'))}
          id=${this.elementId}
        >
          <div class=${classMap(this.getClassMap('search-filter'))}>
            <input
              class=${classMap(this.getClassMap('input'))}
              type="text"
              placeholder="Type to filter"
              autocomplete="off"
              .value=${this._searchCriteria}
              id=${this.inputElementId}
              @input=${this.handleSearchCriteriaChange}
            />
          </div>
          <ul
            role="listbox"
            id=${this.ulElementId}
            class=${classMap(this.getClassMap('ul'))}
          >
            ${this._searchResults().map((item, index) => html `<li
                  id=${`${this.liElementId}-${index}`}
                  role="option"
                  class=${classMap(this.getClassMap('li', index))}
                  @click=${() => this.handleChange(index)}
                >
                  <div class=${classMap(this.getClassMap('li-indicator'))}>
                    ${this.value === item
            ? html `<svg
                          height="16"
                          viewBox="0 0 16 16"
                          version="1.1"
                          width="16"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"
                          ></path>
                        </svg>`
            : html ``}
                  </div>
                  <div class=${classMap(this.getClassMap('li-text'))}>
                    ${item}
                  </div>
                </li>`)}
            ${this._searchResults().length === 0
            ? html ` <li>No results found</li>`
            : html ``}
          </ul>
        </div>
      </oak-internal-popup>
      <oak-internal-form-tooltip
        .tooltip=${this.tooltip}
      ></oak-internal-form-tooltip>
      <oak-internal-form-error
        .errors=${this._errors}
      ></oak-internal-form-error>
      <div class=${classMap(this.getClassMap('margin'))}></div>
    `;
    }
};
__decorate([
    property({ type: Boolean })
], OakInternalSelectModern.prototype, "_isActivated", void 0);
__decorate([
    property({ type: Number })
], OakInternalSelectModern.prototype, "_currentIndex", void 0);
__decorate([
    property({ type: String })
], OakInternalSelectModern.prototype, "_searchCriteria", void 0);
__decorate([
    property({ type: String })
], OakInternalSelectModern.prototype, "formGroupName", void 0);
__decorate([
    property({ type: String })
], OakInternalSelectModern.prototype, "label", void 0);
__decorate([
    property()
], OakInternalSelectModern.prototype, "value", void 0);
__decorate([
    property({ type: String })
], OakInternalSelectModern.prototype, "placeholder", void 0);
__decorate([
    property({ type: Boolean })
], OakInternalSelectModern.prototype, "multiple", void 0);
__decorate([
    property({ type: String })
], OakInternalSelectModern.prototype, "tooltip", void 0);
__decorate([
    property({ type: String })
], OakInternalSelectModern.prototype, "name", void 0);
__decorate([
    property({ type: Boolean })
], OakInternalSelectModern.prototype, "disabled", void 0);
__decorate([
    property({ type: Array })
], OakInternalSelectModern.prototype, "options", void 0);
__decorate([
    property({ type: Array })
], OakInternalSelectModern.prototype, "optionsAsKeyValue", void 0);
__decorate([
    property({ type: String })
], OakInternalSelectModern.prototype, "size", void 0);
__decorate([
    property({ type: String })
], OakInternalSelectModern.prototype, "shape", void 0);
__decorate([
    property({ type: String })
], OakInternalSelectModern.prototype, "fill", void 0);
__decorate([
    property({ type: Boolean })
], OakInternalSelectModern.prototype, "gutterBottom", void 0);
__decorate([
    property({ type: Array })
], OakInternalSelectModern.prototype, "_errors", void 0);
OakInternalSelectModern = __decorate([
    customElement(customElementName)
], OakInternalSelectModern);
export { OakInternalSelectModern };
//# sourceMappingURL=index.js.map