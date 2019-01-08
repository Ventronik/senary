# Gitchain Challenge

This challenge is to create a chain of git commits that shows a Proof of Work.

# Background on Git Commits

Git Commits are identified by their hash. This hash is calculated as the SHA-1 of their contents and the metadata. The use of a cryptographic hash means that any change to any portion of the commits will result in a completely different hash. It is also effectively impossible to create a commit with a known hash. This provides a good deal of assurance that a specific commit contains known contents.

# Chaining with Proof Of Work

While a specific commit hash can not be predicted we know that they have a fixed distribution and we can use the random nature of the resultant hash to ensure a proof of work that was done. This is very similar to the Proof of Work requirements for Blockchains. Using a post-receive hook we can reject all commits that have not displayed the required proof of work.

# Requirements for Proof of work
For a given Git hash with the following form

`d17aaade48393314374540144572808e5c8a86fc`

We can say that the repository will only accept hashes that start with a sequence of 0's such as

`000000de48393314374540144572808e5c8a86fc`

# Figuring out the hash of a given changeset and commit message

If we have a given changeset we want to commit, to ensure our commit conforms to the proof of work, we can modify the commit message and validate that the hash would meet the proof of work. This can be done with the following bit of manual bash code. Add all your changes to the repository with `git add` then do the following

```
export message="This is my commit message"
export commit="tree `git write-tree`\nparent `git rev-parse HEAD`\nauthor Dan Kozlowski <koz@planetscale.com> 1545187366 +0500\ncommitter Dan Kozlowski <koz@planetscale.com> 1545187366 +0500\n\n${message}"
echo -en "commit $(echo $commit | wc -c)\0$commit\n" | sha1sum
```

This will create a commit message for the current changeset. To insert that commit into the repository manually do the following

```
hash=$(echo "${commit}" | git hash-object -t commit -w --stdin)
git reset --hard $hash
```

# The Challange

You must create a program that can generate a valid commit with a hash that is prefixed with six zeros. You are free to use any language or libraries you would like. Check this program into the git repository and then use it to create a commit with the correct prefix, then push the commit to the remote repository.

# References
- https://git-scm.com/book/en/v2/Git-Internals-Git-Objects

# Gitchain Solution - Solved with Node.js

#Getting started:
* Make sure Node.JS is installed
* ```Npm Install```

#Running the Application

I have made a Node.JS CLI with 2 paths: ```simple``` and ```hash```.

In your command line type ```senary hash``` to execute a full run of the program. A full run will continuously rehash the commit until it reaches one that starts with six leading zeros (e.g. '000000'). I would not recommend this as it takes a very long time.
As a sample of senary, in your command line type ```senary simple```

If senary does not properly execute try running ```sym link``` from applications root folder.

#Authors Note
I really enjoyed writing this application. I have never written a CLI before and found it to be very enjoyable. Once I got the basic functionality operating in place I focused on optimizing for speed, which was also new to me. I managed to get a loop of 5 hashes down from 10seconds to 1.5 seconds. That being said, 1.5 seconds still feels entirely too long. I'd love your thoughts on better ways to improve this. I suspect JavaScript and the libraries I have used to be a factor, but am not certain on that. I look forward to talking to you.
