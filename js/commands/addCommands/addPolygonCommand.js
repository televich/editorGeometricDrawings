/**
 * Created by Администратор on 08.04.14.
 */
function AddPolygonCommand(points) {

    this.points = points.slice();
    this.abstractPolygon = null;
    this.perimeter = (this.points.length-1)*10;
}

AddPolygonCommand.prototype.execute = function () {
    this.abstractPolygon = PaintPanel.createPolygon(this.points);
    PolygonCtrl.clearPoints();
};

AddPolygonCommand.prototype.unExecute = function () {
    PaintPanel.removeOfPolygon(this.abstractPolygon);
};
