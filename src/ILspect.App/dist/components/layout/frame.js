System.register(['react', './layout'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var React, layout_1;
    var Frame;
    return {
        setters:[
            function (React_1) {
                React = React_1;
            },
            function (layout_1_1) {
                layout_1 = layout_1_1;
            }],
        execute: function() {
            class Frame extends layout_1.LayoutComponent {
                get currentSize() {
                    return { width: this.props.width, height: this.props.height };
                }
                render() {
                    let top = this.props.top || 0;
                    let left = this.props.left || 0;
                    var style = {
                        width: `${this.props.width}px`,
                        height: `${this.props.height}px`,
                        top: `${top}px`,
                        left: `${left}px`,
                        position: 'absolute'
                    };
                    var newChildren = React.Children.map(this.props.children, (child) => {
                        if (React.isValidElement(child)) {
                            return React.cloneElement(child, {
                                layoutContext: new layout_1.LayoutContext(this)
                            });
                        }
                        return child;
                    });
                    return React.createElement("div", {className: this.props.className, style: style}, newChildren);
                }
            }
            exports_1("Frame", Frame);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbGF5b3V0L2ZyYW1lLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztZQUdBLG9CQUEyQix3QkFBZTtnQkFDdEMsSUFBSSxXQUFXO29CQUNYLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDbEUsQ0FBQztnQkFFRCxNQUFNO29CQUNGLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztvQkFDOUIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDO29CQUVoQyxJQUFJLEtBQUssR0FBRzt3QkFDUixLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSTt3QkFDOUIsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUk7d0JBQ2hDLEdBQUcsRUFBRSxHQUFHLEdBQUcsSUFBSTt3QkFDZixJQUFJLEVBQUUsR0FBRyxJQUFJLElBQUk7d0JBQ2pCLFFBQVEsRUFBRSxVQUFVO3FCQUN2QixDQUFDO29CQUVGLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSzt3QkFDNUQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ25DLE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRTtnQ0FDN0IsYUFBYSxFQUFFLElBQUksc0JBQWEsQ0FBQyxJQUFJLENBQUM7NkJBQ3pDLENBQUMsQ0FBQzt3QkFDUCxDQUFDO3dCQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7b0JBQ2pCLENBQUMsQ0FBQyxDQUFDO29CQUVILE1BQU0sQ0FBQyxxQkFBQyxHQUFHLElBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBVSxFQUFDLEtBQUssRUFBRSxLQUFNLEdBQ3JELFdBQVksQ0FDWCxDQUFBO2dCQUNWLENBQUM7WUFDTCxDQUFDO1lBOUJELHlCQThCQyxDQUFBIiwiZmlsZSI6ImNvbXBvbmVudHMvbGF5b3V0L2ZyYW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7SUxheW91dFByb3BzLExheW91dENvbXBvbmVudCxMYXlvdXRDb250ZXh0fSBmcm9tICcuL2xheW91dCc7XHJcblxyXG5leHBvcnQgY2xhc3MgRnJhbWUgZXh0ZW5kcyBMYXlvdXRDb21wb25lbnQ8SUZyYW1lUHJvcHM+IHtcclxuICAgIGdldCBjdXJyZW50U2l6ZSgpIHtcclxuICAgICAgICByZXR1cm4geyB3aWR0aDogdGhpcy5wcm9wcy53aWR0aCwgaGVpZ2h0OiB0aGlzLnByb3BzLmhlaWdodCB9O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgbGV0IHRvcCA9IHRoaXMucHJvcHMudG9wIHx8IDA7XHJcbiAgICAgICAgbGV0IGxlZnQgPSB0aGlzLnByb3BzLmxlZnQgfHwgMDtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgc3R5bGUgPSB7XHJcbiAgICAgICAgICAgIHdpZHRoOiBgJHt0aGlzLnByb3BzLndpZHRofXB4YCxcclxuICAgICAgICAgICAgaGVpZ2h0OiBgJHt0aGlzLnByb3BzLmhlaWdodH1weGAsXHJcbiAgICAgICAgICAgIHRvcDogYCR7dG9wfXB4YCxcclxuICAgICAgICAgICAgbGVmdDogYCR7bGVmdH1weGAsXHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnXHJcbiAgICAgICAgfTtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgbmV3Q2hpbGRyZW4gPSBSZWFjdC5DaGlsZHJlbi5tYXAodGhpcy5wcm9wcy5jaGlsZHJlbiwgKGNoaWxkKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChSZWFjdC5pc1ZhbGlkRWxlbWVudDxhbnk+KGNoaWxkKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChjaGlsZCwge1xyXG4gICAgICAgICAgICAgICAgICAgIGxheW91dENvbnRleHQ6IG5ldyBMYXlvdXRDb250ZXh0KHRoaXMpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gY2hpbGQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPXt0aGlzLnByb3BzLmNsYXNzTmFtZX0gc3R5bGU9e3N0eWxlfT5cclxuICAgICAgICAgICAge25ld0NoaWxkcmVufVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgfVxyXG59XHJcblxyXG5pbnRlcmZhY2UgSUZyYW1lUHJvcHMgZXh0ZW5kcyBJTGF5b3V0UHJvcHMge1xyXG4gICAgd2lkdGg6IG51bWJlcixcclxuICAgIGhlaWdodDogbnVtYmVyLFxyXG4gICAgdG9wPzogbnVtYmVyLFxyXG4gICAgbGVmdD86IG51bWJlcixcclxuICAgIGNsYXNzTmFtZT86IHN0cmluZ1xyXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
