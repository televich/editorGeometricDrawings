/**
 * Created by Администратор on 05.04.14.
 */
function AddLineCommand(startPoint, endPoint) {

    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.line = null;

}

AddLineCommand.prototype.execute = function() {


    this.line = PaintPanel.createLine(this.startPoint, this.endPoint);
    LineCtrl.clearPoints();

};

AddLineCommand.prototype.unExecute = function() {

    PaintPanel.removeOfLine(this.line);

};