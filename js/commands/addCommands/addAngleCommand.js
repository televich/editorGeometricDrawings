/**
 * Created by Администратор on 06.04.14.
 */
function AddAngleCommand(point1, point2, point3,value) {

    this.point1 = point1;
    this.point2 = point2;
    this.point3 = point3;
    this.abstractAngle = null;
    this.value = value;
}
AddAngleCommand.prototype.execute = function () {

    this.abstractAngle = PaintPanel.createAngle(this.point1, this.point2, this.point3,this.value);
    AngleCtrl.clearPoints();
};

AddAngleCommand.prototype.unExecute = function () {
    PaintPanel.removeOfAngle(this.abstractAngle);

}