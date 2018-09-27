import _ from 'lodash';

export function sort(items, path, order) {
    return _.orderBy(items, path, order);
}
