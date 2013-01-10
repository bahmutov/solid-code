Sample DEFINE
=============

This is an example of 'define' function (similar to amdefine, or dojo define) implementation.

First, figure out what file is calling define.
Second, for each relative path dependency, find the full path, load the JS code, then eval.

Define should be the only code in the file to guarantee that a result is returned.