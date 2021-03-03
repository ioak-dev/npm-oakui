var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, customElement, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { globalStyles } from '../../styles/global-styles';
import '../../../component/oak-typography';
import '../../../component/oak-link';
import { removeNotification, _removeNotifyEvent, _requestRemoveNotifyEvent, } from '../../../NotificationStore';
import { oakInternalNotificationMessageBaseStyles } from './base-styles';
import { oakInternalNotificationMessageIndicatorCircleStyles } from './indicator-circle-styles';
import { oakInternalNotificationMessageIndicatorEllipseStyles } from './indicator-ellipse-styles';
import { oakInternalNotificationMessageIndicatorFillStyles } from './indicator-fill-styles';
import { oakInternalNotificationMessageIndicatorOutlineStyles } from './indicator-outline-styles';
let elementIdCounter = 0;
/**
 * oak-internal-notification-message.
 *
 */
const customElementName = 'oak-internal-notification-message';
let OakInternalNotificationMessage = class OakInternalNotificationMessage extends LitElement {
    constructor() {
        super();
        this.elementId = `${customElementName}-${elementIdCounter++}`;
        this.indicator = 'circle';
        this.elevation = 10;
        this.rounded = false;
        this.outlined = false;
        this.paddingVertical = 0;
        this.bodyTypographyVariant = 'inherit';
        this.headingTypographyVariant = 'h6';
        this.removing = false;
        this.closeLabel = 'CLOSE';
        this.updateScrollHeight = (close = false) => {
            var _a;
            const element = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById(this.elementId);
            if (element) {
                element.style.maxHeight = close ? '0px' : `${element.scrollHeight}px`;
            }
        };
        this.closeNotification = () => {
            if (this.notification) {
                removeNotification(this.notification.id);
            }
        };
    }
    connectedCallback() {
        super.connectedCallback();
        _requestRemoveNotifyEvent
            .asObservable()
            .subscribe((notificationId) => {
            var _a;
            if (((_a = this.notification) === null || _a === void 0 ? void 0 : _a.id) === notificationId) {
                this.removing = true;
                this.updateScrollHeight(true);
                setTimeout(() => {
                    _removeNotifyEvent.next(notificationId);
                }, 250);
            }
        });
        setTimeout(() => this.updateScrollHeight());
    }
    getClassMap(baseClass) {
        var _a, _b, _c, _d;
        switch (baseClass) {
            case 'base':
                return {
                    [customElementName]: true,
                    [`oak-bs-elevation${this.elevation}`]: true,
                    'oak-rounded': this.rounded,
                    'oak-outlined': this.outlined,
                    [`${customElementName}--${this.indicator}`]: [
                        'fill',
                        'outline',
                    ].includes(this.indicator),
                    [`${customElementName}--${(_a = this.notification) === null || _a === void 0 ? void 0 : _a.type}`]: !!((_b = this
                        .notification) === null || _b === void 0 ? void 0 : _b.type),
                };
            case 'container':
                return {
                    [`${customElementName}__${baseClass}`]: true,
                    'oak-padding-horizontal2': true,
                    [`oak-padding-vertical${this.paddingVertical}`]: true,
                };
            case 'indicator':
                return {
                    [`${customElementName}__${baseClass}`]: true,
                    [`${customElementName}__${baseClass}--${this.indicator}`]: true,
                    [`${customElementName}__${baseClass}--${(_c = this.notification) === null || _c === void 0 ? void 0 : _c.type}`]: !!((_d = this
                        .notification) === null || _d === void 0 ? void 0 : _d.type),
                };
            case 'content':
                return {
                    [`${customElementName}__${baseClass}`]: true,
                };
            case 'left':
                return {
                    [`${customElementName}__left`]: true,
                    'oak-two-liner': true,
                };
            case 'right':
                return {
                    [`${customElementName}__right`]: true,
                };
            default:
                return {};
        }
    }
    static get styles() {
        return [
            ...globalStyles,
            oakInternalNotificationMessageBaseStyles,
            oakInternalNotificationMessageIndicatorCircleStyles,
            oakInternalNotificationMessageIndicatorEllipseStyles,
            oakInternalNotificationMessageIndicatorFillStyles,
            oakInternalNotificationMessageIndicatorOutlineStyles,
        ];
    }
    render() {
        return this.notification
            ? html `
          <div class=${classMap(this.getClassMap('base'))} id=${this.elementId}>
              <div class=${classMap(this.getClassMap('container'))}>
                ${this.indicator
                ? html `<div
                        class=${classMap(this.getClassMap('indicator'))}
                      ></div>`
                : html ``}
                <div class=${classMap(this.getClassMap('content'))}>
                  <div class=${classMap(this.getClassMap('left'))}>
                    ${this.notification.heading
                ? html `<oak-typography
                            variant=${this.headingTypographyVariant}
                          >
                            ${this.notification.heading}
                          </oak-typography>`
                : html ``}
                    <oak-typography variant=${this.bodyTypographyVariant}>
                      ${this.notification.description}
                    </oak-typography>
                  </div>
                  <div class=${classMap(this.getClassMap('right'))}>
                    <oak-button
                        size="xsmall"
                        variant=${this.indicator !== 'fill' || !this.notification.type
                ? 'block'
                : 'appear'}
                        theme=${this.indicator !== 'fill' || !this.notification.type
                ? 'info'
                : this.notification.type}
                        @button-click=${this.closeNotification}
                        >${this.closeLabel}</oak-button
                      >
                  </div>
                </div>
              </div>
            </div>
          </div>
        `
            : html ``;
    }
};
__decorate([
    property({ type: Object })
], OakInternalNotificationMessage.prototype, "notification", void 0);
__decorate([
    property({ type: String })
], OakInternalNotificationMessage.prototype, "indicator", void 0);
__decorate([
    property({ type: Number })
], OakInternalNotificationMessage.prototype, "elevation", void 0);
__decorate([
    property({ type: Boolean })
], OakInternalNotificationMessage.prototype, "rounded", void 0);
__decorate([
    property({ type: Boolean })
], OakInternalNotificationMessage.prototype, "outlined", void 0);
__decorate([
    property({ type: Number })
], OakInternalNotificationMessage.prototype, "paddingVertical", void 0);
__decorate([
    property({ type: String })
], OakInternalNotificationMessage.prototype, "bodyTypographyVariant", void 0);
__decorate([
    property({ type: String })
], OakInternalNotificationMessage.prototype, "headingTypographyVariant", void 0);
__decorate([
    property({ type: Boolean })
], OakInternalNotificationMessage.prototype, "removing", void 0);
__decorate([
    property({ type: String })
], OakInternalNotificationMessage.prototype, "closeLabel", void 0);
OakInternalNotificationMessage = __decorate([
    customElement('oak-internal-notification-message')
], OakInternalNotificationMessage);
export { OakInternalNotificationMessage };
//# sourceMappingURL=index.js.map