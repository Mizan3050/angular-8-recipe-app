# Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

# Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

# Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

# Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

# What is Angular?

`Angular` is a `javascript Framework` which allows you to create reactive `Single-Page-Applications (SPAs)`.
Its only one HTML file and bunch of JS code we got from the server and everything which you see here, every change, 
is rendered in the browser. This is more reactive because JS is much faster than having to reach out a server for every page change and for every new piece of data you want to display.
How its done ?? JS changes the DOM....!!!!

NodeJS will be used behind the scenes by angular-CLI to bundle and optimize our project and will use NPM the node package manager to manage two different dependencies
 and angular project test dependencies are things like the angular framework itself but also some other libraries.


# How an Angular App gets Loaded and Started
It's started with the main.ts file. 
```angular2
platformBrowserDynamic().bootstrapModule(Appmodule); 
```

with this line, it will call `app.module.ts(Appmodule)` .
In this class, we configured the application and passed our components.

Angular uses components to build web pages and uses modules to basically bundle different pieces,
for example components of your app into packages.

# Working with Component Templates

If you want to use inline Component template instead of external html file, 
please change `templeteUrl` to `template` from `@Component` decorator in Typescript file.
And give the desired html content with back tick for template value. 

# Working with Component Templates
As you do for template, you can apply similar techniques.
Use `style` instead of `styleUrls` and give desired css content inside `array []`.

#Databinding

Databinding means basically communication between your TypeScript code of your component,
your business logic and the template. There are different ways of communication.

##Output Data
- String Interpolation ``` {{data}}```
- Property Binding ``` [property]="data" ```
<br>
Ex : ``` [disabled]="!someBooleanField"  ```

##React to (User) Events
- Event Binding ``` (event)="update($event)" ```

`$event` super important is kind of a reserved variable name
you can use in the template when using event binding. 

##Combination of Both
Two-Way-Binding ``` [(ngModel)] = "data" ```

When should you use which of the two?

Well basically if you want to output something in your template, print some text to it, use string interpolation,
if you want to change some property, be that of a HTML element or as you will later learn, of a directive or a component, typically use property binding,

Important: FormsModule is Required for Two-Way-Binding!
You need to enable the ```ngModel```  directive. This is done by adding the ```FormsModule```  to the ```imports[]```  array in the ```AppModule```.

# Directives
`ng-model` : Two-way Data Binding

`*ngIf` : If Conditional

The star `*` is required because `ngIf` is a structural directive which means it changes the structure
of our `DOM`, it either adds this element or it doesn't add it.
An example for ngIf with else statement:
```angular2 
<p *ngIf="serverCreated; else noServer">Server was created, Server Name is {{serverName}}</p>
<ng-template #noServer>
    <p No Server was created!!</p>
</ng-template>
``` 

`[ngStyle]` : Dynamic Styling
<br>
`[ngClass]` : Dynamic Styling with Class
```angular2
<p
  [ngStyle]="{backgroundColor : getColor()}"
  [ngClass]="{online: serverStatus === 'online'}"
>
  Server with ID {{serverId}} is {{getServerStatus()}}!
</p>
```
`*ngFor` : Looping
```angular2
<app-server *ngFor="let server of servers"></app-server>
```

`ngSwitch` : Switch-Case Operation
- let's say value is 10 in .ts file.
```angular2
<div [ngSwitch]="value">
<p *ngSwitchCase="5">5</p>
<p *ngSwitchCase="10">10</p>
<p *ngSwitchCase="100">100</p>
<p *ngSwitchDefault>Deafult</p>
</div>
```

## Attribute vs Structural
Attribute directives are called like this because they sit
on elements, just like attributes and structural directives basically do the same
but they also change the structure of the DOM around this element.

### Attribute
- looks like a normal HTML attribute (possibly with databinding or event binding)
- only affect/change the element they are added to

### Structural
- looks like a normal HTML attribute but have a leading `*` (for desugaring)
- affect q whole area in the DOM (elements get added/removed)


!!! IMPORTANT
You can't have more than one structural directives on the same element.

## Basic Custom Directive
```angular2
@Directive({
  selector: '[appBasicHighLight]'
})
export class BasicHighlightDirective implements OnInit {
  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.elementRef.nativeElement.style.backgroundColor = 'green';
  }
}
```
```html
 <p appBasicHighLight>Style me with directive</p>
```

## Better Custom Directive
```angular2
@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {

  }

  ngOnInit(): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'red');
  }

}
```
```html
 <p appBetterHighlight>Style me with directive</p>
```
 ### So, what is difference ??
