function initFullpage(){
    new fullpage('#fullpage', {
        autoScrolling:true,
        scrollHorizontally: true,
        navigation: true,
        navigationPosition: 'right',
        credits: { enabled: false, label: 'Made with fullPage.js', position: 'right'},
    });
}