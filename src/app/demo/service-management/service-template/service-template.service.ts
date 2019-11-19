import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { ValidationRuleResponse } from 'ngx-fw4c';

@Injectable({
    providedIn: 'root'
})
export class ServiceTemplateService{
    public validateName(name: string): Observable<ValidationRuleResponse> {
        const nameregex = /[A-Za-z0-9 _ -]$/;
        return of(new ValidationRuleResponse({
            status: nameregex.test(name),
            message: 'Name can\'t contain special character'
        }))
    }

    public validateHost(host: string): Observable<ValidationRuleResponse> {
        const hostregex = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/;
        const ipregex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
        const nameregex = /[A-Za-z0-9-]$/;
        return of(new ValidationRuleResponse({
            status: hostregex.test(host) || ipregex.test(host) || nameregex.test(host),
            message: 'Host invalid'
        }))
    }

    public validateTag(tag: string): Observable<ValidationRuleResponse> {
        const tagregex = /[A-Za-z0-9 _ -]$/;
        return of(new ValidationRuleResponse({
            status: tagregex.test(tag),
            message: 'Tag can\'t contain special character'
        }))
    }

    public validateCertificate(certificate: string): Observable<ValidationRuleResponse> {
        const cartificateregex = /[A-Za-z0-9 -]$/;
        return of(new ValidationRuleResponse({
            status: cartificateregex.test(certificate),
            message: 'Certificate invalid'
        }))
    }
}