Angular is not limited to running in the browser here,
it for example also works with service workers
and these are environments where you might not have access to the DOM.
So if you try to change the DOM as you did here in basic highlight by directly accessing the native
element and the style of this element, you might get an error in some circumstances.

## HostListener to Listen Host Events
```angular2
  
  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'red');
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'transparent');
  }
```

## HostBinding to Bind to Host Properties
"camelCase is important!!"
```angular2
  @HostBinding('style.backgroundColor') backgroundColor = 'transparent';

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {

  }

  ngOnInit(): void {
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'red');
    this.backgroundColor = 'blue';
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'transparent');
    this.backgroundColor = 'transparent';
  }
```

## Binding to Directive Properties
```angular2
export class BetterHighlightDirective implements OnInit {

  @Input() defaultColor = 'transparent';
  @Input() highlightColor = 'blue';
```
```html
      <p appBetterHighlight [defaultColor]="'transparent'" [highlightColor]="'yellow'">Style me with better
        directive</p>
```
## Building a Structural Directive

- Add @input() to use property binding with the square brackets because Angular transforms it for us.
- Bind to a property named appUnless (name should be same with the selector), 
which kind of simply is the condition we get but whenever this condition changes, it executes a the method
- Implement a setter with the set keyword
- unless directive here in the end will sit on such an ng-template component because 
that is what it gets transformed to by Angular the star is used.


```angular2
@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {

  @Input() set appUnless(condition: boolean) {
    if (!condition) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }

  constructor(private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) {
  }

}

```

```html
        <div *appUnless="onlyOdd">
          <li
            class="list-group-item"
            *ngFor="let even of evenNumbers"
            [ngClass]="{odd: even %2 !==0}"
            [ngStyle]="{backgroundColor: even %2 !==0 ? 'yellow':'transparent'}">
            {{even}}
          </li>
        </div>
```

# What is an @Input/@Output ?
`@input` gives the ability to make your properties bindable from outside, from the parent component using this component and 
the same for `@output` which allows parent components using this component to listen to your own events which you created with new eventEmitter.

@Input() and @Output() can be used with an alias instead of using the property name for the decorators.
```angular2
class ProductImage {
    //Aliased
    @Input('myProduct') product: string;

    //Un-aliased
    @Input() product: string;//not aliased
  }
```
```html
//Aliased attribute
<SomeComponent [myProduct] = "Product Name"></SomeComponent>

//Un-aliased attribute
<SomeComponent [product] = "Product Name"></SomeComponent>
```

#Local Reference
A local reference can be placed on any HTML element, 
so not only on an input element, on anything you see here in the template and you add with a #
and then a name of your choice, like for example server name since this is what this reference will
hold, a reference to this element. It is a very nice feature to get access to some elements in your template 
and then use that either directly in the template, not in TypeScript. 
```html
<input type="text" class="something" #serverNameInput>
<button (click)="add(serverNameInput)"></button>
```

#Getting Access to Template & DOM with @ViewChild
We can get direct access to elements in our Dom in our template through at view child.

```html
<input type="text" class="something" #serverContentInput>
```

```angular2
@ViewChild('serverContentInput', {static: true}) serverContentInput: ElementRef;
```

!! `{static: true}` is needed to access the data inside ngOnInit.

#Projecting Content into Components with ng-content
Everything you place between the opening and closing tag of your own component is lost by default, is
simply removed from the DOM, Angular will not take care about it..
```html
<custom-component>This text will be ignored by Angular</custom-component>
```
But you can change this!! <br>
There is a special directive and it is a directive, even though it looks like a component but
it doesn't have its own template, which is `ng-content`

in custom-component.html file
```html
<div>
 <ng-content></ng-content>
</div>
```

```html
<custom-component>This text will be ignored by Angular</custom-component>
```

# Angular Services

## Hierarchical Injector
### AppModule
Same instance of Service is available `Application-Wide`
 
### AppComponent
Same instance of Service is available for `all Components` (but `not for other Services`)

### AnyOtherComponent
Same instance of Service is available for the Component and all it's child components

## Lazy Loading 
Instead of adding a service class to the `providers[]`  array in `AppModule` , you can set the following config in `@Injectable()` :
```angular2
@Injectable({providedIn: 'root'})
export class MyService { ... }
```
This is exactly the same as:
```angular2
export class MyService { ... }
```
and
```angular2
import { MyService } from './path/to/my.service';
 
@NgModule({
    ...
    providers: [MyService]
})
export class AppModule { ... }
```
Services can `be loaded lazily` by Angular (behind the scenes) and redundant code can be removed automatically. 
This can lead to a better performance and loading speed - though this really only kicks in for bigger services and apps in general.


