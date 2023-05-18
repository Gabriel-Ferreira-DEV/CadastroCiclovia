/**
 * @depends template=jive.nitro.reputationCenter.menuLink
 */
$j(function() {
    if (window._jive_effective_user_id !== "-1") {
        $j.ajax({
            url: jive.rest.url("/nitro/admin/state"),
            success: function(response) {
                if (response.uiEnabled) {
                    $j('#j-satNav > li:first').append(jive.nitro.reputationCenter.menuLink().toString());
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error getting status: '+textStatus+'/'+errorThrown);
            }
        });
    }
});

/**
 * @depends template=jive.nitro.challenges.head
 */
$j(function() {
    $j("body").append($j(jive.nitro.challenges.head({
        currentJiveUserID: window._jive_effective_user_id
    }).toString()));
});
