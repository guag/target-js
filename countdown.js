function Countdown() {

    var _elem, // Target element to update
        _targetDate = [2030, 1, 1], // Default date
        _showYears = false, // Hide years by default
        _showMonths = true,
        _showDays = true,
        _showHours = true,
        _showMinutes = true,
        _showSeconds = true;

    function start(elem, date, options) {

        if (!elem) {
            // 'elem' is required
            return false;
        }
        _elem = elem;

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
        }

        // Explicity call countdown here so that there isn't
        // a 1 sec delay of nothing before setInterval() executes.
        countdown();
        // Now we'll call countdown every second.
        setInterval(countdown, 1000);
    }

    return {
        start: start
    };

    // Internal members

    function countdown() {
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
            result = '';

        if (_showYears) {
            years = getYears(ms);
            result += '<span class="num">' + years + '</span> years<br />';
            then = then.subtract('years', years);
            ms = diffInMS(then, now);
        }

        if (_showMonths) {
            months = getMonths(ms);
            result += '<span class="num">' + months + '</span> months<br />';
            // Not sure why I had to offset by 1 day
            then = then.subtract('months', months).subtract('days', 1);
            ms = diffInMS(then, now);
        }

        if (_showDays) {
            days = getDays(ms);
            result += '<span class="num">' + days + '</span> days<br />';
            then = then.subtract('days', days);
            ms = diffInMS(then, now);
        }

        if (_showHours) {
            hours = getHours(ms);
            result += '<span class="num">' + hours + '</span> hours<br />';
            then = then.subtract('hours', hours);
            ms = diffInMS(then, now);
        }

        if (_showMinutes) {
            minutes = getMinutes(ms);
            result += '<span class="num">' + minutes + '</span> minutes<br />';
            then = then.subtract('minutes', minutes);
            ms = diffInMS(then, now);
        }

        if (_showSeconds) {
            result += '<span class="num">' + getSeconds(ms) + '</span> seconds';
        }

        $(_elem).html(result);
    }

    function diffInMS(then, now) {
        return then.diff(now, 'milliseconds', true);
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
}