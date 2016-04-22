System.register(['react'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __assign = (this && this.__assign) || Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    var React;
    var Icon;
    return {
        setters:[
            function (React_1) {
                React = React_1;
            }],
        execute: function() {
            class Icon extends React.Component {
                render() {
                    var className = `glyphicon glyphicon-${this.props.name}`;
                    if (this.props.className) {
                        className += " " + this.props.className;
                    }
                    var props = Object.assign({}, this.props, { className: className });
                    return React.createElement("span", __assign({"aria-hidden": true}, props));
                }
            }
            exports_1("Icon", Icon);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvd2lkZ2V0cy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQUVBLG1CQUEwQixLQUFLLENBQUMsU0FBUztnQkFDckMsTUFBTTtvQkFDRixJQUFJLFNBQVMsR0FBRyx1QkFBdUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDekQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO3dCQUN2QixTQUFTLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO29CQUM1QyxDQUFDO29CQUNELElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztvQkFFcEUsTUFBTSxDQUFDLHFCQUFDLElBQUksY0FBQyxXQUFXLEdBQUUsSUFBSyxHQUFNLEtBQUssRUFBSSxDQUFDO2dCQUNuRCxDQUFDO1lBQ0wsQ0FBQztZQVZELHVCQVVDLENBQUEiLCJmaWxlIjoiY29tcG9uZW50cy93aWRnZXRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEljb24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8SUljb25Qcm9wcywgYW55PiB7XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgdmFyIGNsYXNzTmFtZSA9IGBnbHlwaGljb24gZ2x5cGhpY29uLSR7dGhpcy5wcm9wcy5uYW1lfWA7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZSArPSBcIiBcIiArIHRoaXMucHJvcHMuY2xhc3NOYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcHJvcHMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnByb3BzLCB7IGNsYXNzTmFtZTogY2xhc3NOYW1lIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gPHNwYW4gYXJpYS1oaWRkZW49e3RydWV9IHsuLi4gcHJvcHN9IC8+O1xyXG4gICAgfVxyXG59XHJcblxyXG5pbnRlcmZhY2UgSUljb25Qcm9wcyBleHRlbmRzIFJlYWN0LkhUTUxBdHRyaWJ1dGVzIHtcclxuICAgIG5hbWU6IHN0cmluZ1xyXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
