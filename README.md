# Simple Javascript Countdown using Moment.js
================

A simple countdown timer using moment.js that displays the amount of time between now and a certain date in the future.

Example usage
=============

Simple case:

var selector = "#elementId";
var targetDate = [2014, 4, 18];
countdown.start(selector, targetDate);

Using options:

var selector = "#elementId";
var targetDate = [2014, 4, 18];
var options = {
	years: true, // display the years
	seconds: false, // don't display the seconds
	...
	separator: "<br>" // default is ", "
};
countdown.start(selector, targetDate, options);



* Requires Moment.js and jQuery * 