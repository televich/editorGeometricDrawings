/**
 * Created by Администратор on 31.03.14.
 */
function AddSegmentCommand(startPoint, endPoint,startLength) {

    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.abstractSegment = null;
    this.length = startLength;
}

AddSegmentCommand.prototype.execute = function() {
    this.abstractSegment = PaintPanel.createSegment(this.startPoint, this.endPoint,this.length);
    SegmentCtrl.clearPoints();
};

AddSegmentCommand.prototype.unExecute = function() {

    PaintPanel.removeOfSegment(this.abstractSegment);
};