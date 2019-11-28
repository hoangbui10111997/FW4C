import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { ValidationRuleResponse } from 'ngx-fw4c';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ServiceTemplateService{
    constructor(private http: HttpClient) {}

    public validateName(name: string): Observable<ValidationRuleResponse> {
        const nameregex = /[A-Za-z0-9._-]$/;
        return of(new ValidationRuleResponse({
            status: nameregex.test(name),
            message: 'Name can\'t contain special charecter'
        }));
    }

    public validateNameService(name: string, data): Observable<ValidationRuleResponse> {
        var item = data.find(x => x.name == name);
        return of(new ValidationRuleResponse({
            status:!item,
            message:'Name must be unique'
        }));
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

    public validateTag(tags: string[]): Observable<ValidationRuleResponse> {
        const tagregex = /[A-Za-z0-9._-]$/;
        var tag = tags.filter(x => x && !tagregex.test(x));
        return of(new ValidationRuleResponse({
            status: tag.length < 1,
            message: 'Tag can\'t contain special character'
        }))
    }

    public validateTagSpace(tags: string): any {
        var tag = tags[tags.length - 1];
        if ((tag.indexOf(' ')) === -1) {
            return true
        } else {
            return false
        }
    }

    public validateCertificate(certificate: string): Observable<ValidationRuleResponse> {
        const cartificateregex = /[A-Za-z0-9-]$/;
        return of(new ValidationRuleResponse({
            status: cartificateregex.test(certificate) || certificate === null,
            message: 'Certificate invalid'
        }))
    }

    public validatePath(path: string): Observable<ValidationRuleResponse> {
        const pathregex = /[A-Za-z0-9/-]$/;
        return of(new ValidationRuleResponse({
            status: pathregex.test(path) && path.startsWith('/'),
            message: 'Path must start with /'
        }))
    }
}