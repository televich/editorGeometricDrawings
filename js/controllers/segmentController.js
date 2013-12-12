/**
 * Created by Администратор on 09.12.13.
 */

var SegmentCtrl = {

    points : [],


    addPoint : function(point) {

        this.points.push(point);
        if(this.points.length == 2) {
            PaintPanel.createSegment(this.points[0], this.points[1]);
            this.points.length = 0;
        }
    },

    clearPoints : function() {

        this.points.length = 0;
    }

}