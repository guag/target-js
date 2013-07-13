$(document).ready(function () {

    countdown();

    setInterval(countdown, 1000);

    function diffInMS(then, now) {
        return then.diff(now, 'milliseconds', true);
    }

    function countdown() {
        var now = moment(), // get the current moment
            // May 17, 2014 @ 12:00AM
            then = moment([2014, 4, 17]),
            // get the difference from now to then in ms
            ms = diffInMS(then, now);

        // If you need years, uncomment this line and make sure you add it to the concatonated phrase
        //years = Math.floor(moment.duration(ms).asYears());
        //then = then.subtract('years', years);
        //ms = diffInMS(then, now);

        // get the duration as months and round down
        var months = Math.floor(moment.duration(ms).asMonths());

        // subtract months from the original moment (not sure why I had to offset by 1 day)
        then = then.subtract('months', months).subtract('days', 1);
        // update the duration in ms
        ms = diffInMS(then, now);
        var days = Math.floor(moment.duration(ms).asDays());

        then = then.subtract('days', days);
        // update the duration in ms
        ms = diffInMS(then, now);
        var hours = Math.floor(moment.duration(ms).asHours());

        then = then.subtract('hours', hours);
        // update the duration in ms
        ms = diffInMS(then, now);
        var minutes = Math.floor(moment.duration(ms).asMinutes());

        then = then.subtract('minutes', minutes);
        // update the duration in ms
        ms = diffInMS(then, now);
        var seconds = Math.floor(moment.duration(ms).asSeconds());

        // concatonate the variables
        diff = '<span class="num">' + months + '</span> months, <span class="num">' + days + '</span> days, <span class="num">' + hours + '</span> hours, <span class="num">' + minutes + '</span> minutes, <span class="num">' + seconds + '</span> seconds';
        $('#relative').html(diff);
    }

});