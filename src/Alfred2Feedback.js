var xml = require('xml');
var _ = require('lodash');

function Alfred2Feedback() {}

Alfred2Feedback.feedback = function(list, options) {
    options = options || {};
    var autocomplete = options.autocomplete || false;
    var icon = options.icons || false;
    var items = {
        items: _.map(list, function(item) {
            return ({
                item: _.filter([
                    itemAttribuesFor(item, autocomplete),
                    itemTitle(item),
                    itemIcon(icon)
                ], filterNulls)
            })
        })
    }
    return xml(items, {
        declaration: true
    })
};

function itemTitle(item) {
    return {
        title: item
    }
}

function itemIcon(icon) {
    return icon ? {
        icon: icon
    } : undefined
}

function itemAttribuesFor(item, autocomplete) {
    var attr = {
        arg: item,
        valid: 'yes'
    }
    if (autocomplete) {
        attr.autocomplete = item;
    }
    return {
        _attr: attr
    };
}

function filterNulls(c) {
    return !!c
}

module.exports = Alfred2Feedback;