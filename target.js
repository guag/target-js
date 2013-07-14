$(function () {
    var _selector, // Target element to update
		_targetDate, // Target date in the future
		_showYears = false, // Hide years by default
        _showMonths = true,
        _showDays = true,
        _showHours = true,
        _showMinutes = true,
        _showSeconds = true,
        _separator = ", ",
        _now,
        _then,
        _ms;
    var timeLeft = (typeof ko !== "undefined") ? ko.observable("") : null;

    // Supported function signatures:
    //   countdown(targetDate : array);
    //   countdown(targetDate : array, options : object);
    //   countdown(targetDate : array, selector : string, options : object);
    function countdown(targetDate) {
        _targetDate = targetDate;
        // Parse the 2nd argument (optional)
        var a2 = arguments[1];
        if (a2) {
            if (typeof a2 == "string") {
                _selector = a2; // Arg 2 is a selector
            } else {
                setOptions(a2); // Arg 2 is an options object
            }
        }
        // Parse the 3rd argument (optional)
        setOptions(arguments[2]);

        // Explicity call countdown here so that there isn't
        // a 1 sec delay of nothing before setInterval() executes.
        countdownInner();
        // Now we'll call countdown every second.
        setInterval(countdownInner, 1000);
    }

    // Public members

    var target = {
        countdown: countdown,
        timeLeft: timeLeft
    };
    return target;

    // Internal members

    function setOptions(options) {
        if (options !== undefined && typeof options == "object") {
            if (options.showYears !== undefined) {
                _showYears = options.showYears;
            }
            if (options.showMonths !== undefined) {
                _showMonths = options.showMonths;
            }
            if (options.showDays !== undefined) {
                _showDays = options.showDays;
            }
            if (options.showHours !== undefined) {
                _showHours = options.showHours;
            }
            if (options.showMinutes !== undefined) {
                _showMinutes = options.showMinutes;
            }
            if (options.showSeconds !== undefined) {
                _showSeconds = options.showSeconds;
            }
            if (options.separator !== undefined) {
                _separator = options.separator;
            }
            if (options.selector !== undefined) {
                _selector = options.selector;
            }
            if (options.targetDate !== undefined) {
                _targetDate = options.targetDate;
            }
        }
    }

    function countdownInner() {
        _now = moment(); // get the current moment
        _then = moment(_targetDate);
        // get the difference from now to then in ms
        _ms = diffInMS();
        var result = "";

        // Add the years, months, days, etc. where applicable
        if (_showYears) {
            result += getUnits("years", function () {
                return Math.floor(moment.duration(_ms).asYears());
            });
        }
        if (_showMonths) {
            result += getUnits("months", function () {
                return Math.floor(moment.duration(_ms).asMonths());
            });
        }
        if (_showDays) {
            result += getUnits("days", function () {
                return Math.floor(moment.duration(_ms).asDays());
            });
        }
        if (_showHours) {
            result += getUnits("hours", function () {
                return Math.floor(moment.duration(_ms).asHours());
            });
        }
        if (_showMinutes) {
            result += getUnits("minutes", function () {
                return Math.floor(moment.duration(_ms).asMinutes());
            });
        }
        if (_showSeconds) {
            result += Math.floor(moment.duration(_ms).asSeconds()) + " seconds";
        }

        // The moment we've all been waiting for... no pun intended.
        // TODO: should we be updating both if Knockout is available?
        if (timeLeft) {
            // If using Knockout, update the observable.
            timeLeft(result);
        }
        if (_selector) {
            // If a selector was specified, update that element.
            $(_selector).html(result);
        }
    }

    function getUnits(unitString, getUnitsDelegate) {
        var units = getUnitsDelegate();
        _then = _then.subtract(unitString, units);
        _ms = diffInMS(_then, _now);
        return units + " " + unitString + _separator;
    }

    function diffInMS() {
        return _then.diff(_now, "milliseconds", true);
    }
});