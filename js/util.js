/**
 * Created by Администратор on 09.12.13.
 * test
 */
function AbstractStraight(startPoint,endPoint) {

    //Опорные точки прямой
    this.point1 = startPoint;
    this.point2 = endPoint;
    this.length = null;

}




function AbstractLine(startPoint,endPoint, startLength) {

    //Граничные точки отрезка
    this.point1 = startPoint;
    this.point2 = endPoint;

    this.length = startLength;

    this.index = 0;
    // Здесь хранятся все длины отрезка
    this.lengthes = [];
    this.lengthes.push(startLength);
}

AbstractLine.prototype.getParam = function() {
    return this.length;
};
AbstractLine.prototype.getObject = function() {
    return this.line;
};
AbstractLine.prototype.getInfo = function() {
    var lineName = this.line.point1.name + this.line.point2.name;
    return "Длина отрезка " + lineName + " = " + this.length;
};
AbstractLine.prototype.saveParam = function(param) {
    this.length = param;
    this.index++;

    this.lengthes[this.index]=param;

};
AbstractLine.prototype.unsaveParam = function() {
    this.index--;
};
AbstractLine.prototype.getPoint1 = function() {
    return this.line.point1;
};
AbstractLine.prototype.getPoint2 = function() {
    return this.line.point2;
};
AbstractLine.prototype.getName = function() {
    return this.length.point1.name + this.length.point2.name;
};


function AbstractCircle(startPoint,endPoint, radius) {

    // Центр окружности
    this.point1 = startPoint;
    // Опорная точка на окружности
    this.point2 = endPoint;

    // Массив точек на окружности
    this.points = null;

    this.radius = radius;

    this.index = 0;
    // Здесь хранятся все радиусы
    this.radiuses = [];
    this.radiuses.push(radius);
}
AbstractCircle.prototype.saveParam = function(param) {
    this.radius = param;
    this.index++;
    this.radiuses[this.index]=param;

};
AbstractCircle.prototype.unsaveParam = function() {
    this.index--;
};
AbstractCircle.prototype.getParam = function() {
    return this.radius;
};
AbstractCircle.prototype.getObject = function() {
    return this.circle;
};
AbstractCircle.prototype.getInfo = function() {
    return "Радиус окружности = " + this.radius;
};
AbstractCircle.prototype.setParam = function(param) {
    this.radius = param;
};
//AbstractCircle.prototype.getPoint1 = function() {
//    return this.circle.center;
//};
AbstractCircle.prototype.getPoint2 = function() {
    return this.circle.point2;
};


function AbstractAngle(varpointA,varpointB,varpointC, value) {

    this.name = "";
    this.point1 = varpointA;

    // Центральная точка угла
    this.point2 = varpointB;

    this.point3 = varpointC;
    this.value = value;
    this.index = 0;
    this.values = [];
    this.values.push(value);

}
AbstractAngle.prototype.getParam = function() {
    return this.value;
};
AbstractAngle.prototype.getObject = function() {
    return this.angle;
};
AbstractAngle.prototype.getInfo = function() {
    return "Значение угла = " + this.value;
};
AbstractAngle.prototype.saveParam = function(param) {
    this.value = param;
    this.index++;
    this.values[this.index]=(param);

};
AbstractAngle.prototype.unsaveParam = function() {
    this.index--;
};
AbstractAngle.prototype.getPoint1 = function() {
    return null;
};
AbstractAngle.prototype.getPoint2 = function() {
    return null;
};

function AbstractTriangle(pointsABC,perimeterABC) {

    //Стороны треугольника
    this.line1 = new AbstractLine(pointsABC[0],pointsABC[1],perimeterABC/3);
    // this.board.create('line', [pointsABC[0].name, pointsABC[1].name],{straightFirst:false, straightLast:false});

    this.line2 = new AbstractLine(pointsABC[1],pointsABC[2],perimeterABC/3);
    // this.board.create('line', [pointsABC[1].name, pointsABC[2].name],{straightFirst:false, straightLast:false});

    this.line3 = new AbstractLine(pointsABC[2],pointsABC[0],perimeterABC/3);
    // this.board.create('line', [pointsABC[2].name, pointsABC[0].name],{straightFirst:false, straightLast:false});



    this.index = 0;

    //Периметр треугольника
    this.perimeter = perimeterABC;
    this.perimeters = [];
    this.perimeters[this.index] = perimeterABC;

    //!?Возможно еще добавить внутренние углы
    //!?Возможно еще добавить внутренние и внеш окружности

};

