define([
    'dojo/_base/declare',
    'dojo/_base/Deferred',
    'dojo/_base/lang',
    'dojo/dom-construct',
    'dojo/when',
    'dgrid/List',
    'dgrid/util/misc',
    'dijit/form/TextBox'
], function (declare, Deferred, lang, domConstruct, when, List, miscUtil, TextBox) {
    return declare(List, {
        caseSensitive: false, // If true, the search will be case sensitive.
        currentData: [], // Currently displayed data.
        allData: [], // All data first rendered or changed via setData.
        filterTimeout: 250, // Timeout between key presses where data changes.
        minLength: 2, // Minimum length of fitlering criteria before filtering happens.
        listType: 'list',
        buildRendering: function () {
            var criteria;
            this.inherited(arguments);

            criteria = new TextBox({
                style: {
                    width: this.domNode.style.width || '100%' // Do we really want to do this?
                }
            });
            criteria.set('intermediateChanges', true);
            criteria.watch('value', miscUtil.debounce(function (prop, oldValue, newValue) {
                if (newValue.length < this.minLength) {
                    if (this.hasChanged) {
                        this.reset();
                    }
                    return;
                }

                this.filter(newValue);
            }, this, this.filterTimeout));

            domConstruct.place(criteria.domNode, this.domNode, 'before');
        },
        filter: function (criteria) {
            // summary:
            //      Filters data in grid based on given criteria.
            var deferred = new Deferred();

            // Asynchronously filter in case the data set is large.
            // This will prevent the page from hanging.
            setTimeout(lang.hitch(this, function () {
                var results = [],
                    data = this.allData,
                    match = new RegExp('\\b' + criteria, !this.caseSensitive ? 'i' : ''),
                    item, i, total;

                for (i = 0, total = data.length; i < total; i++) {
                    item = data[i];

                    if (match.test(item)) {
                        results.push(item);
                    }
                }

                deferred.resolve(results);
            }), 0);

            when(deferred, lang.hitch(this, function (results) {
                this.clear();

                if (results.length) {
                    this.renderArray(results);
                }

                this.hasChanged = true;
            }));
        },
        reset: function () {
            // summary:
            //      Resets list to original data (or the latest data that the list was set to).
            this.clear();
            this.hasChanged = false;
            this.renderArray(this.allData);
        },
        setData: function (data) {
            // summary:
            //      Sets overall data of the list.  Will refresh the list.
            this.clear();
            this.allData = data;
            this.renderArray(data);
        },
        renderArray: function (data) {
            // summary:
            //      Sets all data if it is not set and stores currently displayed data.
            if (!this.allData.length) {
                this.allData = data;
            }

            this.data = data;
            this.inherited(arguments);
        },
        clear: function () {
            // summary:
            //      Clears the grid of its contents.
            this.cleanup();
            this.contentNode.innerHTML = '';
        }
    });
});