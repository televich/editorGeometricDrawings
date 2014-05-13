/**
 * Created by Администратор on 07.05.14.
 */
 function DelPolygonCommand(polygon,polygonName) {

 this.polygon = polygon;
 this.polygonName = polygonName;
 }

DelPolygonCommand.prototype.execute = function() {
 PaintPanel.delOfPolygon(this.polygon,this.polygonName);
 };

DelPolygonCommand.prototype.unExecute = function() {
 points = [];
     for(var  i = 0; i < this.polygon.lines.length; i++) {
         points.push(this.polygon.lines[i].point1);
     }

 PaintPanel.createPolygon(points);

 };