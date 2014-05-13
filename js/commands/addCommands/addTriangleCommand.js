/**
 * Created by Администратор on 07.04.14.
 */
function AddTriangleCommand(point1, point2, point3,perimeter) {

    this.point1 = point1;
    this.point2 = point2;
    this.point3 = point3;
    this.abstractTriangle = null;
    this.perimeter = perimeter;
}

AddTriangleCommand.prototype.execute = function () {
    this.abstractTriangle = PaintPanel.createTriangle(this.point1, this.point2, this.point3,this.perimeter);
    TriangleCtrl.clearPoints();
};

AddTriangleCommand.prototype.unExecute = function () {
    PaintPanel.removeOfTriangle(this.abstractTriangle);
};