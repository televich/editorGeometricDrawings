/**
 * Created by Администратор on 09.12.13.
 */

var LineCtrl = {

    points: [],

    addPoint: function (event) {

        var point = null;
        var contains = PaintPanel.containsPoint(event);
        var pointCoordinates = PaintPanel.getUsrCoordinatesOfMouse(event);

        if(!contains)
        {
            PointCtrl.addPoint(event);


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


            var addLineCommand = new AddLineCommand(this.points[0], this.points[1]);

            app.executeCommand(addLineCommand);



            this.points.length=0;

            ;
            //this.clearPoints();

        }

    },
    delOfLine : function(line){

        var delLineCommand = new DelLineCommand(line);
        app.executeCommand(delLineCommand);

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