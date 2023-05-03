(async function () {
    const { default: jQuery } = await import("jquery");
    window.jquery = window.jQuery = window.$ = jQuery;
    const { createPopper } = await import("@popperjs/core");
    import("bootstrap/dist/js/bootstrap.min.js");
    import("./assets/js/main.js");
})();
