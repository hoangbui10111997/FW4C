import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { ValidationRuleResponse } from 'ngx-fw4c';
import { HttpClient } from '@angular/common/http';
import { Service } from '../service.model';

@Injectable({
    providedIn: 'root'
})
export class ServiceTemplateService{
    constructor(private http: HttpClient) {}

    public validateName(name: string): Observable<ValidationRuleResponse> {
        const nameregex = /[A-Za-z0-9._-]$/;
        return of(new ValidationRuleResponse({
            status: nameregex.test(name),
            message: 'Name can\'t contain \\ / : * ? \" < > | \''
        }));
    }

    public validateNameService(name: string, data): Observable<ValidationRuleResponse> {
        var item = data.find(x => x.name == name);
        return of(new ValidationRuleResponse({
            status:!item,
            message:'Name must be unique'
        }));
    }

    public validateInlineNameService(name, data): Observable<ValidationRuleResponse> {
        var item = data.filter(x => x.name == name);
        return of(new ValidationRuleResponse({
            status:(item.length) <= 1,
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

    public validateHostEnd(host: string): Observable<ValidationRuleResponse> {
        return of(new ValidationRuleResponse({
            status: !(host.endsWith('-')),
            message: 'Host invalid'
        }))
    }

    public validateTag(tags: string[]): Observable<ValidationRuleResponse> {
        const tagregex = /[A-Za-z0-9._-]$/;
        var tag = tags.filter(x => x && !tagregex.test(x));
        return of(new ValidationRuleResponse({
            status: tag.length < 1,
            message: 'Tag can\'t contain \\ / : * ? \" < > | \''
        }))
    }

    public validateTagSpace(tags: string[]): any {
        var tag = tags.find(x=>x.indexOf(' ') != -1); 
        if(tag) return false;
        else return true;
    }

    public validatePath(path: string): Observable<ValidationRuleResponse> {
        const pathregex = /[A-Za-z0-9/-]$/;
        return of(new ValidationRuleResponse({
            status: pathregex.test(path) && path.startsWith('/'),
            message: 'Path must start with /'
        }))
    }
}