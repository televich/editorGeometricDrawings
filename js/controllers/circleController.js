/**
 * Created by Администратор on 09.12.13.
 */

var CircleCtrl = {

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


        if (this.points.length == 2) {
            var addCircleCommand = new AddCircleCommand(this.points[0], this.points[1],5);

            this.points.length=0;

            app.executeCommand(addCircleCommand);

            ;
            //this.clearPoints();

        }

    },
    delOfCircle : function(circle){

        var delLineCommand = new DelCircleCommand(circle);
        app.executeCommand(delLineCommand);

    },
    changeFigure : function(line){
        app.changeElement = line ;
        var field = document.getElementById("parameters");
        field.style.display = 'block';
        document.getElementById("p").focus();


    },
    saveChangeofFigure : function(element,param)
    {


        var saveChangeofFigureCommand = new ChangeCircleCommand(element,param);

        app.executeCommand(saveChangeofFigureCommand);


    },
    clearPoints: function () {

        this.points.length = 0;
    },

    addStartPoint: function (point) {

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