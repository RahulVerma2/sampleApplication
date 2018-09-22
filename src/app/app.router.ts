import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './component/cart/cart.component';
import { ContentComponent } from './component/content/content.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { OrderConfirmationComponent } from './component/order-confirmation/order-confirmation.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { TrackOrderComponent } from './component/track-order/track-order.component';
import { AboutUsComponent } from './component/about-us/about-us.component';
import { FeedbackComponent } from './component/feedback/feedback.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'content',
        pathMatch: 'full'
    },
    {
        path: 'cart',
        component: CartComponent
    },
    {
        path: 'content',
        component: ContentComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'orderConfirmation',
        component: OrderConfirmationComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'forgotPassword',
        component: ForgotPasswordComponent
    },
    {
        path: 'trackOrder',
        component: TrackOrderComponent
    },
    {
        path: 'aboutUs',
        component: AboutUsComponent
    },
    {
        path: 'feedback',
        component: FeedbackComponent
    }

    
    
    
    

    

];


export const routes: ModuleWithProviders = RouterModule.forRoot(appRoutes);