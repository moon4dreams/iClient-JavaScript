import '../core/Base';
import L from "leaflet";

/**
 * @class L.supermap.baiduTileLayer
 * @classdesc 百度地图图层。
 * @category ThirdPartyMap
 * @extends {L.TileLayer}
 * @param {string} url - 切片地址。
 * @param {Object} options - 切片参数。
 * @param {number} options.minZoom - 最小缩放级别。 
 * @param {number} options.maxZoom - 最大缩放级别。
 * @param {L.LatLngBounds} options.bounds - 显示范围。
 * @param {L.Browser} options.retina - 浏览器显示分辨率。
 * @param {string} options.attribution - 版权信息。
 * @param {string} options.tileProxy - 启用托管地址。
 */
export var BaiduTileLayer = L.TileLayer.extend({

    /**
     * @member L.supermap.baiduTileLayer.prototype.url -{string}
     * @description 切片地址
     */
    url: "http://online{num}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles={styles}&udt=20150815&scaler=1",

    options: {
        minZoom: 3,
        maxZoom: 19,
        bounds: L.latLngBounds(L.latLng(-85.0511287798, -180), L.latLng(85.0511287798, 180)),
        retina: L.Browser.retina,
        attribution: "Map Data © 2017 Baidu - GS(2016)2089号 - Data © 长地万方 with <span>© <a href='http://iclient.supermap.io' target='_blank'>SuperMap iClient</a></span>"
    },

    initialize: function (url, options) {
        if (url) {
            this.url = url;
        }
        L.setOptions(this, options);
        if (this.options.retina) {
            this.options.maxZoom = 18;
        }
        L.stamp(this);
    },

    /**
     * @function L.supermap.baiduTileLayer.prototype.getTileUrl
     * @description 获取切片地址
     * @param {Object} coords - 行列号
     * @return {string} 切片地址
     */
    getTileUrl: function (coords) {
        var url = L.Util.template(this.url, {
            num: Math.abs((coords.x + coords.y) % 8) + 1,
            x: coords.x,
            y: -coords.y - 1,
            z: this._getZoomForUrl(),
            styles: this.options.retina ? 'ph' : 'pl'
        });
        //支持代理
        if (this.options.tileProxy) {
            url = this.options.tileProxy + encodeURIComponent(url);
        }
        return url;
    }
});
export var baiduTileLayer = function (url, options) {
    return new BaiduTileLayer(url, options);
};

L.supermap.baiduTileLayer = baiduTileLayer;
