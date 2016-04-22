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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvd2lkZ2V0cy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQUVBLG1CQUEwQixLQUFLLENBQUMsU0FBUztnQkFDckMsTUFBTTtvQkFDRixJQUFJLFNBQVMsR0FBRyx1QkFBdUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDekQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO3dCQUN2QixTQUFTLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO29CQUM1QyxDQUFDO29CQUNELElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztvQkFFcEUsTUFBTSxDQUFDLHFCQUFDLElBQUksY0FBQyxXQUFXLEdBQUUsSUFBSyxHQUFNLEtBQUssRUFBSSxDQUFDO2dCQUNuRCxDQUFDO1lBQ0wsQ0FBQztZQVZELHVCQVVDLENBQUEiLCJmaWxlIjoiY29tcG9uZW50cy93aWRnZXRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgY2xhc3MgSWNvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxJSWNvblByb3BzLCBhbnk+IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHZhciBjbGFzc05hbWUgPSBgZ2x5cGhpY29uIGdseXBoaWNvbi0ke3RoaXMucHJvcHMubmFtZX1gO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5jbGFzc05hbWUpIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZSArPSBcIiBcIiArIHRoaXMucHJvcHMuY2xhc3NOYW1lO1xuICAgICAgICB9XG4gICAgICAgIHZhciBwcm9wcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMucHJvcHMsIHsgY2xhc3NOYW1lOiBjbGFzc05hbWUgfSk7XG5cbiAgICAgICAgcmV0dXJuIDxzcGFuIGFyaWEtaGlkZGVuPXt0cnVlfSB7Li4uIHByb3BzfSAvPjtcbiAgICB9XG59XG5cbmludGVyZmFjZSBJSWNvblByb3BzIGV4dGVuZHMgUmVhY3QuSFRNTEF0dHJpYnV0ZXMge1xuICAgIG5hbWU6IHN0cmluZ1xufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
