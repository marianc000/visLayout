$(function () {
    console.log(data);
    init(data);


    function findMinDate(items) {
        var startDates = items.map(function (val) {
            return moment(val.start, MY_SOURCE_DATE_FORMAT).toDate();
        });
        return startDates.reduce(function (total, val) {
            return total > val ? val : total;
        });
    }
    function findMaxDate(items) {
        var endDates = items.map(function (val) {
            var date = val.end ? val.end : val.start;
            return moment(date, MY_SOURCE_DATE_FORMAT).toDate();
        });
        return endDates.reduce(function (total, val) {
            return total < val ? val : total;
        });
    }
    
    function getPixelsPerDay(){
        return PIXELS_PER_YEAR/365;
    }
    
    function getDayInRange(timelineStart,timelineEnd){
        return moment(timelineEnd).diff(moment(timelineStart),'days');
    }
    
    function getTimelineDivWidth(timelineStart,timelineEnd){
        return getPixelsPerDay()*getDayInRange(timelineStart,timelineEnd);
    }
    
    function init(data) {
        var $timeLineDiv=$('#visualization');
        var timeLineDivWidth=$timeLineDiv.width();
        
        console.log($timeLineDiv.width());
       console.log($timeLineDiv. outerWidth());
       console.log($timeLineDiv.innerWidth());
        
        var now = moment().minutes(0).seconds(0).milliseconds(0);
        var groups = data.groups;
        var items = data.items;
        var minDate=findMinDate(items);
        var maxDate=findMaxDate(items);
        var earliestLimit = moment(minDate).subtract(MONTH_AROUND, 'months').toDate();
        var latestLimit = moment(maxDate).add(MONTH_AROUND, 'months').toDate();
        console.log(earliestLimit);
        console.log(latestLimit);
        var timelineDivWidth=getTimelineDivWidth(earliestLimit,latestLimit);
        console.log(timelineDivWidth);
        $timeLineDiv.width(timelineDivWidth);
        // create a data set with groups

        var groups = new vis.DataSet(groups);


        // create a dataset with items
        var items = new vis.DataSet(items);


        // create visualization
        var container = document.getElementById('visualization');
        var options = {
//                groupOrder: 'content'  // groupOrder can be a property name or a sorting function
        };
        var options = {
//                height: '300px',
//            autoResize: false, // does not work
            min: earliestLimit, // lower limit of visible range
            max: latestLimit, // upper limit of visible range
            start: earliestLimit, // lower limit of visible range
            end: latestLimit,  // upper limit of visible range 
            zoomable:false,
            moveable:false
 //           zoomMin: TIMELINE_ZOOM_MONTH , // one day in milliseconds
//             zoomMax: TIMELINE_ZOOM_MONTH*3,    // about three months in milliseconds
//                moveable: false
        };
        var timeline = new vis.Timeline(container);
        timeline.setOptions(options);
        timeline.setGroups(groups);
        timeline.setItems(items);
//        timeline.redraw();
    }

});