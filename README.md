# FilteringGrid

FilteringGrid is an extension of dGrid that allows you to filter the contents of a grid based on specified criteria.  FilteringGrid is compatible with any store that implements a <code>query</code> method.

# Dependencies

FilteringGrid depends on the following libraries, which are included as submodules of this repository:

* dojo
* dijit
* dgrid
* put-selector
* xstyle

# Using FilteringGrid

<pre><code>
require(["filtering/FilteringGrid", "dojo/store/Memory"], function (FilteringGrid, Memory) {
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

    var grid = new FilteringGrid({
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
    Filter the grid's contents.  Accepts a string.  Does not have to be an exact match.
* <code>toggleSearchBar</code>
    Toggles the search bar.
* <code>set</code>
    Used as <code>set('property', 'value')</code>.  Can be used to set a number of properties for the grid.  This includes <code>hasSearchBar</code>.
    
# FilteringList

This grid is a subclass of <code>FilteringList</code>.  <code>FilteringList</code> is the exact same as <code>FilteringGrid</code> except it expects a <code>renderRow</code> method and only renders a single row as a list of items.