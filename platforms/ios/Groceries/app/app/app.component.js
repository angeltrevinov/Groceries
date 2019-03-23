"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var user_1 = require("~/app/shared/user/user");
var user_service_1 = require("~/app/shared/user/user.service");
var AppComponent = /** @class */ (function () {
    function AppComponent(userService) {
        this.userService = userService;
        this.boolIsLoggingIn = true;
        this.user = new user_1.User();
    }
    //------------------------------------------------------------------------------------------------------------------
    AppComponent.prototype.submit = function () {
        if (this.boolIsLoggingIn) {
            this.login();
        }
        else {
            this.signUp();
        }
    };
    //------------------------------------------------------------------------------------------------------------------
    AppComponent.prototype.toggleDisplay = function () {
        this.boolIsLoggingIn = !this.boolIsLoggingIn;
    };
    //------------------------------------------------------------------------------------------------------------------
    AppComponent.prototype.login = function () {
    };
    AppComponent.prototype.signUp = function () {
        var _this = this;
        this.userService.register(this.user)
            .subscribe(function () {
            alert('Your account was successfully created.');
            _this.toggleDisplay();
        }, function () { return alert('Unfortunately we were unable to create your account.'); });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: "gr-main",
            providers: [user_service_1.UserService],
            templateUrl: 'app/pages/login/login.component.html',
            styleUrls: [
                'app/pages/login/login-common.css',
                'app/pages/login/login.css'
            ]
        })
        //======================================================================================================================
        ,
        __metadata("design:paramtypes", [user_service_1.UserService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//======================================================================================================================
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFDMUMsK0NBQTRDO0FBQzVDLCtEQUEyRDtBQVkzRDtJQU9JLHNCQUNZLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBSDdCLG9CQUFlLEdBQVksSUFBSSxDQUFDO1FBS25DLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxXQUFJLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsb0hBQW9IO0lBQzdHLDZCQUFNLEdBQWI7UUFDSSxJQUFHLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDckIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2hCO2FBQU07WUFDSCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDakI7SUFDTCxDQUFDO0lBQ0Qsb0hBQW9IO0lBQzdHLG9DQUFhLEdBQXBCO1FBQ0ksSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDakQsQ0FBQztJQUNELG9IQUFvSDtJQUM1Ryw0QkFBSyxHQUFiO0lBRUEsQ0FBQztJQUNPLDZCQUFNLEdBQWQ7UUFBQSxpQkFTQztRQVJHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDL0IsU0FBUyxDQUNOO1lBQ0ksS0FBSyxDQUFDLHdDQUF3QyxDQUFDLENBQUM7WUFDaEQsS0FBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3pCLENBQUMsRUFDRCxjQUFNLE9BQUEsS0FBSyxDQUFDLHNEQUFzRCxDQUFDLEVBQTdELENBQTZELENBQ3RFLENBQUM7SUFDVixDQUFDO0lBdENRLFlBQVk7UUFWeEIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxTQUFTO1lBQ25CLFNBQVMsRUFBRSxDQUFDLDBCQUFXLENBQUM7WUFDeEIsV0FBVyxFQUFFLHNDQUFzQztZQUNuRCxTQUFTLEVBQUU7Z0JBQ1Asa0NBQWtDO2dCQUNsQywyQkFBMkI7YUFDOUI7U0FDSixDQUFDO1FBQ0Ysd0hBQXdIOzt5Q0FTM0YsMEJBQVc7T0FSM0IsWUFBWSxDQXVDeEI7SUFBRCxtQkFBQztDQUFBLEFBdkNELElBdUNDO0FBdkNZLG9DQUFZO0FBd0N6Qix3SEFBd0giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtVc2VyfSBmcm9tIFwifi9hcHAvc2hhcmVkL3VzZXIvdXNlclwiO1xuaW1wb3J0IHtVc2VyU2VydmljZX0gZnJvbSBcIn4vYXBwL3NoYXJlZC91c2VyL3VzZXIuc2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJnci1tYWluXCIsXG4gICAgcHJvdmlkZXJzOiBbVXNlclNlcnZpY2VdLFxuICAgIHRlbXBsYXRlVXJsOiAnYXBwL3BhZ2VzL2xvZ2luL2xvZ2luLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFtcbiAgICAgICAgJ2FwcC9wYWdlcy9sb2dpbi9sb2dpbi1jb21tb24uY3NzJyxcbiAgICAgICAgJ2FwcC9wYWdlcy9sb2dpbi9sb2dpbi5jc3MnXG4gICAgXVxufSlcbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCB7XG5cbiAgICAvKiBJbnN0YW5jZSBWYXJpYWJsZXMgKi9cbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIHB1YmxpYyB1c2VyOiBVc2VyO1xuICAgIHB1YmxpYyBib29sSXNMb2dnaW5nSW46IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIHRoaXMudXNlciA9IG5ldyBVc2VyKCk7XG4gICAgfVxuXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICBwdWJsaWMgc3VibWl0KCkge1xuICAgICAgICBpZih0aGlzLmJvb2xJc0xvZ2dpbmdJbikge1xuICAgICAgICAgICAgdGhpcy5sb2dpbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zaWduVXAoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIHB1YmxpYyB0b2dnbGVEaXNwbGF5KCkge1xuICAgICAgICB0aGlzLmJvb2xJc0xvZ2dpbmdJbiA9ICF0aGlzLmJvb2xJc0xvZ2dpbmdJbjtcbiAgICB9XG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICBwcml2YXRlIGxvZ2luKCkge1xuXG4gICAgfVxuICAgIHByaXZhdGUgc2lnblVwKCkge1xuICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlLnJlZ2lzdGVyKHRoaXMudXNlcilcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhbGVydCgnWW91ciBhY2NvdW50IHdhcyBzdWNjZXNzZnVsbHkgY3JlYXRlZC4nKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b2dnbGVEaXNwbGF5KCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAoKSA9PiBhbGVydCgnVW5mb3J0dW5hdGVseSB3ZSB3ZXJlIHVuYWJsZSB0byBjcmVhdGUgeW91ciBhY2NvdW50LicpXG4gICAgICAgICAgICApO1xuICAgIH1cbn1cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuIl19