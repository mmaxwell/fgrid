define([
    'dojo/_base/declare',
    'dgrid/OnDemandGrid',
    './List'
], function (declare, Grid, List) {
    return declare([Grid, List]);
});