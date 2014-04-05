/**
 * Created by Администратор on 01.04.14.
 */

function MacroCommand() {

    this.commands = [];

    this.execute = function() {

        for(var i = 0, length = this.commands.length; i < length; i++) {
            this.commands[i].execute();
        }

    },

    this.unExecute = function(){

        for(var i = this.commands.length - 1; i >= 0; i--) {
            this.commands[i].unExecute();
        }
    }

    this.addCommand = function(command) {
        this.commands.push(command);
    }
}