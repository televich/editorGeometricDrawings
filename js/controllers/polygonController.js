/**
 * Created by Ruslan on 09.12.13.
 */

var PolygonCtrl = {

    points : [],
    sideOfThePolygon : [],
    sides : [],
    startpoint : null,
    nowpoint : null,

    addPoint: function (event) {


        var contains = PaintPanel.containsPoint(event);
        var pointCoordinates = PaintPanel.getUsrCoordinatesOfMouse(event);

        if(!contains)
        {
            PointCtrl.addPoint(event);

            PaintPanel.points[PaintPanel.points.length-1].free = false;
            PaintPanel.points[PaintPanel.points.length-1].numberOfFigures ++ ;

            this.points.push(PaintPanel.points[PaintPanel.points.length-1]);
            this.nowpoint = PaintPanel.points[PaintPanel.points.length-1];
            if(this.points.length == 1)
                this.startpoint = PaintPanel.points[PaintPanel.points.length-1];

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
                    this.nowpoint = PaintPanel.points[i];
                    if(this.points.length == 1)
                        this.startpoint = PaintPanel.points[i];
                    break;
                }
            }

        }
        if(this.points.length > 1)
        {
            PaintPanel.board.create('line', [this.points[this.points.length-2].name, this.points[this.points.length-1].name],{straightFirst:false, straightLast:false});
        }

        if (this.points.length > 2) {

            if(this.startpoint.name == this.nowpoint.name){

                var addPolygonCommand = new AddPolygonCommand(this.points);

                this.points.length=0;

                app.executeCommand(addPolygonCommand);

            }

            ;
            //this.clearPoints();

        }

    },
    saveChangeofFigure : function(element,param)
    {

        var saveChangeofFigureCommand = new ChangePolygonCommand(element,param);
        app.executeCommand(saveChangeofFigureCommand);


    },
    delOfPolygon : function(polygon,polygonName){

        var delPolygonCommand = new DelPolygonCommand(polygon,polygonName);
        app.executeCommand(delPolygonCommand);

    },
    changeFigure : function(line){
        app.changeElement = line ;
        var field = document.getElementById("parameters");
        field.style.display = 'block';
        document.getElementById("p").focus();


    },

    addPolygonPoint: function (point) {
        if(point) {
            this.points = this.points.filter(function(x) {return x.isExist()});
            this.points.push(point);
        }
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
    },

    clearPoints : function() {

        this.points.length = 0;
    },

    removeTempSideOfThePolygon : function() {

        for(var i = 0; i < this.sideOfThePolygon.length; i++) {

            PaintPanel.removeElement(this.sideOfThePolygon[i]);
        }
    },

    isReady : function(point) {

        var ready = false;
        if(point.getX() == this.points[0].getX() && point.getY() == this.points[0].getY()) {
            ready = true;
        }
        return ready;
    }
}
