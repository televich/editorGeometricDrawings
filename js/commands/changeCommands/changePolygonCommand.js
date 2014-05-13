/**
 * Created by Администратор on 08.04.14.
 */

function  ChangePolygonCommand(element,param) {

    this.perimeter = param;
    this.abstractPolygon = element;
}

ChangePolygonCommand.prototype.execute = function() {
    PaintPanel.saveChangeOfPolygon(this.abstractPolygon,this.perimeter);
};

ChangePolygonCommand.prototype.unExecute = function() {
    PaintPanel.unsaveChangeOfPolygon(this.abstractPolygon);

};