/**
 * Created by Администратор on 05.04.14.
 */

function  ChangeCircleCommand(element,param) {

    this.radius = param;
    this.abstractCircle = element;
}

ChangeCircleCommand.prototype.execute = function() {
     PaintPanel.saveChangeOfCircle( this.abstractCircle ,this.radius );
};

ChangeCircleCommand.prototype.unExecute = function() {
    PaintPanel.unsaveChangeOfCircle(this.abstractCircle);
};