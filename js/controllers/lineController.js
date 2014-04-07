/**
 * Created by Администратор on 09.12.13.
 */

var LineCtrl = {

    points: [],

    addPoint: function (event) {

        var point = null;
        var contains = PaintPanel.containsPoint(event);
        var pointCoordinates = PaintPanel.getUsrCoordinatesOfMouse(event);

        if (this.validateStartPoint() && !contains) {
            point = new AbstractPoint(pointCoordinates);
            var macroCommand = new MacroCommand();
            var addPointCommand = new AddPointCommand(point);
            var addLineCommand = new AddLineCommand(this.points[this.points.length - 1], point);
            macroCommand.addCommand(addPointCommand);
            macroCommand.addCommand(addLineCommand);
            app.executeCommand(macroCommand);
            this.clearPoints();
        } else {
            if (!contains) {
                point = new AbstractPoint(pointCoordinates);
                var addPointCommand = new AddPointCommand(point);
                app.executeCommand(addPointCommand);
            } else {
                point = PaintPanel.getExistingPoint(event);
            }
            if (point != null) {
                this.points.push(point);
            }
        }

        if (this.points.length == 2) {
            var addLineCommand = new AddLineCommand(this.points[0], this.points[1]);
            app.executeCommand(addLineCommand);
            this.clearPoints();
        }
    },

    clearPoints: function () {

        this.points.length = 0;
    },

    addStartPoint: function (point) {

        //alert("len = " + this.points.length)
        if (this.points.length < 1) {
            this.points.push(point);
        } else {
            this.clearPoints();
            this.points.push(point);
        }
    },

    validateStartPoint: function () {

        var ready = false;

        if (this.points.length != 0) {
            if (this.points[this.points.length - 1].isExist()) {
                ready = true;
            }
        }
        return ready;
    }

}