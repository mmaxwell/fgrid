define([
    'dojo/_base/declare',
    'dojo/_base/Deferred',
    'dojo/_base/lang',
    'dojo/dom-class',
    'dojo/dom-construct',
    'dojo/string',
    'dojo/when',
    'dgrid/OnDemandList',
    'dgrid/util/misc',
    'dijit/form/TextBox'
], function (declare, Deferred, lang, domClass, domConstruct, string, when, List, miscUtil, TextBox) {
    return declare(List, {
        caseSensitive: false, // If true, the search will be case sensitive.
        filterTimeout: 250, // Timeout between key presses where data changes.
        minLength: 2, // Minimum length of fitlering criteria before filtering happens.
        hasSearchBar: true, // Whether or not to include search bar.  If this is false, filter will have to be called manually.
        queryProperties: [], // Properties to be queried when a filter occurs.  If this remains an empty array, it will default to the store's idProperty.
        buildRendering: function () {
            var criteria, wrapper;

            this.inherited(arguments);

            criteria = this.criteria = new TextBox({
                intermediateChanges: true
            });

            criteria.watch('value', miscUtil.debounce(function (prop, oldValue, newValue) {
                if (newValue.length < this.minLength) {
                    if (this.hasChanged) {
                        this.reset();
                    }
                    return;
                }

                this.filter(newValue);
            }, this, this.filterTimeout));

            // Wrap current domNode in a wrapper div.  This will allow list.domNode to return everything,
            // including the search bar.
            wrapper = document.createElement('div');
            wrapper.appendChild(criteria.domNode);

            domConstruct.place(wrapper, this.domNode, 'before');
            this.oldDomNode = this.domNode;
            wrapper.appendChild(this.domNode);
            this.domNode = wrapper;

            if (this.className) {
                domClass.add(this.domNode, this.className);
            }

            this.set('hasSearchBar', this.hasSearchBar);

            if (!this.queryProperties.length && this.store) {
                this.queryProperties.push(this.store.idProperty);
            }
        },
        toggleSearchBar: function () {
            // summary:
            //      Toggles the search bar.
            this.set('hasSearchBar', !this.hasSearchBar);
        },
        _setHasSearchBar: function (hasSearchBar) {
            // summary:
            //      Sets the hasSearchBar property.  If true, a search bar will be created if
            //      it does not already exist.  If false, the search bar will be destroyed if
            //      it exists.
            if (hasSearchBar === this.hasSearchBar && this.started) {
                return;
            }

            this.hasSearchBar = hasSearchBar;

            domClass[hasSearchBar ? 'remove' : 'add'](this.criteria.domNode, 'dijitHidden');
        },
        filter: function (text) {
            // summary:
            //      Filters data based on given criteria.
            var deferred = new Deferred(),
                criteria = string.trim(text);

            if (!criteria) {
                return;
            }

            if (criteria.length < this.minLength) {
                return;
            }

            // Asynchronously filter in case there are a lot of queryProperties
            // and/or a large amount of data in the store.
            // This will prevent the page from hanging.
            setTimeout(lang.hitch(this, function () {
                var results = [],
                    queryProperties = this.queryProperties,
                    i, total, query;

                // Query for every queryProperty provided, but stop on the first match.
                for (i = 0, total = queryProperties.length; i < total; i++) {
                    query = {};

                    // TODO: Does this need to escape RegExp relevant characters?
                    query[queryProperties[i]] = new RegExp('\\b' + criteria, this.caseSensitive ? '' : 'i');
                    results = this.store.query(query);

                    if (results.length) {
                        break;
                    }
                }

                deferred.resolve(query);
            }), 0);

            when(deferred, lang.hitch(this, function (query) {
                this.clear();

                this.set('query', query);

                this.hasChanged = true;
            }));

            return deferred.promise;
        },
        reset: function () {
            // summary:
            //      Resets list to original data (or the latest data that the list was set to).
            this.clear();
            this.hasChanged = false;
            this.set('query', {});
        },
        clear: function () {
            // summary:
            //      Clears the grid of its contents.
            this.cleanup();
            this.contentNode.innerHTML = '';
        }
    });
});
