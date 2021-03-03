import { SortDirection } from '../types/SortPrefType';
import { isEmptyOrSpaces, match } from '../_internal/utils/StringUtils';
function compare(a, b, sortPref, header) {
    var _a, _b, _c, _d;
    const headerMap = {};
    header.forEach((element) => {
        headerMap[element.name] = element;
    });
    const { sortBy } = sortPref;
    const { sortDirection } = sortPref;
    const headerElement = headerMap[sortBy];
    if (!(headerElement === null || headerElement === void 0 ? void 0 : headerElement.dtype) || (headerElement === null || headerElement === void 0 ? void 0 : headerElement.dtype) === 'text') {
        if (sortDirection === SortDirection.ascending) {
            return ((_a = a[sortPref.sortBy]) === null || _a === void 0 ? void 0 : _a.toLowerCase()) > ((_b = b[sortPref.sortBy]) === null || _b === void 0 ? void 0 : _b.toLowerCase())
                ? 1
                : -1;
        }
        return ((_c = a[sortPref.sortBy]) === null || _c === void 0 ? void 0 : _c.toLowerCase()) < ((_d = b[sortPref.sortBy]) === null || _d === void 0 ? void 0 : _d.toLowerCase())
            ? 1
            : -1;
        // } else if (headerElement.dtype === 'number') {
    }
    if (sortDirection === SortDirection.ascending) {
        return a[sortPref.sortBy] - b[sortPref.sortBy] > 0 ? 1 : -1;
    }
    return a[sortPref.sortBy] - b[sortPref.sortBy] < 0 ? 1 : -1;
}
export function getPage(data, header, paginationPref, sortPref) {
    let filteredResults = data;
    if (!isEmptyOrSpaces(paginationPref.searchText)) {
        filteredResults = data.filter((item) => {
            let outcome = false;
            header.forEach((headerItem) => {
                if (match(item[headerItem.name], paginationPref.searchText)) {
                    outcome = true;
                }
            });
            return outcome;
        });
    }
    if (sortPref && sortPref.sortBy) {
        filteredResults = filteredResults
            .slice()
            .sort((a, b) => compare(a, b, sortPref, header));
    }
    const totalRows = filteredResults.length;
    filteredResults = filteredResults.slice((paginationPref.pageNo - 1) * paginationPref.rowsPerPage, paginationPref.pageNo * paginationPref.rowsPerPage);
    return { totalRows, filteredResults };
}
//# sourceMappingURL=OakTableService.js.map