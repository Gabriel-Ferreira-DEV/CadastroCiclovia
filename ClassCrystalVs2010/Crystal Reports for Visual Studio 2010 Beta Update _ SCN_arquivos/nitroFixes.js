/* JIVE-13422 */
jQuery.ajaxSetup({
    dataFilter: function(data, type) {
        return type === 'json' && data ? jQuery.trim(data.replace(/^throw [^;]*;/, '')) : data;
    }
});