# Angular Routing
Put this into app.module.ts
```angular2
const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'users', component: UserComponent},
  {path: 'servers', component: ServerComponent},
];
```
and register this router by adding RouterModule and calling its method `forRoot()`
```angular2
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
```

and in HTML side, instead of calling component selectors directly, give `<router-outlet>` directive
```html

  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <router-outlet></router-outlet>
    </div>
  </div>
```
## How to call the page
Use `<a routerLink="/users">Users</a></li>` directive instead of `<a href="/users">Users</a></li>`. Because href calls the server and loads page again (restarts the app), then you lost all application state.
## RouterLink vs Router vs ActivatedRoute
The routerLink always knows in which component it sits, 
in which components template and therefore it knows what the currently loaded route is.
Router doesn't know about it. But you can pass parameter to indicate relative path like below :

Get the currently active route by injecting route which is of type ActivatedRoute. ActivatedRoute like the
name implies simply injects the currently active routes, and the route simply is kind of a complex Javascript
object which keeps a lot of meta information about the currently active route.

```angular2
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

this.router.navigate(['servers'], {relativeTo: this.activatedRoute});
```
 
 ## Fetching Route Parameters
 `activatedRoute.snapshot.params` is used to get query parameters but snapshot is not reactive!!
 While you are in the component itself and if the route changes, Angular doesn't understand.
 
 ```angular2
  {path: 'users/:id/:name', component: UserComponent}

ngOnInit() {
    this.user = {
      id: this.activatedRoute.snapshot.params['id'],
      name: this.activatedRoute.snapshot.params['name'],
    };
  }
```

To solve this problem, you need to subscribe this.activatedRoute.params (without snapshot)..!!

```angular2
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.user = {
          id: params['id'],
          name: params['name'],
        };
      }
    );
```
If you are sure, you don't call the page within it, you don't need to do this....  ` this.activatedRoute.snapshot.params` will be enough.

## Child(Nested) Routes
If you need to use routes inside an another route, use children property of routes and add a `router-outlet` where you want to see your component.  
```angular2
const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: 'users', component: UsersComponent, children: [
      {path: ':id/:name', component: UserComponent}
    ]
  },
  {
    path: 'servers', component: ServersComponent, children: [
      {path: ':id', component: ServerComponent},
      {path: ':id/edit', component: EditServerComponent}
    ]
  }
];
```

```angular2
  <div class="col-xs-12 col-sm-4">
    <router-outlet></router-outlet>
  </div>
```

## QueryParamsHandling
f you change the route from one url to another say from /firstUrl?name=bat7 to /secondUrl that time you need to say
```angular2
this.router.navigate(['/secondUrl'], { queryParamsHandling: 'preserve' });
```
so that the queryParam "name" will not be lost

```angular2
http://localhost:4200/secondUrl?name=bat7
```
and if you say merge like,

```angular2
this.router.navigate(['/secondUrl/newVal'], { queryParams: { age: 'not-known'}, queryParamsHandling: 'merge' });
```
it would be like below
```angular2
http://localhost:4200/secondUrl?name=bat7&age=not-known
```
The same query parameter can be taken to different routes and merged with needed params.

## Redirecting and WildCard Routes
```angular2
  {path: 'not-found', component: PageNotFoundComponent},
  {path: '**', redirectTo: 'not-found'}
```

## Outsourcing the Route Configuration

`exports` simply tells Angular, if I were to add this module to the imports of another module, 
what should be accessible to this module which imports this module..

