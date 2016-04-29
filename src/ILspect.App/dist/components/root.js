System.register(['react', './layout/frame', './assemblyList'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var React, frame_1, assemblyList_1;
    var ILspectApp;
    return {
        setters:[
            function (React_1) {
                React = React_1;
            },
            function (frame_1_1) {
                frame_1 = frame_1_1;
            },
            function (assemblyList_1_1) {
                assemblyList_1 = assemblyList_1_1;
            }],
        execute: function() {
            class ILspectApp extends React.Component {
                componentDidMount() {
                    window.onresize = (event) => {
                        this.forceUpdate();
                    };
                }
                render() {
                    var windowSize = { width: window.innerWidth, height: window.innerHeight };
                    var assemblyListSize = 400;
                    var spacing = 0;
                    return React.createElement(frame_1.Frame, {width: windowSize.width, height: windowSize.height}, React.createElement(frame_1.Frame, {className: "f-assemblyList", width: assemblyListSize, height: windowSize.height}, React.createElement(assemblyList_1.AssemblyList, null)), React.createElement(frame_1.Frame, {className: "f-codeView", left: assemblyListSize + spacing, width: windowSize.width - assemblyListSize - spacing, height: windowSize.height}));
                }
            }
            exports_1("ILspectApp", ILspectApp);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvcm9vdC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFNQSx5QkFBZ0MsS0FBSyxDQUFDLFNBQVM7Z0JBQzNDLGlCQUFpQjtvQkFDYixNQUFNLENBQUMsUUFBUSxHQUFHLENBQUMsS0FBSzt3QkFDcEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUN2QixDQUFDLENBQUE7Z0JBQ0wsQ0FBQztnQkFDRCxNQUFNO29CQUNGLElBQUksVUFBVSxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQkFFMUUsSUFBSSxnQkFBZ0IsR0FBRyxHQUFHLENBQUM7b0JBQzNCLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztvQkFFaEIsTUFBTSxDQUFDLG9CQUFDLGFBQUssR0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLEtBQU0sRUFBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLE1BQU8sR0FDNUQsb0JBQUMsYUFBSyxHQUFDLFNBQVMsRUFBQyxnQkFBZ0IsRUFBQyxLQUFLLEVBQUUsZ0JBQWlCLEVBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxNQUFPLEdBQ2xGLG9CQUFDLDJCQUFZLE9BQUcsQ0FDWCxFQUNSLG9CQUFDLGFBQUssR0FBQyxTQUFTLEVBQUMsWUFBWSxFQUFDLElBQUksRUFBRSxnQkFBZ0IsR0FBRyxPQUFRLEVBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxLQUFLLEdBQUcsZ0JBQWdCLEdBQUcsT0FBUSxFQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsTUFBTyxFQUV4SSxDQUNMLENBQUE7Z0JBQ1osQ0FBQztZQUNMLENBQUM7WUFyQkQsbUNBcUJDLENBQUEiLCJmaWxlIjoiY29tcG9uZW50cy9yb290LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuXHJcbmltcG9ydCB7RnJhbWV9IGZyb20gJy4vbGF5b3V0L2ZyYW1lJztcclxuaW1wb3J0IHtBc3NlbWJseUxpc3R9IGZyb20gJy4vYXNzZW1ibHlMaXN0JztcclxuXHJcbmV4cG9ydCBjbGFzcyBJTHNwZWN0QXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PGFueSwgYW55PiB7XHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICB3aW5kb3cub25yZXNpemUgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICB2YXIgd2luZG93U2l6ZSA9IHsgd2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLCBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCB9O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBhc3NlbWJseUxpc3RTaXplID0gNDAwO1xyXG4gICAgICAgIHZhciBzcGFjaW5nID0gMDtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gPEZyYW1lIHdpZHRoPXt3aW5kb3dTaXplLndpZHRofSBoZWlnaHQ9e3dpbmRvd1NpemUuaGVpZ2h0fT5cclxuICAgICAgICAgICAgIDxGcmFtZSBjbGFzc05hbWU9XCJmLWFzc2VtYmx5TGlzdFwiIHdpZHRoPXthc3NlbWJseUxpc3RTaXplfSBoZWlnaHQ9e3dpbmRvd1NpemUuaGVpZ2h0fT5cclxuICAgICAgICAgICAgICAgIDxBc3NlbWJseUxpc3QgLz5cclxuICAgICAgICAgICAgIDwvRnJhbWU+XHJcbiAgICAgICAgICAgICA8RnJhbWUgY2xhc3NOYW1lPVwiZi1jb2RlVmlld1wiIGxlZnQ9e2Fzc2VtYmx5TGlzdFNpemUgKyBzcGFjaW5nfSB3aWR0aD17d2luZG93U2l6ZS53aWR0aCAtIGFzc2VtYmx5TGlzdFNpemUgLSBzcGFjaW5nfSBoZWlnaHQ9e3dpbmRvd1NpemUuaGVpZ2h0fT5cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgPC9GcmFtZT5cclxuICAgICAgICA8L0ZyYW1lPlxyXG4gICAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
