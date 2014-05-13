/**
 * Created by Администратор on 09.12.13.
 */

var AngleCtrl = {

    points: [],

    addPoint: function (event) {

        var point = null;
        var contains = PaintPanel.containsPoint(event);
        var pointCoordinates = PaintPanel.getUsrCoordinatesOfMouse(event);

        if(!contains)
        {
            PointCtrl.addPoint(event);

            PaintPanel.points[PaintPanel.points.length-1].free = false;
            PaintPanel.points[PaintPanel.points.length-1].numberOfFigures ++ ;

            this.points.push(PaintPanel.points[PaintPanel.points.length-1]);

        }
        else
        {
            var pointsN = PaintPanel.board.getAllObjectsUnderMouse(event);
            var pointN = pointsN[0];
            for(var i = 0; i < PaintPanel.points.length; i++) {
                if(pointN.name == PaintPanel.points[i].name)
                {
                    PaintPanel.points[i].free = false;
                    PaintPanel.points[i].numberOfFigures ++ ;
                    this.points.push(PaintPanel.points[i]);
                    break;
                }
            }

        }

        if (this.points.length == 3) {
            var addAngleCommand = new AddAngleCommand(this.points[0], this.points[1],this.points[2],30);

            this.points.length=0;

            app.executeCommand(addAngleCommand);

            ;
            //this.clearPoints();

        }

    },

    createMacroCommand : function(pointCoordinates) {

        var existingPoints = this.getExistingPoints();
        var length = existingPoints.length;
        var point = new AbstractPoint(pointCoordinates);
        var macroCommand = new MacroCommand();
        var addPointCommand = new AddPointCommand(point);
        var addSegmentCommand1 = new AddSegmentCommand(existingPoints[length - 2], existingPoints[length - 1]);
        var addSegmentCommand2 = new AddSegmentCommand(existingPoints[length - 1], point);
        var addAngleCommand = new AddAngleCommand(existingPoints[length - 2], existingPoints[length - 1], point);
        macroCommand.addCommands(addPointCommand, addSegmentCommand1, addSegmentCommand2, addAngleCommand);
        app.executeCommand(macroCommand);
        this.clearPoints();
    },
    changeFigure : function(line){
        app.changeElement = line ;
        var field = document.getElementById("parameters");
        field.style.display = 'block';
        document.getElementById("p").focus();


    },
    saveChangeofFigure : function(element,param)
    {

        var saveChangeofFigureCommand = new ChangeAngleCommand(element,param);

        app.executeCommand(saveChangeofFigureCommand);


    },
    delOfAngle : function(angle){

        var delAngleCommand = new DelAngleCommand(angle);
        app.executeCommand(delAngleCommand);

    },
    changeFigure : function(line){
        var field = document.getElementById("parameters");
        field.style.display = 'block';
        document.getElementById("p").focus();
        app.changeElement = line ;

    },

    clearPoints: function () {

        this.points.length = 0;
    },

    addAnglePoint: function (point) {
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