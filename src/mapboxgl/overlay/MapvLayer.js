import mapboxgl from 'mapbox-gl';
import '../core/Base';
import {
    MapvRenderer
} from "./mapv/MapvRenderer";

/**
 * @class mapboxgl.supermap.MapvLayer
 * @category  Visualization MapV
 * @classdesc Mapv图层
 * @param {Object} map - 地图 </br>
 * @param {Object} dataSet - 数据集 </br>
 * @param {Object} mapVOptions - Mapv参数。</br>
 * @param {string} mapVOptions.layerID - 图层ID。
 */
export class MapvLayer {

    constructor(map, dataSet, mapVOptions) {
        this.map = map;
        this.layerID = mapVOptions.layerID;
        delete mapVOptions["layerID"];
        this.renderer = new MapvRenderer(map, this, dataSet, mapVOptions);
        this.mapVOptions = mapVOptions;
        this.canvas = this._createCanvas();
        this.renderer._canvasUpdate();
        this.mapContainer = map.getCanvasContainer();
        this.mapContainer.appendChild(this.canvas);
        this.mapContainer.style.perspective = this.map.transform.cameraToCenterDistance + 'px';
    }

    /**
     * @function mapboxgl.supermap.MapvLayer.prototype.getTopLeft
     * @description 获取左上的距离
     */
    getTopLeft() {
        var map = this.map;
        var topLeft;
        if (map) {
            var bounds = map.getBounds();
            topLeft = bounds.getNorthWest();
        }
        return topLeft;
    }

    /**
     * @function mapboxgl.supermap.MapvLayer.prototype.addData
     * @description 追加数据
     * @param {Object} data - 要追加的数据 </br>
     * @param {Object} options - 要追加的值
     */
    addData(data, options) {
        this.renderer.addData(data, options);
    }

    /**
     * @function mapboxgl.supermap.MapvLayer.prototype.update
     * @description 更新图层
     * @param {Object} opt - 待更新的数据</br> 
     * @param {Object} opt.data - mapv数据集</br>
     * @param {Object} opt.options - mapv绘制参数
     */
    update(opt) {
        this.renderer.update(opt);
    }

    /**
     * @function mapboxgl.supermap.MapvLayer.prototype.getData
     * @description 获取数据
     * @returns {mapv.DataSet} mapv数据集
     */
    getData() {
        if (this.renderer) {
            this.dataSet = this.renderer.getData();
        }
        return this.dataSet;
    }

    /**
     * @function mapboxgl.supermap.MapvLayer.prototype.removeData
     * @description 删除符合过滤条件的数据
     * @param {function} filter - 过滤条件。条件参数为数据项，返回值为true,表示删除该元素；否则表示不删除
     * @example
     * filter=function(data){
     *    if(data.id=="1"){
     *      return true
     *    }
     *    return false;
     * }
     */
    removeData(filter) {
        this.renderer && this.renderer.removeData(filter);
    }

    /**
     * @function mapboxgl.supermap.MapvLayer.prototype.clearData
     * @description 清除数据
     */
    clearData() {
        this.renderer.clearData();
    }

    show() {
        if (this.renderer) {
            this.renderer._show();
        }
        return this;
    }

    hide() {
        if (this.renderer) {
            this.renderer._hide();
        }
        return this;
    }

    _createCanvas() {
        var canvas = document.createElement('canvas');
        canvas.id = this.layerID;
        canvas.style.position = 'absolute';
        canvas.style.top = 0 + "px";
        canvas.style.left = 0 + "px";
        var global$2 = typeof window === 'undefined' ? {} : window;
        var devicePixelRatio = this.devicePixelRatio = global$2.devicePixelRatio;
        canvas.width = parseInt(this.map.getCanvas().style.width) * devicePixelRatio;
        canvas.height = parseInt(this.map.getCanvas().style.height) * devicePixelRatio;
        if (this.mapVOptions.context == '2d') {
            canvas.getContext(this.mapVOptions.context).scale(devicePixelRatio, devicePixelRatio);
        }
        canvas.style.width = this.map.getCanvas().style.width;
        canvas.style.height = this.map.getCanvas().style.height;
        return canvas;
    }

    /**
     * @function mapboxgl.supermap.MapvLayer.prototype.moveTo
     * @description 将图层移动到某个图层之前。
     * @param {string} layerID - 待插入的图层ID。</br>
     * @param {boolean} [before=true] - 是否将本图层插入到图层id为layerID的图层之前(如果为false则将本图层插入到图层id为layerID的图层之后)。
     */
    moveTo(layerID, before) {
        var layer = document.getElementById(this.layerID);
        before = before !== undefined ? before : true;
        if (before) {
            var beforeLayer = document.getElementById(layerID);
            if (layer && beforeLayer) {
                beforeLayer.parentNode.insertBefore(layer, beforeLayer);
            }
            return;
        }
        var nextLayer = document.getElementById(layerID);
        if (layer) {
            if (nextLayer.nextSibling) {
                nextLayer.parentNode.insertBefore(layer, nextLayer.nextSibling);
                return;
            }
            nextLayer.parentNode.appendChild(layer);
        }
    }
    /**
     * @function mapboxgl.supermap.MapvLayer.prototype.setZIndex
     * @description 设置canvas层级
     * @param {number} zIndex - canvas层级
     */
    setZIndex(z) {
        this.canvas.style.zIndex = z;
    }

}

mapboxgl.supermap.MapvLayer = MapvLayer;