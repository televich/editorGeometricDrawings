/**
 * Created by Andrey on 08.04.2014.
 */
function ClearCommand() {

    this.commands = [];


    this.execute = function(){
        alert("execute");
        for(var i = this.commands.length - 1; i >= 0; i--) {
            this.commands[i].unExecute();
        }
    };

    this.unExecute = function() {
        alert("unExecute");
        for(var i = 0, length = this.commands.length; i < length; i++) {
            this.commands[i].execute();
        }

    };

    this.addCommands = function(commands) {
        for (var i = 0; i < commands.length; ++i){
            this.commands.push(commands[i]);
        }
    };
}