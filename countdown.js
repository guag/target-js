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

    return countdown = {
        start: function (selector, date, options) {

            if (!selector) {
                // 'selector' is required
                return false;
            }
            _selector = selector;

            if (date) {
                _targetDate = date;
            }

            if (options) {
                if (options.years !== undefined) {
                    _showYears = options.years;
                }
                if (options.months !== undefined) {
                    _showMonths = options.months;
                }
                if (options.days !== undefined) {
                    _showDays = options.days;
                }
                if (options.hours !== undefined) {
                    _showHours = options.hours;
                }
                if (options.minutes !== undefined) {
                    _showMinutes = options.minutes;
                }
                if (options.seconds !== undefined) {
                    _showSeconds = options.seconds;
                }
                if (options.separator !== undefined) {
                    _separator = options.separator;
                }
            }

            // Explicity call countdown here so that there isn't
            // a 1 sec delay of nothing before setInterval() executes.
            _countdown();
            // Now we'll call countdown every second.
            setInterval(_countdown, 1000);
        }
    };

    // Internal members

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