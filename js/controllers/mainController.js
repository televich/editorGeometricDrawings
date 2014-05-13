/**
 * Created by Администратор on 07.12.13.
 */

var app = {

    controller : null,
    drawer : null,
    parametersDoc : null,
    changeElement : null,
    history : [],
    index : 0,
    //Сейчас выполняется удаление?
    del : false,

    //Сейчас выполняется изменение?
    change : false,

    setLineMode : function() {
        this.clearCtrlPoints();
        this.controller = LineCtrl;
        document.getElementById("modeInfo").innerHTML = "Рисование линий";

    },

    setCircleMode : function() {
        this.clearCtrlPoints();
        this.controller = CircleCtrl;
        document.getElementById("modeInfo").innerHTML = "Рисование окружностей";
    },

    setSegmentMode : function() {
        this.clearCtrlPoints();
        this.controller = SegmentCtrl;
        document.getElementById("modeInfo").innerHTML = "Рисование отрезков";

    },

    setTriangleMode : function() {
        this.clearCtrlPoints();
        this.controller = TriangleCtrl;
        document.getElementById("modeInfo").innerHTML = "Рисование треугольников";

    },

    setPolygonMode : function() {
        this.clearCtrlPoints();
        this.controller = PolygonCtrl;
        document.getElementById("modeInfo").innerHTML = "Рисование N-угольников";

    },

    setAngleMode : function() {
        this.clearCtrlPoints();
        this.controller = AngleCtrl;
        document.getElementById("modeInfo").innerHTML = "Рисование углов";

    },


    setPointMode : function() {
        this.clearCtrlPoints();
        this.controller = PointCtrl;
        document.getElementById("modeInfo").innerHTML = "Рисование точек";

    },


    setParametersDoc: function (doc) {
        this.parametersDoc = doc;
    },

    saveChanges : function() {
        var param = document.getElementById("p").value;
        PaintPanel.saveChanges(this.changeElement, param);
        this.changeElement = null;
        this.closeField();

    },

    closeField : function() {
        var field = document.getElementById("parameters");
        field.style.display = 'none';
    },

    clearCtrlPoints : function() {

        if(this.controller != null) {
            this.controller.clearPoints();
        }
    },

    executeCommand : function(command) {
        command.execute();
        if(this.index < this.history.length) {
            this.history.length = this.index;
        }
        this.history.push(command);
        this.index++;
    },

    undo : function() {

        if(this.index > 0) {
            this.history[--this.index].unExecute();
            var t = true;
            if(this.history[this.index] instanceof  AddPointCommand
                || this.history[this.index] instanceof  ChangeAngleCommand
                || this.history[this.index] instanceof  ChangeSegmentCommand
                || this.history[this.index] instanceof  ChangeCircleCommand
                || this.history[this.index] instanceof  ChangeTriangleCommand
                || this.history[this.index] instanceof  ChangePolygonCommand
                || this.history[this.index] instanceof  DelAngleCommand
                || this.history[this.index] instanceof  DelSegmentCommand
                || this.history[this.index] instanceof  DelCircleCommand
                || this.history[this.index] instanceof  DelTriangleCommand
                || this.history[this.index] instanceof  DelPolygonCommand
                || this.history[this.index] instanceof  DelPointCommand
                || this.history[this.index] instanceof  DelLineCommand
                )
            { t = false}
            if(t)
            {
                this.history[--this.index].unExecute();
            }


        } else {
            this.controller.clearPoints();
        }
    },

    redo : function() {
        if(this.index < this.history.length) {
            this.history[this.index++].execute();
        }
    },
    clearHistory : function() {
        if (this.history.length != 0){
            this.history.length = 0;
            this.index = 0;
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {

    var board = document.getElementById("board");

    board.addEventListener("mousedown", function (event) {

        var LEFT_MOUSE_BUTTON = 1;
        var RIGHT_MOUSE_BUTTON = 3;
        app.closeField();


        switch (event.which) {

            case LEFT_MOUSE_BUTTON:{
                app.controller.addPoint(event);
            }

        }
        if(event.shiftKey && event.which == LEFT_MOUSE_BUTTON) {
            if(app.changeElement != null) {
                var field = document.getElementById("parameters");
                field.style.display = 'block';
                document.getElementById("p").focus();
            }
        }
    });
    document.addEventListener("keydown", function (event) {

            var keyZ = 90, keyY = 89,keyDel = 46,keyC = 67;

            if(event.ctrlKey && event.keyCode == keyZ) {
                app.undo();
            } else if(event.ctrlKey && event.keyCode == keyY){
                app.redo();
            }
            //Обработка события удаления геом объекта
            if(event.keyCode == keyDel) {
                app.del=true;
            }
            //Обработка события изменения числового значения геом объекта
            if(event.keyCode == keyC)
            {
                app.change=true;
            }
        }
    );

    board.addEventListener("mousemove", function (event) {

        PaintPanel.showElementInfo(event);
        if(app.del)
        {
            app.del = false;
            var delFigures = PaintPanel.board.getAllUnderMouse(event);
            var delFigure = delFigures[0];
            PaintPanel.delElement( delFigure);
        }
        else if(app.change)
        {
            app.change = false;
            var changeFigures = PaintPanel.board.getAllUnderMouse(event);
            var changeFigure = changeFigures[0];
            if(changeFigures[1] != null)
            {
                PaintPanel.ChangeElement( changeFigure,event);
            }
        }
    });
    board.addEventListener("mouseup", function (event) {
        var points = PaintPanel.board.getAllObjectsUnderMouse(event);
        var point = points[0];
        app.controller.changeTheCoordinatesOfPoint(point);
    });
});