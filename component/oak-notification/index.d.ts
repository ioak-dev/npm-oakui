import { LitElement } from 'lit-element';
import '../../_internal/component/oak-internal-notification-message';
export declare class OakNotification extends LitElement {
    private elementId;
    indicator?: 'circle' | 'circle-dotted' | 'circle-outline' | 'ellipse' | 'ellipse-dotted' | 'ellipse-outline' | 'fill' | 'outline' | 'none';
    elevation?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24;
    rounded?: boolean;
    outlined?: boolean;
    paddingVertical?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    bodyTypographyVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'overline' | 'inherit';
    headingTypographyVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'overline' | 'inherit';
    distanceFromBaseHorizontal?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    distanceFromBaseVertical?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    distanceFromBaseHorizontalMobile?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | null;
    distanceFromBaseVerticalMobile?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | null;
    displayCount?: number;
    insert?: 'top' | 'bottom';
    position?: 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center';
    positionOnMobile?: 'top-center' | 'bottom-center' | null;
    closeLabel?: string | undefined;
    private notificationQueue;
    constructor();
    connectedCallback(): void;
    private init;
    private getClassMap;
    static get styles(): (import("lit-element").CSSResult | import("lit-element").CSSResult[])[];
    render(): import("lit-element").TemplateResult;
}
//# sourceMappingURL=index.d.ts.map