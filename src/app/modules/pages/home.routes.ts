import { Routes } from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { ContactComponent } from "./contact/contact.component";
import { FranchiseComponent } from "./franchise/franchise.component";
import { HomeComponent } from "./home/home.component";
import { PrivacyComponent } from "./privacy/privacy.component";
import { TermsComponent } from "./terms/terms.component";
import { PagesComponent } from "./pages.component";
import { EligibilityCheckerComponent } from "../../shared/layouts/eligibility-checker/eligibility-checker.component";

export const HOME_ROUTES: Routes = [
  {
    path: '', component: PagesComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'franchise', component: FranchiseComponent },
      { path: 'privacy', component: PrivacyComponent },
      { path: 'terms', component: TermsComponent },
      { path: 'eligibility-checker', component: EligibilityCheckerComponent },

    ]
  }
];
