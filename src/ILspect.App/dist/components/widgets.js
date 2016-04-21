System.register(['react'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
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
                    return React.createElement("span", {className: className, ariaHidden: true});
                }
            }
            exports_1("Icon", Icon);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvd2lkZ2V0cy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7WUFFQSxtQkFBMEIsS0FBSyxDQUFDLFNBQVM7Z0JBQ3JDLE1BQU07b0JBQ0YsSUFBSSxTQUFTLEdBQUcsdUJBQXVCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQ3pELE1BQU0sQ0FBQyxxQkFBQyxJQUFJLElBQUMsU0FBUyxFQUFFLFNBQVUsRUFBQyxVQUFVLEVBQUUsSUFBSyxFQUFHLENBQUM7Z0JBQzVELENBQUM7WUFDTCxDQUFDO1lBTEQsdUJBS0MsQ0FBQSIsImZpbGUiOiJjb21wb25lbnRzL3dpZGdldHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBjbGFzcyBJY29uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PElJY29uUHJvcHMsIGFueT4ge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIGNsYXNzTmFtZSA9IGBnbHlwaGljb24gZ2x5cGhpY29uLSR7dGhpcy5wcm9wcy5uYW1lfWA7XG4gICAgICAgIHJldHVybiA8c3BhbiBjbGFzc05hbWU9e2NsYXNzTmFtZX0gYXJpYUhpZGRlbj17dHJ1ZX0gLz47XG4gICAgfVxufVxuXG5pbnRlcmZhY2UgSUljb25Qcm9wcyB7XG4gICAgbmFtZTogc3RyaW5nXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
