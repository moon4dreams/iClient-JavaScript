import mapboxgl from 'mapbox-gl';
import '../core/Base';
import {ServiceBase} from './ServiceBase';
import {MapService as CommonMapService, TilesetsService} from '@supermap/iclient-common';

/**
 * @class mapboxgl.supermap.MapService
 * @category  iServer Map
 * @classdesc 地图信息服务类
 * @extends mapboxgl.supermap.ServiceBase
 * @param {string} url - 地图服务地址 </br>
 * @param {Object} options - 地图服务信息相关参数。</br>
 * @param {string} options.serverType - 服务来源 iServer|iPortal|online。
 * @example
 * new mapboxgl.supermap.MapService(url)
 * .getMapInfo(function(result){
 *     //doSomething
 * })
 */
export class MapService extends ServiceBase {

    constructor(url, options) {
        super(url, options);
    }

    /**
     * @function mapboxgl.supermap.MapService.prototype.getMapInfo
     * @description 地图信息查询服务
     * @param {RequestCallback} callback 回调函数 </br>
     * @returns {mapboxgl.supermap.MapService} 获取服务信息
     */
    getMapInfo(callback) {
        var me = this;
        var getMapStatusService = new CommonMapService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }, projection: me.options.projection
        });
        getMapStatusService.processAsync();
    }

    /**
     * @function mapboxgl.supermap.MapService.prototype.getTilesets
     * @description 切片列表信息查询服务
     * @param {RequestCallback} callback - 回调函数 
     * @returns {mapboxgl.supermap.MapService} 获取服务信息
     */
    getTilesets(callback) {
        var me = this;
        var tilesetsService = new TilesetsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        tilesetsService.processAsync();
    }
}

mapboxgl.supermap.MapService = MapService;