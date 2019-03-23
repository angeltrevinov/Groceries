import { Component } from "@angular/core";
import {User} from "~/app/shared/user/user";
import {UserService} from "~/app/shared/user/user.service";

@Component({
    selector: "gr-main",
    providers: [UserService],
    templateUrl: 'app/pages/login/login.component.html',
    styleUrls: [
        'app/pages/login/login-common.css',
        'app/pages/login/login.css'
    ]
})
//======================================================================================================================
export class AppComponent {

    /* Instance Variables */
    //------------------------------------------------------------------------------------------------------------------
    public user: User;
    public boolIsLoggingIn: boolean = true;

    constructor(
        private userService: UserService
    ) {
        this.user = new User();
    }

    //------------------------------------------------------------------------------------------------------------------
    public submit() {
        if(this.boolIsLoggingIn) {
            this.login();
        } else {
            this.signUp();
        }
    }
    //------------------------------------------------------------------------------------------------------------------
    public toggleDisplay() {
        this.boolIsLoggingIn = !this.boolIsLoggingIn;
    }
    //------------------------------------------------------------------------------------------------------------------
    private login() {

    }
    private signUp() {
        this.userService.register(this.user)
            .subscribe(
                () => {
                    alert('Your account was successfully created.');
                    this.toggleDisplay();
                },
                () => alert('Unfortunately we were unable to create your account.')
            );
    }
}
//======================================================================================================================
