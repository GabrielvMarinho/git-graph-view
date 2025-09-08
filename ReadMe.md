# Git Graph view
This repository was created with the intent of making the learning process of using git a bit easier, aswell as a nice UI to visualize things

## Introduction
Not all git features are added to this tool, it's more focused on the main commands and its features.
For more git related information, visit https://git-scm.com/doc.
## Supported commands
### Commit 
Command related to creating commits, basically saves the current state of your application, in something that is referentiated as a tree.

Example of command:
```
git commit -m "message-here"
```
### Branch
Command related to branches managing, a variety of actions can be done through this command.

Branches listing:
```
git branch
```
Branch creating:
```
git branch "branch-name"
```
Branch renaming:
```
git branch -m "old-branch-name" "new-branch-name"
```
Branch deleting:
```
git branch -d "branch-name"
```
### Checkout
Command related to moving the HEAD around the commits/branches of the git-graph.

Checkout to a commit in detached HEAD:
```
git checkout "commit-hash"
```
Checkout to a branch:
```
git checkout "branch-name"
```
Create and checkout to branch:
```
git checkout -b "new-branch-name"
```
### Merge
Command related to merging commits together.

Merging a commit to another branch:
```
git merge "branch-name"
```
Merging a commit to another commit:
```
git merge "commit-hash"
```
Merging a "squash" merge another branch:
```
git merge --squash "branch-name" 
```

### Reset
Command related to reseting the current position of the head/branch to another commit

Reseting to a branch
```
git reset "branch-name"
```
Reseting to a commit
```
git reset "commit-hash"
```