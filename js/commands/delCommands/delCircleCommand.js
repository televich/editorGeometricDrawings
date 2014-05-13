/**
 * Created by Администратор on 05.04.14.
 */
function DelCircleCommand(circle) {

    this.circle = circle;
    this.abstractCircle = null;
}

DelCircleCommand.prototype.execute = function() {
    PaintPanel.delOfCircle(this.circle);
};

DelCircleCommand.prototype.unExecute = function() {

    this.abstractCircle = PaintPanel.createCircle( this.circle.point1, this.circle.point2,  this.circle.radius);

};