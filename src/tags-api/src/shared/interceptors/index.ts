import { TimeOutInterceptor } from './timeout.interceptor';

export const GlobalInterceptors = [new TimeOutInterceptor()];
