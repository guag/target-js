$(function () {
    var _selector, // Target element to update
        _targetDate = [2030, 1, 1], // Default date
        _showYears = false, // Hide years by default
        _showMonths = true,
        _showDays = true,
        _showHours = true,
        _showMinutes = true,
        _showSeconds = true,
        _separator = ", ";

    function start (selector, date, options) {
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

    return countdown = {
        start: start
    };

    // Internal members

    function _countdown() {
        var now = moment(), // get the current moment
            then = moment(_targetDate),
            // get the difference from now to then in ms
            ms = diffInMS(then, now),
            years,
            months,
            days,
            hours,
            minutes,
            seconds,
            result = "";

        // Add the years, months, days, etc. where applicable
        if (_showYears) {
            years = getYears(ms);
            result += years + " years" + _separator;
            then = then.subtract("years", years);
            ms = diffInMS(then, now);
        }

        if (_showMonths) {
            months = getMonths(ms);
            result += months + " months" + _separator;
            then = then.subtract("months", months);
            ms = diffInMS(then, now);
        }

        if (_showDays) {
            days = getDays(ms);
            result += days + " days" + _separator;
            then = then.subtract("days", days);
            ms = diffInMS(then, now);
        }

        if (_showHours) {
            hours = getHours(ms);
            result += hours + " hours" + _separator;
            then = then.subtract("hours", hours);
            ms = diffInMS(then, now);
        }

        if (_showMinutes) {
            minutes = getMinutes(ms);
            result += minutes + " minutes" + _separator;
            then = then.subtract("minutes", minutes);
            ms = diffInMS(then, now);
        }

        if (_showSeconds) {
            result += getSeconds(ms) + " seconds";
        }

        // The moment we've all been waiting for... no pun intended.
        $(_selector).html(result);
    }

    function diffInMS(then, now) {
        return then.diff(now, "milliseconds", true);
    }

    function getYears(ms) {
        return Math.floor(moment.duration(ms).asYears());
    }

    function getMonths(ms) {
        return Math.floor(moment.duration(ms).asMonths());
    }

    function getDays(ms) {
        return Math.floor(moment.duration(ms).asDays());
    }

    function getHours(ms) {
        return Math.floor(moment.duration(ms).asHours());
    }

    function getMinutes(ms) {
        return Math.floor(moment.duration(ms).asMinutes());
    }

    function getSeconds(ms) {
        return Math.floor(moment.duration(ms).asSeconds());
    }
});