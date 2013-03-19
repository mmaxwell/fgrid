define([
    'dojo/_base/declare',
    'dojo/_base/Deferred',
    'dojo/_base/lang',
    'dojo/when',
    'dgrid/Grid',
    './FilteringList'
], function (declare, Deferred, lang, when, Grid, FilteringList) {
    return declare([Grid, FilteringList], {
        store: null,
        queryProperties: [], // Properties that will be queried upon when filter is called.
        buildRendering: function () {
            this.inherited(arguments);

            if (!this.queryProperties.length && this.store) {
                this.queryProperties.push(this.store.idProperty);
            }

            if (this.store) {
                this.renderArray(this.store.query());
            }
        },
        listType: 'grid',
        filter: function (criteria) {
            // summary:
            //      Filters data based on given criteria.
            var deferred = new Deferred();

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
                    query[queryProperties[i]] = new RegExp('\\b' + criteria, 'i');
                    results = this.store.query(query);

                    if (results.length) {
                        break;
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
        }
    });
});