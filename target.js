$(function () {
    var _selector, // Target element to update
        _targetDate = [2030, 1, 1], // Default date
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

    function countdown() {
        if (arguments.length === 0) {
            // My hair is a bird, your argument is invalid.
            return false;
        }
        if (arguments.length === 1) {
            // A single argument presumably consisting of an options object.
            setOptions(arguments[0]);
        }
        if (arguments.length > 1) {
            _selector = arguments[0]; // DOM element selector.
            _targetDate = arguments[1]; // Target date in the future.
        }
        if (arguments.length > 2) {
            // If there is a third argument, it would be an options object.
            setOptions(arguments[2]);
        }

        // Explicity call countdown here so that there isn't
        // a 1 sec delay of nothing before setInterval() executes.
        _countdown();
        // Now we'll call countdown every second.
        setInterval(_countdown, 1000);
    }

    return target = {
        countdown: countdown
    };

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

    function _countdown() {
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
        $(_selector).html(result);
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