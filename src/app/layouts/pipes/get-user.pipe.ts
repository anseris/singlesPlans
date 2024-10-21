import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getUser',
  standalone: true
})
export class GetUserPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
