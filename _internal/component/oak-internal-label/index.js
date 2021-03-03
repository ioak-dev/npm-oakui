var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, customElement, property } from 'lit-element';
import { globalStyles } from '../../styles/global-styles';
import { oakInternalLabelStyles } from './index-styles';
let elementIdCounter = 0;
/**
 * Label for form elements.
 *
 */
const customElementName = 'oak-internal-label';
let OakInternalLabel = class OakInternalLabel extends LitElement {
    constructor() {
        super();
        this.label = null;
        this.elementFor = '';
        this.elementId = `${customElementName}-${elementIdCounter++}`;
    }
    static get styles() {
        return [...globalStyles, oakInternalLabelStyles];
    }
    render() {
        return html ` ${this.label
            ? html `<label for=${this.elementFor} id=${this.elementId}
          >${this.label}</label
        >`
            : html ``}`;
    }
};
__decorate([
    property({ type: String })
], OakInternalLabel.prototype, "label", void 0);
__decorate([
    property({ type: String })
], OakInternalLabel.prototype, "elementFor", void 0);
OakInternalLabel = __decorate([
    customElement(customElementName)
], OakInternalLabel);
export { OakInternalLabel };
//# sourceMappingURL=index.js.map