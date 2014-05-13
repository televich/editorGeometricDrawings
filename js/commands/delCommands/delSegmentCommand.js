/**
 * Created by Администратор on 31.03.14.
 */
function DelSegmentCommand(segment) {
    this.segment = segment;
    this.board = null;
}

DelSegmentCommand.prototype.execute = function() {
    PaintPanel.delOfSegment(this.segment);
};

DelSegmentCommand.prototype.unExecute = function() {
    this.board = PaintPanel.createSegment(this.segment.point1, this.segment.point2, this.segment.length);
};
