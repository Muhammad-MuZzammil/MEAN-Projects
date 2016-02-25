import { bootstrap } from "angular2/platform/browser";
import {MainComponent} from "./app"
import {Http, Response, RequestOptions,Headers} from 'angular2/http';
import {HTTP_PROVIDERS } from 'angular2/http';


bootstrap(MainComponent,[HTTP_PROVIDERS]);