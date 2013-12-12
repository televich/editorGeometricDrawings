/**
 * Created by Администратор on 09.12.13.
 */

var AngleCtrl = {

    points : [],

    addPoint : function(point) {

        this.points.push(point);

        if(this.points.length == 3) {

            var point1 = this.points[0];
            var point2 = this.points[1];
            var point3 = this.points[2];
            PaintPanel.createAngle(point1, point2, point3);
            this.points.length = 0;
        }
    },

    clearPoints : function() {

        this.points.length = 0;
    }
}