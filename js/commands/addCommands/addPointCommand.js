/**
 * Created by Администратор on 30.03.14.
 */
function AddPointCommand(point) {

    this.point = point;

    this.execute = function() {
        PaintPanel.createPoint(this.point);
        this.point.setExist(true);
    },

    this.unExecute = function() {

       PaintPanel.removePoint(this.point);
        this.point.setExist(false);

    }

}