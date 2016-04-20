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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvcm9vdC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFNQSx5QkFBZ0MsS0FBSyxDQUFDLFNBQVM7Z0JBQzNDLGlCQUFpQjtvQkFDYixNQUFNLENBQUMsUUFBUSxHQUFHLENBQUMsS0FBSzt3QkFDcEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUN2QixDQUFDLENBQUE7Z0JBQ0wsQ0FBQztnQkFDRCxNQUFNO29CQUNGLElBQUksVUFBVSxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQkFFMUUsSUFBSSxnQkFBZ0IsR0FBRyxHQUFHLENBQUM7b0JBQzNCLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztvQkFFaEIsTUFBTSxDQUFDLG9CQUFDLGFBQUssR0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLEtBQU0sRUFBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLE1BQU8sR0FDNUQsb0JBQUMsYUFBSyxHQUFDLFNBQVMsRUFBQyxnQkFBZ0IsRUFBQyxLQUFLLEVBQUUsZ0JBQWlCLEVBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxNQUFPLEdBQ2xGLG9CQUFDLDJCQUFZLE9BQUcsQ0FDWCxFQUNSLG9CQUFDLGFBQUssR0FBQyxTQUFTLEVBQUMsWUFBWSxFQUFDLElBQUksRUFBRSxnQkFBZ0IsR0FBRyxPQUFRLEVBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxLQUFLLEdBQUcsZ0JBQWdCLEdBQUcsT0FBUSxFQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsTUFBTyxFQUV4SSxDQUNMLENBQUE7Z0JBQ1osQ0FBQztZQUNMLENBQUM7WUFyQkQsbUNBcUJDLENBQUEiLCJmaWxlIjoiY29tcG9uZW50cy9yb290LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7RnJhbWV9IGZyb20gJy4vbGF5b3V0L2ZyYW1lJztcbmltcG9ydCB7QXNzZW1ibHlMaXN0fSBmcm9tICcuL2Fzc2VtYmx5TGlzdCc7XG5cbmV4cG9ydCBjbGFzcyBJTHNwZWN0QXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PGFueSwgYW55PiB7XG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHdpbmRvdy5vbnJlc2l6ZSA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIHdpbmRvd1NpemUgPSB7IHdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCwgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgfTtcbiAgICAgICAgXG4gICAgICAgIHZhciBhc3NlbWJseUxpc3RTaXplID0gNDAwO1xuICAgICAgICB2YXIgc3BhY2luZyA9IDA7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gPEZyYW1lIHdpZHRoPXt3aW5kb3dTaXplLndpZHRofSBoZWlnaHQ9e3dpbmRvd1NpemUuaGVpZ2h0fT5cbiAgICAgICAgICAgICA8RnJhbWUgY2xhc3NOYW1lPVwiZi1hc3NlbWJseUxpc3RcIiB3aWR0aD17YXNzZW1ibHlMaXN0U2l6ZX0gaGVpZ2h0PXt3aW5kb3dTaXplLmhlaWdodH0+XG4gICAgICAgICAgICAgICAgPEFzc2VtYmx5TGlzdCAvPlxuICAgICAgICAgICAgIDwvRnJhbWU+XG4gICAgICAgICAgICAgPEZyYW1lIGNsYXNzTmFtZT1cImYtY29kZVZpZXdcIiBsZWZ0PXthc3NlbWJseUxpc3RTaXplICsgc3BhY2luZ30gd2lkdGg9e3dpbmRvd1NpemUud2lkdGggLSBhc3NlbWJseUxpc3RTaXplIC0gc3BhY2luZ30gaGVpZ2h0PXt3aW5kb3dTaXplLmhlaWdodH0+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgPC9GcmFtZT5cbiAgICAgICAgPC9GcmFtZT5cbiAgICB9XG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
