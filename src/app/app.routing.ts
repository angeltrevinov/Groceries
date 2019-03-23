import {LoginComponent} from "~/app/pages/login/login.component";
import {ListComponent} from "~/app/pages/list/list.component";

export const routes = [
    { path: '', component: LoginComponent },
    { path: 'list', component: ListComponent}
];

export const navigatableComponents = [
    LoginComponent,
    ListComponent
];
