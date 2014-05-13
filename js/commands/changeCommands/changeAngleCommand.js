/**
 * Created by Администратор on 06.04.14.
 */

function  ChangeAngleCommand(element,param) {

    this.value = param;
    this.abstractAngle = element;
}

ChangeAngleCommand.prototype.execute = function() {
    PaintPanel.saveChangeOfAngle(this.abstractAngle ,this.value);
};

ChangeAngleCommand.prototype.unExecute = function() {
    PaintPanel.unsaveChangeOfAngle(this.abstractAngle);
};

