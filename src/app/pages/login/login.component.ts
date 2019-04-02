import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {User} from "~/app/shared/user/user";
import {UserService} from "~/app/shared/user/user.service";
import {Router} from "@angular/router";
import {Color, Page, View} from "ui/page";
import {TextField} from "ui/text-field";
import {setHintColor} from "~/app/utils/hint-util";

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
export class LoginComponent implements OnInit {

    /* Instance Variables */
    //------------------------------------------------------------------------------------------------------------------
    public user: User;
    public boolIsLoggingIn: boolean = true;
    @ViewChild('container') container: ElementRef;
    @ViewChild('email') email: ElementRef;
    @ViewChild('password') password: ElementRef;

    //------------------------------------------------------------------------------------------------------------------
    constructor(
        private userService: UserService,
        private router: Router,
        private page: Page
    ) {
        this.user = new User();
        this.user.email = 'angel@mail.com'
        this.user.password = 'p';
    }
    //------------------------------------------------------------------------------------------------------------------
    ngOnInit() {
        this.page.actionBarHidden = true;
        this.page.backgroundImage = 'res://bg_login';
    }
    //------------------------------------------------------------------------------------------------------------------
    public submit() {
        if(
            !this.user.isValidEmail()
        ){
            alert('Enter a valid email address');
            return;
        }

        if(this.boolIsLoggingIn) {
            this.login();
        } else {
            this.signUp();
        }
    }
    //------------------------------------------------------------------------------------------------------------------
    public toggleDisplay() {
        this.boolIsLoggingIn = !this.boolIsLoggingIn;
        this.setTextFieldColors();
        const container = <View>this.container.nativeElement;
        container.animate({
            backgroundColor: this.boolIsLoggingIn ? new Color('white') : new Color('#301217'),
            duration: 200
        });
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

    private setTextFieldColors() {
        const emailTextField = <TextField>this.email.nativeElement;
        const passwordTextField = <TextField>this.password.nativeElement;

        const mainTextColor = new Color(this.boolIsLoggingIn ? 'black' : '#C4AFB4');
        emailTextField.color = mainTextColor;
        passwordTextField.color = mainTextColor;

        const hintColor = new Color(this.boolIsLoggingIn ? '#ACA6A7' : '#C4AFB4');
        setHintColor({ view: emailTextField, color: hintColor });
        setHintColor({ view: passwordTextField, color: hintColor });
    }
}
//======================================================================================================================
