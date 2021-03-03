import { LitElement } from 'lit-element';
import '../../../component/oak-typography';
import '../../../component/oak-link';
import { NotificationType } from '../../../types/NotificationType';
export declare class OakInternalNotificationMessage extends LitElement {
    private elementId;
    notification?: NotificationType;
    indicator: 'circle' | 'circle-outline' | 'ellipse' | 'ellipse-outline' | 'fill' | 'outline' | 'none';
    elevation?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24;
    rounded?: boolean;
    outlined?: boolean;
    paddingVertical?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    bodyTypographyVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'overline' | 'inherit';
    headingTypographyVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'overline' | 'inherit';
    removing: boolean;
    closeLabel?: string | undefined;
    constructor();
    connectedCallback(): void;
    updateScrollHeight: (close?: boolean) => void;
    private closeNotification;
    private getClassMap;
    static get styles(): (import("lit-element").CSSResult | import("lit-element").CSSResult[])[];
    render(): import("lit-element").TemplateResult;
}
//# sourceMappingURL=index.d.ts.map