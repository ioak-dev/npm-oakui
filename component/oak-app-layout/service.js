export function recomputeDimensionsLeft(drawerType, topbarEl, contentEl, leftDrawerEl, leftDrawerOpen, topbarVariant) {
    if (contentEl && leftDrawerEl) {
        switch (drawerType) {
            case 'side':
            case 'push':
                leftDrawerEl.style.transform = `translateX(-${leftDrawerOpen ? 0 : leftDrawerEl.scrollWidth}px)`;
                contentEl.style.paddingLeft = `${leftDrawerOpen ? leftDrawerEl.scrollWidth : 0}px`;
                if (topbarEl) {
                    topbarEl.style.paddingLeft = `${leftDrawerOpen && topbarVariant !== 'static'
                        ? leftDrawerEl.scrollWidth
                        : 0}px`;
                    if (drawerType === 'side' && topbarVariant === 'static') {
                        leftDrawerEl.style.top = `${topbarEl.scrollHeight}px`;
                    }
                }
                break;
            case 'over':
                leftDrawerEl.style.transform = `translateX(-${leftDrawerOpen ? 0 : leftDrawerEl.scrollWidth}px)`;
                break;
            default:
                break;
        }
    }
}
export function recomputeDimensionsRight(drawerType, topbarEl, contentEl, rightDrawerEl, rightDrawerOpen, topbarVariant) {
    if (contentEl && rightDrawerEl) {
        switch (drawerType) {
            case 'side':
            case 'push':
                rightDrawerEl.style.transform = `translateX(${rightDrawerOpen ? 0 : rightDrawerEl.scrollWidth}px)`;
                contentEl.style.paddingRight = `${rightDrawerOpen ? rightDrawerEl.scrollWidth : 0}px`;
                if (topbarEl) {
                    topbarEl.style.paddingRight = `${rightDrawerOpen && topbarVariant !== 'static'
                        ? rightDrawerEl.scrollWidth
                        : 0}px`;
                    if (drawerType === 'side' && topbarVariant === 'static') {
                        rightDrawerEl.style.top = `${topbarEl.scrollHeight}px`;
                    }
                }
                break;
            case 'over':
                rightDrawerEl.style.transform = `translateX(${rightDrawerOpen ? 0 : rightDrawerEl.scrollWidth}px)`;
                break;
            default:
                break;
        }
    }
}
export function recomputeTopbarSpacing(topbarEl, contentEl, topbarVariant) {
    if (topbarVariant !== 'auto' && topbarEl && contentEl) {
        contentEl.style.paddingTop = `${topbarEl.scrollHeight}px`;
    }
}
//# sourceMappingURL=service.js.map