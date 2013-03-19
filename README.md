# FilteringGrid

FilteringGrid is an extension of dGrid that allows you to filter the contents of a grid based on specified criteria.  FilteringGrid is compatible with any store that implements a <code>query</code> method.

# Using FilteringGrid

<pre><code>
require(["filtering/FilteringGrid", "dojo/store/Memory"], function (FilteringGrid, Memory) {
	var data = [{
	    id: '1',
	    fullName: 'Matthew Maxwell',
	    company: 'SitePen, Inc.'
	}, {
	    id: '2',
	    fullName: 'Bryan Forbes',
	    company: 'SitePen, Inc.'
	}, {
	    id: '3',
	    fullName: 'Bryan Johnson',
	    company: 'National'
	}, {
	    id: '4',
	    fullName: 'Dylan Schiemann',
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

* caseSensitive
	If the search will be case sensitive
* filterTimeout
	Time in milliseconds before a filtering will be attempted.  This will prevent multiple filter events from firing in rapid succession.
* minLength
	Minimum length of criteria before filtering happens.  If the length of the criteria is lower than this threshold, the grid will reset.
	
# FilteringList

This grid is a subclass of <code>FilteringList</code>.  <code>FilteringList</code> is the exact same as <code>FilteringGrid</code> with the exception of it accepts a flat array of data and has a <code>setData</code> method, which will set the data of the list to the provided array.