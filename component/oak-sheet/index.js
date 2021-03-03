var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, customElement, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import OakSheetEvent from '../../event/OakSheetEvent';
import { globalStyles } from '../../_internal/styles/global-styles';
import { oakSheetBackdropStyles } from './backdrop-styles';
import { oakSheetStyles } from './index-styles';
import { oakSheetPositionBottomStyles } from './position-bottom-styles';
import { oakSheetPositionLeftStyles } from './position-left-styles';
import { oakSheetPositionRightStyles } from './position-right-styles';
import { oakSheetPositionTopStyles } from './position-top-styles';
let elementIdCounter = 0;
/**
 * Sheet component.
 *
 */
const customElementName = 'oak-sheet';
let OakSheet = class OakSheet extends LitElement {
    constructor() {
        super();
        this.elementId = `${customElementName}-${elementIdCounter++}`;
        this.position = 'bottom';
        this.isOpen = false;
        this.outlined = false;
        this.fillColor = 'surface';
        this.sizeHorizontal = 'half';
        this.sizeVertical = 'half';
        this.paddingHorizontal = 4;
        this.paddingVertical = 4;
        this.backdropIntensity = 2;
        this.elevation = 10;
        this._isOpen = false;
        this.propagateEvent = (eventType) => {
            this.dispatchEvent(new CustomEvent(eventType, {
                bubbles: true,
                composed: true,
                detail: {
                    id: this.elementId,
                    value: true,
                },
            }));
        };
    }
    firstUpdated(_changedProperties) {
        super.firstUpdated(_changedProperties);
    }
    shouldUpdate(_changedProperties) {
        _changedProperties.forEach((_, propName) => {
            if (propName === 'isOpen' && this.isOpen) {
                this._isOpen = true;
            }
            if (propName === 'isOpen' && !this.isOpen) {
                setTimeout(() => {
                    this._isOpen = false;
                }, 250);
            }
        });
        return true;
    }
    _handleClose() {
        this.propagateEvent(OakSheetEvent.SHEET_CLOSE);
    }
    getClassMap(baseClass) {
        switch (baseClass) {
            case 'base':
                return {
                    [customElementName]: true,
                    [`${customElementName}--show`]: this.isOpen,
                    [`${customElementName}--hide`]: !this.isOpen,
                    [`${customElementName}--position-${this.position}`]: true,
                };
            case 'backdrop':
                return {
                    [`${customElementName}__${baseClass}`]: true,
                    [`oak-backdrop-${this.backdropIntensity}`]: true,
                };
            case 'sheet':
                return {
                    [`${customElementName}__${baseClass}`]: true,
                    [`${customElementName}__${baseClass}--position-${this.position}`]: true,
                    [`${customElementName}__${baseClass}--size-horizontal-${this.sizeHorizontal}`]: true,
                    [`${customElementName}__${baseClass}--size-vertical-${this.sizeVertical}`]: true,
                    [`oak-color-bg-${this.fillColor}`]: true,
                    [`oak-color-${this.fillColor}-i`]: true,
                    [`oak-padding-horizontal${this.paddingHorizontal}`]: true,
                    [`oak-padding-vertical${this.paddingVertical}`]: true,
                    [`oak-bs-elevation${this.elevation}`]: true,
                    'oak-outlined': this.outlined,
                };
            default:
                return {};
        }
    }
    static get styles() {
        return [
            ...globalStyles,
            oakSheetStyles,
            oakSheetBackdropStyles,
            oakSheetPositionTopStyles,
            oakSheetPositionBottomStyles,
            oakSheetPositionLeftStyles,
            oakSheetPositionRightStyles,
        ];
    }
    render() {
        return html `${this._isOpen
            ? html `<div
          class=${classMap(this.getClassMap('base'))}
          id=${this.elementId}
        >
          <div
            class=${classMap(this.getClassMap('backdrop'))}
            @click=${this._handleClose}
          ></div>
          <div class=${classMap(this.getClassMap('sheet'))}>
            <slot></slot>
          </div>
        </div>`
            : html ``}`;
    }
};
__decorate([
    property({ type: String })
], OakSheet.prototype, "position", void 0);
__decorate([
    property({ type: Boolean })
], OakSheet.prototype, "isOpen", void 0);
__decorate([
    property({ type: Boolean })
], OakSheet.prototype, "outlined", void 0);
__decorate([
    property({ type: String })
], OakSheet.prototype, "fillColor", void 0);
__decorate([
    property({ type: String })
], OakSheet.prototype, "sizeHorizontal", void 0);
__decorate([
    property({ type: String })
], OakSheet.prototype, "sizeVertical", void 0);
__decorate([
    property({ type: Number })
], OakSheet.prototype, "paddingHorizontal", void 0);
__decorate([
    property({ type: Number })
], OakSheet.prototype, "paddingVertical", void 0);
__decorate([
    property({ type: Number })
], OakSheet.prototype, "backdropIntensity", void 0);
__decorate([
    property({ type: Number })
], OakSheet.prototype, "elevation", void 0);
__decorate([
    property({ type: Boolean })
], OakSheet.prototype, "_isOpen", void 0);
OakSheet = __decorate([
    customElement(customElementName)
], OakSheet);
export { OakSheet };
//# sourceMappingURL=index.js.map