everything except git and the subcommand is a flag

modifier flags -> -q
action flags -b


actions flags should have separate functions and will be called each on the CommandDispatcher.
modifier flags should be handled in the CommandManager.

a commit will be redirected to a function in CommandManager, but in the end of the function an if statement should be added to check for -m.
to scale the number of commands, the best practice is to have one function for each action and an independent validation to see if a certain modifier flag is there, avoiding repetition.
if the checking for modifier flags is the same process across multiple Command Manager functions, a new function should be created (like commitCheckingModifierFlags()).

if it appear two function calling from the flagFunctions, this shouls throw an error, as -b and -B shouldnt be in the same function




The return of the functions should be a string containing the message that would appear in git feedback, CommandManager should handle the building of the string to return

gitobject should be responsible for most error throwing like not valid branch names or already existing branches