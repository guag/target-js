# Simple Javascript Countdown using Moment.js
================

A simple countdown timer using moment.js that displays the amount of time between now and a certain date in the future.

* Requires Moment.js and jQuery


API
===

Single argument: 	target.countdown(options);
Two arguments: 		target.countdown(selector, targetDate);
Three arguments:	target.countdown(selector, targetDate, options);

Arguments
=========

selector:		jQuery element selector (ie, "#elementId")
targetDate:		Date to count down to in array form (ie, [2015, 4, 1] or [2014, 10, 5, 10, 30, 0])
options:		Object literal containing any or all of the following options:
				showYears:		default is false
				showMonths:		default is true
				showDays:		default is true
				showHours:		default is true
				showMinutes:	default is true
				showSeconds:	default is true
				separator:		default is ", "
				selector:		jQuery element selector (ie, "#elementId")
				targetDate:		Date to count down to in array form (ie, [2015, 4, 1] or [2014, 10, 5, 10, 30, 0])



Examples
========

Coming soon.