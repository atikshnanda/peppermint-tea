// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Track initial page view
    logEvent('page_view', 'page_load', document.body);

    // Track section views when they come into viewport
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                logEvent('view', entry.target.id || 'section', entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Track all click events
    document.addEventListener('click', function(event) {
        const target = event.target;
        let elementType = getElementType(target);
        
        // Skip if clicking on body or html directly
        if (elementType !== 'document' && elementType !== 'body') {
            logEvent('click', elementType, target);
        }
    }, true); // Use capture phase to catch all clicks

    // Helper function to determine element type
    function getElementType(element) {
        if (element.tagName === 'IMG') return 'image';
        if (element.tagName === 'A') return 'link';
        if (element.tagName === 'BUTTON') return 'button';
        if (element.tagName === 'NAV' || element.tagName === 'UL' || element.tagName === 'LI') return 'navigation';
        if (element.tagName === 'SECTION') return 'section';
        if (element.tagName === 'DIV') return 'container';
        if (element.tagName === 'P') return 'text';
        if (element.tagName === 'H1' || element.tagName === 'H2' || element.tagName === 'H3') return 'heading';
        return element.tagName.toLowerCase();
    }

    // Helper function to log events
    function logEvent(eventType, elementType, element) {
        const timestamp = new Date().toISOString();
        console.log(`${timestamp}, ${eventType}, ${elementType}`);
        
    }
});