"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var config_1 = require("../config");
var grocery_1 = require("./grocery");
var GroceryListService = /** @class */ (function () {
    function GroceryListService(http) {
        this.http = http;
        this.baseUrl = config_1.Config.apiUrl + "appdata/" + config_1.Config.appKey + "/Groceries";
    }
    GroceryListService.prototype.load = function () {
        return this.http.get(this.baseUrl, {
            headers: this.getCommonHeaders()
        })
            .pipe(operators_1.map(function (data) {
            var groceryList = data
                .sort(function (a, b) {
                return a._kmd.lmt > b._kmd.lmt ? -1 : 1;
            })
                .map(function (grocery) { return new grocery_1.Grocery(grocery._id, grocery.Name); });
            return groceryList;
        }), operators_1.catchError(this.handleErrors));
    };
    GroceryListService.prototype.add = function (name) {
        return this.http.post(this.baseUrl, JSON.stringify({ Name: name }), { headers: this.getCommonHeaders() })
            .pipe(operators_1.map(function (data) {
            return new grocery_1.Grocery(data._id, name);
        }), operators_1.catchError(this.handleErrors));
    };
    GroceryListService.prototype.getCommonHeaders = function () {
        return new http_1.HttpHeaders({
            "Content-Type": "application/json",
            "Authorization": "Kinvey " + config_1.Config.token,
        });
    };
    GroceryListService.prototype.handleErrors = function (error) {
        console.log(error);
        return rxjs_1.throwError(error);
    };
    GroceryListService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], GroceryListService);
    return GroceryListService;
}());
exports.GroceryListService = GroceryListService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvY2VyeS1saXN0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJncm9jZXJ5LWxpc3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUMzQyw2Q0FBa0Y7QUFFbEYsNkJBQWtDO0FBQ2xDLDRDQUFpRDtBQUVqRCxvQ0FBbUM7QUFDbkMscUNBQW9DO0FBR3BDO0lBSUksNEJBQW9CLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7UUFGNUIsWUFBTyxHQUFHLGVBQU0sQ0FBQyxNQUFNLEdBQUcsVUFBVSxHQUFHLGVBQU0sQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDO0lBRXBDLENBQUM7SUFFbEMsaUNBQUksR0FBWDtRQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUMvQixPQUFPLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFO1NBQ25DLENBQUM7YUFDRyxJQUFJLENBQ0QsZUFBRyxDQUFDLFVBQUMsSUFBVztZQUVaLElBQU0sV0FBVyxHQUFHLElBQUk7aUJBQ25CLElBQUksQ0FBQyxVQUFDLENBQUMsRUFBRSxDQUFDO2dCQUNQLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUMsQ0FBQyxDQUFDO2lCQUNELEdBQUcsQ0FDQSxVQUFBLE9BQU8sSUFBSSxPQUFBLElBQUksaUJBQU8sQ0FDbEIsT0FBTyxDQUFDLEdBQUcsRUFDWCxPQUFPLENBQUMsSUFBSSxDQUNmLEVBSFUsQ0FHVixDQUNKLENBQUM7WUFDTixPQUFPLFdBQVcsQ0FBQztRQUN2QixDQUFDLENBQUMsRUFDRixzQkFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FDaEMsQ0FBQztJQUNWLENBQUM7SUFFTSxnQ0FBRyxHQUFWLFVBQVcsSUFBWTtRQUNuQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUNqQixJQUFJLENBQUMsT0FBTyxFQUNaLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFDOUIsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FDdkM7YUFDSSxJQUFJLENBQ0QsZUFBRyxDQUFDLFVBQUMsSUFBUztZQUNWLE9BQU8sSUFBSSxpQkFBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdkMsQ0FBQyxDQUFDLEVBQ0Ysc0JBQVUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQ2hDLENBQUM7SUFDVixDQUFDO0lBRU8sNkNBQWdCLEdBQXhCO1FBQ0ksT0FBTyxJQUFJLGtCQUFXLENBQUM7WUFDbkIsY0FBYyxFQUFFLGtCQUFrQjtZQUNsQyxlQUFlLEVBQUUsU0FBUyxHQUFHLGVBQU0sQ0FBQyxLQUFLO1NBQzVDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTyx5Q0FBWSxHQUFwQixVQUFxQixLQUF3QjtRQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25CLE9BQU8saUJBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBckRRLGtCQUFrQjtRQUQ5QixpQkFBVSxFQUFFO3lDQUtpQixpQkFBVTtPQUozQixrQkFBa0IsQ0F1RDlCO0lBQUQseUJBQUM7Q0FBQSxBQXZERCxJQXVEQztBQXZEWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cEVycm9yUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbmltcG9ydCB7IHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgY2F0Y2hFcnJvciB9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xuXG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICcuLi9jb25maWcnO1xuaW1wb3J0IHsgR3JvY2VyeSB9IGZyb20gJy4vZ3JvY2VyeSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBHcm9jZXJ5TGlzdFNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSBiYXNlVXJsID0gQ29uZmlnLmFwaVVybCArIFwiYXBwZGF0YS9cIiArIENvbmZpZy5hcHBLZXkgKyBcIi9Hcm9jZXJpZXNcIjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkgeyB9XG5cbiAgICBwdWJsaWMgbG9hZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5iYXNlVXJsLCB7XG4gICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmdldENvbW1vbkhlYWRlcnMoKVxuICAgICAgICB9KVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKChkYXRhOiBhbnlbXSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGdyb2NlcnlMaXN0ID0gZGF0YVxuICAgICAgICAgICAgICAgICAgICAgICAgLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYS5fa21kLmxtdCA+IGIuX2ttZC5sbXQgPyAtMSA6IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1hcChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm9jZXJ5ID0+IG5ldyBHcm9jZXJ5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm9jZXJ5Ll9pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvY2VyeS5OYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdyb2NlcnlMaXN0O1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcnMpXG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGQobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChcbiAgICAgICAgICAgIHRoaXMuYmFzZVVybCxcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHsgTmFtZTogbmFtZSB9KSxcbiAgICAgICAgICAgIHsgaGVhZGVyczogdGhpcy5nZXRDb21tb25IZWFkZXJzKCkgfVxuICAgICAgICApXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBtYXAoKGRhdGE6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEdyb2NlcnkoZGF0YS5faWQsIG5hbWUpO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcnMpXG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Q29tbW9uSGVhZGVycygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBIdHRwSGVhZGVycyh7XG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIFwiQXV0aG9yaXphdGlvblwiOiBcIktpbnZleSBcIiArIENvbmZpZy50b2tlbixcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVFcnJvcnMoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyb3IpO1xuICAgIH1cblxufSJdfQ==