```angular2
const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: 'users', component: UsersComponent, children: [
      {path: ':id/:name', component: UserComponent}
    ]
  },
  {
    path: 'servers', component: ServersComponent, children: [
      {path: ':id', component: ServerComponent},
      {path: ':id/edit', component: EditServerComponent}
    ]
  },
  {path: 'not-found', component: PageNotFoundComponent},
  {path: '**', redirectTo: 'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
```
then, put this AppRoutingModule to inside `imports` array of AppModule.
## Protecting Routes : Guards
This will protect the route with following logic before loading the page. 
### Protecting Routes with CanActivate
```angular2
@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isAuthenticated().then((authenticated: boolean) => {
      if (authenticated) {
        return true;
      } else {
        this.router.navigate(['/']);
      }
    });
  }
}

```
and 
```angular2
  {
    path: 'servers', canActivate: [AuthGuardService], component: ServersComponent, children: [
      {path: ':id', component: ServerComponent},
      {path: ':id/edit', component: EditServerComponent}
    ]
  }
```
### Protecting Child (Nested) Routes with CanActivateChild
```angular2
  {
    path: 'servers', canActivateChild: [AuthGuardService], component: ServersComponent, children: [
      {path: ':id', component: ServerComponent},
      {path: ':id/edit', component: EditServerComponent}
    ]
  }
```
and also add CanActivateChild as another interface and implement its method 
```angular2
  canActivateChild(childRoute: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute, state);
  }
```

### Controlling Navigation with canDeactivate
Once you want to leave the route, you want to control and ask user to want this really..
Ex : providing Confirm dialog..

1- Create a new interface and use it in your new canDeactivate service.
```angular2
export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}


export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(component: CanComponentDeactivate,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return component.canDeactivate();
  }

}
```
2- Add your logic into your component by implementing that method of new interface
```angular2
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }
    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }

  }
```

### Passing Static Data to a Route
Static data can be passed to a route and it can be accessible from activatedRoute 
```angular2
  {path: 'not-found', component: ErrorPageComponent, data: {message: 'Static Data'}}
```
```angular2
export class ErrorPageComponent implements OnInit {

  errorMessage: string;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.errorMessage = this.activatedRoute.snapshot.data['message'];
    this.activatedRoute.data.subscribe((data: Data) => {
      this.errorMessage = data['message'];
    });
  }
```

### Resolving Dynamic Data with the resolve Guard
resolve guard is acting before the page rendered. 
However, canDeactivate, canActivateChild and canActivate determines whether the page opens or not.

When using asynchronous data, you need to use this approach. Otherwise, first page will be rendered as blank,
 then you will fetch data inside ngOnInit.
 
 ```angular2
interface Server {
  id: number;
  name: string;
  status: string;
}

@Injectable()
export class ServerResolverService implements Resolve<Server> {

  constructor(private serversService: ServersService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Server> | Promise<Server> | Server {
    return this.serversService.getServer(+route.params['id']);
  }
}
```
and inside ngOnInit, subscribe to `activatedRoute.data
```angular2
this.activatedRoute.data.subscribe((data: Data) => {
  this.server = data['server'];
});
```
and indicate the its resolver inside routing 
```angular2
 {path: ':id', component: ServerComponent, resolve: {server: ServerResolverService}},
``` 

# Handling Forms in Angular
(TD) Template-Driven Forms vs Reactive Approach
## (TD) Template-Driven Forms

first of all, import `FormsModule` in appModule class.

```html
      <form (ngSubmit)="onSubmit(f)" #f="ngForm">
        <div id="user-data">
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" class="form-control" ngModel name="username">
          </div>
          <button class="btn btn-default" type="button">Suggest an Username</button>
          <div class="form-group">
            <label for="email">Mail</label>
            <input type="email" id="email" class="form-control" ngModel name="email">
          </div>
        </div>
        <button class="btn btn-primary" type="submit">Submit</button>
      </form>
```
and access the form element as below :
```angular2
  onSubmit(ngForm: NgForm) {
    console.log(ngForm);
  }
```

Completed Example :
```html
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <form (ngSubmit)="onSubmit()" #f="ngForm">
        <div id="user-data" ngModelGroup="userData" #userData="ngModelGroup">
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" class="form-control" ngModel name="username" required>
          </div>
          <button class="btn btn-warning" type="button" (click)="suggestUserName()">Suggest an Username</button>
          <div class="form-group">
            <label for="email">Mail</label>
            <input type="email" id="email" class="form-control"
                   ngModel name="email" required email
                   #email="ngModel">
            <span *ngIf="email.invalid && email.touched" class="help-block">Please enter a valid value!</span>
          </div>
        </div>
        <p *ngIf="userData.invalid && userData.touched">Please enter a valid user data!</p>
        <div class="form-group">
          <label for="secret">Secret Questions</label>
          <select id="secret" class="form-control" [ngModel]="defaultQuestion" name="secret">
            <option value="pet">Your first Pet?</option>
            <option value="teacher">Your first teacher?</option>
          </select>
        </div>
        <div class="form-group">
          <textarea name="questionAnswer" rows="3" [(ngModel)]="questionAnswer"></textarea>
        </div>
        <p>Your reply : {{questionAnswer}}</p>

        <div class="radio" *ngFor="let gender of genders">
          <label>
            <input type="radio" name="gender" [value]="gender" ngModel>
            {{gender}}
          </label>
        </div>
        <button class="btn btn-primary" type="submit" [disabled]="f.invalid">Submit</button>
      </form>
    </div>
  </div>
  <hr>
  <div class="row" *ngIf="submitted">
    <div class="col-xs-12">
      <h3>Your Data</h3>
      <p>Username: {{user.username}}</p>
      <p>Mail: {{user.email}}</p>
      <p>Secret Question: {{user.secretQuestion}}</p>
      <p>Answer: {{user.answer}}</p>
      <p>Gender: {{user.gender}}</p>
    </div>
  </div>
</div>
```

```angular2
export class OldComponent implements OnInit {

  @ViewChild('f', {static: false}) signupForm: NgForm;

  defaultQuestion = 'pet';
  questionAnswer = '';
  genders = ['male', 'female'];

  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: ''
  };
  submitted = false;

  suggestUserName() {
    const suggestedName = 'Superuser';
    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    });
  }

  onSubmit() {
    this.submitted = true;
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.secretQuestion = this.signupForm.value.secret;
    this.user.answer = this.signupForm.value.questionAnswer;
    this.user.gender = this.signupForm.value.gender;

    this.signupForm.reset();
  }

  ngOnInit(): void {
  }

}
```

## Reactive Forms

1- Instead of `FormsModule`, `ReactiveFormsModule` should be imported now!
2- Tell signupForm to your html form using `formGroup directive.
```html
<form [formGroup]="signUpForm">
````
3- Synchronize signUpForm between Html and Typescript
```angular2
  signUpForm: FormGroup;

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      'username': new FormControl(null),
      'email': new FormControl(null),
      'gender': new FormControl('male')
    });
  }
```
4- Put formControlName directive to each input element inside html with corresponding form element name
```html
<input
            type="text"
            id="username"
            formControlName="username"
            class="form-control">
        </div>
```
 
### Adding Validators
 ```angular2
  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'gender': new FormControl('male')
    });
  }
``` 
### Getting Access to Controls from HTML
Use `'form-name'.get('input-control-name')
```html
          <span class="help-block" *ngIf="signUpForm.get('email').invalid && signUpForm.get('email').touched"> Please provide a valid email!</span>
```

### Dynamically Add Form Controls to Form
1- Add a `FormArray` to your `FormGroup` and push a new FormControl by using an EventHandler. 
```angular2
  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, Validators.required),
        'email': new FormControl(null, [Validators.required, Validators.email])
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    })
    ;
  }

  getControls() {
    return (<FormArray>this.signUpForm.get('hobbies')).controls;
  }

  onAddHobby() {
    const formControl = new FormControl(null, Validators.required);
    (<FormArray>this.signUpForm.get('hobbies')).push(formControl);
  }
```

2- HTML Side
```html
        <div formArrayName="hobbies">
          <h4>Your Hobbies</h4>
          <button type="button" class="btn btn-primary" (click)="onAddHobby()">Add Hobby</button>
          <div class="form-group"
               *ngFor="let hobbyControl of getControls() let i=index">
            <input type="text" class="form-control" [formControlName]="i">
          </div>
        </div>
```


### Creating Custom Validator
Add `this.isForbiddenUserNames.bind(this)` to validators array. 
```angular2
  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.isForbiddenUserNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email])
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    })
    ;
  }

  isForbiddenUserNames(control: FormControl): { [key: string]: boolean } {
    if (this.forbiddenUserNames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    } else {
      return null;
    }
  }
```
### Using Error Code
```html
            <span class="help-block"
                  *ngIf="signUpForm.get('userData.username').invalid && signUpForm.get('userData.username').touched">
              <span *ngIf="signUpForm.get('userData.username').errors['nameIsForbidden']">
                Please provide a valid username!
              </span>
              <span *ngIf="signUpForm.get('userData.username').errors['required']">
                Username is required!
              </span>
            </span>
```

### Creating Custom Async Validator
Pass new async validator as third argument!
```angular2
  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.isForbiddenUserNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.isForbiddenEmail)
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    })
    ;
  }

  isForbiddenEmail(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise(((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve('emailIsForbidden:true');
        } else {
          resolve(null);
        }
      }, 1500);
    }));
    return promise;
  }
```
# Using Pipes to Transform Output Data in Template
Use `|` sign and give your desired operation to transform your output data..
By using `:`, you can provide parameters to pipes as below

