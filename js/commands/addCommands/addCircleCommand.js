/**
 * Created by Администратор on 05.04.14.
 */

function AddCircleCommand(startPoint, endPoint,radius) {

    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.abstractCircle = null;
    this.radius = radius;
}

AddCircleCommand.prototype.execute = function() {
    this.abstractCircle = PaintPanel.createCircle(this.startPoint, this.endPoint,this.radius);
    CircleCtrl.clearPoints();
};

AddCircleCommand.prototype.unExecute = function() {

    PaintPanel.removeOfCircle(this.abstractCircle);


};