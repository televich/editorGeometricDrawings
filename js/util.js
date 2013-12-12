/**
 * Created by Администратор on 09.12.13.
 */
 function Point(x, y){

    this.x = x;
    this.y = y;

    this.getX = function() {

        return this.x;
    }

    this.getY = function() {

        return this.y;
    }
}

function AbstractLine(line, startLength) {

    this.line = line;
    this.length = startLength;

    this.getParam = function() {

        return this.length;
    }

    this.getObject = function() {

        return this.line;
    }

    this.getInfo = function() {

        var lineName = this.line.point1.name + this.line.point2.name;
        return "Длина отрезка " + lineName + " = " + this.length;
    }

    this.setParam = function(param) {

        this.length = param;
    }

    this.getPoint1 = function() {
        return this.line.point1;
    }

    this.getPoint2 = function() {
        return this.line.point2;
    }

    this.getName = function() {
        var name = this.length.point1.name + this.length.point2.name;
    }

}

function AbstractCircle(circle, radius) {

    this.circle = circle;
    this.radius = radius;

    this.getParam = function() {

        return this.radius;
    }

    this.getObject = function() {

        return this.circle;
    }

    this.getInfo = function() {

        return "Радиус окружности = " + this.radius;
    }

    this.setParam = function(param) {

        this.radius = param;
    }

    this.getPoint1 = function() {
        return this.circle.center;
    }

    this.getPoint2 = function() {
        return this.circle.point2;
    }

}


function AbstractAngle(angle, value) {

    this.angle = angle;
    this.value = value;

    this.getParam = function() {

        return this.value;
    }

    this.getObject = function() {

        return this.angle;
    }

    this.getInfo = function() {

        return "Значение угла = " + this.value;
    }

    this.setParam = function(param) {

        this.value = param;
    }

    this.getPoint1 = function() {
        return null;
    }

    this.getPoint2 = function() {
        return null;
    }

}
function AbstractPolygon(polygon, sideOfTheAbstractPolygon) {

    this.poygon = polygon;
    this.sideOfTheAbstractPolygon = sideOfTheAbstractPolygon;

    this.containsSide = function(side) {

        var contains = false;
        var sideOfThePolygon = this.poygon.borders;
        for(var i = 0; i < sideOfThePolygon.length; i++) {

            if(((side.point1 == sideOfThePolygon[i].point1 && side.point2 == sideOfThePolygon[i].point2)
                || (side.point1 == sideOfThePolygon[i].point2 && side.point2 == sideOfThePolygon[i].point1))) {
                contains = true;
                break;
            }
        }
        return contains;
    }

    this.getPerimeter = function() {

        var perimeter = 0;
        for(var i = 0; i < this.sideOfTheAbstractPolygon.length; i++) {

            perimeter += parseInt(this.sideOfTheAbstractPolygon[i].getParam());
        }
        return perimeter;
    }

    this.getInfo = function() {

        var name = this.getPolygonName();
        return "Периметр фигуры " + name + " = " + this.getPerimeter();
    }

    this.getPolygonName = function() {

        var name = " ";
        for(var i = 0; i < this.sideOfTheAbstractPolygon.length; i++) {

            var points = this.poygon.vertices;
            for(var i = 0, j = 0; i < points.length - 1; i++, j++){
                if(j++ > 9) {
                   name += "\n";
                    j = 0;
                }
                name += points[i].name;
            }
        }
        name.replace(" ", "");
        return name;
    }

}

