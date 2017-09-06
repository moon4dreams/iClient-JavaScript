var commonTools = require('../base/commonTools');
module.exports = {
    'leaflet_04_interpolationAnalystService_KrigingUniversal': function (browser) {
        var type = 'leaflet';
        var exampleName = '04_interpolationAnalystService_KrigingUniversal';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        /*check elements exist*/
        browser.waitForElementPresent('.leaflet-pane.leaflet-map-pane', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-tile-pane', 10000);
        browser.waitForElementPresent('.leaflet-layer', 10000);
        browser.pause(12000);
        browser.elements('class name', 'leaflet-layer', function (result) {
            browser.assert.equal(result.value.length, 2, "expect Number of leaflet-layer to be 2, actual is " + result.value.length);
        });
        browser.elements('class name', 'leaflet-tile-container', function (result) {
            browser.assert.equal(result.value.length, 2, "expect Number of leaflet-tile-container to be 2, actual is " + result.value.length);
        });
        //测试版权点击的正确性
        commonTools.verifyCopyrightOfLeaflet(browser);
        browser.pause(1000);
        browser.end();
    }
};