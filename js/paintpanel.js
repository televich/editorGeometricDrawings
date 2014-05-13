/**
 * Created by Администратор on 07.12.13.
 */

var PaintPanel = {

    elements : [],
    points : [],
    lines : [],
    straight : [],
    triangles : [],
    circles : [],
    angles : [],
    board : null,
    showGrid : true,
    polygons : [],


    createBoard : function() {
        this.board = JXG.JSXGraph.initBoard('board', {boundingbox: [-20, 20, 20, -20], showCopyright : false, grid : this.showGrid});
    },

    //Функция получает на вход фигуру delFigure принадлежащему одному из классов JXG
    //Мы определяем к какому классу она относится и вызываем соответсвующий контроллер для удаления фигуры
    delElement : function(delFigure) {
        if(delFigure instanceof  JXG.Line) {

            //Ищет фигуру среди отрезков, хранимых в приложении
            var figure = this.searchLine(delFigure);

            if(figure != null) {

                //передаем управление контроллеру отрезков для удаления выделенного отрезка (figure)
                var ctrlmode = app.controller;
                app.controller = SegmentCtrl;
                app.controller.delOfSegment(figure);
                app.controller = ctrlmode;

            }
            else {

                //Ищет фигуру среди линий, хранимых в приложении
                figure = this.searchStraight(delFigure);

                if(figure != null) {
                    var ctrlmode = app.controller;
                    app.controller = LineCtrl;
                    app.controller.delOfLine(figure);
                    app.controller = ctrlmode;
                }
                else {
                    figure = this.searchTriangle(delFigure);
                    if(figure != null) {
                        var ctrlmode = app.controller;
                        app.controller = TriangleCtrl;
                        app.controller.delOfTriangle(figure);
                        app.controller = ctrlmode;
                    }
                    else {
                        figure = this.searchPolygon(delFigure);
                        if(figure != null) {

                            //Получаем строковое имя полигона figure
                            var polygonName = "";
                            for(var  i = 0 ; i < figure.lines.length-1; i++)
                            {
                                polygonName = polygonName + figure.lines[i].point1.name;
                            }

                            var ctrlmode = app.controller;
                            app.controller = PolygonCtrl;
                            app.controller.delOfPolygon(figure,polygonName);
                            app.controller = ctrlmode;
                        }
                    }
                }
            }
        }

        if(delFigure instanceof  JXG.Circle) {
            var circle = this.searchCircle(delFigure);
            if(circle != null) {
                var ctrlmode = app.controller;
                app.controller = CircleCtrl;
                app.controller.delOfCircle(circle);
                app.controller = ctrlmode;
            }
        }
        // Проверяет является ли delFigure углои
        if((delFigure instanceof  JXG.GeometryElement) && !(delFigure instanceof  JXG.Circle)
            && !(delFigure instanceof  JXG.Line) && !(delFigure instanceof  JXG.Point)) {
            var angle = this.searchAngle(delFigure);
            if(angle != null) {
                var ctrlmode = app.controller;
                app.controller = AngleCtrl;
                app.controller.delOfAngle(angle);
                app.controller = ctrlmode;
            }
        }
        if( delFigure instanceof JXG.Point) {
            var point = this.searchPoint(delFigure);

            //атрибут point.free показывает свободна точка или входит в состав других фигур
            if(!(point.free)) {
                //Если точка входит в состав других фигур то также удаляются и фигуры
                var linePoint = [];

                //Ищет отрезки, в состав которых входит point
                linePoint =  PaintPanel.searchLinesOfPoint(point);

                //Удаляем все найденные фигуры
                if(linePoint.length > 0) {
                    for(var i = 0; i < linePoint.length; i++) {
                        var ctrlmode = app.controller;
                        app.controller = SegmentCtrl;
                        app.controller.delOfSegment(linePoint[i]);
                        app.controller = ctrlmode;
                    }
                }
                // Обнуляем linePoint для записи в этот массив фигур другого типа
                linePoint.lenght = 0;

                linePoint =  PaintPanel.searchStraightsOfPoint(point);
                if(linePoint.length > 0) {
                    for(var i = 0; i < linePoint.length; i++) {
                        var ctrlmode = app.controller;
                        app.controller = LineCtrl;
                        app.controller.delOfLine(linePoint[i]);
                        app.controller = ctrlmode;
                    }
                }
                linePoint.lenght = 0;
                linePoint =  PaintPanel.searchCirclesOfPoint(point);
                if(linePoint.length > 0) {
                    for(var i = 0; i < linePoint.length; i++) {
                        linePoint[0];
                        var ctrlmode = app.controller;
                        app.controller = CircleCtrl;
                        app.controller.delOfCircle(linePoint[i]);
                        app.controller = ctrlmode;
                    }
                }
                linePoint.lenght = 0;
                linePoint =  PaintPanel.searchTrianglesOfPoint(point);
                if(linePoint.length > 0) {
                    for(var i = 0; i < linePoint.length; i++) {
                        var ctrlmode = app.controller;
                        app.controller = TriangleCtrl;
                        app.controller.delOfTriangle(linePoint[i]);
                        app.controller = ctrlmode;
                    }
                }
                linePoint.lenght = 0;
                linePoint =  PaintPanel.searchAnglesOfPoint(point);
                if(linePoint.length > 0) {
                    for(var i = 0; i < linePoint.length; i++) {
                        var ctrlmode = app.controller;
                        app.controller = AngleCtrl;
                        app.controller.delOfAngle(linePoint[i]);
                        app.controller = ctrlmode;
                    }
                }
                linePoint.lenght = 0;
                linePoint =  PaintPanel.searchPolygonsOfPoint(point);
                if(linePoint.length > 0) {
                    for(var i = 0; i < linePoint.length; i++) {
                        var polygonNane = "";
                        for(var  j = 0 ; j < linePoint[i].lines.length-1; j++)
                        {
                            polygonNane = polygonNane + linePoint[i].lines[j].point1.name;
                        }
                        var ctrlmode = app.controller;
                        app.controller = PolygonCtrl;
                        app.controller.delOfPolygon(linePoint[i],polygonNane);
                        app.controller = ctrlmode;
                    }
                }
            }
            else {
                //Если выделенная точка не входит в состав других фигур то мы просто вызываем контроллер для
                //удаления точки
                var ctrlmode = app.controller;
                app.controller = PointCtrl;
                app.controller.delOfPoint(point);
                app.controller = ctrlmode;
            }
        }
    },

    ChangeElement : function(changeFigure,event) {

        if(changeFigure instanceof  JXG.Line)
        {

            var figure = this.searchLine(changeFigure);
            if(figure != null)
            {
                var ctrlmode = app.controller;
                app.controller = SegmentCtrl;

                app.controller.changeFigure(figure);
                app.controller = ctrlmode;

                //this.changeOfSegment(delFigure,event);

            }
            else
            {


                figure = this.searchStraight(changeFigure);
                //alert(figure);
                if(figure != null)
                {


                }
                else
                {



                    figure = this.searchTriangle(changeFigure);
                    if(figure != null)
                    {
                        var ctrlmode = app.controller;
                        app.controller = TriangleCtrl;

                        app.controller.changeFigure(figure);
                        app.controller = ctrlmode;
                    }
                    else {

                        figure = this.searchPolygon(changeFigure);
                        if(figure != null)
                        {

                            var ctrlmode = app.controller;
                            app.controller = PolygonCtrl;

                            app.controller.changeFigure(figure);
                            app.controller = ctrlmode;
                        }



                    }

                }

            }
        }

        if(changeFigure instanceof  JXG.Circle) {


            var circle = this.searchCircle(changeFigure);

            if(circle != null)
            {
                // document.getElementById("q").innerHTML = "Рисование отрезков";
                var ctrlmode = app.controller;
                app.controller = CircleCtrl;

                app.controller.changeFigure(circle);
                app.controller = ctrlmode;


                // this.delOfCircle(circle,event);
            }

        }
        if((changeFigure instanceof  JXG.GeometryElement) && !(changeFigure instanceof  JXG.Circle) && !(changeFigure instanceof  JXG.Line) && !(changeFigure instanceof  JXG.Point)) {

            var angle = this.searchAngle(changeFigure);
            var param = document.getElementById("p").value;



            if(angle != null)
            {
                var ctrlmode = app.controller;
                app.controller = AngleCtrl;

                app.controller.changeFigure(angle);
                app.controller = ctrlmode;

                //  this.delOfAngle(delFigure,event);
            }



            //var circleName = circle.point1.name + circle.point2.name;
            //document.getElementById("containsInfo").innerHTML = "Окружность " + circleName + " с радиусом = " + circle.radius;

        }


    },



    showElementInfo : function(event) {

        var p = this.board.getAllUnderMouse(event);
        //var r = this.board.getAllObjectsUnderMouse(event);

        if(p.length > 1) {

            var element = p[0];
            if(element instanceof  JXG.Line) {
                var line = this.searchLine(element);
                if(line != null)
                {


                    var lineName = line.point1.name + line.point2.name;
                    document.getElementById("containsInfo").innerHTML = "Отрезок " + lineName + " с длиной = " + line.lengthes[line.index];
                }
                else
                {

                    line = this.searchStraight(element);
                    if(line != null)
                    {
                        var lineName = line.point1.name + line.point2.name;
                        document.getElementById("containsInfo").innerHTML = "Прямая " + lineName;
                    }
                    else {
                        var triangle = this.searchTriangle(element);
                        if(triangle != null)
                        {
                            var triangleName = triangle.line1.point1.name+triangle.line1.point2.name+triangle.line3.point1.name;
                            document.getElementById("containsInfo").innerHTML = "Треугольник " + triangleName + " с периметром = " + triangle.perimeters[triangle.index];
                        }
                        else {

                            var polygon = this.searchPolygon(element);


                            var polygonName = "";
                            for(var  i = 0 ; i < polygon.lines.length-1; i++)
                            {
                                polygonName = polygonName + polygon.lines[i].point1.name;
                            }
                            document.getElementById("containsInfo").innerHTML =  (polygon.lines.length-1) +"-угольник " + polygonName + " с периметром = " + polygon.perimeters[polygon.index] ;
                        }
                    }
                }
            }
            if(element instanceof  JXG.Circle) {

                var circle = this.searchCircle(element);


                var circleName = circle.point1.name + circle.point2.name;
                document.getElementById("containsInfo").innerHTML = "Окружность " + circleName + " с радиусом = " + circle.radiuses[circle.index];

            }
            if(element instanceof  JXG.Point) {

                var point = this.searchPoint(element);


                var pointName = point.name;
                var  putOutString = "" ;
                putOutString = "Точка "+ pointName;
                if(!(point.free))
                {
                    putOutString += ":";
                    var linePoint = [];
                    linePoint =  PaintPanel.searchLinesOfPoint(point);
                    if(linePoint.length > 0)
                    {
                        for(var i = 0; i < linePoint.length; i++)
                        {
                            putOutString += "\n\t принадлежит отрезку "+ linePoint[i].point1.name+linePoint[i].point2.name;
                        }
                    }
                    linePoint.lenght = 0;
                    linePoint =  PaintPanel.searchStraightsOfPoint(point);
                    if(linePoint.length > 0)
                    {
                        for(var i = 0; i < linePoint.length; i++)
                        {
                            putOutString += "\n\t принадлежит прямой "+ linePoint[i].point1.name+linePoint[i].point2.name;
                        }
                    }
                    linePoint.lenght = 0;
                    linePoint =  PaintPanel.searchCirclesOfPoint(point);
                    if(linePoint.length > 0)
                    {

                        for(var i = 0; i < linePoint.length; i++)
                        {
                            putOutString += "\n\t принадлежит окружности "+ linePoint[i].point1.name+linePoint[i].point2.name;
                        }
                    }
                    linePoint.lenght = 0;
                    linePoint =  PaintPanel.searchTrianglesOfPoint(point);
                    if(linePoint.length > 0)
                    {

                        for(var i = 0; i < linePoint.length; i++)
                        {
                            putOutString += "\n\t принадлежит треугольнику "+ linePoint[i].line1.point1.name+linePoint[i].line2.point1.name+linePoint[i].line3.point1.name;
                        }
                    }
                    linePoint.lenght = 0;
                    linePoint =  PaintPanel.searchAnglesOfPoint(point);
                    if(linePoint.length > 0)
                    {

                        for(var i = 0; i < linePoint.length; i++)
                        {
                            putOutString += "\n\t принадлежит углу "+ linePoint[i].point1.name+linePoint[i].point2.name+linePoint[i].point3.name;
                        }
                    }
                    linePoint.lenght = 0;
                    linePoint =  PaintPanel.searchPolygonsOfPoint(point);
                    if(linePoint.length > 0)
                    {

                        for(var i = 0; i < linePoint.length; i++)
                        {
                            putOutString += "\n\t принадлежит "+(linePoint[i].lines.length-1)+"-угольнику ";
                            for(var j = 0; j < linePoint[i].lines.length-1; j++)
                            {
                                putOutString += linePoint[i].lines[j].point1.name;
                            }

                        }
                    }


                }
                document.getElementById("containsInfo").innerHTML = putOutString;

            }
            if((element instanceof  JXG.GeometryElement) && !(element instanceof  JXG.Circle) && !(element instanceof  JXG.Line) && !(element instanceof  JXG.Point)) {

                var angle = this.searchAngle(element);
                var angleName = angle.point1.name + angle.point2.name + angle.point3.name;

                document.getElementById("containsInfo").innerHTML = "Угол " + angleName + " равный = " + angle.values[angle.index];


                //var circleName = circle.point1.name + circle.point2.name;
                //document.getElementById("containsInfo").innerHTML = "Окружность " + circleName + " с радиусом = " + circle.radius;

            }
            // if(element instanceof  JXG.GeometryElement) {

            // if(element.length == 3)
            //  {

            //      var triangle = this.searchTriangle(element);
            //     var triangleName = triangle.line1.point1.name + triangle.line2.point1.name + triangle.line3.point1.name;
            //  }


            // }



        }else {
            document.getElementById("info").innerHTML = " ";
            document.getElementById("polygonInfo").innerHTML = " ";
            document.getElementById("containsInfo").innerHTML = " ";
        }

    },

    showContainsInfo : function(event) {

        var p = this.board.getAllUnderMouse(event);
        if(p.length > 2 ) {
            var element = p[0];
            if(element instanceof JXG.Line) {
                for(var i = 0; i < p.length; i++) {
                    if(p[i] instanceof  JXG.Point) {

                        var lineName = element.point1.name + element.point2.name;
                        var pointNme = p[i].name;
                        if(element.getAttribute("straightFirst")) {
                            document.getElementById("containsInfo").innerHTML = "Точка " + pointNme + " принадлежит прямой " + lineName;
                        } else {
                            document.getElementById("containsInfo").innerHTML = "Точка " + pointNme + " отрезку " + lineName;
                        }
                        break;
                    }
                }
            } else if(element instanceof  JXG.Circle){

                for(var i = 0; i < p.length; i++) {
                    if(p[i] instanceof  JXG.Point) {
                        var circleName = element.center.name + element.point2.name;
                        var pointNme = p[i].name;
                        document.getElementById("containsInfo").innerHTML = "Точка " + pointNme + " принадлежит окружности " + circleName;
                        break;
                    }
                }
            } else if(element instanceof  JXG.Point) {

                for(var i = 0; i < p.length; i++) {
                    if(p[i] instanceof  JXG.Circle) {
                        var circleName = p[i].center.name + p[i].point2.name;
                        var pointNme = element.name;
                        document.getElementById("containsInfo").innerHTML = "Точка " + pointNme + " принадлежит окружности " + circleName;
                        break;
                    } else if(p[i] instanceof  JXG.Line) {
                        var lineName = p[i].point1.name + p[i].point2.name;
                        var pointNme = element.name;
                        document.getElementById("containsInfo").innerHTML = "Точка " + pointNme + " принадлежит отрезку " + lineName;
                        break;
                    }
                }
            } else {
                document.getElementById("containsInfo").innerHTML = "";
            }
        }

    },

    getPolygon : function(side) {

        var polygon = null;
        for(var i = 0; i < this.polygons.length; i++) {
            if(this.polygons[i].containsSide(side)) {
                polygon = this.polygons[i];
                break;
            }
        }
        return polygon;
    },

    containsPoint : function(event) {

        var contains = false;
        var elements = this.board.getAllObjectsUnderMouse(event);

        if(elements.length >= 1) {
            contains = true;
        }
        return contains;
    },

    getExistingPoint : function(event) {

        var point = null;
        var elements = this.board.getAllUnderMouse(event);
        var element = elements[0];
        if(element instanceof JXG.Point) {
            point = new AbstractPoint([element.X(), element.Y()]);
            point.setContainsOnBoard(true);
        }
        return point;
    },


    getUsrCoordinatesOfMouse : function(event) {

        var pointInBoard = this.board.getUsrCoordsOfMouse(event);
        var result = [pointInBoard[0], pointInBoard[1]];
        return result;
    },

    createPoint : function(point) {
        var isEntity = true;
        for(var i = 0; i < this.points.length; i++) {
            if(point.name == this.points[i].name)
            {
                isEntity = false;
                break;
            }
        }
        if( isEntity )
        {


            var p = this.board.create('point', [point.getX(), point.getY()]);
            point.name = p.name;
            this.points.push(point);
        }


    },
    //Меняет координаты точки
    changePoint : function(point) {
        for(var i = 0; i < this.points.length; i++) {
            if(point.name == this.points[i].name)
            {
                this.points[i].X = point.X();
                this.points[i].Y = point.Y();
                this.points[i].coordinates.push([point.X(),point.Y()]);
                this.points[i].index++;
                break;
            }
        }

    },
    //Удаляем точку
    delOfPoint : function(point) {

        for(var i = 0; i < this.points.length; i++) {
            if(point.name == this.points[i].name)
            {
                if(point.free)
                {
                    this.points.splice(i, 1);
                    this.board.removeObject(point.name);
                }
                else
                {
                    if(this.points[i].numberOfFigures == 1) {
                        this.board.removeObject(point.name);
                        this.points.splice(i, 1);
                    }
                    else
                        this.points[i].numberOfFigures -- ;

                }
                break;
            }
        }

    },
    //Удаляем полигон
    delOfPolygon : function(polygon,varpolygonName) {

        var polygonName = "";

        for(var i = 0; i < this.polygons.length; i++) {
            polygonName = ""

            for(var  j = 0 ; j < this.polygons[i].lines.length-1; j++)
            {
                polygonName = polygonName + this.polygons[i].lines[j].point1.name;
            }


            if( polygonName == varpolygonName)
            {

                //    var p = this.board.getAllUnderMouse(event);


                this.board.removeObject(p[0]);
                for(var  k = 0 ; k < this.polygons[i].lines.length; k++)
                {
                    this.delOfPoint(this.polygons[i].lines[k].point1);
                }


                this.polygons.splice(i,1);
                break;

            }



        }

    },
    removeOfPolygon : function(polygon,varpolygonName,event) {

        var polygonName = "";

        for(var i = 0; i < this.polygons.length; i++) {
            polygonName = ""

            for(var  j = 0 ; j < this.polygons[i].lines.length-1; j++)
            {
                polygonName = polygonName + this.polygons[i].lines[j].point1.name;
            }


            if( polygonName == varpolygonName)
            {

                //    var p = this.board.getAllUnderMouse(event);


                this.board.removeObject(p[0]);

                this.polygons.splice(i,1);
                break;

            }



        }

    },


    //Удаляем треугольник
    delOfTriangle : function(triangle) {



        for(var i = 0; i < this.triangles.length; i++) {

            {
                if((triangle.line1.point1.name == this.triangles[i].line1.point1.name) && (triangle.line2.point1.name == this.triangles[i].line2.point1.name)
                    && (triangle.line3.point1.name == this.triangles[i].line3.point1.name)

                    )
                {

                    var p = this.board.getAllUnderMouse(event);

                    this.board.removeObject(p[0]);

                    this.delOfPoint(triangle.line1.point1);
                    this.delOfPoint(triangle.line2.point1);
                    this.delOfPoint(triangle.line3.point1);

                    this.triangles.splice(i,1);
                    break;

                }
            }
        }

    },
    removeOfTriangle : function(triangle,event) {



        for(var i = 0; i < this.triangles.length; i++) {

            {
                if((triangle.line1.point1.name == this.triangles[i].line1.point1.name) && (triangle.line2.point1.name == this.triangles[i].line2.point1.name)
                    && (triangle.line3.point1.name == this.triangles[i].line3.point1.name)

                    )
                {

                    var p = this.board.getAllUnderMouse(event);

                    this.board.removeObject(p[0]);

                    this.triangles.splice(i,1);
                    break;

                }
            }
        }

    },
    //Удаляем угол
    delOfAngle : function(angle) {
        for(var i = 0; i < this.angles.length; i++) {


            if(this.angles[i].name == angle.name )
            {

                var p = this.board.getAllUnderMouse(event);

                this.board.removeObject(p[0]);
                this.delOfPoint(this.angles[i].point1);
                this.delOfPoint(this.angles[i].point2);
                this.delOfPoint(this.angles[i].point3);

                //Удаляем с БД
                this.angles.splice(i,1);
                break;


            }
        }

    },
    removeOfAngle : function(angle,event) {
        for(var i = 0; i < this.angles.length; i++) {


            if(this.angles[i].name == angle.name )
            {

                var p = this.board.getAllUnderMouse(event);

                this.board.removeObject(p[0]);

                //Удаляем с БД
                this.angles.splice(i,1);
                break;


            }
        }

    },
    //Удаляем окружность
    delOfCircle : function(circle) {
        for(var i = 0; i < this.circles.length; i++) {


            if(this.circles[i].point1.name == circle.point1.name )
            {

                var p = this.board.getAllUnderMouse(event);

                this.board.removeObject(p[0]);
                this.delOfPoint(this.circles[i].point1);
                this.delOfPoint(this.circles[i].point2);
                this.circles.splice(i,1);
                break;
            }
        }

    },
    removeOfCircle : function(circle,event) {
        for(var i = 0; i < this.circles.length; i++) {


            if(this.circles[i].point1.name == circle.point1.name )
            {

                var p = this.board.getAllUnderMouse(event);

                this.board.removeObject(p[0]);
                this.circles.splice(i,1);
                break;
            }
        }

    },
    //Удаляем отрезок
    delOfSegment : function(line) {
        for(var i = 0; i < this.lines.length; i++) {
            //Ищем отрезки по именам их граничных точек
            if(this.lines[i].point1.name == line.point1.name && this.lines[i].point2.name == line.point2.name) {
                var p = this.board.getAllUnderMouse(event);
                this.board.removeObject(p[0]);
                // Здесь оповещаются точки
                this.delOfPoint(line.point1);
                this.delOfPoint(line.point2);
                this.lines.splice(i,1);
                break;
            }
        }

    },
    removeOfSegment : function(line,event) {
        for(var i = 0; i < this.lines.length; i++) {


            if((this.lines[i].point1.name == line.point1.name && this.lines[i].point2.name == line.point2.name)
                || (this.lines[i].point1.name == line.point2.name && this.lines[i].point2.name == line.point1.name)
                )
            {
                var p = this.board.getAllUnderMouse(event);

                this.board.removeObject(p[0]);
                this.lines.splice(i,1);
                break;
            }
        }

    },

    //Удаляем прямую
    delOfLine : function(line) {
        for(var i = 0; i < this.straight.length; i++) {


            if((this.straight[i].point1.name == line.point1.name && this.straight[i].point2.name == line.point2.name)
                || (this.straight[i].point1.name == line.point2.name && this.straight[i].point2.name == line.point1.name)
                )
            {
                //var p = this.board.getAllUnderMouse(event);
                this.delOfPoint(line.point1);
                this.delOfPoint(line.point2);

                this.straight.splice(i,1);
                break;
            }
        }

    },
    removeOfLine : function(line) {
        for(var i = 0; i < this.straight.length; i++) {


            if((this.straight[i].point1.name == line.point1.name && this.straight[i].point2.name == line.point2.name)
                || (this.straight[i].point1.name == line.point2.name && this.straight[i].point2.name == line.point1.name)
                )
            {
                //var p = this.board.getAllUnderMouse(event);

                this.straight.splice(i,1);
                break;
            }
        }

    },


    deleteLastAddedPoint : function() {

        this.board.removeObject(this.points.pop());
    },

    getElement : function(event) {

        var p = this.board.getAllUnderMouse(event);
        var abstractElement = null;

        if(p.length > 1) {
            var element = p[0];
            if(element instanceof JXG.Line){
                abstractElement  = this.searchLine(element);
            }
        }

        return abstractElement;
    },

    getParam : function(point1,point2) {

        var param = null;

        for(var i = 0; i < this.elements.length; i++) {
            var element = this.elements[i];

            if(element instanceof  AbstractLine || element instanceof AbstractCircle) {
                if(((element.getPoint1() == point1 && element.getPoint2() == point2)
                    || (element.getPoint1() == point2 && element.getPoint2() == point1))) {
                    param = element.getParam();
                    break;
                }
            }
        }

        return param;
    },

    getPoint : function(abstractPoint) {

        var point = null;
        for(var i = 0, length = this.points.length; i < length; i++) {
            point = this.points[i];
            if(point.X() == abstractPoint.getX() && point.Y() == abstractPoint.getY()) {
                return point;
            }
        }
        return null;
    },

    createLine : function(abstractStartPoint, abstractEndPoint) {

        this.createPoint(abstractStartPoint);
        this.createPoint(abstractEndPoint);

        var line = new AbstractStraight(abstractStartPoint,abstractEndPoint);


        var lines = this.board.create('line', [abstractStartPoint.name, abstractEndPoint.name]);

        //alert("qqqq");

        this.straight.push(line);
        return line;


    },

    createCircle : function(abstractStartPoint, abstractEndPoint,radius) {

        this.createPoint(abstractStartPoint);
        this.createPoint(abstractEndPoint);

        var circle = new AbstractCircle(abstractStartPoint,abstractEndPoint, radius);
        var circlesz = this.board.create('circle', [abstractStartPoint.name, abstractEndPoint.name]);

        this.circles.push(circle);
        return circle;
    },

    createSegment : function(abstractStartPoint, abstractEndPoint, abstractLength) {

        this.createPoint(abstractStartPoint);
        this.createPoint(abstractEndPoint);

        var varline = this.board.create('line', [abstractStartPoint.name, abstractEndPoint.name],{straightFirst:false, straightLast:false});


        var line = new AbstractLine(abstractStartPoint, abstractEndPoint, abstractLength);
        this.lines.push(line);
        //var abstractLine = new AbstractLine(line, param);
        //this.elements.push(abstractLine);
        return line;
    },

    createTriangle : function(abstractPoint1, abstractPoint2, abstractPoint3,perimeter) {

        this.createPoint(abstractPoint1);
        this.createPoint(abstractPoint2);
        this.createPoint(abstractPoint3);

        var triangle = new AbstractTriangle([abstractPoint1, abstractPoint2, abstractPoint3], perimeter);
        var triangles = this.board.create('polygon', [abstractPoint1.name, abstractPoint2.name,abstractPoint3.name]);

        this.triangles.push(triangle);
        return triangle;
    },

    createPolygon : function(abstractPoints) {

        for(var  i = 0; i < abstractPoints.length; i++) {
            this.createPoint(abstractPoints[i]);
        }


        var polygon = new AbstractPolygon(abstractPoints,(abstractPoints.length-1)*10);
        var names = [];

        for(var  i = 0; i < abstractPoints.length; i++) {
            names.push(abstractPoints[i].name);
        }


        var polygonq = this.board.create('polygon', names);

        this.polygons.push(polygon);
        return polygon;

    },

    createAngle : function(abstractPoint1, abstractPoint2, abstractPoint3,value) {

        this.createPoint(abstractPoint1);
        this.createPoint(abstractPoint2);
        this.createPoint(abstractPoint3);

        var angle = new AbstractAngle(abstractPoint1, abstractPoint2, abstractPoint3, value);
        var angles = this.board.create('angle', [abstractPoint3.name, abstractPoint2.name,abstractPoint1.name], {type:'sector', orthoType:'square', orthoSensitivity:2, radius:3});
        angle.name = angles.name;
        this.angles.push(angle);
        return angle;
    },

    createPolygonSide : function(startPoint, endPoint) {

        var side = this.board.create('line', [startPoint, endPoint],{straightFirst:false, straightLast:false});
        return side;
    },


    createSideOfThePolygon : function(side){

        var sideOfTheAbstractPolygon = [];
        for(var i = 0; i < side.length; i++) {
            var s = side[i];
            var param = this.getParam(s.point1, s.point2);
            param = (param == null) ?  Math.round(s.L())  : param;
            var abstractLine = new AbstractLine(s, param);
            this.elements.push(abstractLine);
            sideOfTheAbstractPolygon.push(abstractLine);
        }
        return sideOfTheAbstractPolygon;
    },

    removePoint : function(point) {

        this.deleteLastAddedPoint();
    },

    removeElement : function(abstractElement) {

        this.board.removeObject(abstractElement.getObject());
        this.removeAbstractElement(abstractElement);

    },

    removePolygon : function(abstractPolygon) {

        this.board.removeObject(abstractPolygon.getObject());
        this.polygons.splice(this.polygons.indexOf(abstractPolygon), 1);
    },
    searchAnglesOfPoint : function(element) {

        var abstractElement = [];


        for(var i = 0; i < this.angles.length; i++) {
            if(this.angles[i].point1.name == element.name || this.angles[i].point2.name == element.name || this.angles[i].point3.name == element.name
                )
            {

                abstractElement.push( this.angles[i]);

            }
        }

        return abstractElement;
    },
    searchPolygonsOfPoint : function(element) {

        var abstractElement = [];

        for(var i = 0; i < this.polygons.length; i++) {
            for(var j=0;j<this.polygons[i].lines.length;j++)
                if(

                    (this.polygons[i].lines[j].point1.name == element.name || this.polygons[i].lines[j].point2.name == element.name)
                    )
                {

                    abstractElement.push(this.polygons[i]);
                    break;
                }


        }
        return abstractElement;
    },
    searchTrianglesOfPoint : function(element) {

        var abstractElement = [];


        for(var i = 0; i < this.triangles.length; i++) {
            if(this.triangles[i].line1.point1.name == element.name || this.triangles[i].line2.point1.name == element.name || this.triangles[i].line3.point1.name == element.name
                )
            {

                abstractElement.push( this.triangles[i]);

            }
        }

        return abstractElement;
    },
    searchCirclesOfPoint : function(element) {

        var abstractElement = [];


        for(var i = 0; i < this.circles.length; i++) {
            if(this.circles[i].point1.name == element.name || this.circles[i].point2.name == element.name
                )
            {

                abstractElement.push( this.circles[i]);

            }
        }

        return abstractElement;
    },
    searchStraightsOfPoint : function(element) {

        var abstractElement = [];

        for(var i = 0; i < this.straight.length; i++) {
            if((this.straight[i].point1.name == element.name || this.straight[i].point2.name == element.name)
                )
            {
                abstractElement.push( this.straight[i]);

            }
        }

        return abstractElement;
    },
    searchLinesOfPoint : function(element) {

        var abstractElement = [];

        for(var i = 0; i < this.lines.length; i++) {
            if((this.lines[i].point1.name == element.name || this.lines[i].point2.name == element.name)
                )
            {
                abstractElement.push( this.lines[i]);

            }
        }

        return abstractElement;
    },
    searchLine : function(element) {

        var abstractElement = null;

        for(var i = 0; i < this.lines.length; i++) {
            if((this.lines[i].point1.name == element.point1.name && this.lines[i].point2.name == element.point2.name)
                || (this.lines[i].point1.name == element.point2.name && this.lines[i].point2.name == element.point1.name)
                ) {
                abstractElement = this.lines[i];
                break;
            }
        }

        return abstractElement;
    },
    searchTriangle : function(element) {
        var abstractElement = null;

        for(var i = 0; i < this.triangles.length; i++) {
            if(((this.triangles[i].line1.point1.name == element.point1.name && this.triangles[i].line1.point2.name == element.point2.name)
                || (this.triangles[i].line1.point1.name == element.point2.name && this.triangles[i].line1.point2.name == element.point1.name) )
                || //
                ((this.triangles[i].line2.point1.name == element.point1.name && this.triangles[i].line2.point2.name == element.point2.name)
                    || (this.triangles[i].line2.point1.name == element.point2.name && this.triangles[i].line2.point2.name == element.point1.name) )
                || //
                ((this.triangles[i].line3.point1.name == element.point1.name && this.triangles[i].line3.point2.name == element.point2.name)
                    || (this.triangles[i].line3.point1.name == element.point2.name && this.triangles[i].line3.point2.name == element.point1.name) )
                )
            {
                abstractElement = this.triangles[i];
                break;
            }
        }

        return abstractElement;
    },

    searchPolygon : function(element) {
        var abstractElement = null;

        for(var i = 0; i < this.polygons.length; i++) {
            for(var j=0;j<this.polygons[i].lines.length;j++)
                if(

                    (this.polygons[i].lines[j].point1.name == element.point1.name && this.polygons[i].lines[j].point2.name == element.point2.name)
                        || (this.polygons[i].lines[j].point1.name == element.point2.name && this.polygons[i].lines[j].point2.name == element.point1.name)
                    )
                {

                    abstractElement = this.polygons[i];
                    break ;
                }


        }


        return abstractElement;
    },
    searchAngle : function(element) {
        var abstractElement = null;
        //    alert(this.circles.length);


        for(var i = 0; i < this.angles.length; i++) {
            if(this.angles[i].name == element.name  )
            {
                abstractElement = this.angles[i];
                break;
            }
        }

        return abstractElement;
    },

    searchPoint : function(element) {
        var abstractElement = null;
        //    alert(this.circles.length);


        for(var i = 0; i < this.points.length; i++) {
            if(this.points[i].name == element.name  )
            {
                abstractElement = this.points[i];
                break;
            }
        }

        return abstractElement;
    },

    searchCircle : function(element) {
        var abstractElement = null;
        //    alert(this.circles.length);


        for(var i = 0; i < this.circles.length; i++) {

            if(this.circles[i].point1.name == element.center.name  )
            {

                abstractElement = this.circles[i];
                break;
            }
        }

        return abstractElement;
    },
    searchStraight : function(element) {

        var abstractElement = null;

        for(var i = 0; i < this.straight.length; i++) {
            if((this.straight[i].point1.name == element.point1.name && this.straight[i].point2.name == element.point2.name)
                || (this.straight[i].point1.name == element.point2.name && this.straight[i].point2.name == element.point1.name)
                ) {
                abstractElement = this.straight[i];
                break;
            }
        }

        return abstractElement;
    },
    searchElement : function(element) {

        var abstractElement = null;

        for(var i = 0; i < this.elements.length; i++) {
            var el = this.elements[i].getObject();
            if(el == element) {
                abstractElement = this.elements[i];
                break;
            }
        }

        return abstractElement;
    },

    saveChanges : function(abstractObject, param) {

        var element = abstractObject;

        if(element instanceof  AbstractLine) {
            var ctrlmode = app.controller;
            app.controller = SegmentCtrl;


            app.controller.saveChangeofFigure(element,param);
            app.controller = ctrlmode;
            //this.saveChangeofLine(element,param);
        }

        if(element instanceof  AbstractAngle) {
            var ctrlmode = app.controller;
            app.controller = AngleCtrl;

            app.controller.saveChangeofFigure(element,param);
            app.controller = ctrlmode;
            //this.saveChangeofAngle(element,param);
        }

        if(element instanceof  AbstractTriangle) {
            var ctrlmode = app.controller;
            app.controller = TriangleCtrl;

            app.controller.saveChangeofFigure(element,param);
            app.controller = ctrlmode;

            // this.saveChangeofTriangle(element,param);
        }

        if(element instanceof  AbstractCircle) {

            var ctrlmode = app.controller;
            app.controller = CircleCtrl;


            app.controller.saveChangeofFigure(element,param);
            app.controller = ctrlmode;

            //  this.saveChangeofCircle(element,param);
        }
        if(element instanceof  AbstractPolygon) {
            var ctrlmode = app.controller;
            app.controller = PolygonCtrl;

            app.controller.saveChangeofFigure(element,param);
            app.controller = ctrlmode;

            //   this.saveChangeofPolygon(element.lines[0],param);
        }

    },
    saveChangeOfPolygon : function(element,param) {
        var names = "",names1 = "";

        for(var  i = 0; i < element.lines.length; i++) {
            names += element.lines[i].point1.name;
        }

        for(var i = 0; i < this.polygons.length; i++) {
            for(var j=0;j<this.polygons[i].lines.length;j++)
            {
                names1 = "";
                for(var  k = 0; k < this.polygons[i].lines.length; k++) {
                    names1+=this.polygons[i].lines[k].point1.name;
                }
                if(names == names1)
                {

                    this.polygons[i].saveParam(param);
                    break ;
                }
            }



        }
    },
    unsaveChangeOfPolygon : function(element) {

        var names = "",names1 = "";

        for(var  i = 0; i < element.lines.length; i++) {
            names += element.lines[i].point1.name;
        }

        for(var i = 0; i < this.polygons.length; i++) {
            for(var j=0;j<this.polygons[i].lines.length;j++)
            {
                names1 = "";
                for(var  k = 0; k < this.polygons[i].lines.length; k++) {
                    names1+=this.polygons[i].lines[k].point1.name;
                }
                if(names == names1)
                {

                    this.polygons[i].unsaveParam();
                    break ;
                }
            }



        }
    },
    saveChangeOfTriangle : function(element,param) {


        for(var i = 0; i < this.triangles.length; i++) {

            if(this.triangles[i].line1.point1.name == element.line1.point1.name && this.triangles[i].line2.point1.name == element.line2.point1.name
                && this.triangles[i].line3.point1.name == element.line3.point1.name)
            {

                this.triangles[i].saveParam(param);
            }
        }

    },
    unsaveChangeOfTriangle : function(element) {



        for(var i = 0; i < this.triangles.length; i++) {

            if(this.triangles[i].line1.point1.name == element.line1.point1.name && this.triangles[i].line2.point1.name == element.line2.point1.name
                && this.triangles[i].line3.point1.name == element.line3.point1.name)
            {


                this.triangles[i].unsaveParam();
            }
        }

    },

    saveChangeOfAngle : function(element,param) {


        for(var i = 0; i < this.angles.length; i++) {

            if(this.angles[i].point1.name == element.point1.name && this.angles[i].point2.name == element.point2.name && this.angles[i].point3.name == element.point3.name)
            {

                this.angles[i].saveParam(param);
            }
        }

    },
    unsaveChangeOfAngle : function(element) {


        for(var i = 0; i < this.angles.length; i++) {

            if(this.angles[i].point1.name == element.point1.name && this.angles[i].point2.name == element.point2.name && this.angles[i].point3.name == element.point3.name)
            {

                this.angles[i].unsaveParam();
            }
        }

    },

    saveChangeOfLine : function(element,param) {

        for(var i = 0; i < this.lines.length; i++) {

            if(this.lines[i].point1.name == element.point1.name && this.lines[i].point2.name == element.point2.name)
            {

                this.lines[i].saveParam(param);

                break;

            }
        }


    },

    unsaveChangeOfLine : function(element) {

        for(var i = 0; i < this.lines.length; i++) {

            if(this.lines[i].point1.name == element.point1.name && this.lines[i].point2.name == element.point2.name)
            {

                this.lines[i].unsaveParam();

                break;

            }
        }


    },


    saveChangeOfCircle : function(element,param) {


        for(var i = 0; i < this.circles.length; i++) {

            if(this.circles[i].point1.name == element.point1.name  )
            {

                this.circles[i].saveParam(param);
                break;
            }
        }

    },
    unsaveChangeOfCircle : function(element) {


        for(var i = 0; i < this.circles.length; i++) {

            if(this.circles[i].point1.name == element.point1.name  )
            {

                this.circles[i].unsaveParam();
                break;
            }
        }

    },
    clear : function() {

        var zoomX = this.board.applyZoom().zoomX;
        var zoomY = this.board.applyZoom().zoomY;
        this.board = JXG.JSXGraph.initBoard('board', {boundingbox: [-20, 20, 20, -20], showCopyright : false, grid : this.showGrid,
            zoomX : zoomX, zoomY : zoomY });
        app.controller.clearPoints();
        app.clearHistory();
        this.elements.length = 0;
    },

    grid : function() {

        if(this.showGrid == true) {

            this.board.removeGrids();
            this.showGrid = false;
        }  else {
            this.board.create('grid', []);
            this.showGrid = true;
        }

    },

    removeAbstractElement : function(element) {

        this.elements.splice(this.elements.indexOf(element), 1);
    }

}

