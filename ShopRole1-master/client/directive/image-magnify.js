
  (function () {
    angular
        .module('customerapp')
        .directive('zoom', [function () {
            return {
                restrict: 'A',
                link: function (scope, elem, attrs) {
                    var img = elem[0];
                    $(img).css({
                        "position": "absolute",
                        "top": "0",
                        "bottom": "0",
                        "left": "0",
                        "right": "0",
                        "margin": "auto",
                        "padding-left": "1px",
                        "padding-right": "1px",
                        "padding-top": "1px",
                        "padding-bottom": "1px",
                        "-webkit - user - select": "none",
                        "-webkit - user - drag": "none"
                    });
                    var imageContainer = img.parentNode.parentNode;
                    $(imageContainer).css({
                        "text-align": "center",
                        "margin": "0",
                        "padding": "0",
                        "height": "100%",
                        "max- height": "100%",
                        "width": "100%",
                        "background-color": "#000",
                        "overflow": "hidden",
                        "-webkit - user - select": "none",
                        "cursor": "context - menu",
                    });
                    var parent = img.parentNode;
                    $(parent).css({
                        "width": "100%",
                        "height": "auto",
                        "margin": 0,
                        "padding": 0,
                        "display": "-webkit - box",
                        "-webkit - box - pack": "center",
                        "-webkit - box - align": "center",
                        "z-index": "5"
                    });
                    var currentScale = 1;
                    var currentRotation = 90
                    let transformOriginX = 0, transformOriginY = 0;
                    let translateX = 0, translateY = 0;
                    function setTransformOrigin() {
                        let imgRect = img.getBoundingClientRect();
                        let parentRect = parent.getBoundingClientRect();
                        let visibleWidth = (imgRect.width > parent.offsetWidth) ? imgRect.left + parentRect.width : imgRect.width;
                        let visibleHeight = (imgRect.height > parent.offsetHeight) ? imgRect.top + parentRect.height : imgRect.height;
                        let beginX = parentRect.right - visibleWidth, beginY = parentRect.bottom - visibleHeight;
                        let endX = beginX + visibleWidth, endY = beginY + visibleHeight;
                        let midX = beginX + ((endX - beginX) / 2), midY = beginY + ((endY - beginY) / 2);
                       // if (midY > imageContainer.clientHeight / 2) midY = imageContainer.clientHeight / 2;
                        //if (midX > imageContainer.clientWidth / 2) midX = imageContainer.clientWidth / 2;
                        if (midY > imageContainer.clientHeight / 2) { parent.style.transformOrigin = midX + 'px ' + midY + 'px' } else {
                            parent.style.transformOrigin = midX + 'px ' + imageContainer.clientHeight / 2 + 'px'
                        }
                    }
                    function scaleImage(scale, event) {

                        img.style.transform = 'scale(' + scale + ') ' + 'rotate(' + (currentRotation - 90) + 'deg)';
                        if (scale < currentScale) {
                            let imgRect = img.getBoundingClientRect();
                            let imageContainerRect = imageContainer.getBoundingClientRect();
                            if (parent.style.transform.match('translate')) {
                                let parentTransform = parent.style.transform.replace('translate(', '').replace(')', '').split(', ');
                                let moveX = parentTransform[0].replace('px', ''), moveY = parentTransform[1].replace('px', '');
                                if ((imageContainerRect.right - imgRect.right) > 0 || (imageContainerRect.left - imgRect.left) < 0) {
                                    let moveBy = ((imageContainerRect.right - imgRect.right) > 0) ? (imageContainerRect.right - imgRect.right) : (imageContainerRect.left - imgRect.left);
                                    moveX = (imgRect.width > parent.offsetWidth) ? (parseFloat(parentTransform[0]) + moveBy) : 0;
                                    transformOriginX = (transformOriginX - moveBy);
                                }
                                if ((imageContainerRect.bottom - imgRect.bottom) > 0 || (imageContainerRect.top - imgRect.top) < 0) {
                                    let moveBy = ((imageContainerRect.bottom - imgRect.bottom) > 0) ? (imageContainerRect.bottom - imgRect.bottom) : (imageContainerRect.top - imgRect.top);
                                    moveY = (imgRect.height > parent.offsetHeight) ? (parseFloat(parentTransform[1]) + moveBy) : 0;
                                    transformOriginY = (transformOriginY + moveBy);
                                }
                                if (scale <= 1) { translateX = 0; translateY = 0; }
                                parent.style.transformOrigin = transformOriginX + 'px ' + transformOriginY + 'px';
                           }
                        }
                        currentScale = scale;
                        let imgRect = img.getBoundingClientRect();
                        let parentRect = parent.getBoundingClientRect();
                        let overflow_horizontal = (imgRect.width > parent.offsetWidth ? true : false);
                        let overflow_vertical = (imgRect.height > parent.offsetHeight ? true : false);
                        let startX = event.pageX - translateX, startY = event.pageY - translateY;
                        let max_left = parentRect.left - imgRect.left;
                        let max_top = parentRect.top - imgRect.top;
                        var evt = window.event;
                        translateX = (Math.abs(evt.pageX - startX) >= max_left ? (max_left * Math.sign(evt.pageX - startX)) : (evt.pageX - startX));
                        translateY = (Math.abs(evt.pageY - startY) >= max_top ? (max_top * Math.sign(evt.pageY - startY)) : (evt.pageY - startY));
                        translateX = overflow_horizontal ? translateX : 0, translateY = overflow_vertical ? translateY : 0;
                        if ((translateX != 0) && (translateY != 0)) {
                            if (translateY > imageContainer.clientHeight/2) { parent.style['-webkit-transform'] = 'translate(' + translateX + 'px, ' + translateY + 'px)' } else {
                                parent.style['-webkit-transform'] = 'translate(' + translateX + 'px, ' + imageContainer.clientHeight / 2+'px)'
                            }
                        } else {
                            parent.style['-webkit-transform'] = ''
                        };
                        return false;
                    }

                    function tap() {
                        let imgRect = img.getBoundingClientRect();
                        let parentRect = parent.getBoundingClientRect();
                        let overflow_horizontal = (imgRect.width > parent.offsetWidth ? true : false);
                        let overflow_vertical = (imgRect.height > parent.offsetHeight ? true : false);
                        let startX = event.pageX - translateX, startY = event.pageY - translateY;
                        let max_left = parentRect.left - imgRect.left;
                        let max_top = parentRect.top - imgRect.top;
                        var evt = window.event;
                        translateX = (Math.abs(evt.pageX - startX) >= max_left ? (max_left * Math.sign(evt.pageX - startX)) : (evt.pageX - startX));
                        translateY = (Math.abs(evt.pageY - startY) >= max_top ? (max_top * Math.sign(evt.pageY - startY)) : (evt.pageY - startY));
                        translateX = overflow_horizontal ? translateX : 0, translateY = overflow_vertical ? translateY : 0;
                        if ((translateX != 0) && (translateY != 0)) {
                            if (translateY > imageContainer.clientHeight / 2) {
                                parent.style['-webkit-transform'] = 'translate(' + translateX + 'px, ' + translateY + 'px)'
                            } else {
                                parent.style['-webkit-transform'] = 'translate(' + translateX + 'px, ' + imageContainer.clientHeight / 2+ 'px)'
                            }
                        } else {
                            parent.style['-webkit-transform'] = ''
                        };
                    }
                    function makeDraggable(event) {

                        parent = img.parentNode;
                        imageContainer = img.parentNode.parentNode;
                        $(parent).css({

                            "display": "-webkit - box",
                            "-webkit - box - pack": "center",
                            "-webkit - box - align": "center",
                            "z-index": "5"
                        });
                        $(imageContainer).css({
                            "text-align": "center",
                            "margin": "0",
                            "padding": "0",                            
                            "overflow": "hidden",
                            "-webkit - user - select": "none",
                            "cursor": "context - menu",
                        });
                        let imgRect = img.getBoundingClientRect();
                        let parentRect =parent.getBoundingClientRect();
                        let overflow_horizontal = (imgRect.width > parent.offsetWidth ? true : false);
                        let overflow_vertical = (imgRect.height > parent.offsetHeight ? true : false);
                        let startX = event.pageX - translateX, startY = event.pageY - translateY;
                        let max_left = parentRect.left - imgRect.left;
                        let max_top = parentRect.top - imgRect.top;

                        window.onmousemove = function (evt) {
                            if (evt == null) { evt = window.event; }
                            translateX = (Math.abs(evt.pageX - startX) >= max_left ? (max_left * Math.sign(evt.pageX - startX)) : (evt.pageX - startX));
                            translateY = (Math.abs(evt.pageY - startY) >= max_top ? (max_top * Math.sign(evt.pageY - startY)) : (evt.pageY - startY));
                            translateX = overflow_horizontal ? translateX : 0, translateY = overflow_vertical ? translateY : 0;
                            if ((translateX != 0) && (translateY != 0)) {
                                if (translateY > imageContainer.clientHeight) {
                                    parent.style['-webkit-transform'] = 'translate(' + translateX + 'px, ' + translateY + 'px)'
                                } else {
                                   parent.style['-webkit-transform'] = 'translate(' + translateX + 'px, ' + imageContainer.clientHeight / 2+ 'px)'
                                }
                            } else {
                                parent.style['-webkit-transform'] = ''
                            };
                            return false;
                        }

                        window.onmouseup = function (evt) {
                            setTransformOrigin();
                            window.onmousemove = null;
                        }

                        return false;
                    };
                    img.addEventListener('mousedown', function () { makeDraggable(event); });
                          elem.bind('mousewheel', function (e) {
                        var img = e.currentTarget.style.width;
                        var scaleX = e.currentTarget.getBoundingClientRect().width / e.currentTarget.offsetWidth;
                        var w = "";
                        var resW = "";
                        var resL = "";
                        var resT = "";
                        var zValue = 1.2;
                        var newScale = scaleX * zValue;
                        var newScale = "scale(1)";
                        var val = parseInt(w.replace('%', ''));
                        if (e.originalEvent.wheelDelta / 120 > 0) {
                            newScale = scaleX * zValue;
                        }
                        else {
                            if ((scaleX / zValue) > 1) {
                                newScale = scaleX / zValue
                            } else {
                                newScale = 1.0;
                            }
                        }
                        scaleImage(newScale, e);
                        setTransformOrigin();
                        window.onmousemove = null;
                   });
                }
            }
        }]);

})();