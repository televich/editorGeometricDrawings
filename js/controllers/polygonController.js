/**
 * Created by Ruslan on 09.12.13.
 */

var PolygonCtrl = {

    points : [],
    sideOfThePolygon : [],

    addPoint : function(point) {

        var ready = this.isReady(point);
        if(ready)  {
            PaintPanel.createPolygon(this.points);
            this.points.length = 0;
            this.removeTempSideOfThePolygon();
        } else {
            this.points.push(point);
            var length = this.points.length;
            if(length > 1) {
                var side = PaintPanel.createPolygonSide(this.points[length - 1], this.points[length - 2]);
                this.sideOfThePolygon.push(side);
            }
        }
    },

    clearPoints : function() {

        this.points.length = 0;
    },

    removeTempSideOfThePolygon : function() {

        for(var i = 0; i < this.sideOfThePolygon.length; i++) {

            PaintPanel.removeElement(this.sideOfThePolygon[i]);
        }
    },

    isReady : function(point) {

        var ready = false;
        for(var i = 0; i < this.points.length; i++) {
            if(this.points[i] == point) {
                ready = true;
            }
        }
        return ready;
    }
}
