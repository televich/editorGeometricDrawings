/**
 * Created by Администратор on 09.12.13.
 */

var TriangleCtrl = {
    points: [],

    addPoint: function (event) {

        var point = null;
        var contains = PaintPanel.containsPoint(event);
        var pointCoordinates = PaintPanel.getUsrCoordinatesOfMouse(event);

        if (this.validateStartPoint() && !contains) {
            this.createMacroCommand(pointCoordinates);
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

        if (this.getExistingPoints().length == 3) {
            var existingPoints = this.getExistingPoints();
            var length = existingPoints.length;
            var addTriangleCommand = new AddTriangleCommand(existingPoints[length - 3], existingPoints[length - 2], existingPoints[length - 1]);
            app.executeCommand(addTriangleCommand);
            this.clearPoints();
        }
    },

    createMacroCommand : function(pointCoordinates) {

        var existingPoints = this.getExistingPoints();
        var length = existingPoints.length;
        var point = new AbstractPoint(pointCoordinates);
        var macroCommand = new MacroCommand();
        var addPointCommand = new AddPointCommand(point);
        var addTriangleCommand = new AddTriangleCommand(existingPoints[length - 2], existingPoints[length - 1], point);
        macroCommand.addCommand(addPointCommand);
        macroCommand.addCommand(addTriangleCommand);
        app.executeCommand(macroCommand);
        this.clearPoints();
    },

    clearPoints: function () {

        this.points.length = 0;
    },

    addTrianglePoint: function (point) {
        this.points.push(point);
    },

    validateStartPoint: function () {

        var ready = false, length = this.points.length, number = 0
        for(var  i = 0; i < length; i++) {
            if(this.points[i].isExist()) {
                number++;
            }
        }
        if(number >= 2) {
            ready = true;
        }
        return ready;
    },

    getExistingPoints : function() {
        var existPoints = [];
        for(var i = 0, length = this.points.length; i < length; i++) {
            if(this.points[i].isExist()) {
                existPoints.push(this.points[i]);
            }
        }
        return existPoints;
    }

}