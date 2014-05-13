/**
 * Created by Администратор on 05.04.14.
 */

function DelLineCommand(line) {

    this.line = line;
    this.board = null;
}

DelLineCommand.prototype.execute = function() {

    PaintPanel.delOfLine(this.line);
};

DelLineCommand.prototype.unExecute = function() {
  this.board = PaintPanel.createLine(this.line.point1,this.line.point2);
};
