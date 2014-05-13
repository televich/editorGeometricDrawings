/**
 * Created by Администратор on 07.04.14.
 */
function  ChangeTriangleCommand(element,param) {

    this.perimeter = param;
    this.abstractTriangle = element;
}

ChangeTriangleCommand.prototype.execute = function() {
   PaintPanel.saveChangeOfTriangle(this.abstractTriangle,this.perimeter);
};

ChangeTriangleCommand.prototype.unExecute = function() {
    PaintPanel.unsaveChangeOfTriangle(this.abstractTriangle);
};


