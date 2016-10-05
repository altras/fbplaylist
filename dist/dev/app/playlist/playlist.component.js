"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var PlaylistComponent = (function () {
    function PlaylistComponent(router, route) {
        this.router = router;
        this.route = route;
    }
    PlaylistComponent.prototype.ngOnInit = function () {
        var queryParams = this.route.queryParams;
        this.link = queryParams.getValue().link;
    };
    PlaylistComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'sd-playlist',
            templateUrl: 'playlist.component.html',
            styleUrls: ['playlist.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute])
    ], PlaylistComponent);
    return PlaylistComponent;
}());
exports.PlaylistComponent = PlaylistComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9wbGF5bGlzdC9wbGF5bGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUFrQyxlQUFlLENBQUMsQ0FBQTtBQUNsRCx1QkFBdUMsaUJBQWlCLENBQUMsQ0FBQTtBQVd6RDtJQUdFLDJCQUFvQixNQUFjLEVBQVUsS0FBcUI7UUFBN0MsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWdCO0lBQUcsQ0FBQztJQUVyRSxvQ0FBUSxHQUFSO1FBQ0UsSUFBSSxXQUFXLEdBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUM7UUFDOUMsSUFBSSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFBO0lBQ3pDLENBQUM7SUFkSDtRQUFDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGFBQWE7WUFDdkIsV0FBVyxFQUFFLHlCQUF5QjtZQUN0QyxTQUFTLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztTQUN0QyxDQUFDOzt5QkFBQTtJQVdGLHdCQUFDO0FBQUQsQ0FWQSxBQVVDLElBQUE7QUFWWSx5QkFBaUIsb0JBVTdCLENBQUEiLCJmaWxlIjoiYXBwL3BsYXlsaXN0L3BsYXlsaXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuLyoqXG4gKiBUaGlzIGNsYXNzIHJlcHJlc2VudHMgdGhlIGxhenkgbG9hZGVkIFBsYXlsaXN0Q29tcG9uZW50LlxuICovXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdzZC1wbGF5bGlzdCcsXG4gIHRlbXBsYXRlVXJsOiAncGxheWxpc3QuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsncGxheWxpc3QuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFBsYXlsaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBsaW5rOiBzdHJpbmc7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGxldCBxdWVyeVBhcmFtczogYW55ID0gdGhpcy5yb3V0ZS5xdWVyeVBhcmFtcztcbiAgICB0aGlzLmxpbmsgPSBxdWVyeVBhcmFtcy5nZXRWYWx1ZSgpLmxpbmtcbiAgfVxuXG59XG4iXX0=
