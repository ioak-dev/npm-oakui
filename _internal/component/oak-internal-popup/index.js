var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, customElement, property } from 'lit-element';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import { classMap } from 'lit-html/directives/class-map';
import { globalStyles } from '../../styles/global-styles';
import '../oak-internal-label';
import '../oak-internal-form-tooltip';
import '../oak-internal-form-error';
import '../oak-internal-popup-input-action';
import '../../../component/oak-input';
import '../../../component/oak-button';
import { oakInternalPopupStyles } from './index-styles';
import { containerScrolledSubject } from '../../events/ContainerScrolledEvent';
import { POPUP_ACTIVATE, POPUP_DEACTIVATE, POPUP_KEY_PRESSED, } from '../../../event/OakPopupEvent';
let elementIdCounter = 0;
const customElementName = 'oak-internal-popup';
/**
 * Select drop down (native) form element.
 *
 */
let OakSelect = class OakSelect extends LitElement {
    /**
     * Validators
     *
     */
    /**
     * @private
     */
    constructor() {
        super();
        this.elementId = `${customElementName}-${elementIdCounter++}`;
        this.actionElementId = `${this.elementId}-action`;
        this.popupElementId = `${this.elementId}-popup`;
        this.isActivated = false;
        this.parentElementIds = [];
        this.placeholder = '';
        this.multiple = false;
        this.tooltip = '';
        this.name = this.elementId;
        this.disabled = false;
        this.options = [];
        this.errors = [];
        this.scrollableContainers = [];
        this.size = 'small';
        this.shape = 'rectangle';
        this.fill = 'surface';
        this.type = 'input';
        this.clickEventHandler = (event) => {
            if (this.isActivated) {
                const idList = [];
                Object.values(event.composedPath()).forEach((item) => {
                    try {
                        if (item &&
                            !(item instanceof ShadowRoot) &&
                            !(item instanceof Window) &&
                            !(item instanceof Document) &&
                            item.hasAttribute('id')) {
                            idList.push(item.getAttribute('id'));
                        }
                    }
                    catch (e) {
                        console.log('** exception inclickEventHandler');
                    }
                });
                if (![this.actionElementId, this.popupElementId].some((item) => idList.indexOf(item) !== -1)) {
                    this._deactivate();
                }
                // if (
                //   !event.target.getAttribute('id') ||
                //   event.target.getAttribute('id') !== this.elementFor
                // ) {
                //   this._deactivate();
                // }
            }
        };
        this.keydownEventHandler = (event) => {
            this.propagateCustomEvent(POPUP_KEY_PRESSED, event);
        };
        this._activate = () => {
            if (!this.isActivated) {
                this.propagateCustomEvent(POPUP_ACTIVATE);
                this._handlePostActivate();
            }
        };
        this._handlePostActivate = () => {
            var _a;
            setTimeout(() => this.adjustPositioning());
            const docRef = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById(this.actionElementId);
            if (docRef) {
                docRef.addEventListener('keydown', this.keydownEventHandler);
            }
            if (this.scrollableContainers.length > 0) {
                console.log('*******', this.scrollableContainers);
            }
        };
        this._deactivate = () => {
            var _a;
            this.propagateCustomEvent(POPUP_DEACTIVATE);
            const docRef = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById(this.elementId);
            if (docRef) {
                docRef.removeEventListener('keydown', this.keydownEventHandler);
            }
        };
        this.adjustPositioning = () => {
            var _a, _b;
            if (this.isActivated) {
                const popupElRef = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById(this.popupElementId);
                const actionElRef = (_b = this.shadowRoot) === null || _b === void 0 ? void 0 : _b.getElementById(this.actionElementId);
                if (actionElRef && popupElRef) {
                    if (actionElRef.getBoundingClientRect().top > window.innerHeight / 2) {
                        popupElRef.style.bottom = `${window.innerHeight - actionElRef.getBoundingClientRect().top + 4}px`;
                        popupElRef.style.top = 'auto';
                    }
                    else {
                        popupElRef.style.top = `${actionElRef.getBoundingClientRect().bottom + 4}px`;
                        popupElRef.style.bottom = 'auto';
                    }
                    if (actionElRef.getBoundingClientRect().left > window.innerWidth / 2) {
                        popupElRef.style.right = `${document.documentElement.clientWidth -
                            actionElRef.getBoundingClientRect().right}px`;
                        popupElRef.style.left = 'auto';
                    }
                    else {
                        popupElRef.style.left = `${actionElRef.getBoundingClientRect().left}px`;
                        popupElRef.style.right = 'auto';
                    }
                    // popupElRef.style.width = `${
                    //   actionElRef.getBoundingClientRect().width
                    // }px`;
                }
            }
        };
        this.getClassMap = (baseClass) => {
            switch (baseClass) {
                case 'base':
                    return {
                        [customElementName]: true,
                    };
                case 'action':
                    return {
                        [`${customElementName}--${baseClass}`]: true,
                    };
                case 'value':
                    return {
                        [`${customElementName}--${baseClass}`]: true,
                    };
                case 'placeholder':
                    return {
                        [`${customElementName}--${baseClass}`]: true,
                    };
                case 'popup':
                    return {
                        [`${customElementName}--${baseClass}`]: true,
                        [`oak-fill-${this.fill}`]: true,
                        activated: this.isActivated,
                    };
                default:
                    return {};
            }
        };
        // private handleSearchCriteriaChange = (event: any) => {
        //   this._searchCriteria = event.detail.value;
        // };
        this.handleInputFocused = () => {
            if (this.isActivated) {
                this._deactivate();
            }
            else {
                this._activate();
            }
        };
        this._renderAction = () => {
            switch (this.type) {
                case 'input':
                    return html ` <oak-internal-popup-input-action
          @toggle=${this.handleInputFocused}
          .value=${this.value}
          .size=${this.size}
          .shape=${this.shape}
          .fill=${this.fill}
        ></oak-internal-popup-input-action>`;
                case 'custom':
                    return html `<slot name="action"></slot>`;
                default:
                    return html ``;
            }
        };
        this.propagateCustomEvent = (eventName, value) => {
            this.dispatchEvent(new CustomEvent(eventName, {
                bubbles: true,
                composed: true,
                detail: {
                    id: this.elementId,
                    name: this.name,
                    value: value || null,
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
    shouldUpdate(_changedProperties) {
        _changedProperties.forEach((_, propName) => {
            if (propName === 'isActivated' && this.isActivated) {
                this._handlePostActivate();
            }
        });
        return true;
    }
    _registerEvents() {
        containerScrolledSubject
            .asObservable()
            .subscribe(() => this.adjustPositioning());
        fromEvent(document, 'click')
            .pipe(map((event) => event))
            .subscribe((event) => this.clickEventHandler(event));
        fromEvent(window, 'resize')
            .pipe(map((event) => event))
            .subscribe(() => this.adjustPositioning());
        fromEvent(window, 'scroll')
            .pipe(map((event) => event))
            .subscribe(() => this.adjustPositioning());
        fromEvent(window, 'keydown')
            .pipe(map((event) => event))
            .subscribe((event) => {
            if (['Escape'].includes(event.key)) {
                this._deactivate();
            }
        });
    }
    _unregisterEvents() {
        // window.removeEventListener('resize', this.adjustPositioning);
        // window.removeEventListener('scroll', this.adjustPositioning);
    }
    static get styles() {
        return [...globalStyles, oakInternalPopupStyles];
    }
    render() {
        return html `
      <div class=${classMap(this.getClassMap('base'))} id=${this.elementId}>
        <div
          class=${classMap(this.getClassMap('action'))}
          id=${this.actionElementId}
        >
          ${this._renderAction()}
        </div>
        <div
          class=${classMap(this.getClassMap('popup'))}
          id=${this.popupElementId}
        >
          <slot name="popup"></slot>
        </div>
      </div>
    `;
    }
};
__decorate([
    property({ type: Boolean })
], OakSelect.prototype, "isActivated", void 0);
__decorate([
    property({ type: Array })
], OakSelect.prototype, "parentElementIds", void 0);
__decorate([
    property({ type: String })
], OakSelect.prototype, "label", void 0);
__decorate([
    property()
], OakSelect.prototype, "value", void 0);
__decorate([
    property({ type: String })
], OakSelect.prototype, "placeholder", void 0);
__decorate([
    property({ type: Boolean })
], OakSelect.prototype, "multiple", void 0);
__decorate([
    property({ type: String })
], OakSelect.prototype, "tooltip", void 0);
__decorate([
    property({ type: String })
], OakSelect.prototype, "name", void 0);
__decorate([
    property({ type: Boolean })
], OakSelect.prototype, "disabled", void 0);
__decorate([
    property({ type: Array })
], OakSelect.prototype, "options", void 0);
__decorate([
    property({ type: Array })
], OakSelect.prototype, "optionsAsKeyValue", void 0);
__decorate([
    property({ type: Array })
], OakSelect.prototype, "errors", void 0);
__decorate([
    property({ type: Array })
], OakSelect.prototype, "scrollableContainers", void 0);
__decorate([
    property({ type: String })
], OakSelect.prototype, "size", void 0);
__decorate([
    property({ type: String })
], OakSelect.prototype, "shape", void 0);
__decorate([
    property({ type: String })
], OakSelect.prototype, "fill", void 0);
__decorate([
    property({ type: String })
], OakSelect.prototype, "type", void 0);
OakSelect = __decorate([
    customElement(customElementName)
], OakSelect);
export { OakSelect };
//# sourceMappingURL=index.js.map