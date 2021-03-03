var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, customElement, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { repeat } from 'lit-html/directives/repeat.js';
import { globalStyles } from '../../_internal/styles/global-styles';
import { _addNotifyEvent, _removeNotifyEvent, } from '../../NotificationStore';
import { oakNotificationStyles } from './index-styles';
import '../../_internal/component/oak-internal-notification-message';
let elementIdCounter = 0;
/**
 * Notification component.
 *
 */
const customElementName = 'oak-notification';
let OakNotification = class OakNotification extends LitElement {
    constructor() {
        super();
        this.elementId = `${customElementName}-${elementIdCounter++}`;
        this.indicator = 'circle';
        this.elevation = 10;
        this.rounded = false;
        this.outlined = false;
        this.paddingVertical = 2;
        this.bodyTypographyVariant = 'inherit';
        this.headingTypographyVariant = 'h6';
        this.distanceFromBaseHorizontal = 2;
        this.distanceFromBaseVertical = 2;
        this.distanceFromBaseHorizontalMobile = null;
        this.distanceFromBaseVerticalMobile = null;
        this.displayCount = 5;
        this.insert = 'bottom';
        this.position = 'bottom-right';
        this.positionOnMobile = null;
        this.closeLabel = 'CLOSE';
        this.notificationQueue = [];
    }
    connectedCallback() {
        super.connectedCallback();
        this.init();
    }
    init() {
        _addNotifyEvent.asObservable().subscribe((event) => {
            this.notificationQueue = [event, ...this.notificationQueue];
        });
        _removeNotifyEvent.asObservable().subscribe((notificationId) => {
            this.notificationQueue = this.notificationQueue.filter((item) => item.id !== notificationId);
        });
    }
    getClassMap(baseClass) {
        switch (baseClass) {
            case 'base':
                return {
                    [customElementName]: true,
                };
            case 'container':
                return {
                    [`${customElementName}-${baseClass}`]: true,
                    [`${customElementName}__position--${this.position}`]: true,
                    [`${customElementName}__position--mobile-${this.positionOnMobile === null
                        ? this.position
                        : this.positionOnMobile}`]: true,
                    [`${customElementName}__distance-from-base-x--${this.distanceFromBaseHorizontal}`]: true,
                    [`${customElementName}__distance-from-base-y--${this.distanceFromBaseVertical}`]: true,
                    [`${customElementName}__distance-from-base-x-mobile--${this.distanceFromBaseHorizontalMobile === null
                        ? this.distanceFromBaseHorizontal
                        : this.distanceFromBaseHorizontalMobile}`]: true,
                    [`${customElementName}__distance-from-base-y-mobile--${this.distanceFromBaseVerticalMobile === null
                        ? this.distanceFromBaseVertical
                        : this.distanceFromBaseVerticalMobile}`]: true,
                };
            default:
                return {};
        }
    }
    static get styles() {
        return [...globalStyles, oakNotificationStyles];
    }
    render() {
        return html `
      <div class=${classMap(this.getClassMap('base'))} id=${this.elementId}>
        <div
          class=${classMap(this.getClassMap('container'))}
          id=${this.elementId}
        >
          ${repeat(this.insert === 'bottom'
            ? this.notificationQueue.slice(0, this.displayCount).reverse()
            : this.notificationQueue.slice(0, this.displayCount), (notification) => notification.id, (notification) => html `<oak-internal-notification-message
                .notification=${notification}
                .elevation=${this.elevation}
                ?rounded=${this.rounded}
                ?outlined=${this.outlined}
                .indicator=${this.indicator}
                .paddingVertical=${this.paddingVertical}
                .headingTypographyVariant=${this.headingTypographyVariant}
                .bodyTypographyVariant=${this.bodyTypographyVariant}
                .closeLabel=${this.closeLabel}
              ></oak-internal-notification-message>`)}
        </div>
      </div>
    `;
    }
};
__decorate([
    property({ type: String })
], OakNotification.prototype, "indicator", void 0);
__decorate([
    property({ type: Number })
], OakNotification.prototype, "elevation", void 0);
__decorate([
    property({ type: Boolean })
], OakNotification.prototype, "rounded", void 0);
__decorate([
    property({ type: Boolean })
], OakNotification.prototype, "outlined", void 0);
__decorate([
    property({ type: Number })
], OakNotification.prototype, "paddingVertical", void 0);
__decorate([
    property({ type: String })
], OakNotification.prototype, "bodyTypographyVariant", void 0);
__decorate([
    property({ type: String })
], OakNotification.prototype, "headingTypographyVariant", void 0);
__decorate([
    property({ type: Number })
], OakNotification.prototype, "distanceFromBaseHorizontal", void 0);
__decorate([
    property({ type: Number })
], OakNotification.prototype, "distanceFromBaseVertical", void 0);
__decorate([
    property({ type: Number })
], OakNotification.prototype, "distanceFromBaseHorizontalMobile", void 0);
__decorate([
    property({ type: Number })
], OakNotification.prototype, "distanceFromBaseVerticalMobile", void 0);
__decorate([
    property({ type: Number })
], OakNotification.prototype, "displayCount", void 0);
__decorate([
    property({ type: String })
], OakNotification.prototype, "insert", void 0);
__decorate([
    property({ type: String })
], OakNotification.prototype, "position", void 0);
__decorate([
    property({ type: String })
], OakNotification.prototype, "positionOnMobile", void 0);
__decorate([
    property({ type: String })
], OakNotification.prototype, "closeLabel", void 0);
__decorate([
    property({ type: Array })
], OakNotification.prototype, "notificationQueue", void 0);
OakNotification = __decorate([
    customElement(customElementName)
], OakNotification);
export { OakNotification };
//# sourceMappingURL=index.js.map