/**
 * Created by Администратор on 30.03.14.
 */
var PointCtrl = {

    addPoint : function(event) {

        var contains = PaintPanel.containsPoint(event);

        //Создается точка
        if(!contains) {

            var pointCoordinates = PaintPanel.getUsrCoordinatesOfMouse(event);

            var point = new AbstractPoint("",pointCoordinates[0],pointCoordinates[1]);

            // переменная свободная
            point.free=true;

            point.coordinates.push(pointCoordinates);


            var addPointCommand = new AddPointCommand(point);
            app.executeCommand(addPointCommand);



        }


    },
    addPointWithoutHistory : function(event) {

        var contains = PaintPanel.containsPoint(event);

        //Создается точка
        if(!contains) {

            var pointCoordinates = PaintPanel.getUsrCoordinatesOfMouse(event);

            var point = new AbstractPoint("",pointCoordinates[0],pointCoordinates[1]);

            // переменная свободная
            point.free=true;

            point.coordinates.push(pointCoordinates);

            PaintPanel.createPoint(point);




        }


    },
    //функция меняет значение координат точки
    changeTheCoordinatesOfPoint : function(point){


        PaintPanel.changePoint(point);

    },
    delOfPoint : function(point){

        var delPointCommand = new DelPointCommand(point);
        app.executeCommand(delPointCommand);

    },
    clearPoints : function() {

    }


}