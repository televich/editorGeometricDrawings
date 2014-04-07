/**
 * Created by Администратор on 07.04.14.
 */
function AddTriangleCommand(point1, point2, point3) {

    this.point1 = point1;
    this.point2 = point2;
    this.point3 = point3;
    this.abstractTriangle = null;

    this.execute = function () {

        this.abstractTriangle = PaintPanel.createTriangle(this.point1, this.point2, this.point3);
        TriangleCtrl.clearPoints();
    },

    this.unExecute = function () {
        PaintPanel.removePolygon(this.abstractTriangle);
        TriangleCtrl.clearPoints();
        if (this.point1.isContainsOnBoard() && this.point2.isContainsOnBoard()) {
            return;
        }
        if (this.point1.isExist()) {
            TriangleCtrl.addTrianglePoint(this.point1);
        }
        if (this.point2.isExist() && !this.point2.isContainsOnBoard()) {
            TriangleCtrl.addTrianglePoint(this.point2);
        }
    }
}