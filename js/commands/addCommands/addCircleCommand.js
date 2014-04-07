/**
 * Created by Администратор on 05.04.14.
 */

function AddCircleCommand(startPoint, endPoint) {

    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.abstractCircle = null;

    this.execute = function() {

        this.abstractCircle = PaintPanel.createCircle(this.startPoint, this.endPoint);
        CircleCtrl.clearPoints();
    },

    this.unExecute = function() {

        PaintPanel.removeElement(this.abstractCircle);
        if(this.startPoint.isExist() && !this.startPoint.isContainsOnBoard()) {
            CircleCtrl.addStartPoint(this.startPoint);
        }
    }
}