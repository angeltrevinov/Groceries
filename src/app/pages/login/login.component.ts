import { Component } from "@angular/core";
import {User} from "~/app/shared/user/user";
import {UserService} from "~/app/shared/user/user.service";
import {Router} from "@angular/router";

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
export class LoginComponent {

    /* Instance Variables */
    //------------------------------------------------------------------------------------------------------------------
    public user: User;
    public boolIsLoggingIn: boolean = true;

    constructor(
        private userService: UserService,
        private router: Router
    ) {
        this.user = new User();
        this.user.email = 'angel@mail.com'
        this.user.password = 'p';
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
        this.userService.login(this.user)
            .subscribe(
                () => this.router.navigate(['/list']),
                (error) => alert('Unfortunately we could not find your account.')
            );
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
