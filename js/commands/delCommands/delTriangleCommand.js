/**
 * Created by Администратор on 07.04.14.
 */
 function DelTriangleCommand(triangle) {

 this.triangle = triangle;
 this.abstractCircle = null;
 }

 DelTriangleCommand.prototype.execute = function() {
 PaintPanel.delOfTriangle(this.triangle);
 };

 DelTriangleCommand.prototype.unExecute = function() {

 this.abstractCircle = PaintPanel.createTriangle( this.triangle.line1.point1, this.triangle.line2.point1, this.triangle.line3.point1, this.triangle.perimeter);

 };