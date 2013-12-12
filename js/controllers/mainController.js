/**
 * Created by Администратор on 07.12.13.
 */

var app = {

    controller : null,
    drawer : null,
    parametersDoc : null,
    changeElement : null,

    setLineMode : function() {

        this.clearCtrlPoints();
        this.controller = LineCtrl;
        document.getElementById("modeInfo").innerHTML = "Рисование линий";
    },

    setCircleMode : function() {
        this.clearCtrlPoints();
        this.controller = CicrleCtrl;
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
    setQuadrangleMode : function() {

        this.clearCtrlPoints();
        this.controller = QuadrangleCtrl;
        document.getElementById("modeInfo").innerHTML = "Рисование четерехугольников";
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
        this.controller = null;
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
    }

}

document.addEventListener("DOMContentLoaded", function () {

    var board = document.getElementById("board");

    board.addEventListener("mousedown", function (event) {

        var LEFT_MOUSE_BUTTON = 1;
        var RIGHT_MOUSE_BUTTON = 3;
        app.closeField();

        switch (event.which) {

            case LEFT_MOUSE_BUTTON:

                var point = PaintPanel.createPoint(event);
                if(point != null) {
                    app.controller.addPoint(point);
                }
                break;
        }

        if(event.ctrlKey && event.which == RIGHT_MOUSE_BUTTON) {

            app.changeElement = PaintPanel.getElement(event);
            if(app.changeElement != null) {
                var field = document.getElementById("parameters");
                field.style.display = 'block';
                document.getElementById("p").focus();
            }
        }
    });


    board.addEventListener("mousemove", function (event) {

        PaintPanel.showElementInfo(event);
        PaintPanel.showContainsInfo(event);


    });


});