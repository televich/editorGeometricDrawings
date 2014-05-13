/**
 * Created by Администратор on 06.04.14.
 */
function DelAngleCommand(angle) {

    this.angle = angle;
    this.abstractCircle = null;
}

DelAngleCommand.prototype.execute = function() {

    PaintPanel.delOfAngle(this.angle);
};

DelAngleCommand.prototype.unExecute = function() {
    this.abstractCircle = PaintPanel.createAngle( this.angle.point1, this.angle.point2,this.angle.point3,  this.angle.value);

};