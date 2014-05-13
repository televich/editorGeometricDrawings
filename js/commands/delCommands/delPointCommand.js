/**
 * Created by Администратор on 07.05.14.
 */
function DelPointCommand(point) {

    this.point = point;
}

DelPointCommand.prototype.execute = function() {
    PaintPanel.delOfPoint(this.point);
    this.point.setExist(false);
};

DelPointCommand.prototype.unExecute = function() {
    PaintPanel.createPoint(this.point);
    this.point.setExist(true);
};
