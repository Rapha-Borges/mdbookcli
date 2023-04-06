var langs = [
    'pt',
    'es'
];
(function langs() {
    var html = document.querySelector('html');
    var langToggleButton = document.getElementById('lang-toggle');
    var langPopup = document.getElementById('lang-list');
    function showLangs() {
        langPopup.style.display = 'block';
        langToggleButton.setAttribute('aria-expanded', true);
    }
    function hideLangs() {
        langPopup.style.display = 'none';
        langToggleButton.setAttribute('aria-expanded', false);
        langToggleButton.focus();
    }
    langToggleButton.addEventListener('click', function () {
        if (langPopup.style.display === 'block') {
            hideLangs();
        } else {
            showLangs();
        }
    });
    langPopup.addEventListener('click', function (e) {
        var lang = e.target.id || e.target.parentElement.id;
        if (lang === 'en') {
            window.location.href = '/';
        } else {
            window.location.href = '/' + lang;
        }
    });
    langPopup.addEventListener('focusout', function (e) {
        // e.relatedTarget is null in Safari and Firefox on macOS (see workaround below)
        if (!!e.relatedTarget && !langToggleButton.contains(e.relatedTarget) && !langPopup.contains(e.relatedTarget)) {
            hideLangs();
        }
    });
    // Should not be needed, but it works around an issue on macOS & iOS: https://github.com/rust-lang-nursery/mdBook/issues/628
    document.addEventListener('click', function (e) {
        if (langPopup.style.display === 'block' && !langToggleButton.contains(e.target) && !langPopup.contains(e.target)) {
            hideLangs();
        }
    });
})();

