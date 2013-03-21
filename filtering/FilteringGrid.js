define([
    'dojo/_base/declare',
    'dgrid/OnDemandGrid',
    './FilteringList'
], function (declare, Grid, FilteringList) {
    return declare([Grid, FilteringList]);
});