If you look at date part of the example, chaining is also possible to transform output using pipe.  

```html
{{ server.instanceType | uppercase }} | {{ server.started | date:'fullDate' | uppercase}}
```
## Creating a Custom Pipe

Shortcut `ng g p <name>`

1- Add this `Pipe` decorator
2- Implement `PipeTransform` class and its method transform
3- Add this new Shorten pipe to `app.module` as a new declaration  
```angular2
@Pipe({
  name: 'shorten'
})

export class Shorten implements PipeTransform {
  transform(value: any) {
    if (value.length > 10) {
      return value.substr(0, 10) + ' ...';
    } else {
      return value;
    }
  }

}
```

## Parameterizing a Custom Pipe
```angular2
@Pipe({
  name: 'shorten'
})

export class Shorten implements PipeTransform {
  transform(value: any, limit:number) {
    if (value.length > limit) {
      return value.substr(0, 10) + ' ...';
    } else {
      return value;
    }
  }

}
```
pass limit parameter as 15 as below :
```html
{{ server.name | shorten:15 }}
```
!! Angular pipe doesn't recalculate once data changed. It will only recalculate once you change pipe parameters....

But you could force this by making parameter pure to false. Don't forget this can lead performance issue..
```angular2
@Pipe({
  name: 'filter',
  pure: false
})
```

## Understanding the async Pipe

async pipe recognizes that the output is a promise or observable and it subscribes automatically. 
After fetching data, it will print the subscribed data.

 
```html
{{ serverStatus | async }}
```

# Making Http Requests

## Interceptors

Create an interceptor by implementing HttpInterceptor
 
```angular2
export class AuthInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Request is on its way');
    const modifiedRequest = req.clone({headers: req.headers.append('Auth', 'xyz')});
    return next.handle(modifiedRequest);
  }

}

```

Add new interceptor as a provider with following parameters,
```angular2
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

# Angular Modules & Optimizing Angular Apps
## Split Into Multiple Modules
Split into multiple modules and provide lazy loading for better performance.
1- Remove `recipes` path, and leave it empty in `RecipesRoutingModule`
```angular2
const routes: Routes = [{
  path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard], children: [
    {path: '', component: RecipeStartComponent},
    {path: 'new', component: RecipeEditComponent},
    {path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService]},
    {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]}
  ]
}];

const routes: Routes = [{
  path: '', component: RecipesComponent, canActivate: [AuthGuard], children: [
    {path: '', component: RecipeStartComponent},
    {path: 'new', component: RecipeEditComponent},
    {path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService]},
    {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]}
  ]
}];
```
2- change `AppRoutingModule` like below :
```angular2
const appRoutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)}
];
```
This is a special property in a root config which Angular understands as a policy
 only load the code content or the module when the users visit here.
 
3- Remove RecipesModule declaration from NgModule imports section.
 ## PreLoading Lazy-Loaded Code
 This makes first to install eager code, and as soon as possible it will load other lazy-loaded modules.  
 ```angular2
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})]
``` 

## Ahead of Time (AOT) vs Just-In-Time(JIT)
Ahead of Time (AOT) for production (compile Angular application during development stage) --> `ng build --prod`
Just-In-Time(JIT) for development (compile Angular application on runtime, <browser>). Provides proper error messages, debugging capabilities etc..



# Component Lifecycle

 - ngOnChanges : executed multiple times, it's executed right at the start when a new component is created but thereafter, 
 it's also always called whenever one of our bound input properties changes and with that, I mean properties decorated with @input,          
 - ngOnInit : Called once the component is initialized. This will run after the `constructor`
 - ngDoCheck : Called during every change detection run. Event, input, click etc, so many times..
 - ngAfterContentInit : Called after content (ng-content) has been projected into view
 - ngAfterContentCheck : Called every time the projected content has been checked
 - ngAfterViewInit : Called after the component's view (and child views) has been initialized
 - ngAfterViewChecked : Called every time the view (and child views) have been checked
 - ngOnDestroy : Called once the component is about to be destroyed

 
# Useful Commands

Create a project : <br>
`ng new <new-project-name>`

Create a component : <br>
`ng g c <new-component-name>` <br>
or <br>
`ng generate component <new-component-name>`

Run up development server : <br>
`ng server`

Want to update existing projects? 

`ng update` should do the trick.