AbstractTriangle.prototype.saveParam = function(param) {
    this.line1.length = param/3;
    this.line2.length = param/3;
    this.line3.length = param/3;
    this.perimeter = param;
    this.index++;
    this.perimeters[this.index]=param;

};
AbstractTriangle.prototype.unsaveParam = function() {
    this.index--;
    this.line1.length = this.perimeters[this.index]/3;
    this.line2.length = this.perimeters[this.index]/3;
    this.line3.length = this.perimeters[this.index]/3;
};
function AbstractPolygon(polygon,varperimeter) {

    // Стороны полигона

    this.lines = [];
    for(var  i = 0; i < polygon.length-1; i++) {
        this.lines.push(new  AbstractLine(polygon[i],polygon[i+1],varperimeter/polygon.length));
    }
    this.lines.push(new  AbstractLine(polygon[polygon.length-1],polygon[0],varperimeter/polygon.length));
    // периметр
    this.perimeter = varperimeter;

    this.index = 0;
    this.perimeters = [];
    this.perimeters[this.index]=varperimeter;

    //!?Возможно еще добавить внутренние углы

    // this.sideOfTheAbstractPolygon = sideOfTheAbstractPolygon;
}
AbstractPolygon.prototype.containsSide = function(side) {
    var contains = false;
    var sideOfThePolygon = this.polygon.borders;
    for(var i = 0; i < sideOfThePolygon.length; i++) {

        if(((side.point1 == sideOfThePolygon[i].point1 && side.point2 == sideOfThePolygon[i].point2)
            || (side.point1 == sideOfThePolygon[i].point2 && side.point2 == sideOfThePolygon[i].point1))) {
            contains = true;
            break;
        }
    }
    return contains;
};
AbstractPolygon.prototype.getObject = function() {
    return this.polygon;
};
AbstractPolygon.prototype.getPerimeter = function() {
    var perimeter = 0;
    for(var i = 0; i < this.sideOfTheAbstractPolygon.length; i++) {

        perimeter += parseInt(this.sideOfTheAbstractPolygon[i].getParam());
    }
    return perimeter;
};
AbstractPolygon.prototype.getInfo = function() {
    var name = this.getPolygonName();
    return "Периметр фигуры " + name + " = " + this.getPerimeter();
};
AbstractPolygon.prototype.getPolygonName = function() {

    var name = " ";
    for(var i = 0; i < this.sideOfTheAbstractPolygon.length; i++) {

        var points = this.polygon.vertices;
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
};
AbstractPolygon.prototype.saveParam = function(param) {

    for(var i = 0; i < this.lines.length; i++)
    {
        this.lines[i].length = param/this.lines.length;
    }
    this.perimeter = param;
    this.index++;
    this.perimeters[this.index]=(param);

};
AbstractPolygon.prototype.unsaveParam = function() {
    this.index--;
    for(var i = 0; i < this.lines.length; i++)
    {
        this.lines[i].length = this.perimeters[this.index]/this.lines.length;
    }
};
function AbstractPoint(name,varX,varY) {

    //Название точки
    this.name = name;

    //Координаты точки по Х и Y на board
    this.X = varX;
    this.Y = varY;

    //Здесь хранятся все координаты точки, которые когда либо были у нее в виде(x;y)
    this.coordinates = [];


    //булевая переменная, которая показывает точка свободна или привязана к какой нить фигуре
    this.free =true;

    //Число фигур к которой привязана точка
    this.numberOfFigures = 0;
    //!! Если точка привязана а число фигур равно 0, то в скорем времени она удалиться(как в Java когда на объект нет ссылок)

    this.exist = true;
    this.containsOnBoard = false;
}
AbstractPoint.prototype.getX = function() {
    return this.X;
};
AbstractPoint.prototype.getY = function() {
    return this.Y;
};
AbstractPoint.prototype.setExist = function(exist) {
    this.exist = exist;
};
AbstractPoint.prototype.isExist = function() {
    return this.exist;
};
AbstractPoint.prototype.setContainsOnBoard = function(containsOnBoard) {
    this.containsOnBoard = containsOnBoard;
};
AbstractPoint.prototype.isContainsOnBoard = function() {
    return this.containsOnBoard;
};
AbstractPoint.prototype.toString = function() {
    return  "{" + "AbstractPoint : x = " + this.getX() + ", y = " + this.getY() + "}";
};

