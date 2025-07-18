everything except git and the subcommand is a flag

modifier flags -> -q
action flags -b


actions flags should have separate functions and will be called each on the CommandDispatcher
modifier flags should be handled in the CommandManager

a commit subcommand will be redirected to the same commit function in CommandManager, but in the end of the function an if statement should be added to check for -m.
to scale the number of commands, the best practice is to have one function for each action and an independent validation to see if a certain modifier flag is there, avoiding repetition.

if it appear two function calling from the flagFunctions, this shouls throw an error, as -b and -B shouldnt be in the same function