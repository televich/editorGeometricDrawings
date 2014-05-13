/**
 * Created by Администратор on 31.03.14.
 */

function  ChangeSegmentCommand(element,param) {

    this.abstractSegment = element;
    this.length = param;
}

ChangeSegmentCommand.prototype.execute = function() {
    PaintPanel.saveChangeOfLine(this.abstractSegment,this.length);
};

ChangeSegmentCommand.prototype.unExecute = function() {
    PaintPanel.unsaveChangeOfLine(this.abstractSegment);

  //  PaintPanel.removeElement(this.abstractSegment);
  //  if(this.startPoint.isExist() && !this.startPoint.isContainsOnBoard()) {
  //      SegmentCtrl.addStartPoint(this.startPoint);
  //  }
};