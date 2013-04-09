# fgrid

fgrid is an extension of dgrid that allows you to filter the contents of a grid based on specified criteria.  fgrid is compatible with any <code>SimpleQueryEngine</code> store.

# Dependencies

fgrid depends on the following libraries:

* dojo
* dijit
* dgrid
* put-selector
* xstyle

# Using fgrid

<pre><code>
require(["fgrid/Grid", "dojo/store/Memory"], function (Grid, Memory) {
    var data = [{
        id: '1',
        fullName: 'Matt',
        company: 'SitePen, Inc.'
    }, {
        id: '2',
        fullName: 'Bryan Person',
        company: 'SitePen, Inc.'
    }, {
        id: '3',
        fullName: 'Bryan Johnson',
        company: 'National'
    }, {
        id: '4',
        fullName: 'Donald Person',
        company: 'SitePen, Inc.'
    }, {
        id: '5',
        fullName: 'Matt Person',
        company: 'Sample, Inc.'
    }, {
        id: '6',
        fullName: 'Jimmy Smith',
        company: "Smith's Hot Dogs and Jerky"
    }],
    store = new Memory({data:data});

    var grid = new Grid({
        store: store,
        columns: {
            id: "ID",
            fullName: "Full Name",
            company: "Company"
        },
        queryProperties: ["fullName", "company"]
    }, "grid");
});
</code></pre>

As you type in the criteria field, you will see that the grid filters based on the properties you passed in <code>queryProperties</code>.  If no <code>queryProperties</code> is provided, it will default to the store's <code>idProperty</code>.

# Supported Options

* <code>caseSensitive</code>
    If the search will be case sensitive
* <code>filterTimeout</code>
    Time in milliseconds before a filtering will be attempted.  This will prevent multiple filter events from firing in rapid succession.
* <code>minLength</code>
    Minimum length of criteria before filtering happens.  If the length of the criteria is lower than this threshold, the grid will reset.
* <code>hasSearchBar</code>
    Whether the search bar is present or not.

# Methods
* <code>filter</code>
    Filter the grid's contents.  Accepts a string.  Does not have to be an exact match.  Returns a promise that resolves after the filtering has been completed.  This promise will resolve to the query that the grid will be set to.
* <code>toggleSearchBar</code>
    Toggles the search bar.
* <code>set</code>
    Used as <code>set('property', 'value')</code>.  Can be used to set a number of properties for the grid.  This includes <code>hasSearchBar</code>.
    
# List

This grid is a subclass of <code>List</code>.  <code>List</code> is the exact same as <code>Grid</code> except it expects a <code>renderRow</code> method and only renders a single row as a list of items.

# License
New BSD License © 2012–2013 Matthew Maxwell http://www.matthewcmaxwell.com. Released under Dojo Foundation CLA.