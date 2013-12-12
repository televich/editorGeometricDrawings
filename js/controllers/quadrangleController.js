/**
 * Created by Ruslan on 09.12.13.
 */

var QuadrangleCtrl = {

    points : [],
    sideOfTheQuadrangle : [],


    addPoint : function(point) {

        this.points.push(point);
        var length = this.points.length;

        if(length > 1 && length < 4) {

            var side = PaintPanel.createPolygonSide(this.points[length - 1], this.points[length - 2]);
            this.sideOfTheQuadrangle.push(side);
        }

        if(this.points.length == 4) {

            PaintPanel.createQuadrangle(this.points);
            this.points.length = 0;
            this.removeTempSideOfTheQuadrangle();
        }
    },


    clearPoints : function() {

        this.points.length = 0;
    },

    removeTempSideOfTheQuadrangle : function() {

        for(var i = 0; i < this.sideOfTheQuadrangle.length; i++) {

            PaintPanel.removeElement(this.sideOfTheQuadrangle[i]);
        }
    }
}