if (Meteor.isClient) {

    Template.scripts.rendered = function () {

        if (window.location.pathname.indexOf('bootstrap') === -1) {
            var root = 'https://raw.github.com/adamjmoon/itchcork/master/';

            var main = document.createElement('script');
            main.type = 'text/javascript';
            main.src = 'https://raw.github.com/adamjmoon/itchcork/master/itchcork.min.js';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(main, s);
        }

    };

    Template.BootstrapThemeManager.rendered = function () {

        if (window.location.pathname.indexOf('bootstrap') > -1) {
            var root = 'https://raw.github.com/adamjmoon/itchcork/master/';
            var main = document.createElement('script');
            main.type = 'text/javascript';
            main.src = 'https://raw.github.com/adamjmoon/itchcork/master/lib/aaa.themeManager.bootstrap.js';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(main, s);
            var bootstrapFrame = document.getElementById('bootstrapThemeManager');
            bootstrapFrame.style.display = 'block';
        }

    };

    Template.nanojar.rendered = function () {
        var n = document.getElementById('nanojarWrap');
        n.innerHTML = '<applet code=nano archive=' + '/nano.jar' + '>';
    };

    Template.ga.rendered = function () {
        if (!(window._gaq != null)) {
            window._gaq = [];
            _gaq.push(['_setAccount', 'UA-40741651-1']);
            _gaq.push(['_trackPageview']);
            return (function () {
                var ga, gajs, s;
                ga = document.createElement('script');
                ga.type = 'text/javascript';
                ga.async = true;
                gajs = '.google-analytics.com/ga.js';
                ga.src = 'https:' === document.location.protocol ? 'https://ssl' + gajs : 'http://www' + gajs;
                s = document.getElementsByTagName('script')[0];
                return s.parentNode.insertBefore(ga, s);
            })();
        }
    };
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}
