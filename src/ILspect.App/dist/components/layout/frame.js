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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbGF5b3V0L2ZyYW1lLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztZQUdBLG9CQUEyQix3QkFBZTtnQkFDdEMsSUFBSSxXQUFXO29CQUNYLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDbEUsQ0FBQztnQkFFRCxNQUFNO29CQUNGLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztvQkFDOUIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDO29CQUVoQyxJQUFJLEtBQUssR0FBRzt3QkFDUixLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSTt3QkFDOUIsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUk7d0JBQ2hDLEdBQUcsRUFBRSxHQUFHLEdBQUcsSUFBSTt3QkFDZixJQUFJLEVBQUUsR0FBRyxJQUFJLElBQUk7d0JBQ2pCLFFBQVEsRUFBRSxVQUFVO3FCQUN2QixDQUFDO29CQUVGLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSzt3QkFDNUQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ25DLE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRTtnQ0FDN0IsYUFBYSxFQUFFLElBQUksc0JBQWEsQ0FBQyxJQUFJLENBQUM7NkJBQ3pDLENBQUMsQ0FBQzt3QkFDUCxDQUFDO3dCQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7b0JBQ2pCLENBQUMsQ0FBQyxDQUFDO29CQUVILE1BQU0sQ0FBQyxxQkFBQyxHQUFHLElBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBVSxFQUFDLEtBQUssRUFBRSxLQUFNLEdBQ3JELFdBQVksQ0FDWCxDQUFBO2dCQUNWLENBQUM7WUFDTCxDQUFDO1lBOUJELHlCQThCQyxDQUFBIiwiZmlsZSI6ImNvbXBvbmVudHMvbGF5b3V0L2ZyYW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQge0lMYXlvdXRQcm9wcyxMYXlvdXRDb21wb25lbnQsTGF5b3V0Q29udGV4dH0gZnJvbSAnLi9sYXlvdXQnO1xuXG5leHBvcnQgY2xhc3MgRnJhbWUgZXh0ZW5kcyBMYXlvdXRDb21wb25lbnQ8SUZyYW1lUHJvcHM+IHtcbiAgICBnZXQgY3VycmVudFNpemUoKSB7XG4gICAgICAgIHJldHVybiB7IHdpZHRoOiB0aGlzLnByb3BzLndpZHRoLCBoZWlnaHQ6IHRoaXMucHJvcHMuaGVpZ2h0IH07XG4gICAgfVxuICAgIFxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IHRvcCA9IHRoaXMucHJvcHMudG9wIHx8IDA7XG4gICAgICAgIGxldCBsZWZ0ID0gdGhpcy5wcm9wcy5sZWZ0IHx8IDA7XG4gICAgICAgIFxuICAgICAgICB2YXIgc3R5bGUgPSB7XG4gICAgICAgICAgICB3aWR0aDogYCR7dGhpcy5wcm9wcy53aWR0aH1weGAsXG4gICAgICAgICAgICBoZWlnaHQ6IGAke3RoaXMucHJvcHMuaGVpZ2h0fXB4YCxcbiAgICAgICAgICAgIHRvcDogYCR7dG9wfXB4YCxcbiAgICAgICAgICAgIGxlZnQ6IGAke2xlZnR9cHhgLFxuICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZSdcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIHZhciBuZXdDaGlsZHJlbiA9IFJlYWN0LkNoaWxkcmVuLm1hcCh0aGlzLnByb3BzLmNoaWxkcmVuLCAoY2hpbGQpID0+IHtcbiAgICAgICAgICAgIGlmIChSZWFjdC5pc1ZhbGlkRWxlbWVudDxhbnk+KGNoaWxkKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoY2hpbGQsIHtcbiAgICAgICAgICAgICAgICAgICAgbGF5b3V0Q29udGV4dDogbmV3IExheW91dENvbnRleHQodGhpcylcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjaGlsZDtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9e3RoaXMucHJvcHMuY2xhc3NOYW1lfSBzdHlsZT17c3R5bGV9PlxuICAgICAgICAgICAge25ld0NoaWxkcmVufVxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cbmludGVyZmFjZSBJRnJhbWVQcm9wcyBleHRlbmRzIElMYXlvdXRQcm9wcyB7XG4gICAgd2lkdGg6IG51bWJlcixcbiAgICBoZWlnaHQ6IG51bWJlcixcbiAgICB0b3A/OiBudW1iZXIsXG4gICAgbGVmdD86IG51bWJlcixcbiAgICBjbGFzc05hbWU/OiBzdHJpbmdcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
