(function () {
    const body = document.body;
    const transitionLinks = document.querySelectorAll('[data-transition]');
    const smoothAnchors = document.querySelectorAll('a[href^="#"]');
    const TRANSITION_DELAY = 220;

    function handleNavigation(event, target) {
        if (!target || target.startsWith('#')) {
            return;
        }

        if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) {
            return;
        }

        event.preventDefault();
        if (body.classList.contains('is-transitioning')) {
            return;
        }

        body.classList.add('is-transitioning');
        window.setTimeout(function () {
            window.location.href = target;
        }, TRANSITION_DELAY);
    }

    transitionLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            const href = link.getAttribute('href') || link.dataset.transitionTarget;
            handleNavigation(event, href);
        });
    });

    smoothAnchors.forEach(function (link) {
        link.addEventListener('click', function (event) {
            const href = link.getAttribute('href');
            if (!href || !href.startsWith('#')) {
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                event.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    window.addEventListener('pageshow', function () {
        body.classList.remove('is-transitioning');
    });
})();
