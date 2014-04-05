/**
 * Created by Администратор on 30.03.14.
 */
var PointCtrl = {

    addPoint : function(event) {

        var contains = PaintPanel.containsPoint(event);

        if(!contains) {

            var pointCoordinates = PaintPanel.getUsrCoordinatesOfMouse(event);
            var point = new AbstractPoint(pointCoordinates);
            var addPointCommand = new AddPointCommand(point);
            app.executeCommand(addPointCommand);

        }
    },

    clearPoints : function() {

    }


}