/**
 * Created by Администратор on 09.12.13.
 */

var TriangleCtrl = {
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
            var addTriangleCommand = new AddTriangleCommand(this.points[0], this.points[1],this.points[2],30);

            this.points.length=0;

            app.executeCommand(addTriangleCommand);

            ;
            //this.clearPoints();

        }

    },
    saveChangeofFigure : function(element,param)
    {

        var saveChangeofFigureCommand = new ChangeTriangleCommand(element,param);

        app.executeCommand(saveChangeofFigureCommand);


    },
    delOfTriangle : function(triangle){

        var delTriangleCommand = new DelTriangleCommand(triangle);
        app.executeCommand(delTriangleCommand);

    },
    createMacroCommand : function(pointCoordinates) {

        var existingPoints = this.getExistingPoints();
        var length = existingPoints.length;
        var point = new AbstractPoint(pointCoordinates);
        var macroCommand = new MacroCommand();
        var addPointCommand = new AddPointCommand(point);
        var addTriangleCommand = new AddTriangleCommand(existingPoints[length - 2], existingPoints[length - 1], point);
        macroCommand.addCommands(addPointCommand,addTriangleCommand);
        app.executeCommand(macroCommand);
        this.clearPoints();
    },

    clearPoints: function () {

        this.points.length = 0;
    },
    changeFigure : function(line){
        app.changeElement = line ;
        var field = document.getElementById("parameters");
        field.style.display = 'block';
        document.getElementById("p").focus();


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